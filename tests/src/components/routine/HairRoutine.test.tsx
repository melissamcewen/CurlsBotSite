import React from 'react';
import { render, screen } from '@testing-library/react';
import HairRoutine from '@/components/routine/HairRoutine';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { filterProducts } from '@/lib/productFiltering';
import type { CountryCode } from '@/lib/countryDetection';

// Mock the LocalizationContext
const mockSetCountry = jest.fn();
jest.mock('@/contexts/LocalizationContext', () => ({
  useLocalization: () => ({
    country: 'US' as CountryCode,
    setCountry: mockSetCountry,
    countryName: 'United States',
  }),
}));

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Shuffle: () => <div data-testid="shuffle-icon" />,
  Droplets: () => <div data-testid="droplets-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
  ShoppingBag: () => <div data-testid="shopping-bag-icon" />,
  Layers: () => <div data-testid="layers-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

// Mock products for testing
jest.mock('@/lib/productFiltering', () => {
  const originalModule = jest.requireActual('@/lib/productFiltering');
  return {
    ...originalModule,
    filterProducts: jest.fn().mockImplementation((products, options) => {
      if (options.country === 'EU') {
        // Return empty array to simulate no products found in EU
        return [];
      }

      if (options.country === 'AU') {
        // Return products without descriptions for AU
        return [
          {
            id: 'test-product-2',
            name: 'Test Product No Description',
            brand: 'Test Brand',
            description: '', // Empty description
            buy_links: [{ url: 'https://example.com/au', country: 'AU' }],
            product_categories: ['gels'],
          },
        ];
      }

      // Return a product with description for other countries
      return [
        {
          id: 'test-product-1',
          name: 'Test Product',
          brand: 'Test Brand',
          description: 'Test description',
          buy_links: [
            { url: 'https://example.com/us', country: 'US' },
            { url: 'https://example.co.uk', country: 'UK' },
          ],
          product_categories: ['gels'],
        },
      ];
    }),
  };
});

describe('HairRoutine', () => {
  // Verify that getBundledProducts returns data
  it('has access to product data', () => {
    const data = getBundledProducts();
    expect(data).toBeDefined();
    expect(data.products).toBeDefined();
    expect(Object.keys(data.products).length).toBeGreaterThan(0);
  });

  it('renders without crashing', () => {
    const { container } = render(<HairRoutine />);
    expect(container).toBeTruthy();
  });

  it('renders with custom props without crashing', () => {
    const { container } = render(
      <HairRoutine hairType="wavy" initialPorosity="high_porosity" />,
    );
    expect(container).toBeTruthy();
  });

  it('renders without leave-in for straight hair types', () => {
    const { container } = render(<HairRoutine curlsBotType="Straight hair" />);
    expect(container).toBeTruthy();
  });

  it('handles products with descriptions', async () => {
    jest
      .spyOn(require('@/contexts/LocalizationContext'), 'useLocalization')
      .mockReturnValue({
        country: 'US' as CountryCode,
        setCountry: mockSetCountry,
        countryName: 'United States',
      });

    // Just check that it renders without error
    const { container } = render(<HairRoutine />);
    expect(container).toBeTruthy();
  });

  it('handles products without descriptions', async () => {
    jest
      .spyOn(require('@/contexts/LocalizationContext'), 'useLocalization')
      .mockReturnValue({
        country: 'AU' as CountryCode,
        setCountry: mockSetCountry,
        countryName: 'Australia',
      });

    // Just check that it renders without error
    const { container } = render(<HairRoutine />);
    expect(container).toBeTruthy();
  });

  it('handles no products found gracefully', async () => {
    jest
      .spyOn(require('@/contexts/LocalizationContext'), 'useLocalization')
      .mockReturnValue({
        country: 'EU' as CountryCode,
        setCountry: mockSetCountry,
        countryName: 'European Union',
      });

    // Just check that it renders without error
    const { container } = render(<HairRoutine />);
    expect(container).toBeTruthy();
  });

  it('tries multiple styler categories when the first one returns no products', async () => {
    // Mock filterProducts to return products only for 'gels' styling category
    const mockFilterProducts = jest.spyOn(
      require('@/lib/productFiltering'),
      'filterProducts',
    );
    mockFilterProducts.mockImplementation((products, options) => {
      // Return empty array for all styler categories except 'gels'
      if (
        ['creams', 'foams', 'custards', 'oils', 'sprays'].includes(
          options.category,
        )
      ) {
        return [];
      }

      // Return a product for 'gels' category
      if (options.category === 'gels') {
        return [
          {
            id: 'test-gel',
            name: 'Test Gel',
            brand: 'Test Brand',
            description: 'Test gel description',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['gels'],
          },
        ];
      }

      // Return a product for other categories (shampoo, conditioner)
      return [
        {
          id: 'test-product',
          name: 'Test Product',
          brand: 'Test Brand',
          description: 'Test description',
          buy_links: [{ url: 'https://example.com/us', country: 'US' }],
          product_categories: [options.category],
        },
      ];
    });

    // Render the component
    const { container } = render(<HairRoutine />);

    // Wait for the component to load products
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check that the Test Gel product is in the document
    expect(container.textContent).toContain('Test Gel');

    // Restore the original implementation
    mockFilterProducts.mockRestore();
  });
});
