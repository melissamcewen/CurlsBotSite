import { getBlogPosts } from '@/utils/markdown';
import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/solid';

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
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-6">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Blog</h1>
          </div>

          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <article key={post.slug} className="card bg-base-200 hover:bg-base-300 transition-colors">
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
                    {formatDate(post.frontmatter.date)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
