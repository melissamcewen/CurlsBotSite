import { notFound } from 'next/navigation';
import { createDynamicPageMetadata } from '@/config/metadata';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenText } from 'lucide-react';

interface BlogPost {
  frontmatter: {
    title: string;
    description?: string;
    date: string;
    image?: string;
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;

  // Try to get MDX content
  let Content;
  try {
    const { default: PostContent, frontmatter } = await import(
      `@/content/blog/${resolvedParams.slug}.mdx`
    );
    Content = { Component: PostContent, frontmatter };
  } catch (e) {
    console.error(`Error loading blog post ${resolvedParams.slug}:`, e);
    notFound();
  }

  return createDynamicPageMetadata({
    title: Content.frontmatter.title,
    description:
      Content.frontmatter.description ||
      `Read about ${Content.frontmatter.title} on CurlsBot.`,
    path: `/blog/${resolvedParams.slug}`,
    hasContent: true,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;

  // Try to get MDX content
  let Content;
  try {
    const { default: PostContent, frontmatter } = await import(
      `@/content/blog/${resolvedParams.slug}.mdx`
    );
    Content = { Component: PostContent, frontmatter };
  } catch (e) {
    console.error(`Error loading blog post ${resolvedParams.slug}:`, e);
    notFound();
  }

  // Create a UTC date object
  const date = new Date(Content.frontmatter.date);
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
              <h1 className="text-3xl font-bold m-0">
                {Content.frontmatter.title}
              </h1>
            </div>

            <div className="min-h-[3rem] -mt-4">
              {Content.frontmatter.description && (
                <p className="text-xl text-base-content/70">
                  {Content.frontmatter.description}
                </p>
              )}
            </div>

            <div className="text-base-content/50 -mt-4 mb-8">
              {formattedDate}
            </div>

            {Content.frontmatter.image && (
              <div className="my-8">
                <Image
                  src={Content.frontmatter.image}
                  alt={Content.frontmatter.title}
                  width={2400}
                  height={1260}
                  className="rounded-lg w-full h-auto"
                  priority
                  quality={90}
                />
              </div>
            )}

            <Content.Component />
          </article>
        </div>
      </div>
    </div>
  );
}
