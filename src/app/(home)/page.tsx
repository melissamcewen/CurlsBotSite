import Image from 'next/image';
import Link from 'next/link';
import { Icon, Book, Droplet } from 'lucide-react';
import { bottleDispenser } from '@lucide/lab';
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
      <div className="max-w-6xl mx-auto px-2 py-2">
        {/* Mini Hero */}
        <section className="flex flex-col items-center bg-base-200 rounded-xl p-2 mb-5">
          <Image
            src="/hero.svg"
            alt="CurlsBot logo"
            width={1420}
            height={935}
            className="mb-4 rounded-lg max-w-lg"
            priority
          />
          <h1 className="text-3xl font-bold mb-2 text-center">
            Master Your Curls and Waves
          </h1>
          <p className="text-base text-base-content/80 leading-relaxed mb-4 text-center max-w-xl mx-auto">
            Get personalized tools, tips, and product picks to help you
            understand and care for your unique hair type.
          </p>
          <Link
            href="/analyzer"
            className="btn btn-primary mt-2"
          >
            Go to the ingredient analyzer &rarr;
          </Link>
        </section>

        {/* Cards/Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Learn About Your Hair */}
          <div className="card bg-base-100 rounded-box shadow-none h-full">
            <div className="card-body flex flex-col text-left">
              <Book className="w-8 h-8 mb-2 text-primary" />
              <h2 className="card-title text-xl mb-2">Learn About Your Hair</h2>
              <p className="mb-4">
                Not sure if your hair is wavy, curly, or straight? Take our
                quick quiz to discover your hair type and get personalized care
                tips and product recommendations.
              </p>
              <div className="card-actions justify-end w-full mt-auto">
                <Link
                  href="/hair-types/quiz"
                  className="btn btn-secondary w-full"
                >
                  Find Your Hair Type
                </Link>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 rounded-box shadow-none h-full">
            <div className="card-body flex flex-col text-left">
              <Droplet className="w-8 h-8 mb-2 text-primary" />
              <h2 className="card-title text-xl mb-2">Porosity</h2>
              <p className="mb-4">
                Hair porosity affects how well your hair absorbs and retains
                moisture. <br />
                <br />
                Understanding porosity helps you choose the best products and
                techniques for your hair.
              </p>
              <div className="card-actions flex flex-col gap-2 w-full mt-auto">
                <Link href="/porosity-quiz" className="btn btn-primary w-full">
                  Find Your Porosity
                </Link>
              </div>
            </div>
          </div>
          {/* Porosity */}
          <div className="card bg-base-100 rounded-box shadow-none h-full">
            <div className="card-body flex flex-col text-left">
              <Icon
                iconNode={bottleDispenser}
                className="w-8 h-8 mb-2 text-primary"
              />
              <h2 className="card-title text-xl mb-2">Ingredients Analyzer</h2>
              <p className="mb-4">
                CurlsBot is the most popular ingredient analyzer for curly and
                wavy hair.

                <br />
                <br />
                It&apos;s perfect for analyzing if a product is right for your
                porosity or finding products compatible with the{' '}
                <Link href="/curly-girl-method" className="link">
                  Curly Girl Method
                </Link>
                .
              </p>

              <div className="card-actions flex flex-col gap-2 w-full mt-auto">
                <Link href="/analyzer" className="btn btn-accent w-full">
                  Analyze Your Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <RelatedPostsGrid
          posts={randomPosts}
          heading="From the Blog"
          variant="light"
        />
      </div>
    </>
  );
}
