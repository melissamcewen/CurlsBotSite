import { Metadata } from 'next';

interface MetadataParams {
  title?: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  image?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
  image = '/images/og-default.png',
}: MetadataParams): Metadata {
  const fullTitle = title ? `${title} | CurlsBot` : 'CurlsBot';

  return {
    title: fullTitle,
    description,
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || 'CurlsBot',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

// For dynamic pages that need to generate metadata based on content
interface DynamicMetadataParams extends MetadataParams {
  hasContent?: boolean;
  imageAlt?: string;
}

export function createDynamicPageMetadata({
  title,
  description,
  path,
  type = 'article',
  hasContent = true,
  image = '/images/og-default.png',
  imageAlt,
}: DynamicMetadataParams): Metadata {
  return {
    title: title ? `${title} | CurlsBot` : 'CurlsBot',
    description,
    robots: hasContent
      ? {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        }
      : {
          index: false,
          follow: false,
        },
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ? `${title} | CurlsBot` : 'CurlsBot',
      description,
      url: path,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt || title || 'CurlsBot',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | CurlsBot` : 'CurlsBot',
      description,
      images: [image],
    },
  };
}
