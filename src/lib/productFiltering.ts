import { Product } from 'haircare-ingredients-analyzer';
import type { CountryCode } from './countryDetection';
import { POROSITY_THRESHOLDS, POROSITY_EXEMPT_CATEGORIES } from './porosity';
import type { ProductCategory } from './routineBuilder';
import { filterProductByCountry } from './countryDetection';

interface FilterOptions {
  country: string;
  category: string | string[] | undefined;
  requireFeatured: boolean;
  searchQuery?: string;
  analysisFilters: {
    cgmApproved: boolean;
    frizzResistant: boolean;
    lightweight: boolean;
    highPorosity: boolean;
    lowPorosity: boolean;
  };
}

export function filterProducts(
  products: Product[],
  options: FilterOptions,
): Product[] {
  return products.filter((product) => {
    // Search filter
    if (options.searchQuery) {
      const searchLower = options.searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const brandMatch = product.brand.toLowerCase().includes(searchLower);
      if (!nameMatch && !brandMatch) return false;
    }

    // Country filter
    if (options.country !== 'all') {
      if (!filterProductByCountry(product, options.country)) {
        return false;
      }
    }

    // Category filter
    if (options.category) {
      if (Array.isArray(options.category)) {
        // If category is an array, product must match at least one category
        if (
          !options.category.some((cat) =>
            product.product_categories?.includes(cat),
          )
        ) {
          return false;
        }
      } else if (options.category !== 'all') {
        // If category is a string, product must match that category
        if (!product.product_categories?.includes(options.category)) {
          return false;
        }
      }
    }

    // Analysis-based filters - using AND logic
    if (options.analysisFilters.cgmApproved && product.status !== 'ok') {
      return false;
    }

    // Skip porosity filters for exempt categories
    if (
      options.category &&
      !Array.isArray(options.category) &&
      options.category !== 'all' &&
      POROSITY_EXEMPT_CATEGORIES.includes(options.category as ProductCategory)
    ) {
      return true;
    }

    // Porosity filters from analysis
    const porosityScores = product.extensions?.porosity;
    if (porosityScores) {
      // High porosity products have high score >= threshold (70)
      if (
        options.analysisFilters.highPorosity &&
        porosityScores.high < POROSITY_THRESHOLDS.HIGH_POROSITY
      ) {
        return false;
      }
      // Low porosity products have low score >= threshold (70)
      if (
        options.analysisFilters.lowPorosity &&
        porosityScores.low < POROSITY_THRESHOLDS.LOW_POROSITY
      ) {
        return false;
      }
      // Lightweight products have low score >= threshold (50)
      if (
        options.analysisFilters.lightweight &&
        porosityScores.low < POROSITY_THRESHOLDS.LIGHTWEIGHT
      ) {
        return false;
      }
    } else if (
      options.analysisFilters.highPorosity ||
      options.analysisFilters.lowPorosity ||
      options.analysisFilters.lightweight
    ) {
      // If any porosity filter is active but product has no porosity scores, exclude it
      return false;
    }

    // Frizz resistance filter
    const frizzScore = product.extensions?.frizzbot?.score;
    if (options.analysisFilters.frizzResistant) {
      if (!frizzScore || frizzScore > -50) {
        return false;
      }
    }

    return true;
  });
}
