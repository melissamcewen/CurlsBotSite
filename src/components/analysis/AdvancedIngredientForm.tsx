'use client';

import { useState } from 'react';
import { Analyzer, AnalysisResult } from 'haircare-ingredients-analyzer';
import AnalysisResults from './AnalysisResults';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import ChatBubbleUser from './ChatBubbleUser';
import Link from 'next/link';
import { PhotoIcon } from '@heroicons/react/24/solid';

interface Props {
  onImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string>;
  isProcessing: boolean;
}

export default function AdvancedIngredientForm({
  onImageUpload,
  isProcessing,
}: Props) {
  const [ingredients, setIngredients] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleImageUploadAndProcess = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const text = await onImageUpload(event);
    if (text) {
      setIngredients(text);
    }
  };

  const handleAnalysis = (ingredientList: string) => {
    if (!ingredientList.trim()) return;

    setError(null);

    try {
      const analyzer = new Analyzer();
      const result = analyzer.analyze(ingredientList.trim());
      setAnalysis(result);
      setShowForm(false);
    } catch {
      setError('Failed to analyze ingredients');
    }
  };

  const handleTryAnother = () => {
    setShowForm(true);
    setAnalysis(null);
    setIngredients('');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    handleAnalysis(ingredients);
  };

  return (
    <div className="space-y-6">
      {showForm && (
        <>
          <ChatBubbleRobot imageUrl="/sunglass.svg">
            <ChatBubble status="ok">
              Hi! This is the advanced version of CurlsBot with experimental
              features. You can upload a photo of your product&apos;s ingredients
              list, or paste the text manually below.
            </ChatBubble>

            <ChatFooter>
              <Link href="/">Go to standard version</Link>
            </ChatFooter>
          </ChatBubbleRobot>

          <ChatBubbleUser>
            {' '}
            <span className="label-text font-semibold m-5">
              For best results, please crop the image to only include the
              ingredients list.
            </span>
            <label className="btn btn-primary gap-2 mb-5">
              <PhotoIcon className="w-5 h-5" />
              {isProcessing ? 'Processing...' : 'Upload Image'}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUploadAndProcess}
                disabled={isProcessing}
              />
            </label>
            {isProcessing && (
              <div className="loading loading-spinner loading-md text-primary"></div>
            )}
          </ChatBubbleUser>
          <ChatBubbleUser>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="form-control w-full">
                <label htmlFor="ingredients-input" className="label">
                  <span className="label-text font-semibold">
                    Edit anything that doesn&apos;t look like an
                    ingredient&apos;s list
                  </span>
                </label>

                <textarea
                  id="ingredients-input"
                  className="textarea textarea-bordered bg-base-100 text-base-content h-48 w-full"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Enter ingredients, ideally from a brand's website or a retailer such as Ulta Beauty"
                  aria-label="ingredients"
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-full mt-4"
                disabled={!ingredients.trim()}
              >
                Analyze Ingredients
              </button>
            </form>
          </ChatBubbleUser>
        </>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {analysis && (
        <AnalysisResults result={analysis} onTryAnother={handleTryAnother} />
      )}
    </div>
  );
}
