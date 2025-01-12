# Setting Up MDX Blog Posts in Next.js

This guide explains how to set up MDX blog posts in Next.js with frontmatter support.

## Initial Setup

1. Install required dependencies:

```bash
npm install @next/mdx @mdx-js/react @mdx-js/loader remark-frontmatter remark-mdx-frontmatter
```

2. Configure Next.js for MDX in `next.config.mjs`:

```javascript
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter', exported: true }],
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

## File Structure

Create the following structure:

```
src/
  content/
    blog/
      your-first-post.mdx
  app/
    blog/
      page.tsx
      [slug]/
        page.tsx
```

## Blog Post Format

Each MDX file should have frontmatter at the top:

```mdx
---
title: Your Blog Post Title
description: A brief description of your post
date: 2024-01-01
image: /path/to/image.jpg # optional
---

Your content here...
```

## Page Components

1. Create the blog listing page (`src/app/blog/page.tsx`):

```typescript
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogFrontmatter {
  title: string;
  description?: string;
  date: string;
  image?: string;
}

async function BlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data: frontmatter } = matter(fileContents);

        return {
          slug,
          frontmatter,
        };
      }),
  );

  // Sort posts by date, newest first
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      {sortedPosts.map((post) => (
        <article key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.frontmatter.title}</h2>
          </Link>
          {post.frontmatter.description && (
            <p>{post.frontmatter.description}</p>
          )}
        </article>
      ))}
    </div>
  );
}
```

2. Create the individual blog post page (`src/app/blog/[slug]/page.tsx`):

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface BlogFrontmatter {
  title: string;
  description?: string;
  date?: string;
  image?: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;

  let mdxModule;
  try {
    mdxModule = await import(`@/content/blog/${resolvedParams.slug}.mdx`);
  } catch (e) {
    notFound();
  }

  // Access frontmatter and Content through getters
  const frontmatter = mdxModule.frontmatter as BlogFrontmatter;
  const Content = mdxModule.default;

  if (!frontmatter || !frontmatter.title) {
    notFound();
  }

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      {frontmatter.description && <p>{frontmatter.description}</p>}
      {frontmatter.image && (
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          width={1200}
          height={630}
        />
      )}
      <Content />
    </article>
  );
}
```

## Adding Custom Components to MDX

1. Create your MDX components:

```typescript
// src/components/mdx/CustomComponents.tsx
export function Callout({ children }) {
  return <div className="callout">{children}</div>;
}
```

2. Make them available in MDX files by configuring `mdx-components.tsx`:

```typescript
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/mdx/CustomComponents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    ...components,
  };
}
```

## Important Notes

1. **Frontmatter Access**: When importing MDX files, the frontmatter is exposed as a getter on the module. Always access it directly from the module, not through the default export:

```typescript
const mdxModule = await import('path/to/post.mdx');
const frontmatter = mdxModule.frontmatter; // correct
const Content = mdxModule.default; // for the content component
```

2. **Type Safety**: Always type your frontmatter and handle missing data gracefully:

```typescript
interface BlogFrontmatter {
  title: string; // required
  description?: string; // optional
  date?: string; // optional
}

// Check for required fields
if (!frontmatter || !frontmatter.title) {
  notFound();
}
```

3. **Build Performance**: MDX files are compiled at build time, which is more efficient than runtime compilation.

4. **Development**: Changes to MDX files will trigger hot reloading in development mode.

## Troubleshooting

1. If frontmatter is undefined:

   - Make sure `remarkMdxFrontmatter` is configured with `exported: true`
   - Access frontmatter directly from the module, not the default export

2. If components aren't available in MDX:

   - Check that they're properly exported in `mdx-components.tsx`
   - Make sure the component names match exactly

3. If images don't load:
   - Verify the image paths are correct relative to the public directory
   - Make sure Next.js is configured to handle the image domains if using external images
