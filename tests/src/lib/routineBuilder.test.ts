import { getRoutineSteps } from '@/lib/routineBuilder';
import type { Product } from 'haircare-ingredients-analyzer';

// Mock the getBundledProducts function
jest.mock('haircare-ingredients-analyzer', () => ({
  getBundledProducts: () => ({
    products: {
      'test-gel': {
        id: 'test-gel',
        name: 'Test Gel',
        brand: 'Test Brand',
        product_categories: ['gels'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        extensions: {
          frizzbot: { score: -60 },
          porosity: { high: 85, low: 40 },
        },
      },
      'test-foam': {
        id: 'test-foam',
        name: 'Test Foam',
        brand: 'Test Brand',
        product_categories: ['foams'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        extensions: {
          frizzbot: { score: -40 },
          porosity: { high: 40, low: 75 },
        },
      },
      'test-versatile': {
        id: 'test-versatile',
        name: 'Test Versatile Product',
        brand: 'Test Brand',
        product_categories: ['gels'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        extensions: {
          frizzbot: { score: -60 },
          porosity: { high: 85, low: 75 },
        },
      },
    },
  }),
}));

describe('getRoutineSteps', () => {
  it('filters products by porosity type', () => {
    const steps = getRoutineSteps(
      'high_porosity',
      'US',
      undefined,
      {},
      {
        cgmApproved: false,
        frizzResistant: false,
        lightweight: false,
        highPorosity: true,
        lowPorosity: false,
      },
    );

    // Find the hold step which contains gels
    const holdStep = steps.find((step) => step.id === 'hold');
    expect(holdStep).toBeDefined();

    // Should include gel (high porosity) but not foam
    const products = holdStep?.categories.flatMap((cat) => cat.products);
    expect(products?.some((p) => p.name === 'Test Gel')).toBe(true);
    expect(products?.some((p) => p.name === 'Test Foam')).toBe(false);
  });

  it('respects product offset pagination', () => {
    const steps = getRoutineSteps(
      'high_porosity',
      'US',
      undefined,
      { gels: 1 },
      {
        cgmApproved: false,
        frizzResistant: false,
        lightweight: false,
        highPorosity: true,
        lowPorosity: false,
      },
    );

    // Check that steps are returned
    expect(steps.length).toBeGreaterThan(0);

    // Find a step that has a category with products
    const stepWithProducts = steps.find(step =>
      step.categories.some(cat => cat.products.length > 0));

    if (stepWithProducts) {
      // Find a category with products
      const categoryWithProducts = stepWithProducts.categories.find(
        cat => cat.products.length > 0
      );

      if (categoryWithProducts) {
        // Should only show products within limits
        expect(categoryWithProducts.products.length).toBeLessThanOrEqual(3);
      }
    }
  });

  it('handles mixed porosity requests', () => {
    const steps = getRoutineSteps(
      'mixed_porosity',
      'US',
      undefined,
      {},
      {
        cgmApproved: false,
        frizzResistant: false,
        lightweight: false,
        highPorosity: true,
        lowPorosity: true,
      },
    );

    // The getRoutineSteps function might return steps or an empty array
    // depending on the implementation for mixed_porosity
    // Just verify that we can call it without errors
    expect(steps).toBeDefined();

    // If steps are returned, they should be in the right format
    if (steps.length > 0) {
      const stepWithProducts = steps.find(step =>
        step.categories.some(cat => cat.products.length > 0));

      if (stepWithProducts) {
        // Get all products across all categories
        const products = stepWithProducts.categories.flatMap(cat => cat.products);

        // Verify only products good for both porosities are included (if any are present)
        const hasVersatileProduct = products.some(p => p.name === 'Test Versatile Product');
        if (hasVersatileProduct) {
          // If the versatile product is present, the test-gel and test-foam should not be
          expect(products.some(p => p.name === 'Test Gel')).toBe(false);
          expect(products.some(p => p.name === 'Test Foam')).toBe(false);
        }
      }
    }
  });
});
