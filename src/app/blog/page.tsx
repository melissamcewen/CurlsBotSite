import Link from 'next/link';
import { BookOpenText, Info } from 'lucide-react';
import { Suspense } from 'react';
import BlogLoading from './loading';
import { createPageMetadata } from '@/config/metadata';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogFrontmatter {
  title: string;
  description?: string;
  date: string;
  image?: string;
}

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Read our latest articles about hair care, ingredients, and tips for curly and wavy hair.',
  path: '/blog',
});

// Separate component for blog posts to enable streaming
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {sortedPosts.map((post) => (
        <article
          key={post.slug}
          className="card bg-base-100 hover:bg-base-300 transition-colors"
        >
          <div className="card-body min-h-[150px]">
            <h2 className="card-title">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.frontmatter.title}
              </Link>
            </h2>
            <div className="min-h-[48px]">
              {post.frontmatter.description && (
                <p className="text-base-content/70">
                  {post.frontmatter.description}
                </p>
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
      <div className="p-3">
        <div className="">
          <div className="flex items-center gap-2 mb-6">
            <BookOpenText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Blog</h1>
          </div>

          <div className="alert mb-6 bg-base-100">
            <Info className="w-5 h-5" />
            <span>
              Note: Blog posts from 2018 have been updated and republished in
              December 2024 with new information and research.
            </span>
          </div>

          <Suspense fallback={<BlogLoading />}>
            <BlogPosts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
