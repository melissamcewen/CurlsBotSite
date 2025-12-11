import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewQuizResult from '../NewQuizResult';
import {
  isValidPatternType,
  HairPatternType,
} from '../newTypes';

interface Props {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const type = params.type;

  // Handle straight type
  if (type === 'straight') {
    const ogImage = '/images/hair-types/open-graph.png';
    return {
      title: 'Straight Hair - Hair Type Guide | CurlsBot',
      description:
        'Learn about straight hair and find the right hair care approach for your hair type.',
      robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
      alternates: {
        canonical: `/hair-types/quiz/straight`,
      },
      openGraph: {
        title: 'Straight Hair - Hair Type Guide | CurlsBot',
        description:
          'Learn about straight hair and find the right hair care approach for your hair type.',
        url: `/hair-types/quiz/straight`,
        type: 'article',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: 'Straight Hair - Hair Type Guide',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Straight Hair - Hair Type Guide | CurlsBot',
        description:
          'Learn about straight hair and find the right hair care approach for your hair type.',
        images: [ogImage],
      },
    };
  }

  // Validate pattern type
  if (!isValidPatternType(type)) {
    return {
      title: 'Hair Type Not Found',
      description: 'The requested hair type could not be found.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  // Import here to avoid circular dependency
  const { getPatternType } = await import('../newTypes');
  const patternData = getPatternType(type as HairPatternType);

  const title = `${patternData.displayName} Hair - Hair Pattern Guide | CurlsBot`;
  const description = `${patternData.description} Learn about shrinkage, elongation, care priorities, and get personalized product recommendations for ${patternData.displayName.toLowerCase()} hair.`;
  const ogImage = `/images/hair-types/photos/${type}.png`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `/hair-types/quiz/${type}`,
    },
    openGraph: {
      title,
      description,
      url: `/hair-types/quiz/${type}`,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${patternData.displayName} Hair - Hair Pattern Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function HairTypePage(props: Props) {
  const params = await props.params;
  const type = params.type;

  // Handle straight type
  if (type === 'straight') {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Straight Hair - Hair Type Guide',
      description:
        'Learn about straight hair and find the right hair care approach for your hair type.',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://curlsbot.com/hair-types/quiz/straight',
      },
      author: {
        '@type': 'Organization',
        name: 'CurlsBot',
        url: 'https://curlsbot.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'CurlsBot',
        url: 'https://curlsbot.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://curlsbot.com/logo.png',
        },
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <main className="container mx-auto px-4 py-8">
          <NewQuizResult patternType="straight" />
        </main>
      </>
    );
  }

  // Validate pattern type
  if (!isValidPatternType(type)) {
    notFound();
  }

  // Import here to avoid circular dependency
  const { getPatternType } = await import('../newTypes');
  const patternData = getPatternType(type as HairPatternType);

  const title = `${patternData.displayName} Hair - Hair Pattern Guide | CurlsBot`;
  const description = `${patternData.description} Learn about shrinkage, elongation, care priorities, and get personalized product recommendations for ${patternData.displayName.toLowerCase()} hair.`;

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://curlsbot.com/hair-types/quiz/${type}`,
    },
    author: {
      '@type': 'Organization',
      name: 'CurlsBot',
      url: 'https://curlsbot.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CurlsBot',
      url: 'https://curlsbot.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://curlsbot.com/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="container mx-auto px-4 py-8">
        <NewQuizResult patternType={type as HairPatternType} />
      </main>
    </>
  );
}
