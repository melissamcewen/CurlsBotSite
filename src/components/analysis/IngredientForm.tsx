'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Analyzer, AnalysisResult } from 'haircare-ingredients-analyzer';
import AnalysisResults from './AnalysisResults';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import ChatBubbleUser from './ChatBubbleUser';

interface Props {
  initialIngredients?: string;
  initialAnalysis?: AnalysisResult | null;
}

export default function IngredientForm({
  initialIngredients = '',
  initialAnalysis = null
}: Props) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(initialAnalysis);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(!initialAnalysis);
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

  // Only handle URL ingredients if there's no initial analysis
  useEffect(() => {
    if (!initialLoadDone.current && !initialAnalysis) {
      const urlIngredients = searchParams.get('ingredients');
      if (urlIngredients) {
        setIngredients(urlIngredients);
        handleAnalysis(urlIngredients);
      }
      initialLoadDone.current = true;
    }
  }, [searchParams, handleAnalysis, initialAnalysis]);

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
              Hi! I&apos;m CurlsBot, your helpful hair care ingredient analyzer.
              Just paste an ingredients list below and I&apos;ll analyze it for
              you.
            </ChatBubble>
          </ChatBubbleRobot>

          <div className="max-w-2xl ml-auto">
            <ChatBubbleUser
              message={
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="form-control w-full">
                    <label htmlFor="ingredients-input" className="label">
                      <span className="label-text font-semibold">
                        Paste your ingredients list
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
                    disabled={isAnalyzing || !ingredients.trim()}
                    data-testid="analyze-button"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
                  </button>
                </form>
              }
              secondary
            />
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
