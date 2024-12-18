'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { getBundledSystems } from 'haircare-ingredients-analyzer';
import SystemSelector from './SystemSelector';
import AnalysisResults from './AnalysisResults';

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState('');
  const [systemId, setSystemId] = useState('curly_default');
  const [customSettings, setCustomSettings] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAnalysis = useCallback((ingredientList: string, system: string, settings?: string[]) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Create analyzer with default configuration
      const analyzer = new Analyzer();

      // Handle system selection
      if (system === 'custom') {
        if (!settings?.length) {
          throw new Error('Custom system requires settings');
        }

        // Create a custom system with the selected settings
        const customSystem = {
          id: 'custom',
          name: 'Custom System',
          description: 'User-defined system',
          settings: settings
        };

        analyzer.setSystem(customSystem);
      } else if (system !== 'curly_default') {
        const systems = getBundledSystems();
        const selectedSystem = systems.find(s => s.id === system);
        if (!selectedSystem) {
          throw new Error('Invalid system selected');
        }
        analyzer.setSystem(selectedSystem);
      }

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    // Get ingredients and system from URL parameters
    const urlIngredients = searchParams.get('ingredients');
    const urlSystem = searchParams.get('system');

    // Only update if the values are different from current state
    if (urlIngredients && urlIngredients !== ingredients) {
      setIngredients(urlIngredients);
      if (urlSystem && urlSystem !== systemId) {
        setSystemId(urlSystem);
      }
      handleAnalysis(urlIngredients, urlSystem || systemId);
    } else if (urlSystem && urlSystem !== systemId) {
      setSystemId(urlSystem);
    }
  }, [searchParams, systemId, ingredients, handleAnalysis]);

  const handleSystemChange = (newSystemId: string, settings?: string[]) => {
    setSystemId(newSystemId);
    if (settings) {
      setCustomSettings(settings);
      // For custom system with settings, run analysis immediately
      if (ingredients.trim() && newSystemId === 'custom') {
        // Update URL without scrolling
        const params = new URLSearchParams();
        params.set('ingredients', ingredients.trim());
        params.set('system', newSystemId);
        router.replace(`/?${params.toString()}`, { scroll: false });

        // Rerun analysis with custom settings
        handleAnalysis(ingredients, newSystemId, settings);
      }
    } else if (ingredients.trim() && newSystemId !== 'custom') {
      // For non-custom systems, run analysis immediately
      const params = new URLSearchParams();
      params.set('ingredients', ingredients.trim());
      params.set('system', newSystemId);
      router.replace(`/?${params.toString()}`, { scroll: false });

      // Rerun analysis
      handleAnalysis(ingredients, newSystemId);
    }
  };

  const handleCustomSettingsChange = (settings: string[]) => {
    setCustomSettings(settings);

    // Rerun analysis if we have ingredients
    if (ingredients.trim()) {
      // Update URL without scrolling
      const params = new URLSearchParams();
      params.set('ingredients', ingredients.trim());
      params.set('system', 'custom');
      router.replace(`/?${params.toString()}`, { scroll: false });

      // Rerun analysis with new settings
      handleAnalysis(ingredients, 'custom', settings);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    // Update URL without scrolling
    const params = new URLSearchParams();
    params.set('ingredients', ingredients.trim());
    params.set('system', systemId);
    router.replace(`/?${params.toString()}`, { scroll: false });

    // Run analysis
    handleAnalysis(ingredients, systemId, systemId === 'custom' ? customSettings : undefined);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">
              Paste your ingredients list
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered bg-base-200 text-base-content h-32"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients, one per line..."
          />
        </div>

        <SystemSelector value={systemId} onChange={handleSystemChange} />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isAnalyzing || !ingredients.trim()}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {analysisResult && <AnalysisResults result={analysisResult} />}
    </div>
  );
}
