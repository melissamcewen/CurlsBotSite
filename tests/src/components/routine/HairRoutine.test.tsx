import React from 'react';
import { render, screen } from '@testing-library/react';
import HairRoutine from '@/components/routine/HairRoutine';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { CountryCode } from '@/lib/countryDetection';

const mockSetCountry = jest.fn();
jest.mock('@/contexts/LocalizationContext', () => ({
  useLocalization: () => ({
    country: 'US' as CountryCode,
    setCountry: mockSetCountry,
    countryName: 'United States',
  }),
}));

jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: (target, prop) => () =>
        <span data-testid={`icon-${String(prop)}`} />,
    },
  );
});

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
              { url: 'https://example.com/us', countries: ['US'] },
              { url: 'https://example.co.uk', countries: ['UK'] },
            ],
            product_categories: ['shampoos', 'gels'],
            status: 'ok',
            tags: ['wavy'],
          },
          'test-product-2': {
            id: 'test-product-2',
            name: 'Test Product No Description',
            brand: 'Test Brand',
            description: '',
            buy_links: [{ url: 'https://example.com/au', countries: ['AU'] }],
            product_categories: ['gels', 'oils'],
            status: 'ok',
            tags: ['wavy'],
          },
          'test-product-3': {
            id: 'test-product-3',
            name: 'Test Conditioner',
            brand: 'Test Brand',
            description: 'Test conditioner description',
            buy_links: [{ url: 'https://example.com/us', countries: ['US'] }],
            product_categories: ['conditioners'],
            status: 'ok',
            tags: ['wavy'],
          },
          'test-product-4': {
            id: 'test-product-4',
            name: 'Test Oil',
            brand: 'Test Brand',
            description: 'Test oil for styling',
            buy_links: [{ url: 'https://example.com/us', countries: ['US'] }],
            product_categories: ['oils'],
            status: 'ok',
            tags: ['wavy'],
          },
          'test-product-5': {
            id: 'test-product-5',
            name: 'Test Deep Conditioner',
            brand: 'Test Brand',
            description: 'Test deep conditioner',
            buy_links: [{ url: 'https://example.com/us', countries: ['US'] }],
            product_categories: ['deep_conditioners'],
            status: 'ok',
            tags: ['wavy'],
          },
          'test-product-6': {
            id: 'test-product-6',
            name: 'Test Clarifying Shampoo',
            brand: 'Test Brand',
            description: 'Test clarifying shampoo',
            buy_links: [{ url: 'https://example.com/us', countries: ['US'] }],
            product_categories: ['clarifying_shampoos'],
            status: 'ok',
            tags: ['wavy'],
          },
        },
      };
    }),
  };
});

describe('HairRoutine', () => {
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

  it('renders with curlsBotType without crashing', () => {
    const { container } = render(<HairRoutine curlsBotType="Straight hair" />);
    expect(container).toBeTruthy();
  });

  it('renders Randomize button and CTA to full routine', () => {
    render(<HairRoutine />);
    expect(screen.getByRole('button', { name: 'Randomize products' })).toBeInTheDocument();
    const fullRoutineLink = screen.getByText('Build full routine');
    expect(fullRoutineLink).toBeInTheDocument();
    expect(fullRoutineLink.closest('a')).toHaveAttribute('href', '/routine-builder');
  });

  it('renders routine product grid', () => {
    const { container } = render(<HairRoutine />);
    const grid = container.querySelector('[data-testid="routine-product-grid"]');
    expect(grid).toBeTruthy();
  });
});
