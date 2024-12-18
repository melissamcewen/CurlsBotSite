import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface IngredientContent {
  content: string;
  frontmatter: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export async function getIngredientContent(id: string): Promise<IngredientContent | null> {
  const filePath = path.join(process.cwd(), 'src/content/ingredients', `${id}.md`);

  // Check if markdown file exists for this ingredient
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
