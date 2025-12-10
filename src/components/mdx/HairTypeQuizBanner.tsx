import Link from 'next/link';
import Image from 'next/image';

export function HairTypeQuizBanner() {
  return (
    <div className="card bg-base-100 border border-base-300 rounded-box mb-6  md:mr-6 md:mb-4 not-prose">
      <div className="card-body flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 p-6">
        {/* Icon */}
        <div className="avatar">
          <div className=" bg-base-100 border-2 border-base-content/20 flex items-center justify-center flex-shrink-0 rounded-full w-12 h-12">
            <Image
              src="/images/hair-types/loosecurls.svg"
              alt="Hair type quiz"
              width={24}
              height={24}
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-1">
            Want to know your hair type?
          </h3>
          <p className="text-sm text-base-content/70">
            Wavy? Curly? Coily? Take the quiz to find out in just 2 minutes!
          </p>
        </div>

        {/* Button */}
        <div className="flex-shrink-0">
          <Link href="/hair-types/quiz" className="btn btn-primary">
            Take the Quiz!
          </Link>
        </div>
      </div>
    </div>
  );
}
