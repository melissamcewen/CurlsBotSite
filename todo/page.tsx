import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hair Types Guide - Understanding Your Hair Type',
  description:
    'Learn about different hair types from 1A to 4C. Find your hair type and get personalized care recommendations for your specific hair texture and pattern.',
};

interface HairType {
  id: string;
  name: string;
  description: string;
}

const hairTypes: HairType[] = [
  {
    id: 'type-1a',
    name: 'Type 1A',
    description:
      'Completely straight, fine, and thin hair that tends to be oily and lacks volume.',
  },
  {
    id: 'type-1b',
    name: 'Type 1B',
    description:
      'Straight with more body and volume, medium thickness with possible slight bends.',
  },
  {
    id: 'type-1c',
    name: 'Type 1C',
    description:
      'Straight with more body and volume, medium thickness with possible slight bends.',
  },
  {
    id: 'type-2a',
    name: 'Type 2A',
    description: 'Loose, gentle waves with fine to medium texture.',
  },
  {
    id: 'type-2b',
    name: 'Type 2B',
    description: 'Defined S-shaped waves that start from mid-length.',
  },
  {
    id: 'type-2c',
    name: 'Type 2C',
    description: 'Well-defined waves starting at the root, thick texture.',
  },
  {
    id: 'type-3a',
    name: 'Type 3A',
    description: 'Large, loose curls about the size of a wine bottle.',
  },
  {
    id: 'type-3b',
    name: 'Type 3B',
    description: 'Springy, tight curls about the size of a Sharpie marker.',
  },
  {
    id: 'type-3c',
    name: 'Type 3C',
    description: 'Tight, springy curls about the size of a pencil.',
  },
  {
    id: 'type-4a',
    name: 'Type 4A',
    description: 'Tightly coiled S-pattern curls that maintain definition.',
  },
  {
    id: 'type-4c',
    name: 'Type 4C',
    description:
      'Very tight coils with less defined curl pattern and maximum shrinkage.',
  },
];

export default function HairTypesPage() {
  return (
    <div className="bg-base-100 p-0 md:p-8">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Hair Types Guide</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {hairTypes.map((type) => (
            <Link
              key={type.id}
              href={`/hair-types/${type.id}`}
              className="card bg-base-200 hover:bg-base-300 transition-colors"
            >
              <div className="card-body">
                <h2 className="card-title">{type.name}</h2>
                <p className="text-base-content/70">{type.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 prose prose-base max-w-none">
          <h2>Understanding Hair Types</h2>
          <p>
            Hair typing is a system that helps categorize hair based on its
            natural texture and pattern. The system ranges from Type 1
            (straight) to Type 4 (coily), with subcategories in each type that
            further describe specific characteristics.
          </p>

          <h3>How to Use This Guide</h3>
          <p>
            Click on any hair type above to learn more about its
            characteristics, care tips, styling techniques, and product
            recommendations. If you&apos;re unsure of your hair type, take our{' '}
            <Link href="/hair-types/quiz">Hair Type Quiz</Link> to find out!
          </p>
        </div>
      </div>
    </div>
  );
}
