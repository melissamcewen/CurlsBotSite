import path from 'path';
import { promises as fs } from 'fs';

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    image?: string;
  };
}

export async function getRandomBlogPosts(count = 3): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = await fs.readdir(blogDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const post = await import(`@/content/blog/${file}`);
      return {
        slug: file.replace('.mdx', ''),
        frontmatter: post.frontmatter,
      };
    }),
  );

  // Filter for posts with images and exclude 'welcome-back'
  const eligiblePosts = posts
    .filter((post) => post.frontmatter.image && post.slug !== 'welcome-back')
    .sort(() => Math.random() - 0.5); // Randomize the array

  return eligiblePosts.slice(0, count);
}
