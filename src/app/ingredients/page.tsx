import { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from './loading';
import { IngredientsTable } from '../../components/ingredients/IngredientsTable';

export const metadata: Metadata = {
  title: 'Haircare Ingredients Database',
  description:
    'Comprehensive database of haircare ingredients with categories, groups, and safety information for curly and wavy hair',
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
