import Image from 'next/image';
import Link from 'next/link';
import { User, Book, Droplet } from 'lucide-react';
import RelatedPostsGrid from '@/components/RelatedPostsGrid';
import { getRandomBlogPosts } from '@/utils/blog';
import {
  generateWebAppSchema,
  generateOrganizationSchema,
} from '@/utils/structured-data';
import { createPageMetadata } from '@/config/metadata';
import { Metadata } from 'next';

// Only make the page dynamic when ingredients are present
export const dynamic = 'auto';
export const dynamicParams = true;

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata = createPageMetadata({
    title: 'CurlsBot - Your Curly Hair Guide',
    description:
      'Your guide to curly hair care. Find ingredient-conscious products, take quizzes, and learn about the Curly Girl Method.',
    path: '/',
  });

  return {
    ...baseMetadata,
    alternates: {
      canonical: 'https://www.curlsbot.com',
    },
  };
}

export default async function Home() {
  const randomPosts = await getRandomBlogPosts(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebAppSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Mini Hero */}
        <section className="flex flex-col items-center bg-base-200 rounded-xl p-8 mb-12">
          <Image
            src="/images/hero.png"
            alt="Curly hair illustration"
            width={200}
            height={200}
            className="mb-4 rounded-lg"
            priority
          />
          <h1 className="text-3xl font-bold mb-2 text-center">
            Your guide to ingredient-conscious curly hair care.
          </h1>
          <p className="text-base-content/70 mb-2 text-center">
            Simple tools and science-backed resources for every curl type.
          </p>
          <Link
            href="/cgm-analyzer"
            className="text-sm underline text-primary mt-2"
          >
            Go to the analyzer
          </Link>
        </section>

        {/* Cards/Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Learn About Your Hair */}
          <div className="card bg-base-100 rounded-box shadow-none h-full">
            <div className="card-body flex flex-col text-left">
              <User className="w-8 h-8 mb-2 text-primary" />
              <h2 className="card-title text-xl mb-2">Learn About Your Hair</h2>
              <p className="mb-4">
                Take our quick quiz to discover your curl type and get
                personalized tips.
              </p>
              <div className="card-actions justify-end w-full mt-auto">
                <Link
                  href="/hair-types/quiz"
                  className="btn btn-secondary w-full"
                >
                  Take the Hair Type Quiz
                </Link>
              </div>
            </div>
          </div>
          {/* Curly Girl Method */}
          <div className="card bg-base-100 rounded-box shadow-none h-full">
            <div className="card-body flex flex-col text-left">
              <Book className="w-8 h-8 mb-2 text-primary" />
              <h2 className="card-title text-xl mb-2">Curly Girl Method</h2>
              <p className="mb-4">
                Explore the CGM approach and see if it&apos;s right for your
                hair.
              </p>
              <div className="card-actions flex flex-col gap-2 w-full mt-auto">
                <Link href="/cgm-analyzer" className="btn btn-primary w-full">
                  Go to Analyzer
                </Link>
                <Link
                  href="/curly-girl-method"
                  className="btn btn-outline w-full"
                >
                  Go to CGM Hub
                </Link>
              </div>
            </div>
          </div>
          {/* Porosity */}
          <div className="card bg-base-100 rounded-box shadow-none h-full">
            <div className="card-body flex flex-col text-left">
              <Droplet className="w-8 h-8 mb-2 text-primary" />
              <h2 className="card-title text-xl mb-2">Porosity</h2>
              <p className="mb-4">
                Find out how your hair absorbs and retains moisture, and why it
                matters.
              </p>
              <div className="card-actions flex flex-col gap-2 w-full mt-auto">
                <Link href="/porosity/quiz" className="btn btn-accent w-full">
                  Porosity Quiz
                </Link>
                <Link href="/cgm-analyzer" className="btn btn-outline w-full">
                  Analyze Ingredients
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <RelatedPostsGrid posts={randomPosts} heading="From the Blog" />
      </main>
    </>
  );
}
