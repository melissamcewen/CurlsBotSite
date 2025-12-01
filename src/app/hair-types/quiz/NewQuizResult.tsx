'use client';

import Link from 'next/link';
import { getPatternType, HairPatternType } from './newTypes';
import { EmailSignup } from '@/components/EmailSignupVariants';
import { BookOpen, Droplets, Sparkles } from 'lucide-react';

interface Props {
  patternType: HairPatternType | 'straight';
}

export default function NewQuizResult({ patternType }: Props) {
  // Handle straight result
  if (patternType === 'straight') {
    return (
      <div className="w-full">
        <div className="max-w-4xl mx-auto p-3">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/hair-types/quiz-new" className="btn btn-ghost btn-sm">
              ← Retake Quiz
            </Link>
          </div>

          <article className="max-w-none">
            <h1 className="text-3xl font-bold mb-6">Straight Hair</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Description */}
              <div className="bg-base-100 cb-card-lite md:col-span-2">
                <h2 className="font-bold text-xl mb-4">Your Pattern</h2>
                <p className="mb-4">
                  Your hair dries perfectly straight naturally. While straight
                  hair isn&apos;t part of our pattern-based system, there are
                  still other factors that affect your hair care.
                </p>
                <p className="text-sm opacity-80">
                  <strong>Typical behaviors:</strong> No natural bends, waves,
                  or curls; dries completely straight without products or tools
                </p>
              </div>

              {/* Next Steps Section */}
              <div className="bg-base-100 cb-card-lite md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-xl">Next Steps</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/porosity-quiz"
                    className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
                  >
                    <div className="card-body">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">
                          Take the Porosity Quiz
                        </h3>
                      </div>
                      <p className="text-sm text-base-content/70">
                        Learn how well your hair absorbs and retains moisture
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/routine-builder"
                    className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
                  >
                    <div className="card-body">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Build Your Routine</h3>
                      </div>
                      <p className="text-sm text-base-content/70">
                        Create a personalized hair care routine with product
                        recommendations
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Get pattern type data
  const patternData = getPatternType(patternType);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto p-3">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/hair-types/quiz-new" className="btn btn-ghost btn-sm">
            ← Retake Quiz
          </Link>
        </div>

        <article className="max-w-none">
          <h1 className="text-3xl font-bold mb-6">{patternData.displayName}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero/Description Section */}
            <div className="bg-base-100 cb-card-lite md:col-span-2">
              <h2 className="font-bold text-xl mb-4">Your Pattern</h2>
              <p className="mb-4">{patternData.description}</p>
              <p className="text-sm opacity-80">
                <strong>Typical behaviors:</strong>{' '}
                {patternData.typicalBehaviors}
              </p>
            </div>

            {/* Quick Comparison Cards */}
            <div className="bg-base-100 cb-card-lite">
              <h3 className="font-semibold mb-2">Shrinkage</h3>
              <p className="text-sm">{patternData.shrinkage}</p>
            </div>

            <div className="bg-base-100 cb-card-lite">
              <h3 className="font-semibold mb-2">Walker System</h3>
              <p className="text-sm">{patternData.walkerMapping}</p>
              <p className="text-xs opacity-70 mt-2">
                Our pattern-based system maps to the classic Andre Walker types
                for reference
              </p>
            </div>

            <div className="bg-base-100 cb-card-lite">
              <h3 className="font-semibold mb-2">Common System</h3>
              <p className="text-sm">{patternData.commonMapping}</p>
              <p className="text-xs opacity-70 mt-2">
                The system you might see on social media based on visual charts
              </p>
            </div>

            {/* What This Means Section */}
            <div className="bg-base-100 cb-card-lite md:col-span-2">
              <h2 className="font-bold text-xl mb-4">What This Means</h2>
              <div className="space-y-3 text-sm">
                <p>
                  Your hair naturally forms a{' '}
                  {patternData.displayName.toLowerCase()} pattern. This means
                  your hair {patternData.typicalBehaviors.toLowerCase()}.
                  Understanding this pattern helps you choose products and
                  techniques that work with your hair&apos;s natural behavior.
                </p>
                <p>
                  Shrinkage of {patternData.shrinkage} indicates how much your
                  hair contracts when it dries, which affects length retention
                  and styling approaches.
                </p>
                {patternData.carePriorities.length > 0 && (
                  <div>
                    <h4 className="font-semibold mt-4 mb-2">
                      Key Care Priorities:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {patternData.carePriorities.map((priority, index) => (
                        <li key={index}>{priority}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Email Signup */}
            <div className="md:col-span-2">
              <EmailSignup hairType={patternData.displayName} />
            </div>

            {/* Next Steps Section */}
            <div className="bg-base-100 cb-card-lite md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-xl">Next Steps</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/porosity-quiz"
                  className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Take the Porosity Quiz</h3>
                    </div>
                    <p className="text-sm text-base-content/70">
                      Learn how well your hair absorbs and retains moisture
                    </p>
                  </div>
                </Link>

                <Link
                  href="/routine-builder"
                  className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Build Your Routine</h3>
                    </div>
                    <p className="text-sm text-base-content/70">
                      Create a personalized hair care routine with product
                      recommendations
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Product Recommendations Placeholder */}
            <div className="bg-base-100 cb-card-lite md:col-span-2">
              <h2 className="font-bold text-xl mb-4">
                Product Recommendations
              </h2>
              <p className="text-sm opacity-60 italic mb-4">
                Product recommendations will be added here. These will include
                affiliate-linked products specifically suited for{' '}
                {patternData.displayName.toLowerCase()} hair patterns.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
