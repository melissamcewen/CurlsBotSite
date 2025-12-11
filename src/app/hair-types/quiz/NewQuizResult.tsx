'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getPatternType, HairPatternType } from './newTypes';
import { BookOpen, Droplets, Sparkles, Heart, Frown } from 'lucide-react';
import { FeaturedProductSet } from '@/components/hairTypes/FeaturedProductSet';
import { featuredProductSets } from './featuredProductSets';
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
              ← Back to Curl Types
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
            Back to Curl Types
          </Link>
        </div>

        <article className="max-w-none">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar placeholder">
              <div className="bg-base-100 rounded-full w-20 h-20 border-2 border-base-content/20 flex items-center justify-center flex-shrink-0">
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
                    <span className="font-medium text-sm">
                      Other Type Systems
                    </span>
                    <span className="text-sm opacity-80">
                      {patternData.otherTypeSystems}
                    </span>
                  </div>

                  <div className="flex justify-between items-center px-4 py-3">
                    <span className="font-medium text-sm">Pattern Group</span>
                    <span className="text-sm opacity-80">
                      {patternData.patternGroup}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Featured Product Set */}
            {featuredProductSets[patternType] && (
              <div>
                <FeaturedProductSet
                  productSet={featuredProductSets[patternType]!}
                />
              </div>
            )}

            {/* Email Signup */}
            <div>
              <HairTypeResultEmailSignup
                patternType={patternType}
                displayName={patternData.displayName}
              />
            </div>

            {/* Masonry Layout for Cards */}
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {/* What This Means Section */}
              <div className="bg-base-100 cb-card-lite break-inside-avoid mb-4">
                <h2 className="font-semibold text-sm tracking-wide uppercase opacity-70 mb-3">
                  What This Means
                </h2>
                <div className="space-y-6">
                  {/* Shrinkage */}
                  <div className="flex gap-3">
                    <div className="avatar flex-shrink-0">
                      <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center">
                        <Image
                          src="/images/hair-types/shrink.svg"
                          alt="Shrinkage"
                          width={40}
                          height={40}
                          className="w-10 h-10 "
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Shrinkage</strong> is when hair appears much
                        shorter in its dry resting state than it does when
                        stretched.
                      </p>
                    </div>
                  </div>

                  {/* Elongation */}
                  <div className="flex gap-3">
                    <div className="avatar flex-shrink-0">
                      <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center">
                        <Image
                          src="/images/hair-types/elongate.svg"
                          alt="Elongation"
                          width={40}
                          height={40}
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Elongation</strong> is how easily the curl
                        pattern stretches out.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Factors Section */}
              <div className="bg-base-100 cb-card-lite break-inside-avoid mb-4">
                <h2 className="font-semibold text-sm tracking-wide uppercase opacity-70 mb-3">
                  Other factors
                </h2>
                <p className="text-sm mb-4">
                  Hair type is only one part of how your hair behaves. These
                  additional traits also influence your routine and product
                  needs
                </p>
                <div className="space-y-4">
                  {/* Porosity */}
                  <div className="flex gap-3">
                    <div className="avatar flex-shrink-0">
                      <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center">
                        <Image
                          src="/images/hair-types/damage.svg"
                          alt="Porosity"
                          width={40}
                          height={40}
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Porosity</strong> is a measure of damage to the
                        cuticle. Take our{' '}
                        <Link href="/porosity-quiz" className="text-primary">
                          quiz
                        </Link>{' '}
                        to estimate your porosity or get a{' '}
                        <a
                          href="https://www.strandprint.com/"
                          target="_blank"
                          className="text-primary"
                        >
                          pro analysis from Strandprint to find your actual
                          porosity - use code CBOT10 for 10% off
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Density */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <div className="flex flex-col items-center">
                        <div className="avatar">
                          <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center mb-1">
                            <Image
                              src="/images/hair-types/thin.svg"
                              alt="Thin density"
                              width={40}
                              height={40}
                              className="w-10 h-10"
                            />
                          </div>
                        </div>
                        <span className="text-xs">Thin</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="avatar">
                          <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center mb-1">
                            <Image
                              src="/images/hair-types/thick.svg"
                              alt="Thick density"
                              width={40}
                              height={40}
                              className="w-10 h-10"
                            />
                          </div>
                        </div>
                        <span className="text-xs">Thick</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Density</strong> is the number of hair follicles
                        per cm. Thick density has many strands per area and
                        often pairs well with richer products. Thin density has
                        fewer strands and usually benefits from lightweight
                        formulas
                      </p>
                    </div>
                  </div>

                  {/* Strand Width */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <div className="flex flex-col items-center">
                        <div className="avatar">
                          <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center mb-1">
                            <Image
                              src="/images/hair-types/curl-fine.svg"
                              alt="Fine strand"
                              width={40}
                              height={40}
                              className="w-10 h-10"
                            />
                          </div>
                        </div>
                        <span className="text-xs">Fine</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="avatar">
                          <div className="bg-base-100 rounded-full w-12 h-12 border-2 border-base-content/20 flex items-center justify-center mb-1">
                            <Image
                              src="/images/hair-types/curl.svg"
                              alt="Coarse strand"
                              width={40}
                              height={40}
                              className="w-10 h-10"
                            />
                          </div>
                        </div>
                        <span className="text-xs">Coarse</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Strand width</strong> describes the thickness of
                        each individual hair strand. Fine hair tends to prefer
                        lightweight products, and coarse hair benefits from
                        heavier products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Key Care Priorities Card */}
              {patternData.carePriorities.length > 0 && (
                <div className="bg-base-100 border border-base-300 rounded-xl p-4 break-inside-avoid mb-4">
                  <h3 className="font-semibold text-sm tracking-wide uppercase opacity-70 mb-3">
                    Key Care Priorities
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {patternData.carePriorities.map((priority, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Heart className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                        <span>{priority}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What to Avoid Card */}
              {patternData.avoid && patternData.avoid.length > 0 && (
                <div className="bg-base-100 border border-base-300 rounded-xl p-4 break-inside-avoid mb-4">
                  <h3 className="font-semibold text-sm tracking-wide uppercase opacity-70 mb-3">
                    What to Avoid
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {patternData.avoid.map((avoid, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Frown className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sister Types Card */}
              {patternData.sisterCurlTypes &&
                patternData.sisterCurlTypes.length > 0 && (
                  <div className="bg-base-100 border border-base-300 rounded-xl p-4 break-inside-avoid mb-4">
                    <h3 className="font-semibold text-sm tracking-wide uppercase opacity-70 mb-3">
                      Sister types
                    </h3>
                    <p className="text-sm mb-4">
                      Hair type can change over your life due to factors like
                      hormones. If your type changes its likely to change to one
                      of its sister types. Also if we got your type wrong (oops sorry!), you&apos;re likely to be one of these sister types.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {patternData.sisterCurlTypes.map((sisterType) => {
                        const sisterData = getPatternType(sisterType);
                        return (
                          <Link
                            key={sisterType}
                            href={`/hair-types/quiz/${sisterType}`}
                            className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity text-primary"
                          >
                            <div className="avatar">
                              <div className="bg-base-100 rounded-full w-16 h-16 border-2 border-base-content/20 flex items-center justify-center">
                                <Image
                                  src={patternImageMap[sisterType]}
                                  alt={sisterData.displayName}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12"
                                />
                              </div>
                            </div>
                            <span className="text-xs text-center">
                              {sisterData.displayName}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Curls Monthly Card */}
              <div className="bg-base-100 border border-base-300 rounded-xl p-5 break-inside-avoid mb-4">
                <h3 className="font-semibold text-sm tracking-wide uppercase opacity-70 mb-3">
                  Curls Monthly
                </h3>
                <div className="mb-3">
                  <Image
                    src="/images/hair-types/sets/curlsmonthly.png"
                    alt="Curls Monthly"
                    width={200}
                    height={150}
                    className="w-full h-auto rounded-box"
                  />
                </div>
                <p className="text-sm mb-4">
                  Looking for more products? At our partner Curls Monthly you
                  can try sample sizes of many great products perfect for your
                  curl type from brands like{' '}
                  <a
                    href="https://www.michebeauty.com/?rfsn=8688386.3de231"
                    target="_blank"
                    className="text-primary"
                  >
                    Miche
                  </a>
                  ,{' '}
                  <a
                    href="https://glnk.io/x26q/curlsbot"
                    target="_blank"
                    className="text-primary"
                  >
                    Bounce Curl
                  </a>
                  , and{' '}
                  <a
                    href="https://curlkeeper.com/curlsbotcom"
                    target="_blank"
                    className="text-primary"
                  >
                    Curl Keeper
                  </a>
                  .
                </p>
                <a
                  href="https://curlsmonthly.com/?ref=curlsbot"
                  target="_blank"
                  className="btn btn-primary w-full"
                >
                  Join Curls Monthly
                </a>
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="bg-base-100 cb-card-lite">
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
                  href="/blog/curlsbot-curl-typing"
                  className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">
                        Read more about the CurlsBot Curl Typing System
                      </h3>
                    </div>
                    <p className="text-sm text-base-content/70">
                      Learn more about how the CurlsBot curl type system works and why I created it.
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
