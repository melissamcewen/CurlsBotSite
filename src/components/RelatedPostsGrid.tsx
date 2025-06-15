import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    image?: string;
  };
}

interface RelatedPostsGridProps {
  posts: BlogPost[];
  heading?: string;
}

export default function RelatedPostsGrid({
  posts,
  heading = 'Related Articles',
}: RelatedPostsGridProps) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="mt-16 not-prose">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </figure>
            )}
            <div className="card-body flex flex-col justify-between">
              <div>
                <h3 className="card-title text-lg">{post.frontmatter.title}</h3>
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
  );
}
