import { getBlogPost } from '@/utils/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';

interface BlogPost {
  frontmatter: {
    title: string;
    description?: string;
    date: string;
  };
  content: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  const { frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toISOString();

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: formattedDate,
      authors: ['CurlsBot'],
      images: ['/icon.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: ['/icon.png']
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Create a UTC date object
  const date = new Date(post.frontmatter.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
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
              <h1 className="text-3xl font-bold m-0">{post.frontmatter.title}</h1>
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

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </div>
    </div>
  );
}
