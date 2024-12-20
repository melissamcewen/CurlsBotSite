import { getBlogPosts } from '@/utils/markdown';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date: string;
  };
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Sort posts by date, newest first
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <article key={post.slug} className="card bg-base-300 hover:bg-base-300 transition-colors">
            <div className="card-body">
              <h2 className="card-title">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.frontmatter.title}
                </Link>
              </h2>
              {post.frontmatter.description && (
                <p className="text-base-content/70">{post.frontmatter.description}</p>
              )}
              <div className="text-sm text-base-content/50">
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
