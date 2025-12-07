'use client';

import Image from 'next/image';
import BaseEmailSignup from '@/components/BaseEmailSignup';
import type { HairPatternType } from '@/app/hair-types/quiz/newTypes';

interface HairTypeResultEmailSignupProps {
  patternType: HairPatternType;
  displayName: string;
}

export function HairTypeResultEmailSignup({
  patternType,
  displayName,
}: HairTypeResultEmailSignupProps) {
  // Types that should show light products guide
  const lightProductsTypes: HairPatternType[] = [
    'swavy',
    'wavy',
    'loose-curls',
    'tight-coils',
  ];

  const isLightProductsType = lightProductsTypes.includes(patternType);

  if (isLightProductsType) {
    return (
      <div className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm md:col-span-2">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/porosity/book.png"
              alt="Lightweight Products Guide"
              width={50}
              height={50}
              className="rounded"
            />
            <h2 className="text-lg font-semibold">
              Find the right light products for your {displayName.toLowerCase()}{' '}
              hair
            </h2>
          </div>
          <p className="text-sm text-base-content/70 mb-3">
            Get the free ebook that shows how to spot lightweight formulas{' '}
            <span className="underline">anywhere.</span>
          </p>
          <BaseEmailSignup
            variant="hairType"
            fieldValue={patternType}
            title=""
            placeholder="Enter your email…"
            buttonText="Get the ebook"
            layout="compact"
            showIcon={false}
            className=""
          />
        </div>
      </div>
    );
  }

  return (
    <BaseEmailSignup
      variant="hairType"
      fieldValue={patternType}
      title={`Looking to make the most of your ${displayName.toLowerCase()} hair?`}
      description="Sign up for our email list to get our free 5 day course on using CurlsBot to master haircare"
      className="bg-base-100 cb-card-lite md:col-span-2"
    />
  );
}
