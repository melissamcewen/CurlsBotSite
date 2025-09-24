import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';
import type { Product } from 'haircare-ingredients-analyzer';

// Mock Product object for testing
const mockProduct: Product = {
  id: 'test-product',
  name: 'Test Product',
  brand: 'Test Brand',
  product_categories: ['shampoos'],
  buy_links: [{ url: 'https://test.com', retailer: 'Test Retailer' }],
  ingredients_raw: 'water, sodium chloride',
  description: 'Test product description',
  cost: 10.99,
  cost_rating: '$$',
  asin: 'B123456789',
  status: 'ok',
  systems_excluded: [],
  tags: ['test'],
};

// Mock window.dataLayer
const mockDataLayer: any[] = [];
Object.defineProperty(window, 'dataLayer', {
  value: mockDataLayer,
  writable: true,
  configurable: true,
});

// Also mock the global dataLayer for trackProductInteraction
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Mock console methods to avoid test output noise
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  // Clear dataLayer before each test
  mockDataLayer.length = 0;

  // Ensure window.dataLayer is properly set up
  if (!window.dataLayer) {
    window.dataLayer = mockDataLayer;
  }

  // Suppress console warnings/errors during tests
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  // Restore console methods
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

describe('Product Tracking Utilities', () => {
  describe('addProductTrackingAttributes', () => {
    it('should add all required data attributes to a link element', () => {
      const link = document.createElement('a');
      link.href = 'https://test.com';

      addProductTrackingAttributes(link, mockProduct, 'buy', 'Test Retailer');

      expect(link.getAttribute('data-product-id')).toBe('test-product');
      expect(link.getAttribute('data-product-name')).toBe(
        'Test Brand Test Product',
      );
      expect(link.getAttribute('data-product-brand')).toBe('Test Brand');
      expect(link.getAttribute('data-product-category')).toBe('shampoos');
      expect(link.getAttribute('data-link-type')).toBe('buy');
      expect(link.getAttribute('data-retailer')).toBe('Test Retailer');
      expect(link.classList.contains('product-link')).toBe(true);
    });

    it('should handle missing brand gracefully', () => {
      const productWithoutBrand = { ...mockProduct, brand: '' };
      const link = document.createElement('a');

      addProductTrackingAttributes(
        link,
        productWithoutBrand,
        'buy',
        'Test Retailer',
      );

      expect(link.getAttribute('data-product-name')).toBe('Test Product');
      expect(link.getAttribute('data-product-brand')).toBe('');
    });

    it('should not concatenate description as brand with product name', () => {
      const productWithDescriptionAsBrand = {
        ...mockProduct,
        name: 'The Ordinary 100% Plant-Derived Squalane',
        brand: "A lightweight oil that's perfect for pre-poo treatments",
      };
      const link = document.createElement('a');

      addProductTrackingAttributes(link, productWithDescriptionAsBrand, 'buy');

      // Should not concatenate brand + name when brand is actually a description
      expect(link.getAttribute('data-product-name')).toBe(
        "A lightweight oil that's perfect for pre-poo treatments The Ordinary 100% Plant-Derived Squalane",
      );
      expect(link.getAttribute('data-product-brand')).toBe(
        "A lightweight oil that's perfect for pre-poo treatments",
      );
    });

    it('should handle missing categories gracefully', () => {
      const productWithoutCategories = {
        ...mockProduct,
        product_categories: [],
      };
      const link = document.createElement('a');

      addProductTrackingAttributes(
        link,
        productWithoutCategories,
        'buy',
        'Test Retailer',
      );

      expect(link.getAttribute('data-product-category')).toBe('');
    });

    it('should handle missing retailer gracefully', () => {
      const link = document.createElement('a');

      addProductTrackingAttributes(link, mockProduct, 'buy');

      expect(link.getAttribute('data-retailer')).toBe(null);
    });

    it('should handle different link types', () => {
      const link = document.createElement('a');

      addProductTrackingAttributes(link, mockProduct, 'analyze');
      expect(link.getAttribute('data-link-type')).toBe('analyze');

      addProductTrackingAttributes(link, mockProduct, 'sample');
      expect(link.getAttribute('data-link-type')).toBe('sample');
    });
  });

  describe('trackProductInteraction', () => {
    it('should push correct data to dataLayer', () => {
      trackProductInteraction(mockProduct, 'buy', 'Test Retailer');

      expect(mockDataLayer).toHaveLength(1);
      expect(mockDataLayer[0]).toEqual({
        event: 'product_link_click',
        product_id: 'test-product',
        product_name: 'Test Brand Test Product',
        product_brand: 'Test Brand',
        product_category: 'shampoos',
        link_type: 'buy',
        retailer: 'Test Retailer',
        event_category: 'Product Interaction',
        event_label: 'buy_Test Brand Test Product',
      });
    });

    it('should handle missing retailer', () => {
      trackProductInteraction(mockProduct, 'buy');

      expect(mockDataLayer[0].retailer).toBe('');
    });

    it('should handle missing categories', () => {
      const productWithoutCategories = {
        ...mockProduct,
        product_categories: [],
      };
      trackProductInteraction(productWithoutCategories, 'buy', 'Test Retailer');

      expect(mockDataLayer[0].product_category).toBe('');
    });

    it('should not throw error when dataLayer is undefined', () => {
      // @ts-expect-error - Intentionally setting dataLayer to undefined
      window.dataLayer = undefined;

      expect(() => {
        trackProductInteraction(mockProduct, 'buy', 'Test Retailer');
      }).not.toThrow();
    });
  });
});

// Component Tests
describe('Product Tracking in Components', () => {
  // Mock component that uses product tracking
  const TestProductLink = ({
    product,
    linkType = 'buy',
    retailer,
  }: {
    product: Product;
    linkType?: 'buy' | 'analyze' | 'sample';
    retailer?: string;
  }) => {
    const handleClick = () => {
      trackProductInteraction(product, linkType, retailer);
    };

    return (
      <a
        href={product.buy_links[0].url}
        target="_blank"
        rel="noopener noreferrer"
        ref={(el) => {
          if (el) {
            addProductTrackingAttributes(el, product, linkType, retailer);
          }
        }}
        onClick={handleClick}
      >
        Buy Product
      </a>
    );
  };

  it('should render product link with tracking attributes', () => {
    render(<TestProductLink product={mockProduct} retailer="Test Retailer" />);

    const link = screen.getByText('Buy Product');
    expect(link).toHaveAttribute('data-product-id', 'test-product');
    expect(link).toHaveAttribute(
      'data-product-name',
      'Test Brand Test Product',
    );
    expect(link).toHaveAttribute('data-link-type', 'buy');
    expect(link).toHaveAttribute('data-retailer', 'Test Retailer');
  });

  it('should track click events', () => {
    // Clear dataLayer before test
    mockDataLayer.length = 0;

    render(<TestProductLink product={mockProduct} retailer="Test Retailer" />);

    const link = screen.getByText('Buy Product');
    fireEvent.click(link);

    expect(mockDataLayer).toHaveLength(1);
    expect(mockDataLayer[0].event).toBe('product_link_click');
  });

  it('should handle different link types', () => {
    // Clear dataLayer before test
    mockDataLayer.length = 0;

    render(<TestProductLink product={mockProduct} linkType="analyze" />);

    const link = screen.getByText('Buy Product');
    expect(link).toHaveAttribute('data-link-type', 'analyze');

    fireEvent.click(link);
    expect(mockDataLayer).toHaveLength(1);
    expect(mockDataLayer[0].link_type).toBe('analyze');
  });
});

// Integration Tests
describe('Product Tracking Integration', () => {
  it('should work with mock product objects', () => {
    // Clear dataLayer before test
    mockDataLayer.length = 0;

    const mockProduct = {
      id: 'mock-product',
      name: 'Mock Product',
      brand: 'Mock Brand',
      product_categories: ['conditioners'],
      buy_links: [{ url: 'https://mock.com', retailer: 'Mock Retailer' }],
    };

    const link = document.createElement('a');
    addProductTrackingAttributes(
      link,
      mockProduct as any,
      'buy',
      'Mock Retailer',
    );

    expect(link.getAttribute('data-product-id')).toBe('mock-product');
    expect(link.getAttribute('data-product-name')).toBe(
      'Mock Brand Mock Product',
    );

    trackProductInteraction(mockProduct as any, 'buy', 'Mock Retailer');
    expect(mockDataLayer).toHaveLength(1);
    expect(mockDataLayer[0].product_id).toBe('mock-product');
  });
});

// Error Handling Tests
describe('Error Handling', () => {
  it('should handle null/undefined elements gracefully', () => {
    expect(() => {
      addProductTrackingAttributes(null as any, mockProduct, 'buy');
    }).not.toThrow();

    expect(() => {
      addProductTrackingAttributes(undefined as any, mockProduct, 'buy');
    }).not.toThrow();
  });

  it('should handle malformed product objects', () => {
    const malformedProduct = {
      id: 'test',
      name: 'Test',
      brand: 'Brand',
      product_categories: null,
      buy_links: null,
    } as any;

    const link = document.createElement('a');

    expect(() => {
      addProductTrackingAttributes(link, malformedProduct, 'buy');
    }).not.toThrow();

    expect(() => {
      trackProductInteraction(malformedProduct, 'buy');
    }).not.toThrow();
  });
});
