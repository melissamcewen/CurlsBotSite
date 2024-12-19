import { getBlogPost } from '@/utils/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Link href="/blog" className="btn btn-ghost btn-sm">
          ← Back to Blog
        </Link>
      </div>

      <article className="prose prose-base max-w-none">
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.description && (
          <p className="text-xl text-base-content/70 -mt-4">
            {post.frontmatter.description}
          </p>
        )}
        <div className="text-base-content/50 -mt-4">
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
