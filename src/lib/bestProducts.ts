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
    /** Whether to only show sebderm safe products */
    sebdermSafe?: boolean;
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
    customDescriptions: {
      set_gel_to_foam_styling_mousse:
        'Melissa @ CurlsBot says: This is so easy to apply and I love that it has the hold of a gel, but the volume-building and ease of application of a mousse',
    },
  },
  {
    slug: 'best-wavy-gels',
    title: 'The Best Gels for Wavy Hair',
    description:
      'These gels are perfect for wavy hair, with enough hold to keep waves in place, but not too heavy',
    category: ['gels'],
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's wavy hair, looking for products that had real hold to keep waves in place, but lightweight enough to not weigh down waves",
    customDescriptions: {
      curl_keeper_original_liquid_styler:
        'Melissa @ CurlsBot says: Liquid gels like Curl Keeper are uniquely easy to apply and form an excellent hold even in high humidity. I almost always go for liquid gels on my wavy hair.',
      all_weather_styling_gel:
        'Melissa @ CurlsBot says: Liquid gels are my favorite type of gel for wavy hair because of their lightweight hold and resistance to humidity. This gel has very high performance in even the worst weather. Best of all you only need a very small amount, so it lasts a long time.',
    },
  },
  {
    slug: 'best-curly-gels',
    title: 'The Best Gels for Curly Hair',
    description:
      'These gels are perfect for curly hair, providing definition and hold that lasts all day',
    category: ['gels'],
    filters: {
      tags: ['curly'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's curly hair, looking for products did a great job at defining curls and keeping them in place",
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
    slug: 'best-protein-free-deep-conditioners',
    title: 'The Best Protein-Free Deep Conditioners and Masks',
    description:
      'These deep conditioners and masks are protein-free so you can add moisture without adding protein',
    category: ['deep_conditioners'],
    filters: {
      tags: ['protein-free'],
    },
    howWePicked:
      'We used our CurlsBot algorithm to find deep conditioners and masks that are protein-free.',
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
    slug: 'best-conditioning-shampoos',
    title: 'The Best Conditioning Shampoos',
    description:
      'These shampoos have conditioning ingredients that provide a slippery lather, which helps reduce friction damage from washing',
    category: ['shampoos'],
    filters: {
      highPorosity: true,
    },
    howWePicked:
      'These shampoos have conditioning ingredients, namely cationic conditioners, which provide slip',
    customDescriptions: {
      gentle_shampoo:
        'Melissa @ CurlsBot says: This is a gentle shampoo with a rich lather that cleanses effectively without stripping the hair.',
      pure_silk_moisturizing_shampoo:
        'Melissa @ CurlsBot says: Another shampoo with an excellent lather, that feels silky and smooth on the hair.',
    },
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
    title: 'The Best Curls Monthly Products for High Porosity Hair',
    description:
      'Products you can sample through Curls Monthly that we think would be great for high porosity hair',
    category: 'all',
    filters: {
      highPorosity: true,
      tags: ['samples'],
    },
    howWePicked:
      "We combined our own CurlsBot porosity score and refined it with data from Curls Monthly. Plus Melissa @ CurlsBot has mixed porosity (with high porosity ends) and has a subscription to Curls Monthly, so we've tested these products on high porosity hair.",

    customDescriptions: {
      'bond_curl_rehab_salve,_bond_building_strength_treatment_for_weak,_damaged_hair':
        'Melissa @ CurlsBot says: I have long hair and my ends were looking kind of ragged, so I tried this pre-poo and it helped so much! They felt smooth and well-conditioned.',
    },
  },
  {
    slug: 'best-high-porosity-treatments',
    title: 'The Best High Porosity Treatments',
    description: 'These treatments help smooth and protect high porosity hair',
    category: 'treatments',
    filters: {
      highPorosity: true,
    },
    howWePicked:
      'These products have been analyzed by our algorithm and found to contain ingredients that are great for high porosity hair like cationic conditioners and humectants.',
  },

  {
    slug: 'best-protein-free-hair-products',
    title: 'The Best Protein-Free Hair Products',
    description: 'The best hair products that are free of protein',
    category: 'all',
    filters: {
      tags: ['protein-free'],
    },
    howWePicked:
      'Our CurlsBot algorithm analyzed these products and found that they are free of protein.',
  },

  {
    slug: 'best-protein-free-products-for-low-porosity',
    title: 'The Best Protein-Free Products for Low Porosity',
    description:
      'The best products that are free of protein for low porosity hair',
    category: 'all',
    filters: {
      tags: ['protein-free'],
      lowPorosity: true,
    },
    howWePicked:
      'Our CurlsBot algorithm analyzed these products and found that they are free of protein and great for low porosity hair.',
  },
  {
    slug: 'best-protein-products-for-low-porosity',
    title: 'The Best Protein Products for Low Porosity',
    description:
      'The best products that are high in protein for low porosity hair',
    category: 'all',
    filters: {
      tags: ['protein'],
      lowPorosity: true,
    },
    howWePicked:
      'Our CurlsBot algorithm analyzed these products and found that they are high in protein and great for low porosity hair.',
  },

  {
    slug: 'best-low-porosity-wavy-hair-products',
    title: 'The Best Products for Low Porosity Wavy Hair',
    description: 'Products that are lightweight enough to not weigh down waves',
    category: 'all',
    filters: {
      lowPorosity: true,
      tags: ['wavy'],
    },
    howWePicked:
      'We combined our own CurlsBot porosity score and refined it with data from Curls Monthly. Plus Melissa @ CurlsBot is a low porosity wavy hair type and has a lot of experience with finding products that work for this hair type.',
  },
  {
    slug: 'best-wavy-leave-ins',
    title: 'The Best Leave-Ins for Wavy Hair',
    description: 'The best leave-ins for wavy hair',
    category: 'leave_ins',
    filters: {
      tags: ['wavy'],
    },
    howWePicked:
      "We handpicked these products and tested them ourselves on our own or client's wavy hair, looking for products that provided frizz-resistance without weighing down waves",
  },
  {
    slug: 'best-protein-free-glycerin-free-products',
    title: 'The Best Protein and Glycerin Free Products',
    description: 'The best products that are free of protein and glycerin',
    category: 'all',
    filters: {
      tags: ['glycerin-free', 'protein-free'],
    },
    howWePicked:
      'These are products analyzed by our algorithm that are free of protein and glycerin',
  },
  {
    slug: 'best-protein-free-glycerin-free-products-for-low-porosity',
    title: 'The Best Protein and Glycerin Free Products For Low Porosity Hair',
    description:
      'The best products great for low porosity hair that are free of protein and glycerin',
    category: 'all',
    filters: {
      tags: ['glycerin-free', 'protein-free'],
      lowPorosity: true,
    },
    howWePicked:
      'These are products analyzed by our algorithm that are free of protein and glycerin and great for low porosity hair',
  },
  {
    slug: 'best-sebderm-safe-products',
    title: 'The Best Seborrheic Dermatitis Safe Products',
    description:
      "Products that are safest for seborrheic dermatitis because they don't feed Malassezia",
    category: 'all',
    filters: {
      sebdermSafe: true,
    },
    howWePicked:
      'These products have been analyzed and found to be free of common triggers for seborrheic dermatitis such as fatty alcohols, oils, and other ingredient that Malassezia, the fungus that causes seborrheic dermatitis, can thrive on. It is more important to avoid products that stay on the scalp and rinse-off products are less important.',
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

// Default sorting function that prioritizes products with custom descriptions
export function defaultProductSort(
  a: any,
  b: any,
  page: BestProductPage,
): number {
  const aHasCustomDesc = page.customDescriptions?.[a.id] !== undefined;
  const bHasCustomDesc = page.customDescriptions?.[b.id] !== undefined;

  // First tier: Custom descriptions
  if (aHasCustomDesc && !bHasCustomDesc) return -1;
  if (!aHasCustomDesc && bHasCustomDesc) return 1;

  // Second tier: Regular descriptions
  if (a.description && !b.description) return -1;
  if (!a.description && b.description) return 1;

  // If both have same description status, sort by brand
  return a.brand.localeCompare(b.brand);
}
