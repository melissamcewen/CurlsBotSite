import { notFound } from 'next/navigation';
import { ProductRecommendations } from '@/components/ui/product/ProductRecommendations';
import { Metadata } from 'next';

interface PorosityInfo {
  title: string;
  description: string;
  characteristics: string[];
  tips: string[];
}

const POROSITY_DATA: Record<string, PorosityInfo> = {
  'low-porosity': {
    title: 'Low Porosity Hair',
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
      'Consider using protein-free products as low porosity hair is easily overloaded',
    ],
  },
  'high-porosity': {
    title: 'High Porosity Hair',
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
    title: 'Normal Porosity Hair',
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
};

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const porosityType = resolvedParams.type;
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
  const resolvedParams = await params;
  const porosityType = resolvedParams.type;
  const porosityInfo = POROSITY_DATA[porosityType];

  if (!porosityInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{porosityInfo.title}</h1>
      <p className="text-lg mb-8">{porosityInfo.description}</p>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Characteristics</h2>
          <ul className="list-disc list-inside space-y-2">
            {porosityInfo.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Care Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            {porosityInfo.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <ProductRecommendations
        porosityType={porosityInfo.title}
        className="mt-8"
      />
    </div>
  );
}

// Generate static paths for all porosity types
export function generateStaticParams() {
  return [
    { type: 'low-porosity' },
    { type: 'high-porosity' },
    { type: 'normal-porosity' },
  ];
}
