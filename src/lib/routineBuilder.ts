import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product } from 'haircare-ingredients-analyzer';
import type { CountryCode } from './countryDetection';
import { filterProducts } from './productFiltering';
import {
  POROSITY_CATEGORIES,
  POROSITY_EXEMPT_CATEGORIES,
  type PorosityType,
} from './porosity';

export type { CountryCode, PorosityType };

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

interface GetProductsByCategoryOptions {
  country: CountryCode;
  costFilter?: '$' | '$$' | '$$$';
  offset?: number;
  requireFeatured?: boolean;
  analysisFilters?: {
    cgmApproved: boolean;
    frizzResistant: boolean;
    lightweight: boolean;
    highPorosity: boolean;
    lowPorosity: boolean;
  };
}

function getProductsByCategory(
  category: ProductCategory,
  options: GetProductsByCategoryOptions,
): Product[] {
  const { country, costFilter, offset = 0, analysisFilters } = options;
  const products = getBundledProducts();

  // Filter products by category and country
  const filteredProducts = filterProducts(Object.values(products.products), {
    country,
    category,
    requireFeatured: false,
    analysisFilters: analysisFilters || {
      cgmApproved: false,
      frizzResistant: false,
      lightweight: false,
      highPorosity: false,
      lowPorosity: false,
    },
  });

  return filteredProducts.sort((a, b) =>
    (a.brand + a.name).localeCompare(b.brand + b.name),
  );
}

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
    categories: ['pre_poo', 'clarifying_shampoos', 'shampoos', 'cowashes'],
    porosityRecommendations: {
      high_porosity:
        'Use pre-poo to protect hair, then alternate between cowash and sulfate-free shampoo. Clarify monthly.',
      low_porosity:
        'Use clarifying or regular shampoo to prevent buildup, avoid cowash. Clarify every 1-2 weeks.',
      normal_porosity:
        'Use sulfate-free shampoo most washes, clarify monthly. Can use cowash occasionally.',
      mixed_porosity:
        'Use pre-poo on ends, then sulfate-free shampoo on roots and gentler cleansers on ends. Clarify every 2-3 weeks.',
    },
  },
  condition: {
    title: '2. Condition',
    description: 'Choose your conditioner based on your needs',
    categories: ['conditioners', 'deep_conditioners'],
    porosityRecommendations: {
      high_porosity: 'Use deep conditioner weekly',
      low_porosity: 'Use conditioner daily',
      normal_porosity: 'Use conditioner daily',
      mixed_porosity: 'Use conditioner daily',
    },
  },
  enhance: {
    title: '3. Enhance',
    description: 'Choose your leave-in or cream',
    categories: ['leave_ins', 'creams'],
    porosityRecommendations: {
      high_porosity: 'Use leave-in or cream daily',
      low_porosity: 'Use leave-in or cream daily',
      normal_porosity: 'Use leave-in or cream daily',
      mixed_porosity: 'Use leave-in or cream daily',
    },
  },
  hold: {
    title: '4. Hold',
    description: 'Choose your styling product',
    categories: ['gels', 'foams', 'custards'],
    porosityRecommendations: {
      high_porosity: 'Use gel or custard',
      low_porosity: 'Use foam or custard',
      normal_porosity: 'Use gel or custard',
      mixed_porosity: 'Use gel or custard',
    },
  },
  finish: {
    title: '5. Finish',
    description: 'Choose your finishing product',
    categories: ['oils'],
    porosityRecommendations: {
      high_porosity: 'Use oil',
      low_porosity: 'Use oil',
      normal_porosity: 'Use oil',
      mixed_porosity: 'Use oil',
    },
  },
  accessories: {
    title: '6. Accessories',
    description: 'Choose your accessories',
    categories: ['accessories'],
    porosityRecommendations: {
      high_porosity: 'Use accessories',
      low_porosity: 'Use accessories',
      normal_porosity: 'Use accessories',
      mixed_porosity: 'Use accessories',
    },
  },
};

const FREQUENCY_RECOMMENDATIONS: Record<ProductCategory, string> = {
  pre_poo: 'Before washing',
  clarifying_shampoos: 'Every 2-4 weeks',
  shampoos: 'Every wash',
  cowashes: 'Every wash',
  conditioners: 'Every wash',
  deep_conditioners: 'Weekly',
  leave_ins: 'Every wash',
  creams: 'Every wash',
  foams: 'Every wash',
  custards: 'Every wash',
  gels: 'Every wash',
  oils: 'As needed',
  accessories: 'As needed',
};

export function getRoutineSteps(
  porosity: PorosityType,
  country: CountryCode,
  costFilter?: '$' | '$$' | '$$$',
  productOffsets: Record<string, number> = {},
  analysisFilters = {
    cgmApproved: false,
    frizzResistant: false,
    lightweight: false,
    highPorosity: false,
    lowPorosity: false,
  },
) {
  return Object.entries(ROUTINE_STEPS)
    .map(([stepId, step]) => {
      const routineStep = stepId as RoutineStep;
      // Filter categories based on porosity
      const validCategories = step.categories.filter(
        (category: ProductCategory) =>
          POROSITY_CATEGORIES[porosity].includes(category),
      );

      if (validCategories.length === 0) return null;

      // Get products for each category in this step
      const categoryProducts = validCategories.map(
        (category: ProductCategory) => {
          // Skip porosity filtering for exempt categories
          const skipPorosityFilters =
            POROSITY_EXEMPT_CATEGORIES.includes(category);

          let categoryAnalysisFilters = { ...analysisFilters };

          if (skipPorosityFilters) {
            categoryAnalysisFilters = {
              ...categoryAnalysisFilters,
              highPorosity: false,
              lowPorosity: false,
              lightweight: false,
            };
          } else if (porosity === 'mixed_porosity') {
            // For mixed porosity, we want products that work for both high and low porosity
            categoryAnalysisFilters = {
              ...categoryAnalysisFilters,
              highPorosity: true,
              lowPorosity: true,
            };
          }

          const products = getProductsByCategory(category, {
            country,
            costFilter,
            offset: productOffsets[category] || 0,
            analysisFilters: categoryAnalysisFilters,
          });

          // For accessories, show all products. For others, show 3 at a time.
          const productsToShow =
            category === 'accessories'
              ? products
              : products.slice(
                  productOffsets[category] || 0,
                  (productOffsets[category] || 0) + 3,
                );

          return {
            category,
            description: CATEGORY_DESCRIPTIONS[category],
            frequency: FREQUENCY_RECOMMENDATIONS[category],
            products: productsToShow,
            totalProducts: products.length,
          };
        },
      );

      return {
        id: routineStep,
        title: step.title,
        description: step.description,
        recommendation: step.porosityRecommendations[porosity],
        categories: categoryProducts,
      };
    })
    .filter((step): step is NonNullable<typeof step> => step !== null);
}
