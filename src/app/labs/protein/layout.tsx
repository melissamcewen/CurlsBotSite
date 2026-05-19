import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protein Checker | CurlsBot Labs',
  description:
    'Paste a hair product ingredient list to see which proteins and amino acids our database detects.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/labs/protein',
  },
  openGraph: {
    title: 'Protein Checker | CurlsBot Labs',
    description:
      'See which protein and amino acid ingredients appear in a hair product list.',
    url: '/labs/protein',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'CurlsBot Protein Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protein Checker | CurlsBot Labs',
    description:
      'See which protein and amino acid ingredients appear in a hair product list.',
    images: ['/images/og-default.png'],
  },
  keywords: [
    'protein checker',
    'hair product ingredients',
    'protein in hair products',
    'amino acids hair care',
    'hydrolyzed protein',
    'protein overload',
    'ingredient analyzer',
    'curly hair ingredients',
    'protein-free',
    'haircare ingredients analyzer',
  ],
};

export default function ProteinLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
