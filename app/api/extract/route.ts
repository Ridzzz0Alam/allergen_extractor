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
    const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPDF) {
      console.log('Processing PDF with OpenAI File API');
      return await processPDFWithOpenAI(buffer, file.name);
    } else {
      console.log('Processing image with OpenAI Vision API');
      return await processImageWithVision(buffer, file.type);
    }

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

async function processPDFWithOpenAI(buffer: Buffer, fileName: string) {
  try {
    // Upload the PDF file to OpenAI
    console.log('Uploading PDF to OpenAI...');
    
    // Create a File object from the buffer
    const blob = new Blob([buffer as any], { type: 'application/pdf' });
    const fileToUpload = new File([blob], fileName, { type: 'application/pdf' });
    
    const uploadedFile = await openai.files.create({
      file: fileToUpload,
      purpose: 'assistants',
    });

    console.log(`File uploaded with ID: ${uploadedFile.id}`);

    // Create an assistant with file search capability
    const assistant = await openai.beta.assistants.create({
      model: 'gpt-4o',
      instructions: `You are an expert food safety analyst. Extract allergen and nutritional information from the provided document.`,
      tools: [{ type: 'file_search' }],
    });

    // Create a thread with the file
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: `Analyze this document and extract allergen and nutritional information.

**IMPORTANT INSTRUCTIONS:**

1. **Allergens to detect:** ${ALLERGENS.join(', ')}
   - Only list allergens that are PRESENT in the product
   - Look for allergen tables/sections with checkmarks (✓), "tartalmaz", "contains", or similar indicators
   - If document states "no allergens" or "mentes" (allergen-free), return empty allergen array
   - Common translations: Tej=Milk, Glutén=Gluten, Tojás=Egg, Szója=Soy, Földimogyoró=Peanut

2. **Nutritional Values to extract:** ${NUTRITIONAL_VALUES.join(', ')}
   - Extract values per 100g if available
   - Include units (g, kcal, kJ, mg)
   - Convert salt to sodium if needed (sodium = salt ÷ 2.5)
   - If a value is not found, use "Not specified"

3. **Product name:** Extract the main product name if visible

Return ONLY valid JSON:
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
}`,
          attachments: [
            {
              file_id: uploadedFile.id,
              tools: [{ type: 'file_search' }],
            },
          ],
        },
      ],
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const assistantMessage = messages.data[0];
      
      if (assistantMessage.content[0].type === 'text') {
        const content = assistantMessage.content[0].text.value;
        
        // Parse JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : content;
        const parsed = JSON.parse(jsonStr);

        // Clean up
        await openai.files.delete(uploadedFile.id);
        await openai.beta.assistants.delete(assistant.id);

        return NextResponse.json({
          product: parsed.product || undefined,
          allergens: Array.isArray(parsed.allergens) ? parsed.allergens : [],
          nutritionalValues: parsed.nutritionalValues || {},
        });
      }
    }

    throw new Error(`Assistant run failed with status: ${run.status}`);

  } catch (error) {
    console.error('PDF processing error:', error);
    throw error;
  }
}

async function processImageWithVision(buffer: Buffer, mimeType: string) {
  const base64Image = buffer.toString('base64');
  const validMimeType = mimeType.startsWith('image/') ? mimeType : 'image/png';

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
              url: `data:${validMimeType};base64,${base64Image}`,
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

