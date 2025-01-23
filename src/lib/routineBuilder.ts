import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product } from 'haircare-ingredients-analyzer';
import type { CountryCode } from './countryDetection';
import { filterProducts } from './productFiltering';

export type { CountryCode };
export type PorosityType =
  | 'high_porosity'
  | 'low_porosity'
  | 'normal_porosity'
  | 'mixed_porosity';

export type ProductCategory =
  | 'pre_poo'
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
  | 'oils'
  | 'accessories';

interface FilterCriteria {
  porosity: PorosityType;
  country: CountryCode;
  costFilter?: '$' | '$$' | '$$$';
  requireFeatured?: boolean;
}

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  pre_poo:
    'These products are meant to be used before washing to help protect your hair from stress and damage.',
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
  accessories: 'Useful items for anyone with curly or wavy hair.',
};

export const POROSITY_CATEGORIES: Record<PorosityType, ProductCategory[]> = {
  high_porosity: [
    'pre_poo',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'shampoos',
    'accessories',
  ],
  low_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'custards',
    'foams',
    'gels',
    'deep_conditioners',
    'accessories',
  ],
  normal_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'creams',
    'gels',
    'deep_conditioners',
    'accessories',
  ],
  mixed_porosity: [
    'pre_poo',
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'foams',
    'accessories',
    'oils',
  ],
};

export function getProductsByCategory(
  category: string,
  criteria: FilterCriteria,
): Product[] {
  const products = getBundledProducts();

  return filterProducts(Object.values(products.products), {
    category,
    country: criteria.country,
    costFilter: criteria.costFilter,
    porosity: criteria.porosity,
    requireFeatured: criteria.requireFeatured,
  }).sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name));
}

// Add frequency recommendations
export const FREQUENCY_RECOMMENDATIONS: Record<
  PorosityType,
  Partial<Record<ProductCategory, string>>
> = {
  high_porosity: {
    pre_poo: 'Every wash',
    clarifying_shampoos: 'Every 1-2 months',
    shampoos: 'Weekly',
    cowashes: 'Daily or every other day',
    deep_conditioners: 'Weekly',
    conditioners: 'Every wash',
    leave_ins: 'Every wash',
    creams: 'Every wash',
    gels: 'As needed for styling',
    custards: 'Optional',
    oils: 'Optional',
    accessories: 'Useful for all porosity types',
  },
  low_porosity: {
    clarifying_shampoos: 'Every 1-2 weeks',
    shampoos: 'Every wash',
    conditioners: 'Every wash, focus on the ends',
    deep_conditioners: 'Monthly, focus on the ends',
    foams: 'Choose a foam or custard to help with definition',
    gels: 'Gels can help with definition and hold',
    custards: 'Choose a foam or custard to help with definition',
    accessories: 'Useful for all porosity types',
  },
  normal_porosity: {
    clarifying_shampoos: 'Every month',
    shampoos: 'Every 2-3 days',
    conditioners: 'Every wash',
    deep_conditioners: 'Every 2 weeks',
    creams: 'Recommended to protect hair and style',
    gels: 'As needed for styling',
    oils: 'Help seal in moisture',
    accessories: 'Useful for all porosity types',
  },
  mixed_porosity: {
    pre_poo: 'Protect the ends from damage before shampooing/clarifying',
    clarifying_shampoos: 'Every 2-3 weeks',
    shampoos: 'Use a stronger shampoo, but protect the ends',
    conditioners: 'Every wash, focus on the ends',
    deep_conditioners: 'Every 1-2 weeks on the ends only',
    leave_ins: 'Every wash on the ends only',
    creams: 'As needed on the ends to protect and style',
    gels: 'As needed for styling',
    custards: 'Choose a foam or custard to help with definition',
    foams: 'Choose a foam or custard to help with definition',
    oils: 'Help seal in moisture in the ends',
    accessories: 'Useful for all porosity types',
  },
};

export type RoutineStep =
  | 'cleanse'
  | 'condition'
  | 'enhance'
  | 'hold'
  | 'finish'
  | 'accessories';

interface StepConfig {
  title: string;
  description: string;
  categories: ProductCategory[];
  porosityRecommendations: Record<PorosityType, string>;
}

export const ROUTINE_STEPS: Record<RoutineStep, StepConfig> = {
  cleanse: {
    title: '1. Cleanse',
    description: 'Choose your cleanser based on your needs',
    categories: ['clarifying_shampoos', 'shampoos', 'cowashes'],
    porosityRecommendations: {
      high_porosity:
        'Use gentle cleansers like cowash daily, sulfate-free shampoo weekly',
      low_porosity:
        'Use clarifying or regular shampoo to prevent buildup, avoid cowash',
      normal_porosity: 'Use sulfate-free shampoo most washes, clarify monthly',
      mixed_porosity:
        'Use sulfate-free shampoo on roots, focus gentler cleansers on ends',
    },
  },
  condition: {
    title: '2. Condition',
    description: 'Deep condition and/or regular condition',
    categories: ['conditioners', 'deep_conditioners', 'leave_ins'],
    porosityRecommendations: {
      high_porosity:
        'Deep condition weekly, use regular conditioner and leave-in every wash',
      low_porosity:
        'Use regular conditioner every wash, deep condition monthly with heat',
      normal_porosity:
        'Use regular conditioner every wash, deep condition bi-weekly',
      mixed_porosity:
        'Deep condition ends weekly, use regular conditioner on roots, focus leave-in on ends',
    },
  },
  enhance: {
    title: '3. Enhance Curls/Waves',
    description: 'Choose 1-2 products to enhance your natural curl pattern',
    categories: ['foams', 'custards', 'creams'],
    porosityRecommendations: {
      high_porosity:
        'Use cream every wash, custard optional for extra definition',
      low_porosity:
        'Use foam every wash, custard optional for extra definition',
      normal_porosity: 'Any of these products can work well for your hair',
      mixed_porosity: 'Use lighter products on roots, heavier products on ends',
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
      mixed_porosity:
        'Use gel every wash, focusing on areas that need most hold',
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
      mixed_porosity: 'Use on ends only if needed, avoid roots',
    },
  },
  accessories: {
    title: 'Optional: Accessories',
    description: 'Useful items for anyone with curly or wavy hair',
    categories: ['accessories'],
    porosityRecommendations: {
      high_porosity: 'Useful for all porosity types',
      low_porosity: 'Useful for all porosity types',
      normal_porosity: 'Useful for all porosity types',
      mixed_porosity: 'Useful for all porosity types',
    },
  },
};

export function getRoutineSteps(
  porosity: PorosityType,
  country: CountryCode,
  costFilter?: '$' | '$$' | '$$$',
  productOffsets: Record<string, number> = {},
) {
  return Object.entries(ROUTINE_STEPS)
    .map(([stepId, step]) => {
      // Filter categories based on porosity
      const validCategories = step.categories.filter((category) =>
        POROSITY_CATEGORIES[porosity].includes(category),
      );

      if (validCategories.length === 0) return null;

      // Get products for each category in this step
      const categoryProducts = validCategories.map((category) => {
        // Try to get featured products first (if no cost filter)
        let allProducts = !costFilter
          ? getProductsByCategory(category, {
              porosity,
              country,
              costFilter,
              requireFeatured: true,
            })
          : [];

        // If no featured products or we have a cost filter, get all products
        if (allProducts.length === 0) {
          allProducts = getProductsByCategory(category, {
            porosity,
            country,
            costFilter,
            requireFeatured: false,
          });
        }

        // If we have an offset, get all products without featured requirement
        if (productOffsets[category]) {
          allProducts = getProductsByCategory(category, {
            porosity,
            country,
            costFilter,
            requireFeatured: false,
          });
        }

        const offset = productOffsets[category] || 0;
        // For accessories, show all products. For others, show 3 at a time.
        const productsToShow =
          category === 'accessories'
            ? allProducts.map((product) => ({
                type: product.id,
                title: product.name,
                description: product.brand,
                product: product,
              }))
            : allProducts.slice(offset, offset + 3).map((product) => ({
                type: product.id,
                title: product.name,
                description: product.brand,
                product: product,
              }));

        return {
          category,
          description: CATEGORY_DESCRIPTIONS[category],
          frequency:
            FREQUENCY_RECOMMENDATIONS[porosity][category] || 'As needed',
          products: productsToShow,
          totalProducts: allProducts.length,
        };
      });

      return {
        id: stepId,
        title: step.title,
        description: step.description,
        recommendation: step.porosityRecommendations[porosity],
        categories: categoryProducts,
      };
    })
    .filter((step): step is NonNullable<typeof step> => step !== null);
}
