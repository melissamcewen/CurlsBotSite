import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface MarkdownContent {
  content: string;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

type ContentType = 'ingredients' | 'categories' | 'groups';

export async function getMarkdownContent(type: ContentType, id: string): Promise<MarkdownContent | null> {
  const filePath = path.join(process.cwd(), 'src/content', type, `${id}.md`);

  // Check if markdown file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Read markdown file
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse frontmatter and content
  const { data: frontmatter, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    content: processedContent.toString(),
    frontmatter
  };
}

// Convenience functions for specific content types
export const getIngredientContent = (id: string) => getMarkdownContent('ingredients', id);
export const getCategoryContent = (id: string) => getMarkdownContent('categories', id);
export const getGroupContent = (name: string) => getMarkdownContent('groups', name);
