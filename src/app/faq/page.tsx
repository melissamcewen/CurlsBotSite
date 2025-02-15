import { Info } from 'lucide-react';
import Link from 'next/link';
import { createPageMetadata } from '@/config/metadata';

export const metadata = createPageMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about CurlsBot, ingredient analysis, and how to get the best results.',
  path: '/faq',
});

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          </div>

          <div className="prose prose-lg">
            <div className="space-y-8">
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
