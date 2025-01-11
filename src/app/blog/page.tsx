import Link from 'next/link';
import { BookOpenText, Info } from 'lucide-react';
import { Suspense } from 'react';
import BlogLoading from './loading';
import { createPageMetadata } from '@/config/metadata';
import { readdir } from 'fs/promises';
import path from 'path';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date: string;
  };
}

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Read our latest articles about hair care, ingredients, and tips for curly and wavy hair.',
  path: '/blog',
});

// Separate component for blog posts to enable streaming
async function BlogPosts() {
  // Get all MDX files from the blog directory
  const contentDirectory = path.join(process.cwd(), 'src/content/blog');
  const files = await readdir(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  // Import all blog posts
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      try {
        const slug = file.replace(/\.mdx$/, '');
        const { frontmatter } = await import(`@/content/blog/${slug}.mdx`);

        // Debug logging
        console.log('Imported post:', slug, frontmatter);

        if (!frontmatter) {
          console.error(`Missing frontmatter for ${slug}`);
          return null;
        }

        if (!frontmatter.date) {
          console.error(`Missing date in frontmatter for ${slug}`);
          return null;
        }

        return {
          slug,
          frontmatter,
        };
      } catch (error) {
        console.error(`Error importing ${file}:`, error);
        return null;
      }
    }),
  );

  // Filter out any failed imports
  const validPosts = posts.filter((post): post is BlogPost => post !== null);

  // Sort posts by date, newest first
  const sortedPosts = validPosts.sort((a, b) => {
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
