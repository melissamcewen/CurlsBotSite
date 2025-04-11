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
  | 'sprays'
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
  sprays:
    'Optional finishing products that can help seal in moisture and lock in styles.',
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
        'Use pre-poo to protect hair, then alternate between cowash and gentle shampoo. Clarify monthly.',
      low_porosity:
        'Use clarifying or regular shampoo to prevent buildup, avoid cowash. Clarify every 1-2 weeks.',
      normal_porosity:
        'Use shampoo, clarify monthly. Can use cowash occasionally.',
      mixed_porosity:
        'Use pre-poo on ends, then  shampoo on roots and gentler shampoos/cowashes on ends. Clarify every 2-3 weeks.',
    },
  },
  condition: {
    title: '2. Condition',
    description: 'Choose your conditioner based on your needs',
    categories: ['conditioners', 'deep_conditioners'],
    porosityRecommendations: {
      high_porosity:
        'Use conditioner every wash and deep conditioner every 1-2 months',
      low_porosity:
        'Use conditioner every wash and deep conditioner every 1-2 months',
      normal_porosity:
        'Use conditioner every wash and deep conditioner every 1-2 months',
      mixed_porosity:
        'Use conditioner every wash and deep conditioner every 1-2 months',
    },
  },
  enhance: {
    title: '3. Protect',
    description: 'Choose a product that helps protect your hair',
    categories: ['leave_ins', 'creams'],
    porosityRecommendations: {
      high_porosity: 'Use a leave in and cream',
      low_porosity: 'You can skip this step unless you use heat, in which case use a heat protectant',
      normal_porosity: 'Use a leave in or cream as needed',
      mixed_porosity: 'Use a leave in or cream on the ends',
    },
  },
  hold: {
    title: '4. Enhance',
    description: 'Choose a product that helps enhance your curls',
    categories: ['gels', 'custards'],
    porosityRecommendations: {
      high_porosity: 'Choose either a gel or custard',
      low_porosity: 'Choose either a gel or custard',
      normal_porosity: 'Choose either a gel or custard',
      mixed_porosity: 'Choose either a gel or custard',
    },
  },
  finish: {
    title: '5. Seal',
    description:
      'Choose a product that helps seal in moisture, some gels from the previous step do this so if you already used a gel meant to seal, skip this step',
    categories: ['oils', 'foams', 'sprays'],
    porosityRecommendations: {
      high_porosity: 'Use an oil or a spray',
      low_porosity: 'Use a foam or spray',
      normal_porosity: 'Use a foam, oil, or spray',
      mixed_porosity: 'Use an oil, serum, or moisturizing spray on the ends and a foam or spray on the rest of your hair',
    },
  },
  accessories: {
    title: '6. Accessories',
    description: 'Choose your accessories',
    categories: ['accessories'],
    porosityRecommendations: {
      high_porosity: 'Optional accessories',
      low_porosity: 'Optional accessories',
      normal_porosity: 'Optional accessories',
      mixed_porosity: 'Optional accessories',
    },
  },
};

export interface CategoryWithProducts {
  category: ProductCategory;
  description: string;
  frequency?: string;
  products: Product[];
  totalProducts: number;
}

export interface RoutineStepConfig {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  categories: CategoryWithProducts[];
}

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
): RoutineStepConfig[] {
  return Object.entries(ROUTINE_STEPS)
    .map(([stepId, step]) => {
      const routineStep = stepId as RoutineStep;
      // Filter categories based on porosity type
      const allowedCategories = POROSITY_CATEGORIES[porosity];
      const categoryProducts = step.categories
        .filter((category) => allowedCategories.includes(category))
        .map((category) => {
          const products = getProductsByCategory(category, {
            country,
            costFilter,
            offset: productOffsets[category] || 0,
            analysisFilters,
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
            products: productsToShow,
            totalProducts: products.length,
          };
        });

      return {
        id: routineStep,
        title: step.title,
        description: step.description,
        recommendation: step.porosityRecommendations[porosity],
        categories: categoryProducts,
      };
    })
    .filter((step) => step.categories.some((cat) => cat.products.length > 0));
}
