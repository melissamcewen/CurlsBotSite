import { Product } from 'haircare-ingredients-analyzer';
import type { CountryCode } from './countryDetection';

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
      if (options.analysisFilters.highPorosity && porosityScores.high < 80) {
        return false;
      }
      if (options.analysisFilters.lowPorosity && porosityScores.low < 70) {
        return false;
      }
      if (options.analysisFilters.lightweight && porosityScores.low < 20) {
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
