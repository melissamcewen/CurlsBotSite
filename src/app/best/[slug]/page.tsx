import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductListicle } from '@/components/ui/product/ProductListicle';
import { filterProducts } from '@/lib/productFiltering';
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

  // Filter products based on page configuration
  const filteredProducts = filterProducts(Object.values(products.products), {
    category:
      page.category === 'all'
        ? undefined
        : Array.isArray(page.category)
        ? page.category
        : [page.category],
    country: 'all', // We'll handle country filtering client-side
    requireFeatured: false,
    analysisFilters: {
      cgmApproved: page.filters.cgmApproved || false,
      frizzResistant: page.filters.frizzResistant || false,
      lightweight: page.filters.lightweight || false,
      highPorosity: page.filters.highPorosity || false,
      lowPorosity: page.filters.lowPorosity || false,
    },
  })
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
        products={filteredProducts}
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
