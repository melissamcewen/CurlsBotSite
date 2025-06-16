import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      }
    ],
    sitemap: 'https://www.curlsbot.com/sitemap.xml',
    host: 'https://www.curlsbot.com',
  };
}
