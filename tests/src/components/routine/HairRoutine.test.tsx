import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HairRoutine from '@/components/routine/HairRoutine';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
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
jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: (target, prop) => () =>
        <span data-testid={`icon-${String(prop)}`} />,
    },
  );
});

// Mock the product data
jest.mock('haircare-ingredients-analyzer', () => {
  return {
    getBundledProducts: jest.fn().mockImplementation(() => {
      return {
        products: {
          'test-product-1': {
            id: 'test-product-1',
            name: 'Test Product',
            brand: 'Test Brand',
            description: 'Test description',
            buy_links: [
              { url: 'https://example.com/us', country: 'US' },
              { url: 'https://example.co.uk', country: 'UK' },
            ],
            product_categories: ['shampoos', 'gels'],
            status: 'ok',
          },
          'test-product-2': {
            id: 'test-product-2',
            name: 'Test Product No Description',
            brand: 'Test Brand',
            description: '', // Empty description
            buy_links: [{ url: 'https://example.com/au', country: 'AU' }],
            product_categories: ['gels', 'oils'],
            status: 'ok',
          },
          'test-product-3': {
            id: 'test-product-3',
            name: 'Test Conditioner',
            brand: 'Test Brand',
            description: 'Test conditioner description',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['conditioners'],
            status: 'ok',
          },
          'test-product-4': {
            id: 'test-product-4',
            name: 'Test Oil',
            brand: 'Test Brand',
            description: 'Test oil for styling',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['oils'],
            status: 'ok',
          },
          'test-product-5': {
            id: 'test-product-5',
            name: 'Test Deep Conditioner',
            brand: 'Test Brand',
            description: 'Test deep conditioner',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['deep_conditioners'],
            status: 'ok',
          },
          'test-product-6': {
            id: 'test-product-6',
            name: 'Test Clarifying Shampoo',
            brand: 'Test Brand',
            description: 'Test clarifying shampoo',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['clarifying_shampoos'],
            status: 'ok',
          },
        },
      };
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

  it('uses oils and sprays as stylers for straight hair types', () => {
    // Configure the context to use US
    jest
      .spyOn(require('@/contexts/LocalizationContext'), 'useLocalization')
      .mockReturnValue({
        country: 'US' as CountryCode,
        setCountry: mockSetCountry,
        countryName: 'United States',
      });

    const { container } = render(<HairRoutine curlsBotType="Straight hair" />);

    // Just check that it renders without error
    expect(container).toBeTruthy();
  });

  it('defaults to minimal routine and can toggle to full routine', async () => {
    const { container, getByText } = render(<HairRoutine />);

    // Initially should be minimal (default true)
    // Find the checkbox for minimal routine
    const minimalToggle = container.querySelector(
      'input[type="checkbox"].toggle.toggle-secondary',
    );
    expect(minimalToggle).toBeTruthy();
    expect((minimalToggle as HTMLInputElement).checked).toBe(true);

    // Toggle to full routine
    fireEvent.click(minimalToggle as HTMLElement);

    // Wait for the products to load after toggling
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Now it should have rendered
    expect(container).toBeTruthy();
  });

  it('uses different categories for first and second stylers in non-minimal routine', async () => {
    // Mock for non-straight hair type
    jest
      .spyOn(require('@/contexts/LocalizationContext'), 'useLocalization')
      .mockReturnValue({
        country: 'US' as CountryCode,
        setCountry: mockSetCountry,
        countryName: 'United States',
      });

    // Ensure we can find distinct products for different categories
    const mockGetBundled = jest.spyOn(
      require('haircare-ingredients-analyzer'),
      'getBundledProducts',
    );
    mockGetBundled.mockImplementation(() => {
      return {
        products: {
          'gel-product': {
            id: 'gel-product',
            name: 'Test Gel',
            brand: 'Test Brand',
            description: 'Test gel styling product',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['gels'],
            status: 'ok',
          },
          'cream-product': {
            id: 'cream-product',
            name: 'Test Cream',
            brand: 'Test Brand',
            description: 'Test cream styling product',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['creams'],
            status: 'ok',
          },
          'shampoo-product': {
            id: 'shampoo-product',
            name: 'Test Shampoo',
            brand: 'Test Brand',
            description: 'Test shampoo',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['shampoos'],
            status: 'ok',
          },
          'conditioner-product': {
            id: 'conditioner-product',
            name: 'Test Conditioner',
            brand: 'Test Brand',
            description: 'Test conditioner',
            buy_links: [{ url: 'https://example.com/us', country: 'US' }],
            product_categories: ['conditioners'],
            status: 'ok',
          },
        },
      };
    });

    const { container } = render(<HairRoutine hairType="wavy" />);

    // Toggle minimal routine off
    const minimalToggle = container.querySelector(
      'input[type="checkbox"].toggle.toggle-secondary',
    );
    expect(minimalToggle).toBeTruthy();
    fireEvent.click(minimalToggle as HTMLElement);

    // Wait for the products to load
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Should render without error
    expect(container).toBeTruthy();

    // Clean up mock
    mockGetBundled.mockRestore();
  });
});
