import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ui/product/ProductCard';

describe('ProductCard', () => {
  const baseProduct = {
    id: 'test-product',
    name: 'Test Product',
    brand: 'Test Brand',
    buy_links: [{ country: 'US', url: 'test' }],
  };

  it('shows humidity resistant badge only for styling products', () => {
    const productWithFrizzbot = {
      ...baseProduct,
      extensions: {
        frizzbot: { score: -60 },
      },
    };

    // Should show badge for gel
    const { rerender } = render(
      <ProductCard
        product={{
          title: 'Test',
          description: 'Test',
          product: productWithFrizzbot,
        }}
        category="gels"
      />,
    );
    expect(screen.queryByText('Humidity Resistant')).toBeInTheDocument();

    // Should not show badge for shampoo
    rerender(
      <ProductCard
        product={{
          title: 'Test',
          description: 'Test',
          product: productWithFrizzbot,
        }}
        category="shampoos"
      />,
    );
    expect(screen.queryByText('Humidity Resistant')).not.toBeInTheDocument();
  });

  it('shows porosity badges for non-exempt categories', () => {
    const productWithPorosity = {
      ...baseProduct,
      extensions: {
        porosity: { high: 85, low: 40 },
      },
    };

    // Should show badges for gel
    const { rerender } = render(
      <ProductCard
        product={{
          title: 'Test',
          description: 'Test',
          product: productWithPorosity,
        }}
        category="gels"
      />,
    );
    expect(screen.queryByText('High Porosity')).toBeInTheDocument();

    // Should not show badges for clarifying shampoo
    rerender(
      <ProductCard
        product={{
          title: 'Test',
          description: 'Test',
          product: productWithPorosity,
        }}
        category="clarifying_shampoos"
      />,
    );
    expect(screen.queryByText('High Porosity')).not.toBeInTheDocument();
  });
});
