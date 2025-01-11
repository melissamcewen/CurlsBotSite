import { Metadata } from 'next';
import {
  getBundledDatabase,
  type Category,
} from 'haircare-ingredients-analyzer';
import { idToSlug } from './slugs';

export async function generateGroupMetadata(
  groupId: string,
  groupName: string,
  description?: string,
): Promise<Metadata> {
  const database = getBundledDatabase();

  // Find all categories in this group
  const categories = Object.values(database.categories).filter(
    (cat: Category) => cat.group === groupId,
  );

  // Prepare structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: groupName,
    description:
      description || `Hair care ingredients in the ${groupName} group`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Categories in ${groupName}`,
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description: category.description,
          url: `/categories/${idToSlug(category.id)}`,
        },
      })),
    },
  };

  return {
    title: `${groupName} for curly/wavy hair | CurlsBot`,
    description:
      description ||
      `A guide to ${groupName} for curly/wavy hair. Learn about different types of ${groupName.toLowerCase()} and their effects on curly and wavy hair.`,
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `/groups/${groupId}`,
    },
    openGraph: {
      title: `${groupName} for curly/wavy hair | CurlsBot`,
      description:
        description ||
        `A guide to ${groupName} for curly/wavy hair. Learn about different types of ${groupName.toLowerCase()} and their effects on curly and wavy hair.`,
      url: `/groups/${groupId}`,
      type: 'article',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: `${groupName} - Hair Care Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${groupName} for curly/wavy hair | CurlsBot`,
      description:
        description ||
        `A guide to ${groupName} for curly/wavy hair. Learn about different types of ${groupName.toLowerCase()} and their effects on curly and wavy hair.`,
      images: ['/images/og-default.png'],
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export function getGroupStructuredData(
  groupId: string,
  groupName: string,
  description?: string,
) {
  const database = getBundledDatabase();

  // Find all categories in this group
  const categories = Object.values(database.categories).filter(
    (cat: Category) => cat.group === groupId,
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: groupName,
    description:
      description || `Hair care ingredients in the ${groupName} group`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Categories in ${groupName}`,
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description: category.description,
          url: `/categories/${idToSlug(category.id)}`,
        },
      })),
    },
  };
}
