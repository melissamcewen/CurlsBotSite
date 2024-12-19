import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'src/content');

export async function getMarkdownData(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    ...data,
    content: contentHtml
  };
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
