import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CurlsBot | Hair Care Ingredient Analysis Tool',
  description:
    'Learn how CurlsBot helps you analyze hair care ingredients, understand product compatibility, and make informed decisions about your curly hair care routine.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.curlsbot.com/about',
  },
  openGraph: {
    title: 'About CurlsBot | Hair Care Ingredient Analysis Tool',
    description:
      'Learn how CurlsBot helps you analyze hair care ingredients and make informed decisions about your curly hair care routine.',
    url: 'https://www.curlsbot.com/about',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'About CurlsBot - Hair Care Ingredient Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CurlsBot | Hair Care Ingredient Analysis Tool',
    description:
      'Learn how CurlsBot helps you analyze hair care ingredients and make informed decisions about your curly hair care routine.',
    images: ['/images/og-default.png'],
  },
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <InformationCircleIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">About CurlsBot</h1>
          </div>

          <div className="prose prose-lg">
            <p>
              Welcome to CurlsBot, your trusted companion for understanding hair
              care ingredients! We simplify your curly hair journey by analyzing
              product ingredients and helping you make informed decisions about
              the products you use. Whether you&apos;re just starting out or are
              a seasoned curly hair enthusiast, CurlsBot helps you decode
              complex ingredient lists to find products that match your needs.
            </p>

            <h2 className="text-2xl font-bold mt-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  How does CurlsBot analyze ingredients?
                </h3>
                <p>
                  Our sophisticated system combines pattern recognition with a
                  comprehensive database of hundreds of common hair care
                  ingredients to evaluate your product lists. This allows us to
                  provide you with detailed insights about the ingredients in
                  your hair care products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Why might I get unexpected results?
                </h3>
                <p>
                  Accuracy matters! The most common cause of unexpected results
                  is misspelled ingredients. For best results, we recommend
                  copying ingredient lists directly from manufacturer or
                  retailer websites rather than typing them manually. Even then,
                  some official listings may contain errors. If you spot any
                  inconsistencies, please let us know so we can continue
                  improving our system.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  What format should my ingredient list be in?
                </h3>
                <p>
                  CurlsBot works with comma-separated ingredient lists (e.g.,
                  &quot;ingredient 1, ingredient 2, ingredient 3&quot;).
                  Currently, we can&apos;t process lists that use other
                  separators (like slashes) or line breaks. Need help formatting
                  your list? Check out our{' '}
                  <Link href="/resources" className="link link-primary">
                    recommended online tools
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Can CurlsBot analyze photos of ingredient lists?
                </h3>
                <p>
                  Currently, CurlsBot processes text-only ingredient lists. For
                  accurate results, we recommend copying the ingredient list
                  from the manufacturer&apos;s website or authorized retailers.
                  If you need help with a product image, consider sharing it in
                  one of the curly hair communities listed on our{' '}
                  <Link href="/resources" className="link link-primary">
                    resources page
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  What does a &quot;Caution&quot; notification mean?
                </h3>
                <p>
                  When you see a &quot;Caution&quot; notice, it means
                  there&apos;s ongoing discussion about that ingredient in the
                  curly hair community. Since experts often have different
                  perspectives on certain ingredients, we encourage you to
                  explore additional resources and make informed decisions.
                  Visit our{' '}
                  <Link href="/resources" className="link link-primary">
                    resources page
                  </Link>{' '}
                  to connect with knowledgeable curly hair communities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Does CurlsBot support multiple languages?
                </h3>
                <p>
                  At present, CurlsBot analyzes English ingredient lists only.
                  For non-English products, we recommend connecting with
                  language-specific curly hair communities. Visit our{' '}
                  <Link href="/resources" className="link link-primary">
                    resources page
                  </Link>{' '}
                  to find international curly hair groups that can help you
                  evaluate products in your preferred language.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
