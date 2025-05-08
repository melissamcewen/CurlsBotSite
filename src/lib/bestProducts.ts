import type { ProductCategory } from './routineBuilder';

export interface BestProductPage {
  /** URL slug for the page */
  slug: string;
  /** Title of the page */
  title: string;
  /** Meta description for SEO */
  description: string;
  /** Product categories to filter by - can be single category, array of categories, or 'all' for all categories */
  category: ProductCategory | ProductCategory[] | 'all';
  /** Filters to apply to products */
  filters: {
    /** Whether to only show CGM approved products */
    cgmApproved?: boolean;
    /** Whether to only show humidity resistant products */
    frizzResistant?: boolean;
    /** Whether to only show lightweight products */
    lightweight?: boolean;
    /** Whether to only show high porosity products */
    highPorosity?: boolean;
    /** Whether to only show low porosity products */
    lowPorosity?: boolean;
    /** Specific tags to filter by */
    tags?: string[];
  };
  /** Custom sorting function for products */
  sortProducts?: (a: any, b: any) => number;
  /** Explanation of how products were selected for this list */
  howWePicked?: string;
}

export const BEST_PRODUCT_PAGES: BestProductPage[] = [
  {
    slug: 'best-wavy-shampoos',
    title: 'The Best Shampoos for Wavy Hair',
    description:
      'These shampoos and conditioners are perfect for wavy hair, with enough cleansing power to remove build-up that weighs down waves, but gentle enough to not strip natural oils',
    category: ['shampoos'],
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's wavy hair, looking for products that had real cleansing power to remove build-up that weighs down waves, but gentle enough to not strip natural oils",
  },
  {
    slug: 'best-wavy-creams',
    title: 'The Best Creams for Wavy Hair',
    description:
      'These creams are perfect for wavy hair, with enough moisture to keep waves hydrated, but not too heavy',
    category: 'creams',
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's wavy hair, looking for products that would add moisture and shine without weighing down waves. If you have wavy hair we recommend you use these products in small amounts, as even lighter weight creams can weigh down waves if overused.",
  },
  /* {
    slug: 'best-humidity-resistant-gels',
    title: 'The Best Humidity Resistant Gels for Curly Hair',
    description:
      'Find the best humidity-resistant gels that will keep your curls defined even in high humidity. Our expert-curated list includes CGM-approved options with proven anti-frizz properties.',
    category: 'gels',
    filters: {
      frizzResistant: true,
      cgmApproved: true,
    },
  },
  {
    slug: 'best-protein-free-conditioners',
    title: 'The Best Protein-Free Conditioners for Curly Hair',
    description:
      'Explore our selection of protein-free conditioners perfect for protein-sensitive curly hair. Each product has been analyzed for ingredients and performance.',
    category: 'conditioners',
    filters: {
      cgmApproved: true,
      tags: ['protein_free'],
    },
  },
  {
    slug: 'best-lightweight-leave-ins',
    title: 'The Best Lightweight Leave-In Conditioners',
    description:
      'Discover the best lightweight leave-in conditioners that provide moisture without weighing down your hair. Perfect for fine or low porosity hair types.',
    category: 'leave_ins',
    filters: {
      lightweight: true,
      cgmApproved: true,
    },
  },
  {
    slug: 'best-high-porosity-deep-conditioners',
    title: 'The Best Deep Conditioners for High Porosity Hair',
    description:
      'Find the best deep conditioners specifically formulated for high porosity hair. Our expert-curated list includes products with rich, penetrating formulas.',
    category: 'deep_conditioners',
    filters: {
      highPorosity: true,
      cgmApproved: true,
    },
  },*/
];

// Helper function to get page configuration by slug
export function getBestProductPage(slug: string): BestProductPage | undefined {
  return BEST_PRODUCT_PAGES.find((page) => page.slug === slug);
}

// Helper function to get all page slugs
export function getAllBestProductSlugs(): string[] {
  return BEST_PRODUCT_PAGES.map((page) => page.slug);
}
