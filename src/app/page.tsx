import IngredientForm from '@/components/analysis/IngredientForm';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <IngredientForm />
    </Suspense>
  );
}
