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
        buy_links: [{ country: 'US', url: 'test' }],
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
        buy_links: [{ country: 'US', url: 'test' }],
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
        buy_links: [{ country: 'US', url: 'test' }],
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

  it('shows only products good for both high and low porosity for mixed porosity', () => {
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

    // Find the hold step which contains gels and foams
    const holdStep = steps.find((step) => step.id === 'hold');
    expect(holdStep).toBeDefined();

    // Should only include the versatile product that works for both
    const products = holdStep?.categories.flatMap((cat) => cat.products);
    expect(products?.some((p) => p.name === 'Test Versatile Product')).toBe(
      true,
    );
    expect(products?.some((p) => p.name === 'Test Gel')).toBe(false); // Only good for high porosity
    expect(products?.some((p) => p.name === 'Test Foam')).toBe(false); // Only good for low porosity
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

    const holdStep = steps.find((step) => step.id === 'hold');
    const gelCategory = holdStep?.categories.find(
      (cat) => cat.category === 'gels',
    );

    // Should show correct total count even with offset
    expect(gelCategory?.totalProducts).toBeGreaterThan(0);
    // Should only show up to 3 products
    expect(gelCategory?.products.length).toBeLessThanOrEqual(3);
  });
});
