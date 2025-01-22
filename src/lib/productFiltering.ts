import type { Product } from 'haircare-ingredients-analyzer';
import type { PorosityType } from './routineBuilder';
import type { CountryCode } from './countryDetection';

export interface FilterCriteria {
  porosity?: PorosityType | 'all';
  country?: CountryCode | 'all';
  costFilter?: '$' | '$$' | '$$$' | 'all';
  requireFeatured?: boolean;
  category?: string | 'all';
}

// Categories that are exempt from various filters
export const FILTER_EXEMPTIONS = {
  // Products that don't need porosity filtering
  POROSITY_EXEMPT: ['deep_conditioners', 'clarifying_shampoos', 'accessories'],
  // Products that don't need cost filtering
  COST_EXEMPT: ['accessories'],
  // Products that don't need featured filtering
  FEATURED_EXEMPT: ['accessories'],
} as const;

/**
 * Shared function to filter products consistently across the app
 */
export function filterProducts(
  products: Product[],
  criteria: FilterCriteria,
): Product[] {
  return products.filter((product) => {
    if (!product.product_categories || product.product_categories.length === 0)
      return false;

    // Filter by category
    if (criteria.category && criteria.category !== 'all') {
      if (!product.product_categories.includes(criteria.category)) return false;
    }

    // Filter by country
    if (criteria.country && criteria.country !== 'all') {
      if (
        !product.buy_links?.some(
          (link) => (link.country || 'US') === criteria.country,
        )
      ) {
        return false;
      }
    }

    // Filter by cost (except for exempt categories)
    if (
      criteria.costFilter &&
      criteria.costFilter !== 'all' &&
      !product.product_categories.some((cat) =>
        FILTER_EXEMPTIONS.COST_EXEMPT.includes(cat),
      )
    ) {
      const costRating = parseInt(product.cost_rating || '0');
      switch (criteria.costFilter) {
        case '$':
          if (costRating !== 1) return false;
          break;
        case '$$':
          if (costRating !== 2) return false;
          break;
        case '$$$':
          if (costRating < 3) return false;
          break;
      }
    }

    // Filter by featured tag (except for exempt categories)
    if (
      criteria.requireFeatured &&
      !product.product_categories.some((cat) =>
        FILTER_EXEMPTIONS.FEATURED_EXEMPT.includes(cat),
      ) &&
      !product.tags?.includes('featured')
    )
      return false;

    // Filter by porosity
    if (criteria.porosity && criteria.porosity !== 'all') {
      // Skip porosity filtering for exempt categories
      if (
        product.product_categories.some((cat) =>
          FILTER_EXEMPTIONS.POROSITY_EXEMPT.includes(cat),
        )
      ) {
        return true;
      }

      const porosityScore = product.extensions?.porosity;
      if (!porosityScore) return false;

      switch (criteria.porosity) {
        case 'high_porosity':
          if (porosityScore.high < 80) return false;
          break;
        case 'low_porosity':
          if (porosityScore.low < 80) return false;
          break;
        case 'normal_porosity':
          // Accept any product that has porosity scores
          break;
      }
    }

    return true;
  });
}
