import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { IngredientsTable } from '@/components/ingredients/IngredientsTable';
import { createPageMetadata } from '@/config/metadata';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata = createPageMetadata({
  title: 'Hair Care Ingredients',
  description:
    'Browse and search hair care ingredients. Learn about their effects on curly and wavy hair.',
  path: '/ingredients',
});

export default function IngredientsPage() {
  return (
    <div className="max-w-5xl mx-auto bg-base-100 p-2 md:p-8 ">
      <h1 className="text-3xl font-bold mb-6">Ingredients Database</h1>
      <div className="overflow-x-auto">
        <Suspense fallback={<Loading />}>
          <IngredientsTable />
        </Suspense>
      </div>
    </div>
  );
}
