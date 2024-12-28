import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { idToSlug } from '@/utils/slugs';
import { IngredientsTable } from '../../components/ingredients/IngredientsTable';

export const metadata: Metadata = {
  title: 'Haircare Ingredients Database',
  description:
    'Comprehensive database of haircare ingredients with categories, groups, and safety information for curly and wavy hair',
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Curly/Wavy Haircare Ingredients Database',
      description:
        'Comprehensive database of haircare ingredients with categories, groups, and safety information for curly and wavy hair',
      url: 'https://curlsbot.com/ingredients',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://curlsbot.com/ingredients',
      },
      isPartOf: {
        '@type': 'WebSite',
        name: 'CurlsBot',
        url: 'https://curlsbot.com',
      },
      numberOfItems: Object.keys(getBundledDatabase().ingredients).length,
      itemListElement: Object.values(getBundledDatabase().ingredients).map(
        (ingredient, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'ChemicalSubstance',
            name: ingredient.name,
            description: ingredient.description,
            url: `https://curlsbot.com/ingredients/${idToSlug(ingredient.id)}`,
          },
        }),
      ),
    }),
  },
};

export default function IngredientsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ingredients Database</h1>
      <div className="overflow-x-auto">
        <Suspense fallback={<Loading />}>
          <IngredientsTable />
        </Suspense>
      </div>
    </div>
  );
}
