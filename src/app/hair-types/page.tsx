'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  getAllPatternTypes,
  getPatternType,
  type HairPatternType,
} from './quiz/newTypes';
import { HelpCircle } from 'lucide-react';
import HairPatternVisualization from '@/components/HairPatternVisualization';

// Map pattern types to their image files
const patternImageMap: Record<HairPatternType, string> = {
  'tight-coils': '/images/hair-types/tightly.svg',
  coily: '/images/hair-types/coily.svg',
  'tight-curls': '/images/hair-types/curl.svg',
  'loose-curls': '/images/hair-types/loosecurls.svg',
  wavy: '/images/hair-types/wave.svg',
  swavy: '/images/hair-types/swave.svg',
};

export default function HairTypesPage() {
  const allTypes = getAllPatternTypes();
  const patternTypes = allTypes.map((type) => getPatternType(type));

  return (
    <div className="bg-base-100 p-0 md:p-8">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Hero/Intro Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">
            The CurlsBot Hair Type System
          </h1>
          <p className="text-lg mb-4">
            The new CurlsBot Hair Type System is based on how your hair acts,
            not just how it looks. No trying to compare it to a chart.
          </p>

          {/* Interactive Visualization */}
          <div className="mb-6 md:float-left md:mr-6 md:mb-4">
            <HairPatternVisualization />
          </div>

          <div className="overflow-hidden">
            <p className="text-md mb-4">
              {' '}
              The key to our system is the coil shape, and how it can elongate
              and shrink.{' '}
              <i>
                Waves, curls, and coils aren&apos;t completely separate types,
                they are variations of the same coil shape.
              </i>
            </p>
            <ul className="list-disc list-outside text-md ml-6 space-y-2">
              <li>
                <b>Shrinkage</b> is when the hair in its dry resting state is
                longer than it is when stretched out.
              </li>
              <li>
                <b>Elongation</b> is the process of the curl pattern stretching
                out due to gravity.
              </li>
            </ul>
          </div>
          <p className="text-md mt-4">
            Shrinkage and elongation determine which products, routines, and
            techniques will actually work for your hair.
          </p>
          <p className="text-base opacity-80 mt-8 clear-both md:clear-none">
            Take our quick quiz (only 1-5 questions!) to discover your pattern,
            or browse the types below to learn more.
          </p>
        </div>

        {/* Take the Quiz CTA */}
        <div className="mb-8 mt-8 text-center">
          <Link href="/hair-types/quiz" className="btn btn-primary btn-lg">
            Find Your Hair Type
          </Link>
        </div>
        {/* Type Grid */}
        <div className="mb-16 clear-left">
          <h2 className="text-2xl font-bold mb-6">The Six Pattern Types</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {patternTypes.map((type) => (
              <div
                key={type.patternType}
                className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
              >
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="avatar placeholder">
                      <div className="bg-base-100 rounded-full w-16 h-16 border-2 border-base-content/20 flex items-center justify-center">
                        <Image
                          src={patternImageMap[type.patternType]}
                          alt={`${type.displayName} hair pattern`}
                          width={48}
                          height={48}
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <h3 className="card-title text-xl">{type.displayName}</h3>
                  </div>
                  <p className="text-base-content/70">{type.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge badge-outline text-xs">
                      Shrinkage: {type.shrinkage}
                    </span>
                    <span className="badge badge-outline text-xs">
                      Other Systems: {type.otherTypeSystems}
                    </span>
                    <span className="badge badge-outline text-xs">
                      Elongation: {type.elongation}
                    </span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <span className="btn">Guide coming soon</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Straight Hair Card */}
            <div className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box">
              <div className="card-body">
                <h3 className="card-title text-xl">Straight</h3>
                <p className="text-base-content/70">
                  Hair that dries perfectly straight without any bends or
                  curves. While not part of our pattern-based system, straight
                  hair has its own unique care needs.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline text-xs">
                    No shrinkage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="join join-vertical bg-base-100 w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="hair-types-accordion" defaultChecked />
              <div className="collapse-title font-semibold">
                How is this different from other hair typing systems?
              </div>
              <div className="collapse-content text-base-content/80">
                The most popular hair typing system is based on the system
                created by Andre Walker in the 1990s. It&apos;s the original
                system of types like &quot;3a.&quot; Over time this system
                changed due to internet communities and social media, adding new
                types like &quot;4a&quot; and occasionally pushing some wavy
                hair into type 1. We refer to this as the &quot;Common
                System&quot;.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="hair-types-accordion" />
              <div className="collapse-title font-semibold">
                What if my hair is between types?
              </div>
              <div className="collapse-content text-base-content/80">
                Our hair typing system accounts for the fact that hair typing is
                more of a spectrum than a strict classification. So most hair
                types include a range of patterns.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="hair-types-accordion" />
              <div className="collapse-title font-semibold">
                How did you create this system?
              </div>
              <div className="collapse-content text-base-content/80">
                I researched the history and science of hair typing and
                consulted with experts of all hair types from content creators
                to hair stylists. We have a{' '}
                <Link
                  href="/blog/the-science-of-hair-typing"
                  className="link link-primary"
                >
                  blog post
                </Link>{' '}
                if you&apos;re interested in the details.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="hair-types-accordion" />
              <div className="collapse-title font-semibold">
                Can my hair change types over time?
              </div>
              <div className="collapse-content text-base-content/80">
                It&apos;s possible for your hair to change types over time, but
                likely it will change to a type next to your current type, not
                one completely different. Like swavy hair might change to become
                waves due to changes in hair care, length, hormones, etc.
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">System Comparison</h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-base-200 rounded-box">
              <thead>
                <tr>
                  <th>Our System</th>
                  <th>Walker System</th>
                  <th>Common System</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tightly Coiled</td>
                  <td>4B–4C</td>
                  <td>4B–4C</td>
                </tr>
                <tr>
                  <td>Coily</td>
                  <td>4A</td>
                  <td>4A</td>
                </tr>
                <tr>
                  <td>Tight Curls</td>
                  <td>3B</td>
                  <td>3C</td>
                </tr>
                <tr>
                  <td>Loose Curls</td>
                  <td>3A</td>
                  <td>3A</td>
                </tr>
                <tr>
                  <td>Wavy</td>
                  <td>2A–3A</td>
                  <td>2A–3A</td>
                </tr>
                <tr>
                  <td>Swavy</td>
                  <td>2A–2C</td>
                  <td>1B–2A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
