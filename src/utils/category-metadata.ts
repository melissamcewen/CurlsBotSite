import { Metadata } from 'next';

export function generateCategoryMetadata(
  id: string,
  name: string,
  description?: string,
): Metadata {
  const title = `${name} - Hair Ingredient Category`;
  const desc = description || `Learn about ${name} hair ingredients`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'article',
      url: `https://curlsbot.com/categories/${id}`,
    },
    twitter: {
      card: 'summary',
      title,
      description: desc,
    },
  };
}

export function getCategoryStructuredData(
  id: string,
  name: string,
  description?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${name} - Hair Ingredient Category`,
    description: description || `Learn about ${name} hair ingredients`,
    url: `https://curlsbot.com/categories/${id}`,
    author: {
      '@type': 'Person',
      name: 'Melissa McEwen',
      url: 'https://curlsbot.com',
    },
  };
}
