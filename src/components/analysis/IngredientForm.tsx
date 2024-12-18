'use client';

import { useState } from 'react';
import { AnalysisResult } from '@/types/analysis';
import AnalysisResults from './AnalysisResults';
import SystemSelector from './SystemSelector';

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState('');
  const [systemId, setSystemId] = useState('curly_default');
  const [customSettings, setCustomSettings] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSystemChange = (newSystemId: string, settings?: string[]) => {
    setSystemId(newSystemId);
    if (settings) {
      setCustomSettings(settings);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients.trim(),
          systemId,
          customSettings: systemId === 'custom' ? customSettings : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <SystemSelector
          value={systemId}
          onChange={handleSystemChange}
        />

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Paste Your Ingredients</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-32 w-full"
            placeholder="Example: Water, Cetearyl Alcohol, Behentrimonium Methosulfate..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${isAnalyzing ? 'loading' : ''}`}
          disabled={!ingredients.trim() || isAnalyzing || (systemId === 'custom' && customSettings.length === 0)}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {results && <AnalysisResults result={results} />}
    </div>
  );
}
