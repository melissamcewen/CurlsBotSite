import { notFound } from 'next/navigation';
import { getBlogPost } from '@/utils/markdown';
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
  content: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return createDynamicPageMetadata({
    title: post.frontmatter.title,
    description:
      post.frontmatter.description ||
      `Read about ${post.frontmatter.title} on CurlsBot.`,
    path: `/blog/${resolvedParams.slug}`,
    hasContent: true,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Create a UTC date object
  const date = new Date(post.frontmatter.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="btn btn-ghost btn-sm">
              ← Back to Blog
            </Link>
          </div>

          <article className="prose prose-lg max-w-none">
            <div className="flex items-center gap-2 mb-6">
              <BookOpenText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold m-0">
                {post.frontmatter.title}
              </h1>
            </div>

            <div className="min-h-[3rem] -mt-4">
              {post.frontmatter.description && (
                <p className="text-xl text-base-content/70">
                  {post.frontmatter.description}
                </p>
              )}
            </div>

            <div className="text-base-content/50 -mt-4 mb-8">
              {formattedDate}
            </div>

            {post.frontmatter.image && (
              <div className="my-8">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  width={2400}
                  height={1260}
                  className="rounded-lg w-full h-auto"
                  priority
                  quality={90}
                />
              </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </div>
    </div>
  );
}
