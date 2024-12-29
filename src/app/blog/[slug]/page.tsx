import { getBlogPost } from '@/utils/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';

interface BlogPost {
  frontmatter: {
    title: string;
    description?: string;
    date: string;
    image?: string;
  };
  content: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const { frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toISOString();

  return {
    title: `${frontmatter.title} | CurlsBot Blog`,
    description: frontmatter.description,
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${resolvedParams.slug}`,
      type: 'article',
      publishedTime: formattedDate,
      authors: ['CurlsBot'],
      images: frontmatter.image
        ? [
            {
              url: frontmatter.image,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : [
            {
              url: '/images/og-default.png',
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image
        ? [frontmatter.image]
        : ['/images/og-default.png'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
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
              <BookOpenIcon className="w-8 h-8 text-primary" />
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
