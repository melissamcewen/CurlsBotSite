import { notFound } from 'next/navigation';
import { createDynamicPageMetadata } from '@/config/metadata';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenText, ArrowRight } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

interface BlogFrontmatter {
  title: string;
  description?: string;
  date?: string;
  image?: string;
  author?: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
}

// Add structured data for the article
function generateStructuredData(frontmatter: BlogFrontmatter, slug: string) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image
      ? `https://curlsbot.com${frontmatter.image}`
      : undefined,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://curlsbot.com/blog/${slug}`,
    },
    author: frontmatter.author
      ? {
          '@type': 'Person',
          name: frontmatter.author,
        }
      : {
          '@type': 'Organization',
          name: 'CurlsBot',
          url: 'https://curlsbot.com',
        },
    publisher: {
      '@type': 'Organization',
      name: 'CurlsBot',
      url: 'https://curlsbot.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://curlsbot.com/logo.png',
      },
    },
  };

  return structuredData;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  let mdxModule;
  try {
    mdxModule = await import(`@/content/blog/${resolvedParams.slug}.mdx`);
  } catch (e) {
    notFound();
  }

  // Access frontmatter through the getter
  const frontmatter = mdxModule.frontmatter as BlogFrontmatter;
  if (!frontmatter || !frontmatter.title) {
    notFound();
  }

  return createDynamicPageMetadata({
    title: frontmatter.title,
    description:
      frontmatter.description || `Read about ${frontmatter.title} on CurlsBot.`,
    path: `/blog/${resolvedParams.slug}`,
    hasContent: true,
  });
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const files = await fs.readdir(blogDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const post = await import(`@/content/blog/${file}`);
      return {
        slug: file.replace('.mdx', ''),
        frontmatter: post.frontmatter,
      };
    }),
  );

  // Filter for posts with images and exclude current post and welcome-back
  const eligiblePosts = posts
    .filter(
      (post) =>
        post.frontmatter.image &&
        post.slug !== currentSlug &&
        post.slug !== 'welcome-back',
    )
    .sort(() => Math.random() - 0.5); // Randomize the array

  // Take the first 3 posts after randomization
  return eligiblePosts.slice(0, 3);
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

  // Get related posts
  const relatedPosts = await getRelatedPosts(resolvedParams.slug);

  // Format date if it exists
  const formattedDate = frontmatter.date
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(frontmatter.date))
    : null;

  const structuredData = generateStructuredData(
    frontmatter,
    resolvedParams.slug,
  );

  return (
    <div className="bg-base-100 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="max-w-4xl mx-auto">
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

            {formattedDate && (
              <div className="text-base-content/50 -mt-4 mb-8">
                {formattedDate}
              </div>
            )}

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

          {relatedPosts.length > 0 && (
            <div className="mt-16 not-prose">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="card bg-base-200 hover:bg-base-300 transition-colors"
                  >
                    {post.frontmatter.image && (
                      <figure className="relative h-48">
                        <Image
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover rounded-t-xl"
                        />
                      </figure>
                    )}
                    <div className="card-body flex flex-col justify-between">
                      <div>
                        <h3 className="card-title text-lg">
                          {post.frontmatter.title}
                        </h3>
                        {post.frontmatter.description && (
                          <p className="text-base-content/70 text-sm line-clamp-2 mt-2">
                            {post.frontmatter.description}
                          </p>
                        )}
                      </div>
                      <div className="card-actions justify-end mt-4">
                        <div className="text-primary flex items-center gap-1 text-sm">
                          Read more <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
