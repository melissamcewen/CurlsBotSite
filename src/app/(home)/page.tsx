import IngredientForm from '@/components/analysis/IngredientForm';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { Suspense } from 'react';
import Loading from './loading';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

// This component handles the server-side analysis
async function AnalyzerWrapper({ ingredients }: { ingredients: string }) {
  // Simulate some async work to ensure proper streaming
  await new Promise(resolve => setTimeout(resolve, 0));

  let analysis = null;
  if (ingredients) {
    try {
      const analyzer = new Analyzer();
      analysis = analyzer.analyze(ingredients);
    } catch (e) {
      console.error('Analysis error:', e);
    }
  }

  return (
    <IngredientForm
      initialIngredients={ingredients}
      initialAnalysis={analysis}
    />
  );
}

export default function Home({ searchParams }: Props) {
  const initialIngredients = typeof searchParams.ingredients === 'string'
    ? searchParams.ingredients
    : '';

  return (
    <Suspense fallback={<Loading />}>
      <AnalyzerWrapper ingredients={initialIngredients} />
    </Suspense>
  );
}
