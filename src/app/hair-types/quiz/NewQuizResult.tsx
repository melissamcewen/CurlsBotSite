'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getPatternType, HairPatternType } from './newTypes';
import { BookOpen, Droplets, Sparkles } from 'lucide-react';
import { FeaturedProduct } from '@/components/hairTypes/FeaturedProduct';
import { featuredProducts } from './featuredProducts';
import { HairTypeResultEmailSignup } from '@/components/hairTypes/HairTypeResultEmailSignup';

// Map pattern types to their image files
const patternImageMap: Record<HairPatternType, string> = {
  'tight-coils': '/images/hair-types/tightly.svg',
  coily: '/images/hair-types/coily.svg',
  'tight-curls': '/images/hair-types/curl.svg',
  'loose-curls': '/images/hair-types/loosecurls.svg',
  wavy: '/images/hair-types/wave.svg',
  swavy: '/images/hair-types/swave.svg',
};

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
            <Link href="/hair-types/quiz" className="btn btn-ghost btn-sm">
              ← Retake Quiz
            </Link>
            <Link href="/hair-types" className="btn btn-ghost btn-sm">
              ← Back to Hair Types
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
          <Link href="/hair-types/quiz" className="btn btn-ghost btn-sm">
            ← Retake Quiz
          </Link>
          <Link href="/hair-types" className="btn btn-ghost btn-sm">
            Back to Hair Types
          </Link>
        </div>

        <article className="max-w-none">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar placeholder">
              <div className="bg-base-300 rounded-full w-20 h-20 border-2 border-base-content/20 flex items-center justify-center flex-shrink-0">
                <Image
                  src={patternImageMap[patternType]}
                  alt={`${patternData.displayName} hair pattern`}
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px]"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold">{patternData.displayName}</h1>
          </div>

          {/* Photo Collage and Pattern Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Photo Collage */}
            <div>
              <Image
                src={`/images/hair-types/photos/${patternType}.png`}
                alt={`${patternData.displayName} hair examples`}
                width={600}
                height={400}
                className="w-full h-auto rounded-box"
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* Hero/Description Section */}
              <div className="bg-base-100 cb-card-lite flex flex-col rounded-xl border border-base-300">
                <h2 className="font-bold text-xl mb-4">Your Pattern</h2>
                <p className="mb-4 flex-1">{patternData.description}</p>
                <p className="text-sm opacity-80 mb-4">
                  <strong>Typical behaviors:</strong>{' '}
                  {patternData.typicalBehaviors}
                </p>
                {patternData.guideUrl ? (
                  <Link
                    href={patternData.guideUrl}
                    className="btn btn-primary w-full"
                  >
                    View Guide
                  </Link>
                ) : (
                  <button className="btn btn-disabled w-full" disabled>
                    Guide Coming Soon
                  </button>
                )}
              </div>

              {/* Combined Quick Reference */}
              <div className="rounded-xl bg-base-100  border border-base-300">
                <h3 className="px-4 pt-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
                  At a Glance
                </h3>

                <div className="divide-y divide-base-300">
                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="font-medium text-sm">Shrinkage</span>
                    <span className="text-sm opacity-80">
                      {patternData.shrinkage}
                    </span>
                  </div>

                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="font-medium text-sm">Elongation</span>
                    <span className="text-sm opacity-80">
                      {patternData.elongation}
                    </span>
                  </div>

                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="font-medium text-sm">Walker System</span>
                    <span className="text-sm opacity-80">
                      {patternData.otherTypeSystems}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured Product */}
            {featuredProducts[patternType] && (
              <div className="md:col-span-2 ">
                <FeaturedProduct product={featuredProducts[patternType]} />
              </div>
            )}
            {/* What This Means Section */}
            <div className="bg-base-100 cb-card-lite md:col-span-1">
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
                  Shrinkage of <b className="font-semibold">{patternData.shrinkage}</b> indicates how much your
                  hair contracts when it dries, which affects length retention
                  and styling approaches. Elongation of <b className="font-semibold">{patternData.elongation}</b> indicates how easily your hair stretches out.
                </p>
              </div>
            </div>
            {/* Care Overview Card */}
            <div className="bg-base-100 border border-base-300 rounded-xl p-4 space-y-4">
              <h3 className="font-semibold text-sm tracking-wide uppercase opacity-70">
                Care Overview
              </h3>

              {patternData.carePriorities.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Key Care Priorities</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {patternData.carePriorities.map((priority, index) => (
                      <li key={index}>{priority}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-base-300 pt-4">
                <h4 className="font-semibold mb-2 text-sm">What to Avoid</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {patternData.avoid?.map((avoid, index) => (
                    <li key={index}>{avoid}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Email Signup */}
            <HairTypeResultEmailSignup
              patternType={patternType}
              displayName={patternData.displayName}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
