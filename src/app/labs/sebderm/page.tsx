'use client';

import { useState } from 'react';
import { sebderm, Analyzer } from 'haircare-ingredients-analyzer';
import {
  Shield,
  CheckCircle,
  XCircle,
  FlaskConical,
  AlertTriangle,
} from 'lucide-react';
import Avatar from '@/components/avatar';
import Link from 'next/link';

export default function SebdermLabPage() {
  const [ingredients, setIngredients] = useState('');
  const [analysis, setAnalysis] = useState<{
    hasTriggers: boolean;
    triggers: Array<{
      id: string;
      name: string;
      reason: string;
    }>;
  } | null>(null);

  const handleAnalyze = () => {
    if (!ingredients.trim()) return;

    try {
      const analyzer = new Analyzer();
      const result = analyzer.analyze(ingredients.trim());
      const sebdermResult = sebderm(result);

      setAnalysis(sebdermResult);
    } catch (error) {
      console.error('Failed to analyze ingredients:', error);
    }
  };

  const formatIngredientId = (id: string) => {
    return id.replace(/_/g, '-');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div role="alert" className="alert bg-primary/20 text-info-content mb-6">
        <FlaskConical className="h-6 w-6" />
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
      <div className="flex items-center gap-2 mb-4">
        <Avatar imageUrl="/normal.svg" altText="Curlsbot" />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">CurlsBot</span> Malassezia Checker for
          SebDerm
        </h1>
      </div>

      <div className="card bg-base-100 mb-8">
        <div className="card-body">
          <h2 className="card-title">About Sebderm Safety</h2>
          <p>
            This tool analyzes product ingredients to check for ingredients
            known to feed{' '}
            <Link
              href="/blog/can-curly-routines-products-cause-dandruff"
              className="link"
            >
              Malassezia yeast
            </Link>
            , which can cause or worsen seborrheic dermatitis (sebderm). It is
            more important to avoid these ingredients on products that may stay
            on the scalp. Rinse-off products like shampoos and conditioners are
            less important. If you&apos;re looking for products that are safe
            for sebderm, check out our{' '}
            <Link href="/best-products/sebderm-safe-products" className="link">
              best sebderm safe products
            </Link>
            .
          </p>
          <p className="mt-4">
            The analysis checks for ingredients that can feed Malassezia or
            promote its growth:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <Link href="/groups/oils" className="link">
                Oils and fatty acids
              </Link>
            </li>
            <li>
              <Link href="/groups/waxes" className="link">
                Waxes and esters
              </Link>
            </li>
            <li>
              <Link href="/groups/emollient-alcohols" className="link">
                Some emollient/fatty alcohols (like emulsifying wax, cetearyl
                alcohol)
              </Link>
            </li>
            <li>
              <Link href="/groups/humectants" className="link">
                Amino acids
              </Link>
            </li>
          </ul>
          <p className="mt-4">
            For more detailed information about sebderm and hair care, check out
            our{' '}
            <Link
              href="/blog/can-curly-routines-products-cause-dandruff"
              className="link"
            >
              comprehensive guide
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Try It Out</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Enter ingredients (comma-separated)
            </legend>
            <textarea
              className="textarea w-full h-32"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Example: Water, Glycerin, Aloe Barbadensis Leaf Juice"
            />
          </fieldset>
          <button
            className="btn btn-primary mt-4"
            onClick={handleAnalyze}
            disabled={!ingredients.trim()}
          >
            Analyze Ingredients
          </button>

          {analysis && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Results</h3>
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    {analysis.hasTriggers ? (
                      <>
                        <AlertTriangle className="w-6 h-6 text-error" />
                        <h4 className="card-title text-error">
                          Not Sebderm Safe
                        </h4>
                      </>
                    ) : (
                      <>
                        <Shield className="w-6 h-6 text-success" />
                        <h4 className="card-title text-success">
                          Sebderm Safe
                        </h4>
                      </>
                    )}
                  </div>

                  {analysis.hasTriggers && analysis.triggers.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-semibold mb-2">
                        Problematic Ingredients Found:
                      </h5>
                      <div className="space-y-2">
                        {analysis.triggers.map((trigger) => (
                          <div key={trigger.id} className="card bg-base-200">
                            <div className="card-body p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <Link
                                    href={`/ingredients/${formatIngredientId(
                                      trigger.id,
                                    )}`}
                                    className="link font-semibold"
                                  >
                                    {trigger.name}
                                  </Link>
                                  <p className="text-sm mt-1">
                                    {trigger.reason}
                                  </p>
                                </div>
                                <XCircle className="w-5 h-5 text-error shrink-0 ml-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!analysis.hasTriggers && (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      <span>No problematic ingredients found!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
