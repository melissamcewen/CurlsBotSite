import { Metadata } from 'next';

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  hasContent?: boolean;
  imageAlt?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  hasContent = false,
}: MetadataOptions): Metadata {
  return {
    title: `${title} | CurlsBot`,
    description,
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://www.curlsbot.com${path}`,
    },
    openGraph: {
      title: `${title} | CurlsBot`,
      description,
      url: `https://www.curlsbot.com${path}`,
      type: hasContent ? 'article' : 'website',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CurlsBot`,
      description,
      images: ['/images/og-default.png'],
    },
  };
}

export function createDynamicPageMetadata({
  title,
  description,
  path,
  hasContent = false,
  imageAlt,
}: MetadataOptions): Metadata {
  return {
    title: `${title} | CurlsBot`,
    description,
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://www.curlsbot.com${path}`,
    },
    openGraph: {
      title: `${title} | CurlsBot`,
      description,
      url: `https://www.curlsbot.com${path}`,
      type: hasContent ? 'article' : 'website',
      images: [
        {
          url: '/images/og-default.png',
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CurlsBot`,
      description,
      images: ['/images/og-default.png'],
    },
  };
}
