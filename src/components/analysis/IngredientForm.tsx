'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Analyzer } from 'haircare-ingredients-analyzer';
import AnalysisResults from './AnalysisResults';
import ChatBubbleRobot from './ChatBubbleRobot';

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLoadDone = useRef(false);

  const handleAnalysis = useCallback((ingredientList: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Create analyzer with default configuration
      const analyzer = new Analyzer();

      // Analyze ingredients
      const result = analyzer.analyze(ingredientList.trim());

      // Convert the analysis result to our frontend format
      const formattedResult = {
        overallStatus: result.status === 'error' ? 'caution' : result.status,
        ingredients: result.ingredients.map(ingredient => ({
          name: ingredient.name,
          matched: !!ingredient.ingredient,
          status: ingredient.status,
          info: ingredient.ingredient?.description,
          reason: ingredient.reasons[0]?.reason,
          ingredient: ingredient.ingredient ? {
            id: ingredient.ingredient.id,
            name: ingredient.ingredient.name,
            description: ingredient.ingredient.description,
            categories: ingredient.ingredient.categories,
            synonyms: ingredient.ingredient.synonyms
          } : undefined
        }))
      };

      setAnalysisResult(formattedResult);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleTryAnother = () => {
    setShowForm(true);
    setAnalysisResult(null);
    setIngredients('');
    setError(null);
    router.replace('/', { scroll: false });
  };

  useEffect(() => {
    // Only load from URL params on initial load
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

    // Update URL without scrolling
    const params = new URLSearchParams();
    params.set('ingredients', ingredients.trim());
    router.replace(`/?${params.toString()}`, { scroll: false });

    // Run analysis
    handleAnalysis(ingredients);
  };

  return (
    <div className="space-y-6">
      {showForm && (
        <>
          <ChatBubbleRobot
            message="Enter your product ingredients to analyze them for various properties and potential concerns."
            imageUrl="/normal.svg"
          />
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary w-full">
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Paste your ingredients list
                      </span>
                    </label>

                    <textarea
                      className="textarea textarea-bordered bg-base-200 text-base-content h-32 w-full"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      placeholder="Enter ingredients, one per line..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-secondary w-full"
                    disabled={isAnalyzing || !ingredients.trim()}
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
        <div className="alert alert-error">
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
