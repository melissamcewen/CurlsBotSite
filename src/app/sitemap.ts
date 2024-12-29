import { getBlogPosts } from '@/utils/markdown';
import { MetadataRoute } from 'next';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { idToSlug } from '@/utils/slugs';
import { existsSync } from 'fs';
import { join } from 'path';

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
        `${idToSlug(ingredient.id)}.md`,
      );
      return existsSync(markdownPath);
    })
    .map(([id, _]) => ({
      url: `https://curlsbot.com/ingredients/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Get all categories with content
  const categoryEntries = Object.entries(database.categories)
    .filter(([_, category]) => {
      // Include if it has references
      if (category.references && category.references.length > 0) {
        return true;
      }
      // Check for markdown content
      const markdownPath = join(
        process.cwd(),
        'src/content/categories',
        `${idToSlug(category.id)}.md`,
      );
      return existsSync(markdownPath);
    })
    .map(([id, _]) => ({
      url: `https://curlsbot.com/categories/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Get all groups with content
  const groupEntries = Object.entries(database.groups)
    .filter(([_, group]) => {
      // Include if it has references
      if (group.references && group.references.length > 0) {
        return true;
      }
      // Check for markdown content
      const markdownPath = join(
        process.cwd(),
        'src/content/groups',
        `${idToSlug(group.id)}.md`,
      );
      return existsSync(markdownPath);
    })
    .map(([id, _]) => ({
      url: `https://curlsbot.com/groups/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Add porosity type pages
  const porosityEntries = [
    {
      url: 'https://curlsbot.com/porosity/low',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/porosity/normal',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/porosity/high',
      lastModified: new Date(),
    },
  ];

  // Get blog posts
  const posts = await getBlogPosts();
  const blogEntries = posts.map((post) => ({
    url: `https://curlsbot.com/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: 'https://curlsbot.com',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/ingredients',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/categories',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/ingredients-cheat-sheet',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/routine-builder',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/porosity-quiz',
      lastModified: new Date(),
    },
    {
      url: 'https://curlsbot.com/about',
      lastModified: new Date(),
    },
    ...ingredientEntries,
    ...categoryEntries,
    ...groupEntries,
    ...porosityEntries,
    ...blogEntries,
  ];
}
