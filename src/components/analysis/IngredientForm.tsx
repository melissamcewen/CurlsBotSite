'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Analyzer, AnalysisResult } from 'haircare-ingredients-analyzer';
import AnalysisResults from './AnalysisResults';
import { ChatBubbleRobot, ChatBubble } from './ChatBubbleRobot';

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLoadDone = useRef(false);

  const handleAnalysis = useCallback((ingredientList: string) => {
    if (!ingredientList.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analyzer = new Analyzer();
      const result = analyzer.analyze(ingredientList.trim());
      setAnalysisResult(result);
      setShowForm(false);
    } catch {
      setError('Failed to analyze ingredients');
    }
    setIsAnalyzing(false);
  }, []);

  const handleTryAnother = () => {
    setShowForm(true);
    setAnalysisResult(null);
    setIngredients('');
    setError(null);
    router.replace('/', { scroll: false });
  };

  useEffect(() => {
    if (!initialLoadDone.current) {
      const urlIngredients = searchParams.get('ingredients');
      if (urlIngredients) {
        setIngredients(urlIngredients);
        handleAnalysis(urlIngredients);
      }
      initialLoadDone.current = true;
    }
  }, [searchParams, handleAnalysis]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    const params = new URLSearchParams();
    params.set('ingredients', ingredients.trim());
    router.replace(`/?${params.toString()}`, { scroll: false });
    handleAnalysis(ingredients);
  };

  return (
    <div className="space-y-6">
      {showForm && (
        <>
          <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
            <ChatBubble status="ok">
              Enter your product ingredients to analyze them for various properties and potential concerns.
            </ChatBubble>
          </ChatBubbleRobot>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary w-full">
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  <div className="form-control w-full">
                    <label htmlFor="ingredients-input" className="label">
                      <span className="label-text font-semibold">
                        Paste your ingredients list
                      </span>
                    </label>

                    <textarea
                      id="ingredients-input"
                      className="textarea textarea-bordered bg-base-200 text-base-content h-32 w-full"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="Enter ingredients, one per line..."
                      aria-label="ingredients"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-secondary w-full"
                    disabled={isAnalyzing || !ingredients.trim()}
                    data-testid="analyze-button"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="alert alert-error" data-testid="error-message">
          <span>{error}</span>
        </div>
      )}

      {analysisResult && (
        <AnalysisResults
          result={analysisResult}
          onTryAnother={handleTryAnother}
        />
      )}
    </div>
  );
}
