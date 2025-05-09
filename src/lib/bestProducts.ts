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
  /** Custom descriptions for specific products on this page */
  customDescriptions?: Record<string, string>;
}

export const BEST_PRODUCT_PAGES: BestProductPage[] = [
  {
    slug: 'best-wavy-shampoos',
    title: 'The Best Shampoos for Wavy Hair',
    description:
      'These shampoos are perfect for wavy hair, with enough cleansing power to remove build-up that weighs down waves, but gentle enough to not strip natural oils',
    category: ['shampoos'],
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "If you have wavy hair, you know it can be frustrating to find the right shampoo. Many curly shampoos are not cleansing enough to remove build-up that weighs down waves, but you also don't want something that dries your hair out. These shampoos have a great balancing of cleansing power with protective conditioners to keep your waves hydrated and bouncy.",
    /* customDescriptions: {
      super_moisture_shampoo: 'Melissa @ CurlsBot says: I love the scent and the feel of this shampoo. It does a great job cleansing while not drying out my waves.',
    },*/
  },
  {
    slug: 'best-wavy-creams',
    title: 'The Best Creams for Wavy Hair',
    description:
      'These creams are perfect for wavy hair, with enough moisture to keep waves hydrated, but so heavy that they weigh down waves',
    category: 'creams',
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's wavy hair, looking for products that would add moisture and shine without weighing down waves. If you have wavy hair we recommend you use these products in small amounts (like a quarter or dime-size emulsified in your palms), as even lighter weight creams can weigh down waves if overused.",
  },

  {
    slug: 'best-wavy-mousses',
    title: 'The Best Mousses for Wavy Hair',
    description:
      'These mousses are perfect for wavy hair, with enough hold to keep waves in place, but not too heavy',
    category: ['foams'],
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's wavy hair, looking for products that had real hold to keep waves in place, but lightweight enough to not weigh down waves",
  },
  {
    slug: 'best-curl-mousses',
    title: 'The Best Mousses for Curly Hair',
    description:
      'These mousses are perfect for curly hair, adding hold, definition, humidity-resistance, and texture',
    category: ['foams'],
    filters: {
      tags: ['curly'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's curly hair, looking for products that added hold, definition, humidity-resistance, and texture",
  },
  {
    slug: 'best-curl-conditioners',
    title: 'The Best Conditioners for Curly Hair',
    description:
      'These conditioners are perfect for keeping curly hair hydrated and bouncy',
    category: ['conditioners'],
    filters: {
      tags: ['curly'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's curly hair, looking for products that protected hair from everyday damage, added moisture, and added structure",
  },
  {
    slug: 'best-fine-mousses',
    title: 'The Best Mousses for Fine Hair',
    description:
      'These mousses are perfect for fine hair, adding hold and definition without weighing down the hair',
    category: ['foams'],
    filters: {
      lowPorosity: true,
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's fine hair, looking for products that added hold, definition, and texture without weighing down the hair",
  },
  {
    slug: 'best-curls-monthly-low-porosity-products',
    title: 'The Best Curls Monthly Products for Low Porosity Hair',
    description:
      'Products you can sample through Curls Monthly that we think would be great for low porosity hair',
    category: 'all',
    filters: {
      lowPorosity: true,
      tags: ['samples'],
    },
    howWePicked:
      "We combined our own CurlsBot porosity score and refined it with data from Curls Monthly. Plus Melissa @ CurlsBot is a low porosity hair type and has a subscription to Curls Monthly, so we've tested these products on low porosity hair.",
  },
  {
    slug: 'best-curls-monthly-high-porosity-products',
    title: 'The Best Products for Low Porosity Wavy Hair',
    description:
      'Products that are lightweight enough to not weigh down waves',
    category: 'all',
    filters: {
      lowPorosity: true,
      tags: ['wavy'],
    },
    howWePicked:
      "We combined our own CurlsBot porosity score and refined it with data from Curls Monthly. Plus Melissa @ CurlsBot is a low porosity wavy hair type and has a lot of experience with finding products that work for this hair type.",
  },
  /* wait until I have tagged list for mens
  {
    slug: 'best-mousses-men',
    title: 'The Best Mousses for Men',
    description:
      "These mousses are perfect for men, as they add hold, definition, and texture on even shorter men's styles",
    category: ['foams'],
    filters: {
      tags: [],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our boyfriend's hair, looking for products that added hold, definition, and texture on even shorter men's styles",
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

// Helper function to get custom description for a product on a specific page
export function getCustomDescription(
  page: BestProductPage,
  productId: string,
): string | undefined {
  return page.customDescriptions?.[productId];
}
