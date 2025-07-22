import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductListicle } from '@/components/ui/product/ProductListicle';
import {
  getBestProductPage,
  getAllBestProductSlugs,
  defaultProductSort,
} from '@/lib/bestProducts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all valid slugs
export async function generateStaticParams() {
  return getAllBestProductSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBestProductPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
    },
  };
}

export default async function BestProductsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getBestProductPage(slug);
  if (!page) notFound();

  const products = getBundledProducts();

  // Get all products and let the client component handle filtering
  const allProducts = Object.values(products.products)
    .filter((product) => {
      // Apply tag filters if specified
      if (page.filters.tags) {
        return page.filters.tags.every((tag) => product.tags?.includes(tag));
      }
      return true;
    })
    .sort((a, b) => {
      // Use custom sort function if provided
      if (page.sortProducts) {
        return page.sortProducts(a, b);
      }

      // Use default sorting that prioritizes products with custom descriptions
      return defaultProductSort(a, b, page);
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductListicle
        products={allProducts}
        category={
          page.category === 'all'
            ? 'all'
            : Array.isArray(page.category)
            ? page.category[0]
            : page.category
        }
        title={page.title}
        description={page.description}
        howWePicked={page.howWePicked}
        page={page}
      />
    </div>
  );
}
