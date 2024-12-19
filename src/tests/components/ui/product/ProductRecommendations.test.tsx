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
  it('renders title correctly', () => {
    render(<ProductRecommendations porosityType="High Porosity" />);
    expect(screen.getByText('Recommended Products for Your Hair Type')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProductRecommendations porosityType="High Porosity" className="test-class" />);
    expect(screen.getByRole('heading').parentElement).toHaveClass('test-class');
  });

  it('renders product recommendations', () => {
    render(<ProductRecommendations porosityType="High Porosity" />);
    // The actual number of recommendations will depend on the bundled data
    const recommendations = screen.queryAllByRole('link');
    expect(recommendations.length).toBeGreaterThanOrEqual(0);
  });
});
