import IngredientForm from '@/components/analysis/IngredientForm';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { Suspense } from 'react';
import Loading from './loading';
import { createPageMetadata } from '@/config/metadata';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import {
  generateWebAppSchema,
  generateOrganizationSchema,
} from '@/utils/structured-data';

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const hasIngredients = typeof resolvedParams.ingredients === 'string';

  const baseMetadata = createPageMetadata({
    title: 'Hair Care Ingredient Analysis',
    description:
      'Analyze hair care ingredients and learn about their effects on curly and wavy hair. Find ingredient-conscious products and tips for healthy hair.',
    path: '/',
  });

  // If there are ingredients in the URL, add robots meta tag to prevent indexing
  if (hasIngredients) {
    return {
      ...baseMetadata,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return baseMetadata;
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// This component handles the server-side analysis
async function AnalyzerWrapper({ ingredients }: { ingredients: string }) {
  // Simulate some async work to ensure proper streaming
  await new Promise((resolve) => setTimeout(resolve, 0));

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

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const initialIngredients =
    typeof resolvedParams.ingredients === 'string'
      ? resolvedParams.ingredients
      : '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebAppSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
      <div className="flex flex-col xl:flex-row space-y-3 xl:space-y-0 xl:space-x-3 bg-base-200 p-0 md:p-8">
        <div className="xl:max-w-xs">
          <Sidebar />
        </div>
        <div className="w-full  ">
          <Suspense fallback={<Loading />}>
            <AnalyzerWrapper ingredients={initialIngredients} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
