import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkNextImage from './remarkNextImage';

const contentDirectory = path.join(process.cwd(), 'src/content');

export async function getMarkdownData(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath);


  // Check if file exists
  if (!fs.existsSync(fullPath)) {

    return null;
  }


  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML with Next.js Image support
  const processedContent = await remark()
    .use(remarkNextImage)
    .use(html, { sanitize: false }) // Disable sanitization to allow our custom HTML
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    content: contentHtml,
  };
}

export async function getBlogPosts() {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const post = await getMarkdownData(`blog/${fileName}`);
        return {
          slug,
          frontmatter: post?.frontmatter || {},
          content: post?.content || '',
        };
      }),
  );

  return posts;
}

export async function getBlogPost(slug: string) {
  return getMarkdownData(`blog/${slug}.md`);
}

export async function getSystemContent(systemId: string) {
  return getMarkdownData(`systems/${systemId}.md`);
}

export async function getCategoryContent(categoryId: string) {
  return getMarkdownData(`categories/${categoryId}.md`);
}

export async function getIngredientContent(ingredientId: string) {

  return getMarkdownData(`ingredients/${ingredientId}.md`);
}

export async function getGroupContent(groupId: string) {
  return getMarkdownData(`groups/${groupId}.md`);
}
