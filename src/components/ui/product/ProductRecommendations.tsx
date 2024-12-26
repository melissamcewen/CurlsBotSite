import { ProductRecommendation } from './ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product, ProductDatabase } from 'haircare-ingredients-analyzer';
import { filterProductByCountry } from '@/lib/countryDetection';

export type ProductCategory =
  | 'shampoos'
  | 'conditioners'
  | 'cowashes'
  | 'deep_conditioners'
  | 'leave_ins'
  | 'creams'
  | 'gels'
  | 'foams'
  | 'custards';

export type PorosityType = 'high_porosity' | 'low_porosity' | 'normal_porosity';

export const CATEGORIES: ProductCategory[] = [
  'shampoos',
  'conditioners',
  'cowashes',
  'deep_conditioners',
  'leave_ins',
  'creams',
  'gels',
  'foams',
  'custards',
];

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  shampoos:
    'Cleansers that remove buildup and oil from your hair. Essential for low-porosity hair and should be used on other porosity types at least occasionally.',
  conditioners:
    'Products that add moisture and help detangle hair. Almost everyone needs conditioner!',
  cowashes:
    'Gentle, non-lathering cleansers that clean without stripping natural oils. Use these for daily wash if you have high-porosity hair.',
  deep_conditioners:
    'Intensive treatments that restore moisture and repair damage. Essential at least weekly for high porosity hair and good for all porosity types occasionally.',
  leave_ins:
    'Light conditioners that stay in your hair to provide ongoing moisture. Most important for high-porosity hair. May weigh down low-porosity hair.',
  creams:
    'Rich moisturizers that help define and shape curls, and provide a barrier to protect against moisture loss. Essential for high-porosity hair. May weigh down low-porosity hair.',
  gels: 'Styling products that provide hold and definition. Useful for all porosity types.',
  foams:
    'Light styling products that add volume and definition without weight. A great option for low-porosity hair.',
  custards:
    'Thick styling products that provide moisture and definition. Useful for all porosity types.',
};

const POROSITY_CATEGORIES: Record<PorosityType, ProductCategory[]> = {
  high_porosity: [
    'cowashes',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'gels',
  ],
  low_porosity: ['shampoos', 'conditioners', 'custards', 'foams', 'gels'],
  normal_porosity: [
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'creams',
    'gels',
  ],
};

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
    .replace(/\s+/g, '_') as PorosityType;

  const validCategories = POROSITY_CATEGORIES[porosityTag] || CATEGORIES;

  const recommendations = CATEGORIES.reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as Record<ProductCategory, RecommendedProduct[] | null>);

  const products: ProductDatabase = getBundledProducts();

  Object.entries(products.products).forEach(
    ([_, product]: [string, Product]) => {
      const productCategory = product
        .product_categories?.[0] as ProductCategory;

      if (
        !productCategory ||
        !validCategories.includes(productCategory) ||
        !product.tags?.includes(porosityTag) ||
        !filterProductByCountry(product)
      ) {
        return;
      }

      if (!recommendations[productCategory]) {
        recommendations[productCategory] = [];
      }
      recommendations[productCategory]!.push({
        name: product.name,
        brand: product.brand,
        buyUrl: product.buy_url,
      });
    },
  );

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

export function ProductRecommendations({
  porosityType,
  className = '',
}: ProductRecommendationsProps) {
  const recommendations = getProductRecommendations(porosityType);
  const hasProducts = Object.values(recommendations).some(
    (products) => products !== null && products.length > 0,
  );

  return (
    <div className={className} data-testid="product-recommendations">
      <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
      <div className="min-h-[200px]">
        {!hasProducts ? (
          <p className="text-base-content/70">
            No product recommendations available at this time.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => {
              const products = recommendations[category];
              if (!products) return null;

              return (
                <div key={category}>
                  <div className="space-y-4">
                    <div className="h-32">
                      <h3 className="text-xl font-semibold capitalize">
                        {category.replace(/_/g, ' ')}
                      </h3>
                      <p className="text-base-content/70 mt-1">
                        {CATEGORY_DESCRIPTIONS[category]}
                      </p>
                    </div>
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
