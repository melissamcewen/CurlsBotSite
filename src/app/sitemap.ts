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
      url: `/ingredients/${idToSlug(id)}`,
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
      url: `/categories/${idToSlug(id)}`,
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
      url: `/groups/${idToSlug(id)}`,
      lastModified: new Date(),
    }));

  // Add porosity type pages
  const porosityEntries = [
    {
      url: '/porosity/low',
      lastModified: new Date(),
    },
    {
      url: '/porosity/normal',
      lastModified: new Date(),
    },
    {
      url: '/porosity/high',
      lastModified: new Date(),
    },
  ];

  // Get blog posts
  const posts = await getBlogPosts();
  const blogEntries = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: '/',
      lastModified: new Date(),
    },
    {
      url: '/ingredients',
      lastModified: new Date(),
    },
    {
      url: '/categories',
      lastModified: new Date(),
    },
    {
      url: '/blog',
      lastModified: new Date(),
    },
    {
      url: '/ingredients-cheat-sheet',
      lastModified: new Date(),
    },
    {
      url: '/routine-builder',
      lastModified: new Date(),
    },
    {
      url: '/porosity-quiz',
      lastModified: new Date(),
    },
    {
      url: '/about',
      lastModified: new Date(),
    },
    ...ingredientEntries,
    ...categoryEntries,
    ...groupEntries,
    ...porosityEntries,
    ...blogEntries,
  ];
}
