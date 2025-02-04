import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PorosityPageClient } from './PorosityPageClient';

interface PorosityInfo {
  title: string;
  description: string;
  characteristics: string[];
  tips: string[];
}

const POROSITY_DATA: Record<string, PorosityInfo> = {
  'low-porosity': {
    title: 'Low Porosity Hair Guide and Best Products',
    description:
      'Low porosity hair has a tightly bound cuticle layer, making it difficult for moisture to penetrate the hair shaft. This type of hair is often resistant to treatments and can be prone to product buildup.',
    characteristics: [
      'Takes a long time to get wet and dry',
      'Products tend to sit on top of hair rather than absorb',
      'Resistant to chemical processes',
      'Prone to product buildup',
      'Often appears shiny when healthy',
    ],
    tips: [
      'Use heat or steam to help products penetrate',
      'Focus on lightweight, easily absorbed products',
      'Regular clarifying treatments to remove buildup',
      'Apply products to damp hair to improve absorption',
      'May better tolerate sulfates than other porosity types and even benefit from them',
    ],
  },
  'high-porosity': {
    title: 'High Porosity Hair Guide and Best Products',
    description:
      'High porosity hair has a raised or damaged cuticle layer, allowing moisture to easily enter and exit the hair shaft. This type of hair can become easily moisturized but also loses moisture quickly.',
    characteristics: [
      'Absorbs water and products quickly',
      'Dries very quickly',
      'Prone to frizz and tangles',
      'Can become overly moisturized easily',
      'May look dull without proper care',
    ],
    tips: [
      'Use leave-in conditioners and oils to seal in moisture',
      'Deep condition regularly',
      'Look for products with moisturizing ingredients',
      'Use anti-humectants in humid weather',
      'Consider using protein treatments to strengthen hair',
    ],
  },
  'normal-porosity': {
    title: 'Normal Porosity Hair Guide and Best Products',
    description:
      'Normal porosity hair has a healthy cuticle layer that allows for balanced moisture absorption and retention. This type of hair is generally easier to maintain and style.',
    characteristics: [
      'Requires minimal time to get wet and dry',
      'Holds styles well',
      'Takes color treatments well',
      'Maintains healthy shine',
      'Products absorb well without buildup',
    ],
    tips: [
      'Maintain balance with regular conditioning',
      'Use a variety of products as hair can handle most types',
      'Regular trims to maintain health',
      'Protect hair during heat styling',
      'Deep condition occasionally for maintenance',
    ],
  },
  'mixed-porosity': {
    title: 'Mixed Porosity Hair Guide and Best Products',
    description:
      'Mixed porosity hair has different porosity levels throughout the hair shaft, often with more damaged or porous ends and healthier roots. This can be caused by heat or coloring damage, or from having long hair (the ends become more porous due to everyday wear and tear). This type of hair requires a balanced approach to care.',
    characteristics: [
      'Greasy roots and dry ends',
      'Uneven drying time throughout hair',
      'Can be prone to both buildup and dryness',
      'May require different products for different sections',
    ],
    tips: [
      'Use lighter products near roots and heavier ones on ends',
      'Section hair when applying products to target different needs',
      'Protect the ends with a pre-poo when shampooing or clarifying',
      'Deep condition focusing on the ends',
      'Consider protein treatments for the ends',
    ],
  },
};

interface Props {
  params: { type: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const porosityType = params.type;
  const porosityInfo = POROSITY_DATA[porosityType];

  if (!porosityInfo) {
    notFound();
  }

  return {
    title: `${porosityInfo.title} Care Guide | CurlsBot`,
    description: porosityInfo.description,
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `/porosity/${porosityType}`,
    },
    openGraph: {
      title: porosityInfo.title,
      description: porosityInfo.description,
      url: `/porosity/${porosityType}`,
      type: 'article',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: `${porosityInfo.title} Care Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: porosityInfo.title,
      description: porosityInfo.description,
      images: ['/images/og-default.png'],
    },
  };
}

export default async function PorosityPage({ params }: Props) {
  const type = await params.type;
  const porosityInfo = POROSITY_DATA[type];

  if (!porosityInfo) {
    notFound();
  }

  return <PorosityPageClient porosityType={type} porosityInfo={porosityInfo} />;
}

// Generate static paths for all porosity types
export function generateStaticParams() {
  return [
    { type: 'low-porosity' },
    { type: 'high-porosity' },
    { type: 'normal-porosity' },
    { type: 'mixed-porosity' },
  ];
}
