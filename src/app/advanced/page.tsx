'use client';

import { useState } from 'react';
import { createWorker, type Worker } from 'tesseract.js';
import AdvancedIngredientForm from '@/components/analysis/AdvancedIngredientForm';

export default function AdvancedPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return '';

    setIsProcessing(true);
    let worker: Worker | null = null;
    try {
      worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
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
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Advanced Ingredient Analysis</h1>
        <p className="text-base-content/70">
          Try our experimental features! Upload an image of your product&apos;s ingredients list or paste the text manually.
        </p>
      </div>

      <AdvancedIngredientForm
        onImageUpload={handleImageUpload}
        isProcessing={isProcessing}
      />
    </div>
  );
}
