import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export async function getMarkdownData(filePath: string) {
  // Try MDX first, then fall back to MD
  const mdxPath = path.join(
    contentDirectory,
    filePath.replace(/\.md$/, '.mdx'),
  );
  const mdPath = path.join(contentDirectory, filePath);

  let fullPath = mdxPath;
  if (!fs.existsSync(mdxPath)) {
    if (!fs.existsSync(mdPath)) {
      return null;
    }
    fullPath = mdPath;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}

export async function getBlogPosts() {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter(
        (fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'),
      )
      .map(async (fileName) => {
        const slug = fileName.replace(/\.(md|mdx)$/, '');
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
