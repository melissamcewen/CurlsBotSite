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

    // Filter by cost
    if (criteria.costFilter && criteria.costFilter !== 'all') {
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

    // Filter by featured tag
    if (criteria.requireFeatured && !product.tags?.includes('featured'))
      return false;

    // Filter by porosity
    if (criteria.porosity && criteria.porosity !== 'all') {
      // Skip porosity filtering for certain categories
      if (
        product.product_categories?.includes('deep_conditioners') ||
        product.product_categories?.includes('clarifying_shampoos') ||
        product.product_categories?.includes('pre_poo') ||
        product.product_categories?.includes('accessories')
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
