import { notFound } from 'next/navigation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getMarkdownData } from '@/utils/markdown';
import { slugToId, idToSlug, formatTitle } from '@/utils/slugs';

interface Props {
  params: {
    tag: string;
  };
}

export default async function ProductTagPage({ params }: Props) {
  const tagId = slugToId(params.tag);

  // Try to get markdown content
  let content;
  try {
    content = await getMarkdownData(`products/${tagId}`);
  } catch (e) {
    // If no markdown file exists, use default content
    content = {
      title: formatTitle(tagId) + ' Products',
      description: `Products tagged with ${tagId.replace(/_/g, ' ')}.`,
      content: '',
    };
  }

  // Get products with this tag
  const products = getBundledProducts();
  const taggedProducts = Object.entries(products.products)
    .filter(([_, product]) => product.tags.includes(tagId))
    .map(([id, product]) => ({
      id,
      category: product.product_categories[0],
      brand: product.brand,
      name: product.name,
      buyLinks: product.buy_links,
    }));

  if (taggedProducts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      <p className="text-lg mb-8">{content.description}</p>

      {content.content && (
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      )}

      <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
      <div className="space-y-4">
        {taggedProducts.map((product) => (
          <ProductRecommendation
            key={product.id}
            category={product.category}
            brand={product.brand}
            name={product.name}
            buyLinks={product.buyLinks}
          />
        ))}
      </div>
    </div>
  );
}

// Generate static paths for known tags
export function generateStaticParams() {
  const products = getBundledProducts();
  const tags = new Set<string>();

  // Collect all unique tags
  Object.values(products.products).forEach((product) => {
    product.tags.forEach((tag) => tags.add(tag));
  });

  // Convert underscores to hyphens for URLs
  return Array.from(tags).map((tag) => ({
    tag: idToSlug(tag),
  }));
}
