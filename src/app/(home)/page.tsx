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
import HomePageCards from '@/components/HomePageCards';
// Use lazy instead of dynamic for client components

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

  return {
    ...baseMetadata,
    alternates: {
      canonical: 'https://www.curlsbot.com',
    },
  };
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
        <AnalyzerWrapper ingredients={initialIngredients} />

        <HomePageCards />
      </div>
    </>
  );
}
