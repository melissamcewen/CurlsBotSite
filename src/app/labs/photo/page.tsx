'use client';

import { useState } from 'react';
import { createWorker, type Worker } from 'tesseract.js';
import AdvancedIngredientForm from '@/components/analysis/AdvancedIngredientForm';
import { Camera } from 'lucide-react';

export default function PhotoAnalysis() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return '';

    setIsProcessing(true);
    let worker: Worker | null = null;
    try {
      worker = await createWorker('eng');
      const {
        data: { text },
      } = await worker.recognize(file);
      return text;
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Error processing image. Please try again or enter text manually.');
      return '';
    } finally {
      if (worker) await worker.terminate();
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Camera className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold">Photo Ingredient Analysis</h1>
      </div>

      <div className="mb-8">
        <p className="text-lg mb-4">
          Upload a photo of your product&apos;s ingredients list, and we&apos;ll
          analyze it for you. Our 𝙰𝚍𝚟𝚊𝚗𝚌𝚎𝚍 CurlsBot will try to read the text
          and analyze the ingredients automatically.
        </p>
        <div className="alert alert-info">
          <p>
            Tip: Make sure the ingredients text is clear and well-lit in your
            photo for the best results. You can always edit the text if CurlsBot
            doesn&apos;t get it quite right.
          </p>
        </div>
      </div>

      <AdvancedIngredientForm
        onImageUpload={handleImageUpload}
        isProcessing={isProcessing}
      />
    </div>
  );
}
