import { ProductRecommendation } from './ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product, ProductDatabase } from 'haircare-ingredients-analyzer';

export type ProductCategory = 'shampoos' | 'conditioners' | 'cowashes' | 'deep_conditioners' | 'leave_ins' | 'creams' | 'gels';

export const CATEGORIES: ProductCategory[] = ['shampoos', 'conditioners', 'cowashes', 'deep_conditioners', 'leave_ins', 'creams', 'gels'];

interface ProductRecommendationsProps {
  porosityType: string;
  className?: string;
}

export function getProductRecommendations(porosityType: string) {
  const porosityTag = porosityType.toLowerCase().replace(' ', '_');
  const recommendations: Record<ProductCategory, { name: string; brand: string; buyUrl: string } | null> = {
    shampoos: null,
    conditioners: null,
    cowashes: null,
    deep_conditioners: null,
    leave_ins: null,
    creams: null,
    gels: null
  };

  const products: ProductDatabase = getBundledProducts();
  Object.entries(products.products).forEach(([_, product]: [string, Product]) => {
    const category = product.product_categories[0] as ProductCategory;
    if (product.tags?.includes(porosityTag) && !recommendations[category]) {
      recommendations[category] = {
        name: product.name,
        brand: product.brand,
        buyUrl: product.buy_url
      };
    }
  });

  return recommendations;
}

export function ProductRecommendations({ porosityType, className = '' }: ProductRecommendationsProps) {
  const recommendations = getProductRecommendations(porosityType);

  return (
    <div className={className} data-testid="product-recommendations">
      <div className="space-y-4">
        {CATEGORIES.map((category) => {
          const product = recommendations[category];
          if (!product) return null;

          return (
            <ProductRecommendation
              key={category}
              category={category}
              brand={product.brand}
              name={product.name}
              buyUrl={product.buyUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
