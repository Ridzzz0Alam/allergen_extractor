'use client';

import { useState } from 'react';

interface ExtractedData {
  product?: string;
  allergens: string[];
  nutritionalValues: {
    [key: string]: string;
  };
  rawData?: any;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<string>('');

  const allAllergens = [
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError('');
      setProgress('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setProgress('Uploading file...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setProgress('Processing document...');
      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to extract data');
      }

      const data = await response.json();
      setResult(data);
      setProgress('Extraction complete!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing file. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!result) return;
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace('.pdf', '')}-extracted.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    if (!result) return;
    let csv = 'Category,Item,Value\n';
    
    // Add product info
    if (result.product) {
      csv += `Product,Name,"${result.product}"\n`;
    }
    
    // Add allergens - present ones
    if (result.allergens.length > 0) {
      result.allergens.forEach(allergen => {
        csv += `Allergen,${allergen},Present\n`;
      });
    }
    
    // Add allergens - absent ones
    const absentAllergens = allAllergens.filter(a => !result.allergens.includes(a));
    absentAllergens.forEach(allergen => {
      csv += `Allergen,${allergen},Not Present\n`;
    });
    
    // Add nutritional values
    Object.entries(result.nutritionalValues).forEach(([key, value]) => {
      csv += `Nutrition,${key},"${value}"\n`;
    });

    const dataBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace('.pdf', '')}-extracted.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🔍 Allergen & Nutrition Extractor
          </h1>
          <p className="text-gray-600 text-lg">
            Upload PDF documents to automatically extract allergens and nutritional information
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <label className="cursor-pointer">
                <span className="text-indigo-600 font-semibold hover:text-indigo-700">
                  Choose a file
                </span>
                <span className="text-gray-500"> or drag and drop</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                PDF, PNG, JPG up to 10MB
              </p>
              {file && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{file.name}</span>
                </div>
              )}
            </div>

            {progress && !error && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <p className="text-blue-700 font-medium">{progress}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl
                font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400
                disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                '🚀 Extract Data'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={downloadJSON}
                className="flex items-center gap-2 bg-green-600 text-white py-2 px-6 rounded-lg
                  hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download JSON
              </button>
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg
                  hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CSV
              </button>
            </div>

            {/* Product Info */}
            {result.product && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📦 Product</h3>
                <p className="text-lg text-gray-700">{result.product}</p>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Allergens */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⚠️</span> Allergens
                </h3>
                <div className="space-y-3">
                  {result.allergens.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-600 font-medium mb-3">Present:</p>
                      {result.allergens.map((allergen, index) => (
                        <div
                          key={index}
                          className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-center gap-3"
                        >
                          <span className="text-2xl">✓</span>
                          <span className="text-red-800 font-semibold text-lg">{allergen}</span>
                        </div>
                      ))}
                      <p className="text-sm text-gray-600 font-medium mt-6 mb-3">Not Present:</p>
                      {allAllergens
                        .filter(a => !result.allergens.includes(a))
                        .map((allergen, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 border-l-4 border-gray-300 rounded-lg p-3 flex items-center gap-3"
                          >
                            <span className="text-gray-400 text-xl">✗</span>
                            <span className="text-gray-500">{allergen}</span>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-2">✓</div>
                      <p className="text-green-700 font-semibold text-lg">No allergens detected</p>
                      <p className="text-green-600 text-sm mt-1">Safe for all allergen sensitivities</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Nutritional Values */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📊</span> Nutritional Values
                </h3>
                <div className="space-y-3">
                  {Object.entries(result.nutritionalValues).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 text-lg">{key}</span>
                        <span className="text-green-700 font-bold text-lg">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* JSON Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💻</span> JSON Preview
              </h3>
              <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
