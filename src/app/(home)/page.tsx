import IngredientForm from '@/components/analysis/IngredientForm';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CurlsBot | Hair Care Ingredient Analysis',
  description:
    'Analyze your hair care products with CurlsBot. Get instant feedback on ingredients and find out if they match your hair care needs. Free ingredient checker for curly and wavy hair.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.curlsbot.com',
  },
  openGraph: {
    title: 'CurlsBot | Hair Care Ingredient Analysis',
    description:
      'Analyze your hair care products with CurlsBot. Get instant feedback on ingredients and find out if they match your hair care needs.',
    url: 'https://www.curlsbot.com',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'CurlsBot - Hair Care Ingredient Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurlsBot | Hair Care Ingredient Analysis',
    description:
      'Analyze your hair care products with CurlsBot. Get instant feedback on ingredients and find out if they match your hair care needs.',
    images: ['/images/og-default.png'],
  },
};

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
    <Suspense fallback={<Loading />}>
      <AnalyzerWrapper ingredients={initialIngredients} />
    </Suspense>
  );
}
