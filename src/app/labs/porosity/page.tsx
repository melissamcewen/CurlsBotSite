'use client';

import { useState } from 'react';
import { porosity, Analyzer } from 'haircare-ingredients-analyzer';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import {
  Droplets,
  Droplet,
  CheckCircle,
  XCircle,
  FlaskConical,
} from 'lucide-react';
import Avatar from '@/components/avatar';
import Link from 'next/link';

export default function PorosityLabPage() {
  const [ingredients, setIngredients] = useState('');
  const [scores, setScores] = useState<{ high: number; low: number } | null>(
    null,
  );

  const handleAnalyze = () => {
    if (!ingredients.trim()) return;

    try {
      const analyzer = new Analyzer();
      const analysis = analyzer.analyze(ingredients.trim());
      const result = porosity(analysis);

      setScores(result);
    } catch (error) {
      console.error('Failed to analyze ingredients:', error);
    }
  };

  const getStatus = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score <= 60) return 'text-error';
    return 'text-info';
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div role="alert " className="alert bg-primary/20 text-info-content mb-6">
        <FlaskConical className="h-6 w-6" />
        <span>
          This is an experimental{' '}
          <Link href="/labs" className="link">
            Labs feature and these scores are not final
          </Link>
          . Please{' '}
          <Link href="/contact" className="link">
            contact us
          </Link>{' '}
          if you have any feedback!
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Avatar imageUrl="/normal.svg" altText="Curlsbot" />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">CurlsBot</span> Porosity Score Lab
        </h1>
      </div>

      <div className="card bg-base-100 mb-8">
        <div className="card-body">
          <h2 className="card-title">About Porosity Scoring</h2>
          <p>
            This tool analyzes product ingredients to determine how well they
            work for{' '}
            <Link href="/porosity-quiz" className="link">
              different hair porosity types
            </Link>
            . The scoring system ranges from -100 to 100:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <span className="text-success font-semibold">Score ≥ 80</span>:
              Great match for this porosity type
            </li>
            <li>
              <span className="text-info font-semibold">Score 60-80</span>:
              Moderate match
            </li>
            <li>
              <span className="text-error font-semibold">Score ≤ 60</span>: Not
              ideal for this porosity type
            </li>
          </ul>
          <p>
            These scores do not apply to products for occasional use like
            clarifying treatments and deep conditioners
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-2">
              <Droplets className="w-6 h-6" />
              <h2 className="card-title">High Porosity Scoring</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-sm mb-2">
                High porosity products should ideally have plenty of
                conditioning ingredients that help fill in the hair cuticle and
                protect the hair from drying out.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  <Link href="/groups/oils" className="link">
                    Positively charged conditioning agents that bond to damaged
                    hair
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  <Link href="/groups/oils" className="link">
                    Penetrating oils
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  <Link href="/groups/humectants" className="link">
                    Humectants (including proteins)
                  </Link>
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  <Link href="/groups/surfactants" className="link">
                    Mild Surfactants
                  </Link>
                </li>

                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  <Link href="/groups/alcohols" className="link">
                    {' '}
                    Other Emollients and conditioners like Emollient alcohols
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6" />
              <h2 className="card-title">Low Porosity Scoring</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-sm mb-2">
                Products that score well for low porosity hair are water-based
                and low in the following ingredients:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-error shrink-0" />
                  <Link href="/groups/oils" className="link">
                    Oils (heavier oils and butters lower the score more)
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-error shrink-0" />
                  <Link href="/groups/waxes" className="link">
                    Waxes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Try It Out</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Enter ingredients (comma-separated)
              </span>
            </label>
            <textarea
              className="textarea ed h-32"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Example: Water, Glycerin, Aloe Barbadensis Leaf Juice"
            />
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={handleAnalyze}
            disabled={!ingredients.trim()}
          >
            Analyze Ingredients
          </button>

          {scores && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Results</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card bg-base-100">
                  <div className="card-body">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-6 h-6" />
                      <h4 className="card-title">High Porosity Score</h4>
                    </div>
                    <p
                      className={`text-4xl font-bold ${getStatus(scores.high)}`}
                    >
                      {scores.high}
                    </p>
                  </div>
                </div>

                <div className="card bg-base-100">
                  <div className="card-body">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-6 h-6" />
                      <h4 className="card-title">Low Porosity Score</h4>
                    </div>
                    <p
                      className={`text-4xl font-bold ${getStatus(scores.low)}`}
                    >
                      {scores.low}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
