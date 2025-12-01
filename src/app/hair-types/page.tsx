import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';
import { getAllPatternTypes, getPatternType } from './quiz/newTypes';
import { HelpCircle } from 'lucide-react';

export const metadata = createPageMetadata({
  title: 'Hair Types - Pattern-Based Classification System',
  description:
    'Discover your hair pattern using our new classification system based on natural behavior and pattern recognition, not just appearance.',
  path: '/hair-types',
});

export default function HairTypesPage() {
  const allTypes = getAllPatternTypes();
  const patternTypes = allTypes.map((type) => getPatternType(type));

  return (
    <div className="bg-base-100 p-0 md:p-8">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Hero/Intro Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Hair Pattern Types</h1>
          <p className="text-lg mb-4">
            Our hair typing system is based on how your hair naturally behaves
            — the patterns it forms and how it responds to moisture — rather
            than just how it looks. This approach focuses on understanding your
            hair&apos;s natural behavior to guide better care decisions.
          </p>
          <p className="text-base opacity-80">
            Take our quick quiz to discover your pattern, or browse the types
            below to learn more.
          </p>
        </div>

        {/* Take the Quiz CTA */}
        <div className="mb-12 text-center">
          <Link
            href="/hair-types/quiz"
            className="btn btn-primary btn-lg"
          >
            Take the Quiz
          </Link>
        </div>

        {/* Type Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">The Six Pattern Types</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {patternTypes.map((type) => (
              <Link
                key={type.patternType}
                href={`/hair-types/quiz/${type.patternType}`}
                className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
              >
                <div className="card-body">
                  <h3 className="card-title text-xl">{type.displayName}</h3>
                  <p className="text-base-content/70">{type.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge badge-outline text-xs">
                      Shrinkage: {type.shrinkage}
                    </span>
                    <span className="badge badge-outline text-xs">
                      Walker: {type.walkerMapping}
                    </span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <span className="link link-primary">Learn more →</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Straight Hair Card */}
            <Link
              href="/hair-types/quiz/straight"
              className="card bg-base-200 hover:bg-base-300 transition-colors rounded-box"
            >
              <div className="card-body">
                <h3 className="card-title text-xl">Straight</h3>
                <p className="text-base-content/70">
                  Hair that dries perfectly straight without any bends or curves.
                  While not part of our pattern-based system, straight hair has
                  its own unique care needs.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline text-xs">
                    No shrinkage
                  </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <span className="link link-primary">Learn more →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-base-200 cb-card-lite rounded-box">
              <h3 className="text-xl font-semibold mb-3">
                How is this different from the Walker system?
              </h3>
              <p className="text-base-content/80">
                The Andre Walker system (created in the 1990s) focuses primarily
                on visual appearance. Our pattern-based system considers how your
                hair naturally behaves — the patterns it forms, how it responds
                to moisture, and its shrinkage — which provides more practical
                guidance for care and styling. We still show Walker mappings on
                each type page for reference.
              </p>
            </div>

            <div className="bg-base-200 cb-card-lite rounded-box">
              <h3 className="text-xl font-semibold mb-3">
                Can I still use the old quiz?
              </h3>
              <p className="text-base-content/80">
                Yes, the old quiz is still available. However, we recommend
                trying the new quiz as it uses our improved pattern-based
                classification system that focuses on behavior rather than just
                appearance.
              </p>
            </div>

            <div className="bg-base-200 cb-card-lite rounded-box">
              <h3 className="text-xl font-semibold mb-3">
                What if my hair is between types?
              </h3>
              <p className="text-base-content/80">
                That&apos;s completely normal! Hair typing isn&apos;t an exact
                science, and many people have hair that falls between types or
                varies in different areas. Our quiz helps identify your primary
                pattern, but it&apos;s common to have characteristics of
                adjacent types. Each result page includes links to similar types
                you might also relate to.
              </p>
            </div>

            <div className="bg-base-200 cb-card-lite rounded-box">
              <h3 className="text-xl font-semibold mb-3">
                Why only six types instead of twelve?
              </h3>
              <p className="text-base-content/80">
                We simplified to six pattern-based types that focus on practical
                behavior differences. This makes it easier to understand and
                apply to your hair care routine, while still capturing the
                essential variations in how different hair patterns behave.
              </p>
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
                  <th>Common/Social System</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tight Coils / Zig-zags</td>
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
                  <td>Wavy / Loose Curls</td>
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

