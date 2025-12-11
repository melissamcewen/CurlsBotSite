import Image from 'next/image';

const avatarCircleClasses =
  'bg-base-100 rounded-full w-14 h-14 border border-base-300 flex items-center justify-center overflow-hidden';

export function HairTypeFactors() {
  return (
    <div className="card bg-base-200 rounded-box border border-base-300 my-6 not-prose">
      <div className="card-body space-y-6">
        {/* Porosity */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="avatar placeholder flex-shrink-0">
            <div className={avatarCircleClasses}>
              <Image
                src="/images/hair-types/damage.svg"
                alt="Porosity"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
          </div>
          <p className="text-sm">
            <strong>Porosity</strong> is roughly a measure of how easily your
            hair absorbs and releases water. Take our{' '}
            <a href="/porosity-quiz" className="link link-primary">
              porosity quiz
            </a>{' '}
            to find yours
          </p>
        </div>

        {/* Density */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-shrink-0 flex gap-4">
            <div className="flex flex-col items-center">
              <div className="avatar placeholder">
                <div className={avatarCircleClasses}>
                  <Image
                    src="/images/hair-types/thin.svg"
                    alt="Thin density"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <span className="text-xs mt-1">Thin</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder">
                <div className={avatarCircleClasses}>
                  <Image
                    src="/images/hair-types/thick.svg"
                    alt="Thick density"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <span className="text-xs mt-1">Thick</span>
            </div>
          </div>
          <p className="text-sm">
            <strong>Density</strong> describes how many hair strands you have
            per square centimeter
          </p>
        </div>

        {/* Strand Width */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-shrink-0 flex gap-4">
            <div className="flex flex-col items-center">
              <div className="avatar placeholder">
                <div className={avatarCircleClasses}>
                  <Image
                    src="/images/hair-types/curl-fine.svg"
                    alt="Fine strand width"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <span className="text-xs mt-1">Fine</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="avatar placeholder">
                <div className={avatarCircleClasses}>
                  <Image
                    src="/images/hair-types/curl.svg"
                    alt="Coarse strand width"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <span className="text-xs mt-1">Coarse</span>
            </div>
          </div>
          <p className="text-sm">
            <strong>Strand width</strong> refers to how thick each individual
            strand is, often called &quot;fine&quot; or &quot;coarse&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
