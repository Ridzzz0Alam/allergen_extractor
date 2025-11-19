import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ALLERGENS = [
  'Gluten',
  'Egg',
  'Crustaceans',
  'Fish',
  'Peanut',
  'Soy',
  'Milk',
  'Tree nuts',
  'Celery',
  'Mustard',
];

const NUTRITIONAL_VALUES = [
  'Energy',
  'Fat',
  'Carbohydrate',
  'Sugar',
  'Protein',
  'Sodium',
];

// Dynamic import for pdf-parse to avoid ESM issues
async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF');
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size}`);

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    // Check if it's a PDF or image
    if (file.type === 'application/pdf') {
      try {
        // Try to extract text from PDF
        extractedText = await parsePDF(buffer);
        console.log(`Extracted text length: ${extractedText.length}`);

        // If PDF has minimal or no text (scanned), use vision API
        if (!extractedText || extractedText.trim().length < 100) {
          console.log('PDF appears to be scanned, using vision API');
          return await processWithVision(buffer, file);
        }
      } catch (error) {
        console.error('PDF text extraction failed, falling back to vision:', error);
        return await processWithVision(buffer, file);
      }
    } else {
      // Image file - use vision API
      console.log('Processing as image with vision API');
      return await processWithVision(buffer, file);
    }

    // Process text-based PDF with GPT-4
    console.log('Processing text-based PDF with GPT-4');
    const result = await extractDataFromText(extractedText);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process file',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

async function processWithVision(buffer: Buffer, file: File) {
  const base64Image = buffer.toString('base64');
  const mimeType = file.type || 'image/png';

  console.log('Sending to OpenAI Vision API');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are an expert food safety analyst. Analyze this document and extract allergen and nutritional information.

**IMPORTANT INSTRUCTIONS:**

1. **Allergens to detect:** ${ALLERGENS.join(', ')}
   - Only list allergens that are PRESENT in the product
   - Look for allergen tables/sections with checkmarks (✓), "tartalmaz", "contains", or similar indicators
   - If document states "no allergens" or "mentes" (allergen-free), return empty allergen array
   - Common translations: Tej=Milk, Glutén=Gluten, Tojás=Egg, Szója=Soy

2. **Nutritional Values to extract:** ${NUTRITIONAL_VALUES.join(', ')}
   - Extract values per 100g if available
   - Include units (g, kcal, kJ, mg)
   - Convert salt to sodium if needed (sodium = salt ÷ 2.5)
   - If a value is not found, use "Not specified"
   - Look for tables with "Táplárkozási értékek", "Nutritional values", "Wartości odżywcze"

3. **Product name:** Extract the main product name if visible

Return ONLY valid JSON in this exact structure:
{
  "product": "Product name if found",
  "allergens": ["Milk", "Gluten"],
  "nutritionalValues": {
    "Energy": "223 kJ (53 kcal)",
    "Fat": "3.0 g",
    "Carbohydrate": "2.8 g",
    "Sugar": "2.4 g",
    "Protein": "3.2 g",
    "Sodium": "0.04 g"
  }
}

Be thorough and accurate. This is for food safety compliance.`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 2000,
    temperature: 0.1,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No response from OpenAI Vision');
  }

  console.log('OpenAI Vision response received');
  
  // Parse and validate JSON
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : content;
    const parsed = JSON.parse(jsonStr);
    
    // Ensure structure
    return NextResponse.json({
      product: parsed.product || undefined,
      allergens: Array.isArray(parsed.allergens) ? parsed.allergens : [],
      nutritionalValues: parsed.nutritionalValues || {},
    });
  } catch (parseError) {
    console.error('JSON parsing error:', parseError);
    throw new Error('Failed to parse AI response');
  }
}

async function extractDataFromText(text: string) {
  console.log('Sending text to OpenAI GPT-4');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an expert food safety analyst specializing in extracting allergen and nutritional information from product specifications. You understand multiple languages including English, Hungarian, and Polish.',
      },
      {
        role: 'user',
        content: `Analyze this product specification document and extract allergen and nutritional information.

**IMPORTANT INSTRUCTIONS:**

1. **Allergens to detect:** ${ALLERGENS.join(', ')}
   - Only list allergens that are PRESENT/CONTAINS in the product
   - Look for keywords: "tartalmaz" (contains), "contains", "present", checkmarks (✓)
   - If document states "ALLERGÉN ANYAGOKAT NEM TARTALMAZ" or "Brak alergenów" or "mentes" = NO ALLERGENS
   - Common translations: Tej=Milk, Glutén=Gluten, Tojás=Egg, Szója=Soy, Földimogyoró=Peanut

2. **Nutritional Values:** Extract for ${NUTRITIONAL_VALUES.join(', ')}
   - Find section: "TÁPLÁRKOZÁSI ÉRTÉKEK", "Nutritional values", "Wartości odżywcze"
   - Extract per 100g values with units
   - Energia=Energy, Zsír=Fat, Szénhidrát=Carbohydrate, Cukor=Sugar, Fehérje=Protein, Só=Salt
   - Convert salt to sodium: sodium = salt ÷ 2.5
   - If value not found: "Not specified"

3. **Product identification:** Extract product name from title/header

**Document text:**
${text}

Return ONLY valid JSON:
{
  "product": "Product name",
  "allergens": ["Milk"],
  "nutritionalValues": {
    "Energy": "223 kJ (53 kcal)",
    "Fat": "3.0 g",
    "Carbohydrate": "2.8 g",
    "Sugar": "2.4 g",
    "Protein": "3.2 g",
    "Sodium": "0.04 g"
  }
}`,
      },
    ],
    temperature: 0.1,
    max_tokens: 2000,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  console.log('OpenAI GPT-4 response received');

  // Parse and validate JSON
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : content;
    const parsed = JSON.parse(jsonStr);
    
    // Ensure structure and clean up
    return {
      product: parsed.product || undefined,
      allergens: Array.isArray(parsed.allergens) ? parsed.allergens : [],
      nutritionalValues: parsed.nutritionalValues || {},
    };
  } catch (parseError) {
    console.error('JSON parsing error:', parseError);
    console.error('Raw content:', content);
    throw new Error('Failed to parse AI response as JSON');
  }
}
