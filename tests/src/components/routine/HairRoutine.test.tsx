import React from 'react';
import { render, screen } from '@testing-library/react';
import HairRoutine from '@/components/routine/HairRoutine';
import { getBundledProducts } from 'haircare-ingredients-analyzer';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Shuffle: () => <div data-testid="shuffle-icon" />,
  Droplets: () => <div data-testid="droplets-icon" />,
  Sparkles: () => <div data-testid="sparkles-icon" />,
  ShoppingBag: () => <div data-testid="shopping-bag-icon" />,
  Layers: () => <div data-testid="layers-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

// Mock countryDetection to always return 'US'
jest.mock('@/lib/countryDetection', () => ({
  getCountryFromHostname: () => 'US',
}));

// Mock products for testing
jest.mock('@/lib/productFiltering', () => ({
  filterProducts: jest.fn().mockImplementation(() => {
    // Just return a test product that will always have a description
    return [
      {
        id: 'test-product-1',
        name: 'Test Product',
        brand: 'Test Brand',
        description: 'Test description',
        buy_links: [{ url: 'https://example.com', country: 'US' }],
      },
    ];
  }),
}));

describe('HairRoutine', () => {
  // Verify that getBundledProducts returns data
  it('has access to product data', () => {
    const data = getBundledProducts();
    expect(data).toBeDefined();
    expect(data.products).toBeDefined();
    expect(Object.keys(data.products).length).toBeGreaterThan(0);
  });

  it('renders without crashing', () => {
    render(<HairRoutine />);
    expect(screen.getByText('Routine')).toBeInTheDocument();
  });

  it('renders all settings controls', () => {
    render(<HairRoutine />);
    expect(screen.getByText('CGM')).toBeInTheDocument();
    expect(screen.getByText('Minimal Routine')).toBeInTheDocument();
    expect(screen.getByText('Shuffle')).toBeInTheDocument();
    expect(screen.getByTestId('shuffle-icon')).toBeInTheDocument();
  });

  it('renders with custom hair type', () => {
    render(<HairRoutine hairType="wavy" initialPorosity="high_porosity" />);
    expect(screen.getByText(/based on your wavy hair/i)).toBeInTheDocument();
  });

  // The following test checks that the component renders with our mock data
  it('renders products with clickable product names', async () => {
    render(<HairRoutine />);

    // Should initially show loading state
    expect(screen.getByText('Loading recommendations...')).toBeInTheDocument();

    // Using queryByText with a function to match the product name
    const productLinks = await screen.findAllByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'a' &&
        content.includes('Test Product')
      );
    });
    expect(productLinks.length).toBeGreaterThan(0);

    // Check product grid is present
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
});
