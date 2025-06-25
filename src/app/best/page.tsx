import Link from 'next/link';
import { BEST_PRODUCT_PAGES } from '@/lib/bestProducts';
import { Metadata } from 'next';
import { Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Curly Hair Products | Expert Curated Lists',
  description:
    'Discover our expert-curated lists of the best products for curly hair. Find the perfect products for your hair type, porosity, and specific needs.',
  openGraph: {
    title: 'Best Curly Hair Products | Expert Curated Lists',
    description:
      'Discover our expert-curated lists of the best products for curly hair. Find the perfect products for your hair type, porosity, and specific needs.',
    type: 'website',
  },
};

// Group pages by category for better organization
const groupedPages = BEST_PRODUCT_PAGES.reduce((acc, page) => {
  // Handle different category types
  let categories: string[];
  if (page.category === 'all') {
    categories = ['All Categories'];
  } else if (Array.isArray(page.category)) {
    categories = page.category.map((cat) => cat.replace(/_/g, ' '));
  } else {
    categories = [page.category.replace(/_/g, ' ')];
  }

  // Add page to each of its categories
  categories.forEach((category) => {
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(page);
  });

  return acc;
}, {} as Record<string, typeof BEST_PRODUCT_PAGES>);

export default function BestProductsIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Best Curly Hair Products</h1>
        <p className="text-lg text-base-content/70">
          Discover our expert-curated lists of the best products for curly hair.
          Each list is carefully crafted based on ingredient analysis,
          performance testing, and real user feedback.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12">
        {Object.entries(groupedPages).map(([category, pages]) => (
          <section key={category} className="card bg-base-100">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
              <div className="space-y-4">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/best/${page.slug}`}
                    className="block hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            {page.title}
                          </h3>
                          <p className="text-base-content/70 mb-2">
                            {page.description}
                          </p>
                          <div className="flex items-center text-primary gap-2">
                            <span>View Products</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
