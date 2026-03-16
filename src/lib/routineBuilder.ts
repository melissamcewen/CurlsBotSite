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

/**
 * CurlsBot hair type → product tag mapping (spec: routine-builder).
 * Used to filter products by hair pattern (loose curls/wavy vs tight curls vs coily).
 */
export type HairTypeProductTag = 'wavy' | 'curly' | 'coily';

/** Map CurlsBot type or hair pattern slug to product tag for filtering */
export function hairTypeToProductTag(
  type: string,
): HairTypeProductTag | null {
  const t = type.toLowerCase().replace(/\s+/g, '-');
  // Loose curls / waves
  if (
    ['swavy', 'wavy', 'loose-curls', 'loose curls'].some((x) =>
      t.includes(x.replace(/\s/g, '-')),
    )
  )
    return 'wavy';
  // Tight curls
  if (['tight-curls', 'tight curls', 'curly'].some((x) => t.includes(x)))
    return 'curly';
  // Coily / tightly coiled
  if (
    ['coily', 'tight-coils', 'tightly coiled', 'kinky', 'very curly'].some((x) =>
      t.includes(x.replace(/\s/g, '-')),
    )
  )
    return 'coily';
  return null;
}

/** Light widget: 3 steps — clarifying shampoo, conditioner, styler */
export const LIGHT_ROUTINE_STEP_KEYS = [
  'clarifying_shampoo',
  'conditioner',
  'styler',
] as const;

export type LightRoutineStepKey = (typeof LIGHT_ROUTINE_STEP_KEYS)[number];

export const LIGHT_STEP_CONFIG: Record<
  LightRoutineStepKey,
  { label: string; categories: ProductCategory | ProductCategory[] }
> = {
  clarifying_shampoo: {
    label: 'Clarifying Shampoo',
    categories: 'clarifying_shampoos',
  },
  conditioner: {
    label: 'Conditioner',
    categories: 'conditioners',
  },
  styler: {
    label: 'Styler',
    categories: ['creams', 'foams', 'custards', 'gels', 'oils', 'sprays'],
  },
};

export type ProductCategory =
  | 'pre-poo'
  | 'clarifying_shampoos'
  | 'shampoos'
  | 'cowashes'
  | 'conditioners'
  | 'deep_conditioners'
  | 'leave_ins'
  | 'creams'
  | 'leave_ins_creams'
  | 'foams'
  | 'custards'
  | 'gels'
  | 'stylers'
  | 'oils'
  | 'sprays'
  | 'accessories'
  | 'treatments'
  | 'all';

interface FilterCriteria {
  porosity: PorosityType;
  country: CountryCode;
  costFilter?: '$' | '$$' | '$$$';
  requireFeatured?: boolean;
}

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  'pre-poo':
    'These products are meant to be used before washing to help protect your hair from stress and damage.',
  clarifying_shampoos:
    'Heavier shampoos meant to remove long-term buildup from oils, products, and hard water. Meant to be used occasionally, as they are much stronger than regular shampoos.',
  shampoos:
    'Cleansers that remove buildup and oil from your hair. Essential for low-porosity hair and should be used on other porosity types at least occasionally.',
  conditioners:
    'Products that add protection, softness, and shine, as well as helping to detangle hair. Almost everyone needs conditioner!',
  cowashes:
    'Gentle, non-lathering cleansers that clean without stripping natural oils. Use these for daily wash if you have high-porosity hair.',
  deep_conditioners:
    'Intensive treatments that restore moisture and repair damage. Essential at least weekly for high porosity hair and good for all porosity types occasionally.',
  leave_ins:
    'Light conditioners that stay in your hair to provide ongoing protection and softness. Most important for high-porosity hair. May weigh down low-porosity hair.',
  creams:
    'Rich moisturizers that help define and shape curls, and provide a barrier to protect against damage. Essential for high-porosity hair. May weigh down low-porosity hair.',
  leave_ins_creams:
    'Leave-in conditioners and styling creams that provide ongoing protection, moisture, and definition. Use one with heat protection if you use heat.',
  gels: 'Styling products that provide hold and definition. Useful for all porosity types.',
  foams:
    'Light styling products that add volume and definition without weight. A great option for low-porosity hair.',
  custards:
    'Thick styling products that provide hold and definition. Useful for all porosity types.',
  stylers:
    'Gels, foams, and custards for hold and definition. Choose based on your porosity and desired hold.',
  oils: 'Optional finishing products that can help provide more protection and shine. Best for high porosity hair.',
  sprays:
    'Optional finishing products that can help provide more protection and shine. Best for high porosity hair.',
  accessories: 'Useful items for anyone with curly or wavy hair.',
  all: 'All product categories.',
  treatments:
    'Treatments to help with specific hair concerns like dryness, buildup, and breakage.',
};

interface GetProductsByCategoryOptions {
  country: CountryCode;
  costFilter?: '$' | '$$' | '$$$';
  offset?: number;
  requireFeatured?: boolean;
  hairTypeTag?: HairTypeProductTag;
  /** When set, only products with this tag are included (e.g. bond-repair) */
  requiredTag?: string;
  analysisFilters?: {
    cgmApproved: boolean;
    frizzResistant: boolean;
    lightweight: boolean;
    highPorosity: boolean;
    lowPorosity: boolean;
    sebdermSafe: boolean;
  };
}

function getProductsByCategory(
  category: ProductCategory,
  options: GetProductsByCategoryOptions,
): Product[] {
  const { country, costFilter, offset = 0, analysisFilters, hairTypeTag, requiredTag } = options;
  const products = getBundledProducts();

  // Filter products by category, country, optional hair type and required tag
  const filteredProducts = filterProducts(Object.values(products.products), {
    country,
    category,
    requireFeatured: false,
    hairTypeTag,
    requiredTag,
    analysisFilters: analysisFilters || {
      cgmApproved: false,
      frizzResistant: false,
      lightweight: false,
      highPorosity: false,
      lowPorosity: false,
      sebdermSafe: false,
    },
  });

  // Sort: premium first, then samples, then with description, then alphabetically
  return sortRoutineProducts(filteredProducts);
}

/** Sort products for routine display: premium, samples, with description, then alpha. */
function sortRoutineProducts(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const aPremium = a.tags?.includes('premium') || false;
    const bPremium = b.tags?.includes('premium') || false;
    if (aPremium && !bPremium) return -1;
    if (!aPremium && bPremium) return 1;
    const aSample = a.tags?.includes('samples') || false;
    const bSample = b.tags?.includes('samples') || false;
    if (aSample && !bSample) return -1;
    if (!aSample && bSample) return 1;
    const aHasDesc = !!a.description;
    const bHasDesc = !!b.description;
    if (aHasDesc && !bHasDesc) return -1;
    if (!aHasDesc && bHasDesc) return 1;
    return (a.brand + a.name).localeCompare(b.brand + b.name);
  });
}

export interface LightStepFilters {
  porosity: PorosityType;
  country: CountryCode;
  cgmApproved: boolean;
  hairTypeTag?: HairTypeProductTag | null;
}

/** Get one random product for a light routine step; prioritizes products with "samples" tag. */
export function getRandomProductForLightStep(
  stepKey: LightRoutineStepKey,
  filters: LightStepFilters,
): Product | null {
  const config = LIGHT_STEP_CONFIG[stepKey];
  const categories = Array.isArray(config.categories)
    ? config.categories
    : [config.categories];
  const products = getBundledProducts();
  const allProducts = Object.values(products.products);

  let pooled: Product[] = [];
  for (const category of categories) {
    const filtered = filterProducts(allProducts, {
      country: filters.country,
      category,
      requireFeatured: false,
      hairTypeTag: filters.hairTypeTag ?? undefined,
      analysisFilters: {
        cgmApproved: filters.cgmApproved,
        frizzResistant: false,
        lightweight: false,
        highPorosity:
          filters.porosity === 'high_porosity' ||
          filters.porosity === 'mixed_porosity',
        lowPorosity:
          filters.porosity === 'low_porosity' ||
          filters.porosity === 'mixed_porosity',
        sebdermSafe: false,
      },
    });
    pooled = pooled.concat(filtered);
  }
  const byId = new Map(pooled.map((p) => [p.id, p]));
  const unique = Array.from(byId.values());
  if (unique.length === 0) return null;
  const withSamples = unique.filter((p) => p.tags?.includes('samples'));
  const pool = withSamples.length > 0 ? withSamples : unique;
  return pool[Math.floor(Math.random() * pool.length)];
}

export type RoutineStep =
  | 'clarifying'
  | 'everyday_shampoo'
  | 'condition'
  | 'repair_treatment'
  | 'leave_in_cream'
  | 'styler'
  | 'oils_refreshers';

interface StepConfig {
  title: string;
  description: string;
  categories: ProductCategory[];
  /** When true, show one row with products from all categories merged (e.g. leave_ins + creams) */
  combineCategories?: boolean;
  /** When combineCategories is true, use this as the category key for the merged row */
  combinedCategoryKey?: ProductCategory;
  /** When set, only products with this tag are included (e.g. bond-repair) */
  requiredTag?: string;
  /** When true, step is only included for high_porosity or mixed_porosity */
  highPorosityOnly?: boolean;
  porosityRecommendations: Record<PorosityType, string>;
}

export const ROUTINE_STEPS: Record<RoutineStep, StepConfig> = {
  clarifying: {
    title: 'Clarifying shampoo',
    description:
      "An essential step in every routine to remove buildup. It's fine to use as your main shampoo if you are prone to buildup.",
    categories: ['clarifying_shampoos'],
    porosityRecommendations: {
      high_porosity: 'Clarify as needed, at least monthly',
      low_porosity: 'Clarify at least once a week',
      normal_porosity: 'Clarify at least once a week',
      mixed_porosity: 'Clarify at least once a week, focus on roots',
    },
  },
  everyday_shampoo: {
    title: 'Everyday shampoo',
    description:
      'A clarifying shampoo is going to be too drying for most people to use every wash. Use a gentler everyday shampoo when not using a clarifying shampoo.',
    categories: ['shampoos'],
    porosityRecommendations: {
      high_porosity: 'Should be your main shampoo',
      low_porosity: 'Use when not using a clarifying shampoo',
      normal_porosity: 'Use when not using a clarifying shampoo',
      mixed_porosity: 'Use when not using a clarifying shampoo',
    },
  },
  condition: {
    title: 'Conditioner',
    description:
      'A conditioner is a must have in every routine. It helps detangle hair and protect against damage.',
    categories: ['conditioners'],
    porosityRecommendations: {
      high_porosity:
        'Use conditioner every wash, ideally one made for high porosity hair (often labeled for colored or damaged hair)',
      low_porosity: 'Use conditioner as needed, focus on the ends',
      normal_porosity: 'Use conditioner as needed, focus on the ends.',
      mixed_porosity: 'Use conditioner every wash, focus on the ends',
    },
  },
  repair_treatment: {
    title: 'Treatment',
    description:
      'Treatments include deep conditioner, which can make hair softer, and bond repair, which can help repair damaged hair',
    categories: ['treatments', 'deep_conditioners'],
    requiredTag: 'bond-repair',
    highPorosityOnly: true,
    porosityRecommendations: {
      high_porosity:
        'Use bond repair as needed and deep conditioner if hair feels rough',
      low_porosity:
        "Skip bond repair because you don't need it, use deep conditioner if hair feels rough",
      normal_porosity:
        'Use bond repair as needed and deep conditioner if hair feels rough',
      mixed_porosity:
        'Use bond repair as needed on ends and deep conditioner if hair feels rough',
    },
  },
  leave_in_cream: {
    title: 'Leave-in or cream',
    description:
      'Leave-ins are essential for protecting hair from everyday damage. Creams are also leave-ins but sometimes have some styling benefits. Looser curls/waves should opt for lighter spray leave-ins or creams specifically made for wavy hair.',
    categories: ['leave_ins', 'creams'],
    combineCategories: true,
    combinedCategoryKey: 'leave_ins_creams',
    porosityRecommendations: {
      high_porosity: 'Use a leave-in and cream as needed.',
      low_porosity: 'Use a leave-in or cream as needed.',
      normal_porosity: 'Use a leave-in or cream as needed.',
      mixed_porosity: 'Use a leave-in or cream as needed.',
    },
  },
  styler: {
    title: 'Styler',
    description: 'Optional. Gels, foams, and custards for hold and definition.',
    categories: ['gels', 'foams', 'custards'],
    combineCategories: true,
    combinedCategoryKey: 'stylers',
    porosityRecommendations: {
      high_porosity: 'Choose a gel or custard.',
      low_porosity: 'Choose a gel or custard.',
      normal_porosity: 'Choose a gel, foam, or custard.',
      mixed_porosity: 'Choose a gel, foam, or custard.',
    },
  },
  oils_refreshers: {
    title: 'Oils and refreshers',
    description:
      'Optional. Dry finisher; scrunch out crunch, spot-treat rough areas, and to refresh hair between washes. Loose curls/waves should opt for oils labeled as being lightweight if they use one.',
    categories: ['oils', 'sprays'],
    porosityRecommendations: {
      high_porosity: 'Use as needed, focus on ends',
      low_porosity: 'Use as needed',
      normal_porosity: 'Use as needed, focus on ends',
      mixed_porosity: 'Use as needed, focus on ends',
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
    sebdermSafe: false,
  },
  hairTypeTag?: HairTypeProductTag,
): RoutineStepConfig[] {
  return Object.entries(ROUTINE_STEPS)
    .filter(([, step]) => {
      // Skip repair treatment unless high or mixed porosity
      if (step.highPorosityOnly) {
        if (porosity !== 'high_porosity' && porosity !== 'mixed_porosity') {
          return false;
        }
      }
      return true;
    })
    .map(([stepId, step]) => {
      const routineStep = stepId as RoutineStep;
      const allowedCategories = POROSITY_CATEGORIES[porosity];

      let categoryProducts: CategoryWithProducts[];

      if (step.combineCategories) {
        // One row: merge products from all step categories, dedupe, sort
        const byId = new Map<string, Product>();
        for (const category of step.categories) {
          if (!allowedCategories.includes(category)) continue;
          const products = getProductsByCategory(category, {
            country,
            costFilter,
            hairTypeTag,
            requiredTag: step.requiredTag,
            analysisFilters,
          });
          for (const p of products) {
            if (!byId.has(p.id)) byId.set(p.id, p);
          }
        }
        const merged = sortRoutineProducts(Array.from(byId.values()));
        const combinedKey = step.combinedCategoryKey ?? 'leave_ins_creams';
        const offset = productOffsets[combinedKey] || 0;
        const productsToShow = merged.slice(offset, offset + 3);
        categoryProducts = [
          {
            category: combinedKey,
            description: CATEGORY_DESCRIPTIONS[combinedKey],
            products: productsToShow,
            totalProducts: merged.length,
          },
        ];
      } else {
        categoryProducts = step.categories
          .filter((category) => allowedCategories.includes(category))
          .map((category) => {
            const products = getProductsByCategory(category, {
              country,
              costFilter,
              offset: productOffsets[category] || 0,
              hairTypeTag,
              requiredTag: step.requiredTag,
              analysisFilters,
            });

            const productsToShow =
              category === 'accessories'
                ? products.slice(0, 6)
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
      }

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
