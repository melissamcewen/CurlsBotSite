import { Product } from 'haircare-ingredients-analyzer';
import type { CountryCode } from './countryDetection';
import { POROSITY_THRESHOLDS } from './porosity';

interface FilterOptions {
  country: string;
  category: string;
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
      const hasCountry = product.buy_links?.some(
        (link) => (link.country || 'US') === options.country,
      );
      if (!hasCountry) return false;
    }

    // Category filter
    if (options.category !== 'all') {
      if (!product.product_categories?.includes(options.category)) return false;
    }

    // Analysis-based filters - using AND logic
    if (options.analysisFilters.cgmApproved && product.status !== 'ok') {
      return false;
    }

    // Porosity filters from analysis
    const porosityScores = product.extensions?.porosity;
    if (porosityScores) {
      // High porosity products have high score >= 80
      if (
        options.analysisFilters.highPorosity &&
        porosityScores.high < POROSITY_THRESHOLDS.HIGH_POROSITY
      ) {
        return false;
      }
      // Low porosity products have low score >= 70
      if (
        options.analysisFilters.lowPorosity &&
        porosityScores.low < POROSITY_THRESHOLDS.LOW_POROSITY
      ) {
        return false;
      }
      // Lightweight products are the same as low porosity
      if (
        options.analysisFilters.lightweight &&
        porosityScores.low < POROSITY_THRESHOLDS.LOW_POROSITY
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
