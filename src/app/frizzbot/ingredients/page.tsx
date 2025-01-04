'use client';

import { useState } from 'react';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import type { FrizzbotAnalysis } from 'haircare-ingredients-analyzer';
import { Analyzer, frizzbot } from 'haircare-ingredients-analyzer';
import Image from 'next/image';
import Avatar from '@/components/avatar';
import Link from 'next/link';
import { BeakerIcon } from '@heroicons/react/24/outline';

export default function FrizzbotIngredients() {
  const [error, setError] = useState<string | null>(null);
  const [ingredientInput, setIngredientInput] = useState('');
  const [frizzbotAnalysis, setFrizzbotAnalysis] =
    useState<FrizzbotAnalysis | null>(null);

  const handleIngredientAnalysis = async () => {
    try {
      setError(null);
      const analyzer = new Analyzer();
      const analysisResult = analyzer.analyze(ingredientInput);

      // Call your frizzbot function
      const frizzAnalysis = frizzbot(analysisResult);

      // If no ingredients were matched, set score to -100 (low frizz)
      if (
        frizzAnalysis.simple_humectants_number === 0 &&
        frizzAnalysis.film_forming_humectants_number === 0 &&
        frizzAnalysis.emollients_number === 0
      ) {
        frizzAnalysis.score = -100;
      }

      setFrizzbotAnalysis(frizzAnalysis);
    } catch (err) {
      setError('Failed to analyze ingredients');
    }
  };

  const getFrizzScaleColor = (score: number) => {
    // Normalize score from -100 to 100 to 0 to 100
    const normalizedScore = (score + 100) / 2;
    if (normalizedScore < 33) return 'bg-warning';
    if (normalizedScore < 66) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Avatar imageUrl="/frizz.svg" altText="FrizzBot Logo" />
        <h1 className="text-4xl font-bold">FrizzBot Ingredients Analyzer</h1>
      </div>

      <div role="alert" className="alert mb-6">
        <BeakerIcon className="h-6 w-6" />
        <span>
          This is an experimental{' '}
          <Link href="/labs" className="link">
            Labs feature
          </Link>
          . Please{' '}
          <Link href="/contact" className="link">
            contact us
          </Link>{' '}
          if you have any feedback!
        </span>
      </div>

      <p className="mb-6">
        Analyze your hair products to understand their potential for causing or
        preventing frizz on{' '}
        <Link href="/frizzbot" className="link">
          frizzy forecast days
        </Link>{' '}
        based on their ingredients. Please note this is an experimental feature
        and may have some bugs. The way it works is it looks at how many film
        forming humectants and simple humectants are in the product, and how
        many emollients (which can balance out the frizzy effects of simple
        humectants in dry weather) are in the product. It then calculates a
        score based on the ingredients. Please{' '}
        <Link href="/contact" className="link">
          contact us
        </Link>{' '}
        if you have any feedback. See our{' '}
        <Link href="/groups/humectants" className="link">
          humectants guide
        </Link>{' '}
        for more information on film forming vs. simple humectants.
      </p>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Enter Product Ingredients</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Paste your product ingredients here..."
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        ></textarea>
        <button
          onClick={handleIngredientAnalysis}
          className="btn btn-primary mt-4"
          disabled={!ingredientInput.trim()}
        >
          Analyze Ingredients
        </button>
      </div>

      {error && (
        <div className="alert alert-error mt-4">
          <p>{error}</p>
        </div>
      )}

      {frizzbotAnalysis && (
        <div className="mt-6 space-y-6">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Simple Humectants</div>
              <div className="stat-value text-warning">
                {frizzbotAnalysis.simple_humectants_number}
              </div>
              <div className="stat-desc">May increase frizz</div>
            </div>

            <div className="stat">
              <div className="stat-title">Film Forming Humectants</div>
              <div className="stat-value text-info">
                {frizzbotAnalysis.film_forming_humectants_number}
              </div>
              <div className="stat-desc">Help reduce frizz</div>
            </div>

            <div className="stat">
              <div className="stat-title">Emollients</div>
              <div className="stat-value text-success">
                {frizzbotAnalysis.emollients_number}
              </div>
              <div className="stat-desc">Balances frizzy ingredients</div>
            </div>
          </div>

          <div className="card bg-base-200 p-6">
            <h3 className="text-lg font-bold mb-4">Frizz Potential Score</h3>
            <div className="flex items-center gap-4">
              <Avatar
                imageUrl="/frizz.svg"
                altText="High Frizz"
                borderClass="border-warning"
              />
              <div className="flex-1">
                <div className="flex gap-1">
                  <div className="w-1/2 bg-base-300 rounded-l-full h-4">
                    <div
                      className="h-4 rounded-l-full bg-warning"
                      style={{
                        width: `${
                          frizzbotAnalysis.score > 0
                            ? frizzbotAnalysis.score
                            : 0
                        }%`,
                        transition: 'width 0.5s ease-in-out',
                      }}
                    ></div>
                  </div>
                  <div className="w-1/2 bg-base-300 rounded-r-full h-4">
                    <div
                      className="h-4 rounded-r-full bg-success ml-auto"
                      style={{
                        width: `${
                          frizzbotAnalysis.score < 0
                            ? Math.abs(frizzbotAnalysis.score)
                            : 0
                        }%`,
                        transition: 'width 0.5s ease-in-out',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>High Frizz (100)</span>
                  <span className="text-center">0</span>
                  <span>Low Frizz (-100)</span>
                </div>
              </div>
              <Avatar
                imageUrl="/normal.svg"
                altText="Low Frizz"
                borderClass="border-success"
              />
            </div>
          </div>

          {frizzbotAnalysis.simple_humectants.length > 0 && (
            <div className="card bg-base-200 p-6">
              <h3 className="font-bold mb-2">Simple Humectants Found:</h3>
              <p className="text-sm">
                {frizzbotAnalysis.simple_humectants.join(', ')}
              </p>
            </div>
          )}

          {frizzbotAnalysis.film_forming_humectants.length > 0 && (
            <div className="card bg-base-200 p-6">
              <h3 className="font-bold mb-2">Film Forming Humectants Found:</h3>
              <p className="text-sm">
                {frizzbotAnalysis.film_forming_humectants.join(', ')}
              </p>
            </div>
          )}

          {frizzbotAnalysis.emollients.length > 0 && (
            <div className="card bg-base-200 p-6">
              <h3 className="font-bold mb-2">Emollients Found:</h3>
              <p className="text-sm">
                {frizzbotAnalysis.emollients.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
