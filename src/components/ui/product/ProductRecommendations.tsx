import { ProductCard } from './ProductCard';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product, ProductDatabase } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { ROUTINE_STEPS, type RoutineStep } from '@/lib/routineBuilder';
import { getCountryFromHostname } from '@/lib/countryDetection';
import { ShoppingBag } from 'lucide-react';

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
  description?: string;
  ingredients_raw?: string;
  status?: 'ok' | 'caution' | 'warning' | 'error';
}

export function getProductRecommendations(porosityType: string) {
  const porosityTag = porosityType
    .toLowerCase()
    .replace(/\s+hair$/, '')
    .replace(/\s+/g, '_') as PorosityType;

  const validCategories = POROSITY_CATEGORIES[porosityTag] || CATEGORIES;
  const userCountry = getCountryFromHostname();

  const recommendations = CATEGORIES.reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as Record<ProductCategory, RecommendedProduct[] | null>);

  const products: ProductDatabase = getBundledProducts();

  // First pass: try to get featured products
  Object.entries(products.products).forEach(
    ([_, product]: [string, Product]) => {
      if (
        !product.product_categories ||
        product.product_categories.length === 0 ||
        !product.tags?.includes('featured')
      ) {
        return;
      }

      // Skip if product has a country specified and it doesn't match user's country
      if (product.country && product.country !== userCountry) {
        return;
      }

      const category = product.product_categories[0] as ProductCategory;
      if (
        product.tags?.includes(porosityTag) &&
        validCategories.includes(category)
      ) {
        if (!recommendations[category]) {
          recommendations[category] = [];
        }
        if (recommendations[category]!.length < 3) {
          recommendations[category]!.push({
            name: product.name,
            brand: product.brand,
            buyUrl: product.buy_url,
            description: product.description,
            ingredients_raw: product.ingredients_raw,
            status: product.status,
          });
        }
      }
    },
  );

  // Second pass: fill in any empty categories with non-featured products
  Object.entries(products.products).forEach(
    ([_, product]: [string, Product]) => {
      if (
        !product.product_categories ||
        product.product_categories.length === 0
      ) {
        return;
      }

      // Skip if product has a country specified and it doesn't match user's country
      if (product.country && product.country !== userCountry) {
        return;
      }

      const category = product.product_categories[0] as ProductCategory;
      if (
        product.tags?.includes(porosityTag) &&
        validCategories.includes(category) &&
        (!recommendations[category] || recommendations[category]!.length === 0)
      ) {
        if (!recommendations[category]) {
          recommendations[category] = [];
        }
        if (recommendations[category]!.length < 3) {
          recommendations[category]!.push({
            name: product.name,
            brand: product.brand,
            buyUrl: product.buy_url,
            description: product.description,
            ingredients_raw: product.ingredients_raw,
            status: product.status,
          });
        }
      }
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
      <h2 className="text-2xl font-bold mb-2">Recommended Products</h2>
      <p className="text-base-content/70 text-sm mb-6 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 flex-shrink-0" />
        Product links are affiliate links that help support the site
      </p>
      <div className="min-h-[200px]">
        {!hasProducts ? (
          <p className="text-base-content/70">
            No product recommendations available at this time.
          </p>
        ) : (
          <div className="space-y-8">
            {Object.entries(ROUTINE_STEPS).map(([stepId, step]) => {
              // Get all products for categories in this step
              const stepProducts = step.categories.flatMap((category) => {
                const products = recommendations[category as ProductCategory];
                return products
                  ? products.map((product) => ({
                      category,
                      ...product,
                    }))
                  : [];
              });

              if (stepProducts.length === 0) return null;

              return (
                <div key={stepId} className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="text-base-content/70">{step.description}</p>

                    <div className="space-y-8">
                      {step.categories.map((category) => {
                        const products =
                          recommendations[category as ProductCategory];
                        if (!products) return null;

                        return (
                          <div key={category} className="space-y-4">
                            <div>
                              <h4 className="text-lg font-medium capitalize">
                                {category.replace(/_/g, ' ')}
                              </h4>
                              <p className="text-base-content/70 mt-1">
                                {
                                  CATEGORY_DESCRIPTIONS[
                                    category as ProductCategory
                                  ]
                                }
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {products.map((product, index) => (
                                <ProductCard
                                  key={`${category}-${index}`}
                                  product={{
                                    title: product.brand,
                                    description: product.name,
                                    product: {
                                      ...product,
                                      id: `${category}-${index}`,
                                      buy_url: product.buyUrl,
                                      product_categories: [category],
                                    },
                                  }}
                                  category={category}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="card bg-primary text-primary-content mt-8">
        <div className="card-body text-center">
          <h3 className="text-xl font-semibold">Build Your Own Routine</h3>
          <p>
            Want to create a personalized hair care routine? Use our routine
            builder to get step-by-step recommendations!
          </p>
          <Link
            href={`/routine-builder?porosity=${porosityType
              .toLowerCase()
              .replace(/\s+hair$/, '')
              .replace(/\s+/g, '_')}`}
            className="btn btn-secondary mt-2 w-full max-w-md mx-auto"
          >
            Build My Routine
          </Link>
        </div>
      </div>
    </div>
  );
}
