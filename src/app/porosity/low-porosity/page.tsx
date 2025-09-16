import { Metadata } from 'next';
import { LowPorosityPageClient } from './LowPorosityPageClient';

export const metadata: Metadata = {
  title: 'Low Porosity Hair Guide and Best Products | CurlsBot',
  description:
    "Low porosity hair has a smooth cuticle and an oily F-layer that blocks water and products from entering. That's why light products work best, heavy oils and butters tend to just sit on top and can make hair look greasy and stringy.",
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: '/porosity/low-porosity',
  },
  openGraph: {
    title: 'Low Porosity Hair Guide and Best Products',
    description:
      "Low porosity hair has a smooth cuticle and an oily F-layer that blocks water and products from entering. That's why light products work best — heavy oils and butters tend to just sit on top and can make hair look greasy and stringy.",
    url: '/porosity/low-porosity',
    type: 'article',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Low Porosity Hair Care Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Low Porosity Hair Guide and Best Products',
    description:
      "Low porosity hair has a smooth cuticle and an oily F-layer that blocks water and products from entering. That's why light products work best — heavy oils and butters tend to just sit on top and can make hair look greasy and stringy.",
    images: ['/images/og-default.png'],
  },
};

export default function LowPorosityPage() {
  return <LowPorosityPageClient />;
}
