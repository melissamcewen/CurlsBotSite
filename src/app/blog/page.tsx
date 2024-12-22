import { getBlogPosts } from '@/utils/markdown';
import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogLoading from './loading';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date: string;
  };
}

export const metadata: Metadata = {
  title: 'Blog | CurlsBot',
  description: 'Articles about hair care, ingredients, and maintaining healthy hair',
  openGraph: {
    title: 'CurlsBot Blog',
    description: 'Articles about hair care, ingredients, and maintaining healthy hair',
    type: 'website',
    images: ['/icon.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurlsBot Blog',
    description: 'Articles about hair care, ingredients, and maintaining healthy hair',
    images: ['/icon.png']
  }
};

// Separate component for blog posts to enable streaming
async function BlogPosts() {
  const posts = await getBlogPosts();

  // Sort posts by date, newest first
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {sortedPosts.map((post) => (
        <article key={post.slug} className="card bg-base-200 hover:bg-base-300 transition-colors">
          <div className="card-body min-h-[150px]">
            <h2 className="card-title">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.frontmatter.title}
              </Link>
            </h2>
            <div className="min-h-[48px]">
              {post.frontmatter.description && (
                <p className="text-base-content/70">{post.frontmatter.description}</p>
              )}
            </div>
            <div className="text-sm text-base-content/50">
              {formatDate(post.frontmatter.date)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-6">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Blog</h1>
          </div>

          <Suspense fallback={<BlogLoading />}>
            <BlogPosts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
