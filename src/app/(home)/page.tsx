import IngredientForm from '@/components/analysis/IngredientForm';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { Suspense } from 'react';
import Loading from './loading';
import { createPageMetadata } from '@/config/metadata';
import { Metadata } from 'next';
import {
  generateWebAppSchema,
  generateOrganizationSchema,
} from '@/utils/structured-data';
import HomeDrawer from '@/components/HomeDrawer';
import { lazy } from 'react';
import HeroesLoading from '@/components/Heroes/loading';

// Use lazy instead of dynamic for client components
const Heroes = lazy(() => import('@/components/Heroes'));

// Only make the page dynamic when ingredients are present
export const dynamic = 'auto';
export const dynamicParams = true;

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
    } catch (e) {}
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
      <div>
        <HomeDrawer hasIngredients={!!initialIngredients}>
          <Suspense fallback={<Loading />}>
            <AnalyzerWrapper ingredients={initialIngredients} />
          </Suspense>
        </HomeDrawer>

        <Suspense fallback={<HeroesLoading />}>
          <Heroes />
        </Suspense>
      </div>
    </>
  );
}
