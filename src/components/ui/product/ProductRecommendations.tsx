import { ProductRecommendation } from './ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product, ProductDatabase } from 'haircare-ingredients-analyzer';

export type ProductCategory = 'shampoos' | 'conditioners' | 'cowashes' | 'deep_conditioners' | 'leave_ins' | 'creams' | 'gels';

export const CATEGORIES: ProductCategory[] = ['shampoos', 'conditioners', 'cowashes', 'deep_conditioners', 'leave_ins', 'creams', 'gels'];

interface ProductRecommendationsProps {
  porosityType: string;
  className?: string;
}

interface RecommendedProduct {
  name: string;
  brand: string;
  buyUrl: string;
}

export function getProductRecommendations(porosityType: string) {
  const porosityTag = porosityType
    .toLowerCase()
    .replace(/\s+hair$/, '')
    .replace(/\s+/g, '_');



  const recommendations: Record<ProductCategory, RecommendedProduct[] | null> = {
    shampoos: [],
    conditioners: [],
    cowashes: [],
    deep_conditioners: [],
    leave_ins: [],
    creams: [],
    gels: []
  };

  const products: ProductDatabase = getBundledProducts();

  const allTags = new Set<string>();
  Object.values(products.products).forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => allTags.add(tag));
    }
  });


  Object.entries(products.products).forEach(([_, product]: [string, Product]) => {
    if (!product.product_categories || product.product_categories.length === 0) {

      return;
    }

    const category = product.product_categories[0] as ProductCategory;
    if (product.tags?.includes(porosityTag) && CATEGORIES.includes(category)) {

      if (!recommendations[category]) {
        recommendations[category] = [];
      }
      recommendations[category]!.push({
        name: product.name,
        brand: product.brand,
        buyUrl: product.buy_url
      });
    }
  });

  // Sort products within each category by brand and name
  Object.keys(recommendations).forEach((category) => {
    const products = recommendations[category as ProductCategory];
    if (!products || products.length === 0) {
      recommendations[category as ProductCategory] = null;
    } else {
      products.sort((a, b) => {
        const brandCompare = a.brand.localeCompare(b.brand);
        if (brandCompare !== 0) return brandCompare;
        return a.name.localeCompare(b.name);
      });
    }
  });


  return recommendations;
}

export function ProductRecommendations({ porosityType, className = '' }: ProductRecommendationsProps) {
  const recommendations = getProductRecommendations(porosityType);
  const hasProducts = Object.values(recommendations).some(products => products !== null && products.length > 0);

  return (
    <div className={className} data-testid="product-recommendations">
      <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
      <div className="min-h-[200px]">
        {!hasProducts ? (
          <p className="text-base-content/70">No product recommendations available at this time.</p>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {CATEGORIES.map((category) => {
              const products = recommendations[category];
              if (!products) return null;

              return (
                <div key={category} className="flex-1 min-w-[350px] p-4">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold capitalize">
                      {category.replace(/_/g, ' ')}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {products.map((product, index) => (
                        <ProductRecommendation
                          key={`${category}-${index}`}
                          category={category}
                          brand={product.brand}
                          name={product.name}
                          buyUrl={product.buyUrl}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
