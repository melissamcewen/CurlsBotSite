import { getBlogPosts } from '@/utils/markdown';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const blogPosts = await getBlogPosts();
  const blogRoutes = blogPosts.map(post => ({
    url: `https://curlsbot.com/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  // Define static routes
  const routes = [
    {
      url: 'https://curlsbot.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1
    },
    {
      url: 'https://curlsbot.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: 'https://curlsbot.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: 'https://curlsbot.com/porosity-quiz',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: 'https://curlsbot.com/ingredients',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: 'https://curlsbot.com/groups',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: 'https://curlsbot.com/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: 'https://curlsbot.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ];

  return [...routes, ...blogRoutes];
}
