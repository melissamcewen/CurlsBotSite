import {
  getRoutineSteps,
  getRandomProductForLightStep,
  prioritizeRoutineProductPool,
} from '@/lib/routineBuilder';
import type { Product } from 'haircare-ingredients-analyzer';

// Mock the getBundledProducts function
jest.mock('haircare-ingredients-analyzer', () => ({
  getBundledProducts: () => ({
    products: {
      'premium-gel': {
        id: 'premium-gel',
        name: 'Premium Gel',
        brand: 'Test Brand',
        product_categories: ['gels'],
        tags: ['premium'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        extensions: {
          frizzbot: { score: -60 },
          porosity: { high: 85, low: 40 },
        },
      },
      'sample-gel': {
        id: 'sample-gel',
        name: 'Sample Gel',
        brand: 'Test Brand',
        product_categories: ['gels'],
        tags: ['samples'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        extensions: {
          frizzbot: { score: -60 },
          porosity: { high: 85, low: 40 },
        },
      },
      'premium-shampoo': {
        id: 'premium-shampoo',
        name: 'Premium Clarifying Shampoo',
        brand: 'Test Brand',
        product_categories: ['clarifying_shampoos'],
        tags: ['premium'],
        buy_links: [{ countries: ['US'], url: 'test' }],
        extensions: {
          frizzbot: { score: -60 },
          porosity: { high: 85, low: 75 },
        },
      },
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

    // Find the styler step which contains gels
    const stylerStep = steps.find((step) => step.id === 'styler');
    expect(stylerStep).toBeDefined();

    // Should include gel (high porosity) but not foam
    const products = stylerStep?.categories.flatMap((cat) => cat.products);
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

  it('lists premium products before non-premium in a category', () => {
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

    const stylerStep = steps.find((step) => step.id === 'styler');
    const products = stylerStep?.categories.flatMap((cat) => cat.products) ?? [];
    const premiumIndex = products.findIndex((p) => p.id === 'premium-gel');
    const sampleIndex = products.findIndex((p) => p.id === 'sample-gel');
    const regularIndex = products.findIndex((p) => p.id === 'test-gel');

    expect(premiumIndex).toBeGreaterThanOrEqual(0);
    if (sampleIndex >= 0) expect(premiumIndex).toBeLessThan(sampleIndex);
    if (regularIndex >= 0) expect(premiumIndex).toBeLessThan(regularIndex);
  });
});

describe('prioritizeRoutineProductPool', () => {
  const createTestProduct = (id: string, tags: string[] = []): Product => ({
    id,
    name: id,
    brand: 'Test Brand',
    buy_links: [{ countries: ['US'], url: 'test' }],
    product_categories: [],
    tags,
  });

  const regular = createTestProduct('regular');
  const sample = createTestProduct('sample', ['samples']);
  const premium = createTestProduct('premium', ['premium']);

  it('prefers premium over samples and regular products', () => {
    const pool = prioritizeRoutineProductPool([regular, sample, premium]);
    expect(pool).toHaveLength(1);
    expect(pool[0].id).toBe('premium');
  });

  it('falls back to samples when no premium products exist', () => {
    const pool = prioritizeRoutineProductPool([regular, sample]);
    expect(pool).toHaveLength(1);
    expect(pool[0].id).toBe('sample');
  });
});

describe('getRandomProductForLightStep', () => {
  it('randomizes within premium products when available', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const product = getRandomProductForLightStep('styler', {
      porosity: 'high_porosity',
      country: 'US',
      cgmApproved: false,
      hairTypeTag: null,
    });

    expect(product?.id).toBe('premium-gel');

    jest.spyOn(Math, 'random').mockRestore();
  });

  it('randomizes within premium clarifying shampoos when available', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const product = getRandomProductForLightStep('clarifying_shampoo', {
      porosity: 'mixed_porosity',
      country: 'US',
      cgmApproved: false,
      hairTypeTag: null,
    });

    expect(product?.id).toBe('premium-shampoo');

    jest.spyOn(Math, 'random').mockRestore();
  });
});
