import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product } from 'haircare-ingredients-analyzer';

export type CountryCode = 'US' | 'AU';
export type PorosityType = 'high_porosity' | 'low_porosity' | 'normal_porosity';

export type ProductCategory =
  | 'clarifying_shampoos'
  | 'shampoos'
  | 'cowashes'
  | 'conditioners'
  | 'deep_conditioners'
  | 'leave_ins'
  | 'creams'
  | 'foams'
  | 'custards'
  | 'gels'
  | 'oils';

interface FilterCriteria {
  porosity: PorosityType;
  country: CountryCode;
}

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  clarifying_shampoos:
    'Heavier shampoos meant to remove long-term buildup from oils, products, and hard water. Meant to be used occasionally, as they are much stronger than regular shampoos.',
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
  oils: 'Optional finishing products that can help seal in moisture. Best for high porosity hair.',
};

export const POROSITY_CATEGORIES: Record<PorosityType, ProductCategory[]> = {
  high_porosity: [
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'shampoos',
  ],
  low_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'custards',
    'foams',
    'gels',
    'deep_conditioners',
  ],
  normal_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'creams',
    'gels',
    'deep_conditioners',
  ],
};

export function getProductsByCategory(
  category: string,
  criteria: FilterCriteria,
): Product[] {
  const products = getBundledProducts();

  return Object.values(products.products)
    .filter((product) => {
      // Must match category
      if (!product.product_categories?.includes(category)) return false;

      // Must match porosity
      if (!product.tags?.includes(criteria.porosity)) return false;

      // Match country
      if (criteria.country === 'US') {
        // For US, show products with no country specified
        if (product.country) return false;
      } else {
        // For other countries, match the country code
        if (product.country !== criteria.country) return false;
      }

      return true;
    })
    .sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name));
}

// Add frequency recommendations
export const FREQUENCY_RECOMMENDATIONS: Record<
  PorosityType,
  Partial<Record<ProductCategory, string>>
> = {
  high_porosity: {
    clarifying_shampoos: 'Every 1-2 months',
    shampoos: 'Weekly',
    cowashes: 'Daily or every other day',
    deep_conditioners: 'Weekly',
    conditioners: 'Every wash',
    leave_ins: 'Every wash',
    creams: 'Every wash',
    gels: 'As needed for styling',
    custards: 'As needed for styling',
  },
  low_porosity: {
    clarifying_shampoos: 'Every 1-2 weeks',
    shampoos: 'Every wash',
    conditioners: 'Every wash',
    deep_conditioners: 'Monthly',
    foams: 'As needed for styling',
    gels: 'As needed for styling',
    custards: 'As needed for styling',
  },
  normal_porosity: {
    clarifying_shampoos: 'Every month',
    shampoos: 'Every 2-3 days',
    conditioners: 'Every wash',
    deep_conditioners: 'Every 2 weeks',
    creams: 'As needed for styling',
    gels: 'As needed for styling',
  },
};

export type RoutineStep =
  | 'cleanse'
  | 'condition'
  | 'enhance'
  | 'hold'
  | 'finish';

interface StepConfig {
  title: string;
  description: string;
  categories: ProductCategory[];
  porosityRecommendations: Record<PorosityType, string>;
}

export const ROUTINE_STEPS: Record<RoutineStep, StepConfig> = {
  cleanse: {
    title: '1. Cleanse',
    description: 'Choose your cleansing products based on your porosity needs',
    categories: ['clarifying_shampoos', 'shampoos', 'cowashes'],
    porosityRecommendations: {
      high_porosity:
        'Use shampoo weekly, cowash for other wash days, clarifying shampoos every 1-2 months',
      low_porosity:
        'Use shampoo every wash day, clarifying shampoo every 1-2 weeks',
      normal_porosity:
        'Use shampoo every wash day, cowash optional, clarifying shampoo every month',
    },
  },
  condition: {
    title: '2. Condition',
    description: 'Build your moisture routine',
    categories: ['conditioners', 'deep_conditioners', 'leave_ins'],
    porosityRecommendations: {
      high_porosity:
        'Deep condition weekly, use regular conditioner and leave-in every wash',
      low_porosity:
        'Use conditioner every wash, deep condition monthly, leave-in optional',
      normal_porosity:
        'Deep condition weekly, use conditioner every wash, leave-in optional',
    },
  },
  enhance: {
    title: '3. Enhance Curls/Waves',
    description: 'Choose products to enhance your natural pattern',
    categories: ['foams', 'custards', 'creams'],
    porosityRecommendations: {
      high_porosity:
        'Use cream every wash, custard optional for extra definition',
      low_porosity:
        'Use foam every wash, custard optional for extra definition',
      normal_porosity: 'Any of these products can work well for your hair',
    },
  },
  hold: {
    title: '4. Hold',
    description: 'Lock in your style',
    categories: ['gels'],
    porosityRecommendations: {
      high_porosity: 'Use gel every wash for best results',
      low_porosity: 'Use gel every wash for best results',
      normal_porosity: 'Use gel every wash for best results',
    },
  },
  finish: {
    title: '5. Finish',
    description: 'Optional finishing products',
    categories: ['oils'],
    porosityRecommendations: {
      high_porosity: 'Recommended to seal in moisture',
      low_porosity: 'Not recommended, may prevent moisture absorption',
      normal_porosity: 'Optional, use if hair feels dry',
    },
  },
};

export function getRoutineSteps(porosity: PorosityType, country: CountryCode) {
  return (
    Object.entries(ROUTINE_STEPS)
      .map(([stepId, step]) => {
        // Get products for each category in this step and filter out empty categories
        const categoryProducts = step.categories
          .map((category) => {
            const products = getProductsByCategory(category, {
              porosity,
              country,
            });
            if (products.length === 0) return null;

            return {
              category,
              description: CATEGORY_DESCRIPTIONS[category],
              frequency:
                FREQUENCY_RECOMMENDATIONS[porosity][category] || 'As needed',
              products: products.slice(0, 3).map((product) => ({
                type: product.id,
                title: product.name,
                description: product.brand,
                product: product,
              })),
            };
          })
          .filter(
            (category): category is NonNullable<typeof category> =>
              category !== null,
          );

        return {
          id: stepId,
          title: step.title,
          description: step.description,
          recommendation: step.porosityRecommendations[porosity],
          categories: categoryProducts,
        };
      })
      // Filter out steps with no categories
      .filter((step) => step.categories.length > 0)
  );
}
