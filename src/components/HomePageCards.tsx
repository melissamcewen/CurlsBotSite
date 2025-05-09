import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HomePageCards() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 gap-8">
        <div className="card bg-base-100 hover:translate-y-[-4px] transition-transform duration-300">
          <div className="card-body text-center">
            <div className="flex flex-col items-center">
              <Image
                src="/normal.svg"
                alt="Curly hair illustration"
                width={120}
                height={120}
                className="mb-6"
              />
              <h2 className="card-title text-3xl font-bold justify-center mb-2">
                🔍 Not sure what your curl type is?
              </h2>
              <p className="text-lg mb-6 max-w-2xl">
                Take our quick hair type quiz to find out your curl pattern,
                product tips, and custom routine.
              </p>
              <div className="flex flex-col items-center">
                <Link
                  href="/hair-types/quiz"
                  className="btn btn-secondary hover:btn-secondary-focus"
                >
                  Take the Quiz <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <p className="text-xs mt-2">
                  Takes 2 minutes. No email required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
