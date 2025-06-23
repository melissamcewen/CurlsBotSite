'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Analyzer, AnalysisResult } from 'haircare-ingredients-analyzer';
import AnalysisResults from './AnalysisResults';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import ChatBubbleUser from './ChatBubbleUser';
import Link from 'next/link';
interface Props {
  initialIngredients?: string;
  initialAnalysis?: AnalysisResult | null;
}

export default function IngredientForm({
  initialIngredients = '',
  initialAnalysis = null,
}: Props) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    initialAnalysis,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(!initialAnalysis);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLoadDone = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalysis = useCallback((ingredientList: string) => {
    if (!ingredientList.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analyzer = new Analyzer();
      const result = analyzer.analyze(ingredientList.trim());
      setAnalysisResult(result);
      setShowForm(false);
      // Scroll to top smoothly when showing results
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    router.replace('/analyzer', { scroll: false });
  };

  // Only handle URL ingredients if there's no initial analysis
  useEffect(() => {
    if (!initialLoadDone.current && !initialAnalysis) {
      const urlIngredients = searchParams?.get('ingredients') ?? null;
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
    <div className="space-y-6 max-w-4xl mx-auto p-1">
      <div className="relative">
        <div
          className={`${
            !showForm && analysisResult ? 'absolute top-0 left-0 right-0' : ''
          }`}
        >
          <ChatBubbleRobot
            imageUrl="/normal.svg"
            status="ok"
            className={
              !showForm && analysisResult ? 'animate-slide-up-exit' : ''
            }
          >
            <ChatBubble status="ok">
              Hi! I&apos;m CurlsBot, your curly and wavy hair product analyzer.
              I&apos;ll check if a product is compatible with the{' '}
              <Link href="/curly-girl-method" className="link">
                Curly Girl Method
              </Link>
              , estimate humidity resistance, detect if it&apos;s likely
              lightweight, and more. Just paste an ingredients list below, and
              I&apos;ll take care of the rest!
            </ChatBubble>

            <ChatFooter>
              <Link href="/about">Learn more</Link>
            </ChatFooter>
          </ChatBubbleRobot>

          <div
            className={`max-w-2xl ml-auto transition-all duration-500 ease-out ${
              showForm
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 pointer-events-none absolute'
            }`}
          >
            <ChatBubbleUser>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="form-control w-full">
                  <label htmlFor="ingredients-input" className="label">
                    <span className="label-text font-semibold">
                      Enter ingredients, ideally copy and paste from a
                      brand&apos;s website or a retailer such as Ulta Beauty or{' '}
                      <Link href="labs/photo" className="link">
                        click here to upload a picture of the ingredients list.
                      </Link>
                    </span>
                  </label>

                  <textarea
                    id="ingredients-input"
                    className="textarea textarea-bordered bg-base-100 text-base-content h-48 w-full text-base"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Enter ingredients, ideally copy and paste from a brand's website or a retailer such as Ulta Beauty"
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
          </div>
        </div>

        {!showForm && analysisResult && (
          <div className="animate-slide-in-enter">
            <AnalysisResults
              result={analysisResult}
              onTryAnother={handleTryAnother}
            />
          </div>
        )}

        {error && (
          <div
            className="alert alert-error animate-slide-in-enter"
            data-testid="error-message"
          >
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
