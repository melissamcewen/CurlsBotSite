import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    image?: string;
  };
}

async function getLatestBlogPosts(): Promise<BlogPost[]> {
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

  // Filter for posts with images and exclude welcome-back
  const eligiblePosts = posts
    .filter((post) => post.frontmatter.image && post.slug !== 'welcome-back')
    .sort(() => Math.random() - 0.5); // Randomize the array

  // Take the first 3 posts after randomization
  return eligiblePosts.slice(0, 3);
}

export default async function Heroes() {
  const latestPosts = await getLatestBlogPosts();

  return (
    <div className="mt-5">
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h2 className="text-5xl font-bold mb-4">
              🔍 Not sure what your curl type is?
            </h2>
            <p className="text-xl mb-8">
              Take our quick hair type quiz to find out your curl pattern,
              product tips, and custom routine.
            </p>
            <Link href="/hair-types/quiz" className="btn btn-primary btn-lg">
              Take the Quiz <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h2 className="text-5xl font-bold mb-8">Guides for Curly Hair</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card bg-base-100 hover:bg-base-300 transition-colors"
                >
                  {post.frontmatter.image && (
                    <figure className="relative h-48">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-t-xl"
                      />
                    </figure>
                  )}
                  <div className="card-body flex flex-col justify-between">
                    <div>
                      <h3 className="card-title text-lg ">
                        {post.frontmatter.title}
                      </h3>
                      {post.frontmatter.description && (
                        <p className="text-base-content/70 text-sm line-clamp-2 mt-2 text-left">
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
            <div className="mt-8">
              <Link href="/blog" className="btn btn-primary">
                View All Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
