'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  getAllPatternTypes,
  getPatternType,
  type HairPatternType,
} from '@/app/hair-types/quiz/newTypes';

// Map pattern types to their image files
const patternImageMap: Record<HairPatternType, string> = {
  'tight-coils': '/images/hair-types/tightly.svg',
  coily: '/images/hair-types/coily.svg',
  'tight-curls': '/images/hair-types/curl.svg',
  'loose-curls': '/images/hair-types/loosecurls.svg',
  wavy: '/images/hair-types/wave.svg',
  swavy: '/images/hair-types/swave.svg',
};

const avatarCircleClasses =
  'bg-base-100 rounded-full w-14 h-14 border border-base-300 flex items-center justify-center overflow-hidden';

export function HairTypesGrid() {
  const allTypes = getAllPatternTypes();
  const patternTypes = allTypes.map((type) => getPatternType(type));

  // Group by pattern group
  const tightTypes = patternTypes.filter(
    (type) => type.patternGroup === 'Tight Curls/Coils'
  );
  const looseTypes = patternTypes.filter(
    (type) => type.patternGroup === 'Loose Curls/Waves'
  );

  return (
    <div className="card bg-base-200 rounded-box border border-base-300 my-6 not-prose">
      <div className="card-body space-y-8">
        {/* Tight Curls/Coils */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Tight Curls/Coils
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tightTypes.map((type) => (
              <Link
                key={type.patternType}
                href={`/hair-types/quiz/${type.patternType}`}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div className="avatar placeholder">
                  <div className={avatarCircleClasses}>
                    <Image
                      src={patternImageMap[type.patternType]}
                      alt={`${type.displayName} hair pattern`}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <h4 className="font-semibold text-sm">{type.displayName}</h4>
                <p className="text-xs text-base-content/70">
                  {type.shrinkage} shrinkage
                </p>
                <p className="text-xs text-base-content/60 line-clamp-2">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Loose Curls/Waves */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Loose Curls/Waves
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {looseTypes.map((type) => (
              <Link
                key={type.patternType}
                href={`/hair-types/quiz/${type.patternType}`}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div className="avatar placeholder">
                  <div className={avatarCircleClasses}>
                    <Image
                      src={patternImageMap[type.patternType]}
                      alt={`${type.displayName} hair pattern`}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <h4 className="font-semibold text-sm">{type.displayName}</h4>
                <p className="text-xs text-base-content/70">
                  {type.shrinkage} shrinkage
                </p>
                <p className="text-xs text-base-content/60 line-clamp-2">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

