import { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from './loading';
import { IngredientsTable } from '../../components/ingredients/IngredientsTable';

export const metadata: Metadata = {
  title: 'Hair Care Ingredients Database | CurlsBot',
  description:
    'Comprehensive database of hair care ingredients with categories, groups, and safety information for curly and wavy hair. Find detailed information about ingredients in your hair products.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/ingredients',
  },
  openGraph: {
    title: 'Hair Care Ingredients | CurlsBot',
    description:
      'Browse and search hair care ingredients. Learn about their effects on curly and wavy hair.',
    url: '/ingredients',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Hair Care Ingredients',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hair Care Ingredients Database | CurlsBot',
    description:
      'Comprehensive database of hair care ingredients with categories, groups, and safety information for curly and wavy hair. Find detailed information about ingredients in your hair products.',
    images: ['/images/og-default.png'],
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
