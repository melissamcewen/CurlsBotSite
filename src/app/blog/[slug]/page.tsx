import { notFound } from 'next/navigation';
import { createDynamicPageMetadata } from '@/config/metadata';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenText } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import * as runtime from 'react/jsx-runtime';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const fullPath = path.join(
    process.cwd(),
    'src/content/blog',
    `${resolvedParams.slug}.mdx`,
  );

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const source = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter } = matter(source);

  return createDynamicPageMetadata({
    title: frontmatter.title,
    description:
      frontmatter.description || `Read about ${frontmatter.title} on CurlsBot.`,
    path: `/blog/${resolvedParams.slug}`,
    hasContent: true,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const fullPath = path.join(
    process.cwd(),
    'src/content/blog',
    `${resolvedParams.slug}.mdx`,
  );

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const source = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(source);

  // Compile MDX to React components
  const code = String(
    await compile(content, {
      remarkPlugins: [remarkFrontmatter],
      outputFormat: 'function-body',
      development: false,
    }),
  );

  // Create the MDX component
  const { default: Content } = (await new Function(
    'runtime',
    `${code}; return { default: MDXContent }`,
  )(runtime)) as { default: React.ComponentType };

  // Create a UTC date object
  const date = new Date(frontmatter.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);

  return (
    <div className="max-w-4xl mx-auto bg-base-100">
      <div className="">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="btn btn-ghost btn-sm">
              ← Back to Blog
            </Link>
          </div>

          <article className="prose prose-lg max-w-none">
            <div className="flex items-center gap-2 mb-6">
              <BookOpenText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold m-0">{frontmatter.title}</h1>
            </div>

            <div className="min-h-[3rem] -mt-4">
              {frontmatter.description && (
                <p className="text-xl text-base-content/70">
                  {frontmatter.description}
                </p>
              )}
            </div>

            <div className="text-base-content/50 -mt-4 mb-8">
              {formattedDate}
            </div>

            {frontmatter.image && (
              <div className="my-8">
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  width={2400}
                  height={1260}
                  className="rounded-lg w-full h-auto"
                  priority
                  quality={90}
                />
              </div>
            )}

            <Content />
          </article>
        </div>
      </div>
    </div>
  );
}
