import { render, screen } from '@testing-library/react';
import { ProductRecommendations, getProductRecommendations, CATEGORIES } from '@/components/ui/product/ProductRecommendations';

describe('getProductRecommendations', () => {
  it('converts porosity type to tag format', () => {
    const result = getProductRecommendations('High Porosity');
    expect(Object.keys(result)).toEqual(CATEGORIES);
  });

  it('returns null for categories without matching products', () => {
    const result = getProductRecommendations('invalid_type');
    CATEGORIES.forEach(category => {
      expect(result[category]).toBeNull();
    });
  });
});

describe('ProductRecommendations', () => {
  it('renders product cards', () => {
    render(<ProductRecommendations porosityType="High Porosity" />);
    const productCards = screen.getAllByRole('link', { name: /buy now/i });
    expect(productCards.length).toBeGreaterThan(0);
  });

  it('applies custom className', () => {
    render(<ProductRecommendations porosityType="High Porosity" className="test-class" />);
    const container = screen.getByTestId('product-recommendations');
    expect(container).toHaveClass('test-class');
  });

  it('renders product categories', () => {
    render(<ProductRecommendations porosityType="High Porosity" />);
    // Check for at least one product category
    const categories = screen.getAllByText(/shampoos|conditioners|gels/i);
    expect(categories.length).toBeGreaterThan(0);
  });
});
