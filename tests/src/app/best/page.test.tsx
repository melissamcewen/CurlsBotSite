import { getBestProductPage } from '@/lib/bestProducts';
import type { Product } from 'haircare-ingredients-analyzer';

// Mock the getBundledProducts function
jest.mock('haircare-ingredients-analyzer', () => ({
  getBundledProducts: () => ({
    products: {
      'correct-product': {
        id: 'correct-product',
        name: 'Correct Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['protein-free', 'glycerin-free'],
        ingredients_raw:
          'water, cetyl alcohol, behentrimonium chloride, propanediol',
      },
      'protein-only-product': {
        id: 'protein-only-product',
        name: 'Protein Only Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['protein-free'],
        ingredients_raw:
          'water, glycerin, cetyl alcohol, behentrimonium chloride',
      },
      'glycerin-only-product': {
        id: 'glycerin-only-product',
        name: 'Glycerin Only Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['glycerin-free'],
        ingredients_raw: 'water, cetyl alcohol, behentrimonium chloride',
      },
      'no-tags-product': {
        id: 'no-tags-product',
        name: 'No Tags Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: [],
        ingredients_raw: 'water, glycerin, protein, cetyl alcohol',
      },
    },
  }),
}));

describe('Best Products Page Filtering', () => {
  it('filters products correctly for protein-free and glycerin-free page', () => {
    const page = getBestProductPage(
      'best-protein-free-glycerin-free-products-for-low-porosity',
    );
    expect(page).toBeDefined();
    expect(page?.filters.tags).toEqual(['glycerin-free', 'protein-free']);

    // Mock the products data
    const mockProducts = {
      'correct-product': {
        id: 'correct-product',
        name: 'Correct Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['protein-free', 'glycerin-free'],
        ingredients_raw:
          'water, cetyl alcohol, behentrimonium chloride, propanediol',
      },
      'protein-only-product': {
        id: 'protein-only-product',
        name: 'Protein Only Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['protein-free'],
        ingredients_raw:
          'water, glycerin, cetyl alcohol, behentrimonium chloride',
      },
      'glycerin-only-product': {
        id: 'glycerin-only-product',
        name: 'Glycerin Only Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['glycerin-free'],
        ingredients_raw: 'water, cetyl alcohol, behentrimonium chloride',
      },
      'no-tags-product': {
        id: 'no-tags-product',
        name: 'No Tags Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: [],
        ingredients_raw: 'water, glycerin, protein, cetyl alcohol',
      },
    };

    // Simulate the filtering logic from the page
    const filteredProducts = Object.values(mockProducts).filter((product) => {
      if (page?.filters.tags) {
        return page.filters.tags.every((tag) => product.tags?.includes(tag));
      }
      return true;
    });

    // Should only include products with both protein-free and glycerin-free tags
    expect(filteredProducts).toHaveLength(1);
    expect(filteredProducts[0].id).toBe('correct-product');

    // Should NOT include products missing either tag
    expect(filteredProducts.some((p) => p.id === 'protein-only-product')).toBe(
      false,
    );
    expect(filteredProducts.some((p) => p.id === 'glycerin-only-product')).toBe(
      false,
    );
    expect(filteredProducts.some((p) => p.id === 'no-tags-product')).toBe(
      false,
    );
  });

  it('filters products correctly for protein-free and glycerin-free page (without low porosity)', () => {
    const page = getBestProductPage('best-protein-free-glycerin-free-products');
    expect(page).toBeDefined();
    expect(page?.filters.tags).toEqual(['glycerin-free', 'protein-free']);

    // Mock the products data
    const mockProducts = {
      'correct-product': {
        id: 'correct-product',
        name: 'Correct Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['protein-free', 'glycerin-free'],
        ingredients_raw:
          'water, cetyl alcohol, behentrimonium chloride, propanediol',
      },
      'protein-only-product': {
        id: 'protein-only-product',
        name: 'Protein Only Product',
        brand: 'Test Brand',
        product_categories: ['conditioners'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        tags: ['protein-free'],
        ingredients_raw:
          'water, glycerin, cetyl alcohol, behentrimonium chloride',
      },
    };

    // Simulate the filtering logic from the page
    const filteredProducts = Object.values(mockProducts).filter((product) => {
      if (page?.filters.tags) {
        return page.filters.tags.every((tag) => product.tags?.includes(tag));
      }
      return true;
    });

    // Should only include products with both protein-free and glycerin-free tags
    expect(filteredProducts).toHaveLength(1);
    expect(filteredProducts[0].id).toBe('correct-product');

    // Should NOT include products missing either tag
    expect(filteredProducts.some((p) => p.id === 'protein-only-product')).toBe(
      false,
    );
  });

  it('supports buttons configuration on best product pages', () => {
    const page = getBestProductPage('best-sebderm-safe-products');
    expect(page).toBeDefined();
    expect(page?.buttons).toBeDefined();
    expect(page?.buttons).toHaveLength(2);
    expect(page?.buttons?.[0]).toEqual({
      url: '/blog/can-curly-routines-products-cause-dandruff',
      text: 'The science behind seborrheic dermatitis',
    });
    expect(page?.buttons?.[1]).toEqual({
      url: '/labs/sebderm',
      text: 'Sebderm ingredient checker',
    });
  });
});
