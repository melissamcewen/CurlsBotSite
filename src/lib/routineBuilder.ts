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
    'clarifying_shampoos',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'oils',
    'accessories',
  ],
  low_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'foams',
    'gels',
    'accessories',
  ],
  normal_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'gels',
    'accessories',
  ],
  mixed_porosity: [
    'pre_poo',
    'clarifying_shampoos',
    'shampoos',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'foams',
    'oils',
    'accessories',
  ],
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
) {
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
    description: 'Deep condition and/or regular condition',
    categories: ['conditioners', 'deep_conditioners', 'leave_ins'],
    porosityRecommendations: {
      high_porosity:
        'Deep condition weekly, use regular conditioner and leave-in every wash. Focus on protein-moisture balance.',
      low_porosity:
        'Use regular conditioner every wash focusing on ends, deep condition monthly with heat. Light leave-in optional.',
      normal_porosity:
        'Use regular conditioner every wash, deep condition bi-weekly. Light leave-in recommended.',
      mixed_porosity:
        'Deep condition ends weekly, use regular conditioner on roots, focus leave-in on ends only.',
    },
  },
  enhance: {
    title: '3. Enhance Curls/Waves',
    description: 'Choose 1-2 products to enhance your natural curl pattern',
    categories: ['foams', 'custards', 'creams'],
    porosityRecommendations: {
      high_porosity:
        'Use cream and/or custard for moisture and definition. Layer products for best results.',
      low_porosity:
        'Use foam for lightweight definition. Avoid heavy creams and custards.',
      normal_porosity:
        'Use cream or foam depending on hair weight. Can layer for more definition.',
      mixed_porosity:
        'Use lighter products (foam) on roots, heavier products (cream/custard) on ends.',
    },
  },
  hold: {
    title: '4. Hold',
    description: 'Lock in your style',
    categories: ['gels'],
    porosityRecommendations: {
      high_porosity:
        'Use strong hold gel, may need to layer with other products for best moisture retention.',
      low_porosity:
        'Use lightweight or medium hold gel. Apply to very wet hair.',
      normal_porosity:
        'Use medium to strong hold gel based on desired hold level.',
      mixed_porosity:
        'Use medium hold gel all over, may need stronger hold on ends.',
    },
  },
  finish: {
    title: '5. Finish',
    description: 'Optional finishing products',
    categories: ['oils'],
    porosityRecommendations: {
      high_porosity:
        'Use oil to seal in moisture and prevent frizz. Can be used daily.',
      low_porosity:
        'Avoid oils or use very sparingly on ends only. May cause buildup.',
      normal_porosity:
        'Use light oils sparingly if needed for shine or frizz control.',
      mixed_porosity: 'Use oils on ends only to seal moisture. Avoid roots.',
    },
  },
  accessories: {
    title: 'Optional: Accessories',
    description: 'Useful items for anyone with curly or wavy hair',
    categories: ['accessories'],
    porosityRecommendations: {
      high_porosity:
        'Microfiber towels, satin pillowcase, and deep conditioning heat cap recommended.',
      low_porosity:
        'Heat cap essential for deep conditioning. Microfiber towels and satin pillowcase recommended.',
      normal_porosity:
        'Microfiber towels, satin pillowcase, and optional heat cap for deep conditioning.',
      mixed_porosity:
        'Full set of accessories recommended to address different needs of your hair.',
    },
  },
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
              country,
              costFilter,
              requireFeatured: true,
            })
          : [];

        // If no featured products or we have a cost filter, get all products
        if (allProducts.length === 0) {
          allProducts = getProductsByCategory(category, {
            country,
            costFilter,
            requireFeatured: false,
          });
        }

        // If we have an offset, get all products without featured requirement
        if (productOffsets[category]) {
          allProducts = getProductsByCategory(category, {
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

        const products = getProductsByCategory(category, {
          country,
          costFilter,
          offset: productOffsets[category] || 0,
          analysisFilters,
        });

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
