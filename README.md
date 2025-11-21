# Allergen & Nutrition Extractor - User Guide (Developer Documentation Below)

## Table of Contents

1. [Welcome](#welcome)
2. [What is the Allergen & Nutrition Extractor?](#what-is-the-allergen--nutrition-extractor)
3. [Getting Started](#getting-started)
4. [How to Use the Application](#how-to-use-the-application)
5. [Understanding Your Results](#understanding-your-results)
6. [Downloading Your Data](#downloading-your-data)
7. [Supported File Formats](#supported-file-formats)
8. [Troubleshooting Common Issues](#troubleshooting-common-issues)
9. [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
10. [Tips for Best Results](#tips-for-best-results)
11. [Getting Help](#getting-help)

---

## Welcome

Thank you for using the **Allergen & Nutrition Extractor**! This guide will help you quickly extract allergen and nutritional information from your food product documents.

### Who is this for?

- Food safety professionals
- Quality control specialists
- Nutritionists and dietitians
- Restaurant and catering managers
- Food manufacturers
- Regulatory compliance teams
- Anyone who needs to analyze food product specifications

---

## What is the Allergen & Nutrition Extractor?

The Allergen & Nutrition Extractor is an intelligent web application that automatically reads food product specification documents and extracts important safety information, including:

### Allergens Detected
- Gluten
- Egg
- Crustaceans
- Fish
- Peanut
- Soy
- Milk
- Tree nuts
- Celery
- Mustard

### Nutritional Values Extracted
- Energy (calories/kJ)
- Fat content
- Carbohydrate content
- Sugar content
- Protein content
- Sodium content

### Key Benefits

✅ **Fast Processing** - Extract data in seconds instead of manual hours  
✅ **Multi-language Support** - Works with English, Hungarian, Polish, and more  
✅ **High Accuracy** - Powered by advanced AI technology  
✅ **Easy Export** - Download results as JSON or CSV files  
✅ **No Installation Required** - Works directly in your web browser

---

## Getting Started

### System Requirements

- **Internet Connection**: Required for processing documents
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **File Size Limit**: Up to 10MB per document

### Accessing the Application

1. Open your web browser
2. Navigate to the application URL provided by your administrator
3. You'll see the main upload screen with a purple gradient design

---

## How to Use the Application

### Step 1: Prepare Your Document

Before uploading, ensure your document:
- Contains allergen or nutritional information
- Is saved as PDF, PNG, JPG, or JPEG format
- Is not password-protected or encrypted
- Is under 10MB in size

### Step 2: Upload Your File

**Method 1: Click to Upload**
1. Click the **"Choose a file"** button in the center of the screen
2. Navigate to your document location
3. Select your file and click "Open"

**Method 2: Drag and Drop**
1. Open your file explorer/finder
2. Drag your document file
3. Drop it onto the dotted box area on the screen

### Step 3: Confirm Your Selection

After selecting your file, you'll see:
- A green checkmark ✓
- Your filename displayed
- The file type and size

**Example:**
```
✓ Product_Specification.pdf
```

### Step 4: Start Extraction

1. Click the **"🚀 Extract Data"** button
2. Wait while the system processes your document
3. You'll see progress messages:
   - "Uploading file..."
   - "Processing document..."
   - "Extraction complete!"

**Processing Time:** Typically 10-30 seconds depending on document complexity

### Step 5: Review Results

Once processing is complete, your extracted data will appear on the screen with three main sections:
1. Product information (if available)
2. Allergens detected
3. Nutritional values

---

## Understanding Your Results

### Product Information Section

**What you'll see:**
```
📦 Product
Nádudvari natúr joghurt 3,0% 900g
```

This shows the product name extracted from your document.

### Allergens Section

**When Allergens ARE Present:**
```
⚠️ Allergens

Present:
✓ Milk

Not Present:
✗ Gluten
✗ Egg
✗ Crustaceans
✗ Fish
✗ Peanut
✗ Soy
✗ Tree nuts
✗ Celery
✗ Mustard
```

- **Green background with ✓**: Allergens found in the product
- **Gray background with ✗**: Allergens NOT found in the product

**When NO Allergens are Detected:**
```
✓ No allergens detected
Safe for all allergen sensitivities
```

This means the product contains none of the tracked allergens.

### Nutritional Values Section

**What you'll see:**
```
📊 Nutritional Values

Energy: 223 kJ (53 kcal)
Fat: 3.0 g
Carbohydrate: 2.8 g
Sugar: 2.4 g
Protein: 3.2 g
Sodium: 0.04 g
```

- Values are typically per 100g of product
- Units are included (g, kcal, kJ, mg)
- "Not specified" appears if a value isn't found in the document

### JSON Preview Section

At the bottom, you'll see the raw data in JSON format:
```json
{
  "product": "Nádudvari natúr joghurt 3,0% 900g",
  "allergens": ["Milk"],
  "nutritionalValues": {
    "Energy": "223 kJ (53 kcal)",
    "Fat": "3.0 g",
    "Carbohydrate": "2.8 g",
    "Sugar": "2.4 g",
    "Protein": "3.2 g",
    "Sodium": "0.04 g"
  }
}
```

This is useful for technical users or for importing into other systems.

---

## Downloading Your Data

After extraction, you can save your results in two formats:

### Option 1: Download as JSON

**Best for:**
- Importing into databases
- Integration with other software
- Technical documentation
- API consumption

**How to download:**
1. Click the green **"Download JSON"** button
2. Your file will be saved as: `[your-filename]-extracted.json`
3. Open with any text editor or JSON viewer

**JSON Structure:**
```json
{
  "product": "Product Name",
  "allergens": ["Milk", "Gluten"],
  "nutritionalValues": {
    "Energy": "155 kcal",
    "Fat": "6.9 g",
    ...
  }
}
```

### Option 2: Download as CSV

**Best for:**
- Opening in Excel or Google Sheets
- Creating reports
- Data analysis
- Sharing with non-technical staff

**How to download:**
1. Click the blue **"Download CSV"** button
2. Your file will be saved as: `[your-filename]-extracted.csv`
3. Open with Excel, Google Sheets, or any spreadsheet program

**CSV Structure:**
```
Category,Item,Value
Product,Name,"Nádudvari natúr joghurt"
Allergen,Milk,Present
Allergen,Gluten,Not Present
Nutrition,Energy,"223 kJ (53 kcal)"
Nutrition,Fat,"3.0 g"
```

---

## Supported File Formats

### PDF Files (.pdf)

**Recommended for:**
- Product specification sheets
- Technical data sheets
- Nutritional fact sheets
- Multi-page documents

**Requirements:**
- Can be text-based or scanned images
- Not password-protected
- Maximum 10MB file size
- All pages will be processed automatically

**Examples:**
- `Product_Specification.pdf`
- `Nutritional_Information.pdf`
- `Food_Safety_Document.pdf`

### Image Files (.png, .jpg, .jpeg)

**Recommended for:**
- Product labels
- Packaging photos
- Single-page documents
- Screenshots

**Requirements:**
- Clear, readable text
- Good lighting (no shadows or glare)
- Straight angle (not tilted)
- Minimum 300 DPI resolution for best results

**Examples:**
- `Label_Photo.jpg`
- `Nutrition_Facts.png`
- `Ingredient_List.jpeg`

---

## Troubleshooting Common Issues

### Issue: "No file provided" Error

**Problem:** You clicked Extract without selecting a file

**Solution:**
1. Click "Choose a file" or drag and drop a document
2. Wait for the green checkmark to appear
3. Then click "Extract Data"

---

### Issue: "Failed to extract data" Error

**Possible Causes & Solutions:**

**Cause 1: File is corrupted or unreadable**
- Try opening the file on your computer first
- If it doesn't open, the file may be damaged
- Request a new copy of the document

**Cause 2: Document is password-protected**
- Remove password protection before uploading
- Save as a new PDF without security
- Contact document owner for unlocked version

**Cause 3: File size too large**
- Check file size (must be under 10MB)
- Compress the PDF using online tools
- Split multi-page PDFs into smaller files

**Cause 4: Poor image quality**
- Use higher resolution images (300 DPI minimum)
- Ensure good lighting when photographing
- Take photo straight-on (not at an angle)

---

### Issue: Allergens or Nutritional Values Missing

**Problem:** Some expected data is showing as "Not specified"

**Possible Reasons:**

1. **Information not in document**
   - Verify the data exists in your original document
   - Some products may not list all values

2. **Text is unclear or hard to read**
   - Use higher quality scans or photos
   - Ensure text is not blurred or cut off

3. **Non-standard formatting**
   - The AI works best with standard nutrition tables
   - Unusual layouts may be partially recognized

4. **Multi-language complexity**
   - Mixed languages in one document may confuse extraction
   - Try documents in a single language

**Solutions:**
- Re-scan document at higher resolution
- Use a clearer photo
- Manually verify critical information

---

### Issue: Incorrect Data Extracted

**Problem:** The extracted information doesn't match your document

**What to do:**

1. **Verify your source document**
   - Check if the document uploaded correctly
   - Ensure you uploaded the right file

2. **Review the original document**
   - Compare AI results with original
   - Check if similar terms caused confusion (e.g., "may contain" vs "contains")

3. **Report the issue**
   - Note which values are incorrect
   - Contact support with the document and results
   - This helps improve the system

---

### Issue: Application is Slow or Unresponsive

**Problem:** Processing takes too long or page freezes

**Solutions:**

1. **Check your internet connection**
   - Ensure stable internet access
   - Slow connections increase processing time

2. **Refresh the page**
   - Close and reopen the browser
   - Clear browser cache if needed

3. **Try a different browser**
   - Switch to Chrome, Firefox, or Edge
   - Ensure browser is up to date

4. **Reduce file size**
   - Large PDFs (8-10MB) take longer
   - Compress before uploading

---

### Issue: Download Buttons Not Working

**Problem:** Clicking Download JSON or CSV does nothing

**Solutions:**

1. **Check browser pop-up settings**
   - Enable pop-ups for this website
   - Check browser download settings

2. **Try right-click**
   - Right-click the download button
   - Select "Save link as..."

3. **Check download folder permissions**
   - Ensure you have write permissions
   - Check if downloads folder is full

---

## Frequently Asked Questions (FAQ)

### General Questions

**Q: How accurate is the extraction?**  
A: The application uses advanced AI (OpenAI GPT-4o) with high accuracy rates. However, always verify critical information manually, especially for regulatory compliance.

**Q: Can I process multiple files at once?**  
A: Currently, the application processes one file at a time. Upload files individually for best results.

**Q: Is my data secure?**  
A: Files are processed temporarily and deleted immediately after extraction. No documents are stored permanently on servers.

**Q: What languages does it support?**  
A: The application works with English, Hungarian, Polish, German, and many other European languages. It can handle multi-language documents.

**Q: How long does processing take?**  
A: Most documents process in 10-30 seconds. Complex multi-page PDFs may take up to 1 minute.

---

### Technical Questions

**Q: Do I need to install anything?**  
A: No! The application runs entirely in your web browser. No downloads or installations required.

**Q: Can I use this on my phone or tablet?**  
A: Yes, the application is mobile-friendly and works on smartphones and tablets with internet access.

**Q: What happens to my uploaded files?**  
A: Files are processed in real-time and immediately deleted. They are never stored permanently.

**Q: Can I integrate this with other systems?**  
A: The JSON export format makes integration easy. Contact your IT department or support team for API access options.

**Q: Why do I need an internet connection?**  
A: The AI processing happens on secure cloud servers, requiring an active internet connection.

---

### Data Questions

**Q: Why doesn't it find all allergens?**  
A: The application only reports allergens explicitly mentioned as "present" or "contains" in the document. "May contain" warnings are not included in the allergen list.

**Q: What if nutritional values show "Not specified"?**  
A: This means the value wasn't found in the document. Some products (like raw meat) may be exempt from full nutritional labeling.

**Q: Can it extract ingredients lists?**  
A: Currently focused on allergens and nutritional values. Ingredient lists are not extracted, though product names are captured.

**Q: Why are some units different from my document?**  
A: The system standardizes units for consistency (e.g., converts salt to sodium). Original units are preserved when possible.

**Q: Does it work with nutrition facts from different countries?**  
A: Yes! It recognizes various international formats including EU, US, and other regional nutrition label standards.

---

## Tips for Best Results

### Document Preparation Tips

✅ **Use original digital PDFs when possible**  
   - Better than scanned copies
   - Text-based PDFs work best

✅ **Ensure documents are complete**  
   - Include all pages with allergen/nutrition info
   - Don't crop important sections

✅ **Check document quality**  
   - Text should be clear and readable
   - No missing pages
   - No heavy watermarks obscuring text

✅ **Remove security features**  
   - Unlock password-protected PDFs
   - Disable copy protection if possible

### Photography Tips (for images)

✅ **Good lighting is essential**  
   - Natural daylight works best
   - Avoid shadows and glare
   - Use flash carefully

✅ **Capture straight-on**  
   - Hold camera parallel to document
   - Avoid angles or perspective distortion
   - Keep entire label/page in frame

✅ **Focus and clarity**  
   - Ensure text is in sharp focus
   - Use higher megapixel camera if available
   - Avoid motion blur

✅ **Fill the frame**  
   - Get close enough to read text clearly
   - Don't include unnecessary background
   - Ensure all relevant information is visible

### Usage Best Practices

✅ **Verify critical information**  
   - Always double-check allergen data
   - Confirm nutritional values for regulatory use
   - Use extracted data as a starting point

✅ **Keep original documents**  
   - Save originals for reference
   - Don't rely solely on extracted data
   - Maintain audit trail

✅ **Process one document at a time**  
   - Wait for results before uploading next file
   - Avoid opening multiple browser tabs

✅ **Use appropriate file format**  
   - PDF for multi-page specifications
   - Images for labels and single pages
   - Choose smallest acceptable file size

### Data Management Tips

✅ **Organize your downloads**  
   - Create folders by product category
   - Use clear, descriptive filenames
   - Date-stamp exported files

✅ **Backup important data**  
   - Save both JSON and CSV versions
   - Store in multiple locations
   - Include original source documents

✅ **Review before sharing**  
   - Check extracted data for accuracy
   - Add notes if manual corrections made
   - Include source document reference

---

## Getting Help

### Need Support?

If you encounter issues not covered in this guide:

**Contact Information:**
- **Email Support:** support@yourcompany.com
- **Help Desk:** Available Monday-Friday, 9 AM - 5 PM
- **Documentation:** Visit our knowledge base at docs.yourcompany.com

### When Contacting Support, Include:

1. **Description of the issue**
   - What you were trying to do
   - What happened instead
   - Error messages (if any)

2. **Your environment**
   - Browser name and version
   - Operating system
   - File type and size

3. **Sample file** (if possible)
   - Helps reproduce the issue
   - Redact sensitive information if needed
   - Provide screenshot of error

### Feedback and Suggestions

We value your feedback! Help us improve by:
- Reporting bugs or errors
- Suggesting new features
- Sharing use cases
- Providing sample documents for testing

---

## Appendix: Example Workflows

### Workflow 1: Single Product Analysis

**Scenario:** Analyzing a new product specification

1. Receive product specification PDF from supplier
2. Open Allergen & Nutrition Extractor
3. Upload PDF file
4. Click "Extract Data"
5. Review allergens and nutritional values
6. Download as CSV for record-keeping
7. Import CSV into product database
8. Verify critical allergen data manually

**Time Required:** ~2 minutes

---

### Workflow 2: Batch Product Review

**Scenario:** Reviewing multiple products for allergen compliance

1. Collect all product specification PDFs
2. Process each document individually
3. Download JSON file for each product
4. Compile all JSON files into master spreadsheet
5. Review for allergen patterns
6. Flag products with specific allergens
7. Generate compliance report

**Time Required:** ~5 minutes per product

---

### Workflow 3: Label Verification

**Scenario:** Verifying printed label matches specification

1. Take clear photo of product label
2. Upload image to application
3. Extract nutritional values
4. Compare with original specification document
5. Identify discrepancies
6. Document findings
7. Request label correction if needed

**Time Required:** ~3 minutes

---

## Glossary

**Allergen** - A substance that can cause an allergic reaction in sensitive individuals

**CSV** - Comma-Separated Values, a file format for spreadsheets

**JSON** - JavaScript Object Notation, a structured data format

**Nutritional Values** - Information about energy, macronutrients, and micronutrients in food

**PDF** - Portable Document Format, a common document file type

**Resolution** - Image quality measured in DPI (dots per inch)

**Extraction** - The process of automatically identifying and copying information from documents

---

**Thank you for using the Allergen & Nutrition Extractor!**

This documentation is designed to help you work efficiently and accurately. For the latest updates and additional resources, visit our support portal.

---

*Document prepared for end-users of the Allergen & Nutrition Extractor application. For technical documentation, please refer to the Developer Documentation.*





















# Allergen & Nutrition Extractor - Developer Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup & Installation](#setup--installation)
4. [Project Structure](#project-structure)
5. [Frontend Documentation](#frontend-documentation)
6. [Backend API Documentation](#backend-api-documentation)
7. [Data Models](#data-models)
8. [Configuration](#configuration)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Description
A Next.js web application that automatically extracts allergen and nutritional information from PDF and image documents containing food product specifications. The application uses OpenAI's GPT-4o API with File Search and Vision capabilities to process documents.

### Key Features
- **Multi-format Support**: Handles PDF files and images (PNG, JPG, JPEG)
- **AI-Powered Extraction**: Uses OpenAI GPT-4o for intelligent data extraction
- **Multi-language Support**: Processes documents in English, Hungarian, Polish, and more
- **Structured Output**: Returns data in JSON format with allergens and nutritional values
- **Export Options**: Download results as JSON or CSV
- **Real-time Progress**: Visual feedback during processing

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **AI/ML**: OpenAI GPT-4o API (File Search + Vision)
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

---

## Architecture

### System Architecture

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ Upload PDF/Image
         │
┌────────▼────────┐
│   Frontend      │
│   (page.tsx)    │
│   - File Upload │
│   - UI Display  │
└────────┬────────┘
         │
         │ FormData POST
         │
┌────────▼────────────────┐
│   Backend API           │
│   (route.ts)            │
│   - File Processing     │
│   - OpenAI Integration  │
└────────┬────────────────┘
         │
         │ API Calls
         │
┌────────▼────────────────┐
│   OpenAI API            │
│   - File Search (PDF)   │
│   - Vision (Images)     │
│   - GPT-4o Processing   │
└────────┬────────────────┘
         │
         │ Extracted Data
         │
┌────────▼────────────────┐
│   Structured JSON       │
│   Response              │
└─────────────────────────┘
```

### Processing Flow

**For PDF Files:**
1. Client uploads PDF → Backend receives file
2. Backend converts PDF to File object
3. Upload to OpenAI Files API
4. Create Assistant with File Search capability
5. Create Thread with file attachment
6. Process document and extract structured data
7. Return JSON response to client
8. Cleanup: Delete uploaded file and assistant

**For Image Files:**
1. Client uploads image → Backend receives file
2. Convert image to base64
3. Send to OpenAI Vision API with extraction prompt
4. Parse and return JSON response

---

## Setup & Installation

### Prerequisites
- Node.js 18+ installed
- OpenAI API key with GPT-4o access
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd allergen-extractor
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.local` in the project root:
```
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Access the application**
```
http://localhost:3000
```

### Dependencies

**Core Dependencies:**
```json
{
  "next": "^15.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "openai": "^4.x",
  "typescript": "^5.x"
}
```

**Development Dependencies:**
```json
{
  "tailwindcss": "^3.x",
  "eslint": "^8.x",
  "@types/node": "^20.x",
  "@types/react": "^18.x"
}
```

---

## Project Structure

```
allergen-extractor/
├── app/
│   ├── api/
│   │   └── extract/
│   │       └── route.ts          # Backend API endpoint
│   ├── page.tsx                   # Frontend UI component
│   └── layout.tsx                 # Root layout
├── public/                        # Static assets
├── .env.local                     # Environment variables (not in repo)
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS config
├── tsconfig.json                  # TypeScript config
└── package.json                   # Project dependencies
```

---

## Frontend Documentation

### Component: `app/page.tsx`

#### Overview
The main client-side React component that handles file uploads, displays processing status, and renders extracted data.

#### State Management

```typescript
interface ExtractedData {
  product?: string;              // Product name
  allergens: string[];           // List of present allergens
  nutritionalValues: {           // Nutrition data
    [key: string]: string;
  };
  rawData?: any;                 // Optional raw response
}

const [file, setFile] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<ExtractedData | null>(null);
const [error, setError] = useState<string>('');
const [progress, setProgress] = useState<string>('');
```

#### Key Functions

##### `handleFileChange(e: React.ChangeEvent<HTMLInputElement>)`
Handles file input changes and updates state.

**Parameters:**
- `e`: Change event from file input

**Behavior:**
- Sets selected file in state
- Resets result, error, and progress states
- Accepts: `.pdf`, `.png`, `.jpg`, `.jpeg`

##### `handleSubmit(e: React.FormEvent)`
Processes form submission and sends file to backend API.

**Flow:**
1. Prevents default form submission
2. Creates FormData with file
3. Sets loading and progress states
4. POSTs to `/api/extract` endpoint
5. Handles response or error
6. Updates UI with results

**Error Handling:**
- Catches fetch errors
- Displays user-friendly error messages
- Logs errors to console

##### `downloadJSON()`
Generates and downloads extracted data as JSON file.

**Implementation:**
```typescript
const dataStr = JSON.stringify(result, null, 2);
const dataBlob = new Blob([dataStr], { type: 'application/json' });
const url = URL.createObjectURL(dataBlob);
const link = document.createElement('a');
link.href = url;
link.download = `${file?.name.replace('.pdf', '')}-extracted.json`;
link.click();
URL.revokeObjectURL(url);
```

##### `downloadCSV()`
Generates and downloads extracted data as CSV file.

**CSV Format:**
```
Category,Item,Value
Product,Name,"Product Name"
Allergen,Milk,Present
Allergen,Gluten,Not Present
Nutrition,Energy,"223 kJ (53 kcal)"
```

#### UI Components

**File Upload Section:**
- Drag-and-drop zone
- File type restrictions
- File size limit: 10MB
- Visual feedback for selected file

**Processing States:**
- Upload progress indicator
- Processing spinner
- Status messages

**Results Display:**
- Product information card
- Allergens (present and absent)
- Nutritional values table
- JSON preview
- Download buttons (JSON/CSV)

#### Styling
Uses Tailwind CSS with:
- Gradient backgrounds
- Responsive grid layouts
- Hover effects
- Color-coded allergen status (red=present, gray=absent, green=none)

---

## Backend API Documentation

### Endpoint: `POST /api/extract`

#### Overview
Server-side API route that processes uploaded files and extracts allergen and nutritional data using OpenAI APIs.

#### Request

**Method:** `POST`

**Content-Type:** `multipart/form-data`

**Body:**
```typescript
FormData {
  file: File  // PDF or image file
}
```

**Accepted File Types:**
- `application/pdf`
- `image/png`
- `image/jpeg`
- `image/jpg`

**Maximum File Size:** 10MB (configurable in `next.config.ts`)

#### Response

**Success Response (200):**
```json
{
  "product": "Product Name",
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
```

**Error Responses:**

`400 Bad Request` - No file provided
```json
{
  "error": "No file provided"
}
```

`500 Internal Server Error` - Processing failure
```json
{
  "error": "Failed to process file",
  "details": "Error stack trace"
}
```

#### Processing Logic

##### PDF Processing: `processPDFWithOpenAI()`

**Step-by-step:**

1. **Convert Buffer to File Object**
```typescript
const blob = new Blob([buffer], { type: 'application/pdf' });
const fileToUpload = new File([blob], fileName, { type: 'application/pdf' });
```

2. **Upload to OpenAI Files API**
```typescript
const uploadedFile = await openai.files.create({
  file: fileToUpload,
  purpose: 'assistants',
});
```

3. **Create Assistant with File Search**
```typescript
const assistant = await openai.beta.assistants.create({
  model: 'gpt-4o',
  instructions: 'You are an expert food safety analyst...',
  tools: [{ type: 'file_search' }],
});
```

4. **Create Thread with Attached File**
```typescript
const thread = await openai.beta.threads.create({
  messages: [{
    role: 'user',
    content: extractionPrompt,
    attachments: [{
      file_id: uploadedFile.id,
      tools: [{ type: 'file_search' }],
    }],
  }],
});
```

5. **Run Assistant and Poll for Completion**
```typescript
const run = await openai.beta.threads.runs.createAndPoll(
  thread.id,
  { assistant_id: assistant.id }
);
```

6. **Extract Response**
```typescript
const messages = await openai.beta.threads.messages.list(thread.id);
const content = messages.data[0].content[0].text.value;
const parsed = JSON.parse(jsonMatch[0]);
```

7. **Cleanup Resources**
```typescript
await openai.files.delete(uploadedFile.id);
await openai.beta.assistants.delete(assistant.id);
```

##### Image Processing: `processImageWithVision()`

**Step-by-step:**

1. **Convert to Base64**
```typescript
const base64Image = buffer.toString('base64');
```

2. **Send to Vision API**
```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: extractionPrompt },
      {
        type: 'image_url',
        image_url: {
          url: `data:${mimeType};base64,${base64Image}`
        }
      }
    ]
  }],
  max_tokens: 2000,
  temperature: 0.1,
});
```

3. **Parse JSON Response**
```typescript
const jsonMatch = content.match(/\{[\s\S]*\}/);
const parsed = JSON.parse(jsonMatch[0]);
```

#### Constants

##### Allergens List
```typescript
const ALLERGENS = [
  'Gluten', 'Egg', 'Crustaceans', 'Fish', 'Peanut',
  'Soy', 'Milk', 'Tree nuts', 'Celery', 'Mustard',
];
```

##### Nutritional Values
```typescript
const NUTRITIONAL_VALUES = [
  'Energy', 'Fat', 'Carbohydrate', 'Sugar', 'Protein', 'Sodium',
];
```

#### Extraction Prompt Strategy

The prompt instructs the AI to:

1. **Allergen Detection:**
   - Only list allergens that are PRESENT
   - Recognize multi-language terms (Tej=Milk, Glutén=Gluten, etc.)
   - Handle "no allergens" statements correctly
   - Look for checkmarks, "contains", "tartalmaz" indicators

2. **Nutritional Values:**
   - Extract per 100g values with units
   - Handle multiple languages
   - Convert salt to sodium (sodium = salt ÷ 2.5)
   - Use "Not specified" for missing values

3. **Format:**
   - Return ONLY valid JSON
   - No markdown formatting
   - Consistent structure

---

## Data Models

### ExtractedData Interface

```typescript
interface ExtractedData {
  product?: string;              // Optional product name
  allergens: string[];           // Array of present allergens
  nutritionalValues: {           // Key-value pairs
    [key: string]: string;       // Nutrient: "value unit"
  };
  rawData?: any;                 // Optional raw response data
}
```

### Example Data

```json
{
  "product": "Nádudvari natúr joghurt 3,0% 900g",
  "allergens": ["Milk"],
  "nutritionalValues": {
    "Energy": "223 kJ (53 kcal)",
    "Fat": "3.0 g",
    "Carbohydrate": "2.8 g",
    "Sugar": "2.4 g",
    "Protein": "3.2 g",
    "Sodium": "0.04 g"
  }
}
```

---

## Configuration

### Environment Variables

**Required:**
```env
OPENAI_API_KEY=sk-proj-your_api_key_here
```

### Next.js Configuration (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',  // Max file upload size
    },
  },
};

export default nextConfig;
```

### Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};
export default config;
```

---

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup

Ensure production environment has:
1. `OPENAI_API_KEY` set in environment variables
2. Node.js 18+ runtime
3. Sufficient memory for file processing

### Deployment Platforms

**Vercel (Recommended):**
```bash
vercel deploy
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Performance Considerations

- **File Size Limits:** Adjust based on expected document sizes
- **API Timeouts:** OpenAI processing can take 10-30 seconds for PDFs
- **Rate Limits:** Monitor OpenAI API usage and quotas
- **Concurrent Requests:** Consider queuing for high traffic

---

## Troubleshooting

### Common Issues

**Issue: "No response from OpenAI"**
- **Cause:** API timeout or invalid API key
- **Solution:** Check API key validity, verify network connectivity

**Issue: "Failed to parse AI response"**
- **Cause:** OpenAI returned non-JSON content
- **Solution:** Review prompt structure, check model output

**Issue: "File upload failed"**
- **Cause:** File size exceeds limit
- **Solution:** Increase `bodySizeLimit` in `next.config.ts`

**Issue: Empty allergens or nutritional values**
- **Cause:** Document format not recognized by AI
- **Solution:** Verify document quality, check language support

### Debug Mode

Enable detailed logging:

```typescript
// In route.ts
console.log('Processing file:', file.name);
console.log('File type:', file.type);
console.log('File size:', file.size);
console.log('OpenAI response:', content);
```

### Testing

**Manual Testing:**
1. Upload sample PDFs (provided examples)
2. Verify extracted allergens match document
3. Verify nutritional values are accurate
4. Test download functionality (JSON/CSV)

**API Testing:**
```bash
curl -X POST http://localhost:3000/api/extract \
  -F "file=@sample.pdf"
```

---

## API Rate Limits & Costs

### OpenAI API Usage

- **File Uploads:** Counted towards Files API quota
- **Assistant Runs:** Counted towards Assistants API quota
- **Vision API:** Per-image pricing

### Cost Optimization

1. Delete files immediately after processing
2. Delete assistants after use
3. Use appropriate `max_tokens` limits
4. Cache frequent requests if possible

---

## Future Enhancements

### Potential Features
- Batch processing for multiple files
- OCR support for scanned PDFs (Tesseract.js)
- User authentication and history
- Database storage of extracted data
- API key management UI
- Multi-language UI support
- Advanced filtering and search
- Export to Excel format

---

## Support & Contributing

### Reporting Issues
- Check existing issues first
- Provide sample files (if shareable)
- Include error logs and screenshots

### Code Style
- Follow TypeScript best practices
- Use ESLint for code quality
- Format with Prettier
- Write descriptive commit messages

---




