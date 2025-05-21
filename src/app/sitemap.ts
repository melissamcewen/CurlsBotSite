import { getBlogPosts } from '@/utils/markdown';
import { MetadataRoute } from 'next';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { idToSlug } from '@/utils/slugs';
import { existsSync } from 'fs';
import { join } from 'path';
import { BEST_PRODUCT_PAGES } from '@/lib/bestProducts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const database = getBundledDatabase();

  // Get all ingredients with content (references or markdown)
  const ingredientEntries = Object.entries(database.ingredients)
    .filter(([_, ingredient]) => {
      // Include if it has references
      if (ingredient.references && ingredient.references.length > 0) {
        return true;
      }
      // Check for markdown content
      const markdownPath = join(
        process.cwd(),
        'src/content/ingredients',
        `${idToSlug(ingredient.id)}.mdx`,
      );
      return existsSync(markdownPath);
    })
    .map(([id, _]) => ({
      url: `https://www.curlsbot.com/ingredients/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Get all categories with content
  const categoryEntries = Object.entries(database.categories)
    .filter(([_, category]) => {
      // Include if it has references
      if (category.notes && category.notes.length > 0) {
        return true;
      }
      // Check for markdown content
      const markdownPath = join(
        process.cwd(),
        'src/content/categories',
        `${idToSlug(category.id)}.mdx`,
      );
      return existsSync(markdownPath);
    })
    .map(([id, _]) => ({
      url: `https://www.curlsbot.com/categories/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Get all groups with content
  const groupEntries = Object.entries(database.groups)
    .filter(([_, group]) => {
      // Include if it has references
      if (group.notes && group.notes.length > 0) {
        return true;
      }
      // Check for markdown content
      const markdownPath = join(
        process.cwd(),
        'src/content/groups',
        `${idToSlug(group.id)}.mdx`,
      );
      return existsSync(markdownPath);
    })
    .map(([id, _]) => ({
      url: `https://www.curlsbot.com/groups/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Add porosity type pages
  const porosityEntries = [
    {
      url: 'https://www.curlsbot.com/porosity/low-porosity',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/porosity/normal-porosity',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/porosity/high-porosity',
      lastModified: new Date(),
    },
  ];

  // Get blog posts
  const posts = await getBlogPosts();
  const blogEntries = posts.map((post) => ({
    url: `https://www.curlsbot.com/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  // Add best product pages
  const bestProductEntries = BEST_PRODUCT_PAGES.map((page) => ({
    url: `https://www.curlsbot.com/best/${page.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: 'https://www.curlsbot.com/',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/ingredients',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/categories',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/ingredients-cheat-sheet',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/routine-builder',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/products',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/porosity-quiz',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/faq',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/labs',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/frizzbot',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/frizzbot/ingredients',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/old-site',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/brands',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/labs/photo',
      lastModified: new Date(),
    },
    {
      url: 'https://www.curlsbot.com/labs/porosity',
      lastModified: new Date(),
    },

    ...ingredientEntries,
    ...categoryEntries,
    ...groupEntries,
    ...porosityEntries,
    ...blogEntries,
    ...bestProductEntries,
  ];
}
