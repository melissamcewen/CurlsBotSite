'use client';

import { useState } from 'react';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { proteinAnalysis, type ProteinAnalysis } from '@/lib/proteinAnalysis';
import { idToSlug } from '@/utils/slugs';
import Avatar from '@/components/avatar';
import Link from 'next/link';
import {
  FlaskConical,
  Info,
  BookOpen,
  Dna,
  ListOrdered,
} from 'lucide-react';

export default function ProteinLabPage() {
  const [ingredients, setIngredients] = useState('');
  const [analysis, setAnalysis] = useState<ProteinAnalysis | null>(null);

  const handleAnalyze = () => {
    if (!ingredients.trim()) return;

    try {
      const analyzer = new Analyzer();
      const result = analyzer.analyze(ingredients.trim());
      setAnalysis(proteinAnalysis(result));
    } catch (error) {
      console.error('Failed to analyze ingredients:', error);
    }
  };

  const proteinMatches =
    analysis?.matches.filter((m) => m.kind === 'protein') ?? [];
  const aminoMatches =
    analysis?.matches.filter((m) => m.kind === 'amino_acid') ?? [];

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
          <span className="text-primary">CurlsBot</span> Protein Checker
        </h1>
      </div>

      <div className="card bg-base-100 mb-8">
        <div className="card-body">
          <h2 className="card-title">What this checker does</h2>
          <p>
            Paste a product&apos;s ingredient list and we&apos;ll flag anything
            in our database classified as a{' '}
            <Link href="/categories/proteins" className="link">
              protein
            </Link>{' '}
            or{' '}
            <Link href="/categories/amino-acids" className="link">
              amino acid
            </Link>
            . This is informational only: knowing a product contains protein is
            not a reason to avoid it.
          </p>
          <p className="mt-4">
            There are thousands of different protein ingredients in hair
            products, with wildly different sizes, charges, and behaviors.
            Avoiding all of them because of &quot;protein overload&quot; is like
            swearing off all vegetables because you&apos;re allergic to one.
            Stiff, brittle hair after protein-heavy products is almost always
            buildup or under-conditioning. For the full science, read{' '}
            <Link
              href="/blog/mystery-of-protein-overload-a-scientific-investigation"
              className="link link-primary inline-flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              The Mystery of Protein Overload
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Try it out</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Enter ingredients (comma-separated)
            </legend>
            <textarea
              className="textarea w-full h-32"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Example: Water, Glycerin, Hydrolyzed Wheat Protein, Panthenol"
            />
          </fieldset>
          <button
            className="btn btn-primary mt-4"
            onClick={handleAnalyze}
            disabled={!ingredients.trim()}
          >
            Check for protein ingredients
          </button>

          {analysis && (
            <div className="mt-8 space-y-4 not-prose">
              <h3 className="text-xl font-semibold">Results</h3>
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="flex items-start gap-3">
                    <Info
                      className="w-6 h-6 text-info shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <div className="space-y-2">
                      <h4 className="card-title text-base-content text-lg">
                        {analysis.matches.length > 0
                          ? `We found ${analysis.matches.length} protein-related ingredient${analysis.matches.length === 1 ? '' : 's'} in this list`
                          : 'We didn’t find protein or amino acid ingredients in this list (based on our database)'}
                      </h4>
                      <p className="text-sm text-base-content/80">
                        {analysis.matches.length > 0
                          ? 'Ingredients are listed in label order when we could match them. Higher on the list usually means a higher concentration, but formulation still matters more than any single ingredient.'
                          : 'That may mean the product is protein-free, or that we couldn’t match an unusual name. Unmatched lines aren’t shown here.'}
                      </p>
                    </div>
                  </div>

                  {analysis.matches.length > 0 && (
                    <div className="mt-6 space-y-6">
                      {proteinMatches.length > 0 && (
                        <MatchSection
                          title="Proteins"
                          matches={proteinMatches}
                        />
                      )}
                      {aminoMatches.length > 0 && (
                        <MatchSection
                          title="Amino acids"
                          matches={aminoMatches}
                        />
                      )}
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

function MatchSection({
  title,
  matches,
}: {
  title: string;
  matches: ProteinAnalysis['matches'];
}) {
  return (
    <div>
      <h5 className="font-semibold mb-2 flex items-center gap-2">
        <ListOrdered className="w-4 h-4" aria-hidden />
        {title}
      </h5>
      <div className="space-y-2">
        {matches.map((match) => (
          <div key={`${match.id}-${match.position}`} className="card bg-base-200">
            <div className="card-body p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="badge badge-neutral badge-sm">
                  #{match.position}
                </span>
                <Link
                  href={`/ingredients/${idToSlug(match.id)}`}
                  className="link font-semibold"
                >
                  {match.name}
                </Link>
                {match.inputName.toLowerCase() !== match.name.toLowerCase() && (
                  <span className="text-sm text-base-content/70">
                    (as listed: {match.inputName})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
