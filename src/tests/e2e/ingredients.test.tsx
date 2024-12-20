import { render, screen, fireEvent } from '@testing-library/react';
import IngredientForm from '@/components/analysis/IngredientForm';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock haircare-ingredients-analyzer
jest.mock('haircare-ingredients-analyzer', () => ({
  Analyzer: jest.fn().mockImplementation(() => ({
    analyze: jest.fn().mockReturnValue({
      status: 'caution',
      input: 'test',
      reasons: [],
      ingredients: []
    })
  })),
  getBundledProducts: jest.fn(() => ({
    products: {
      'test-product': {
        name: 'Test Product',
        brand: 'Test Brand',
        product_categories: ['conditioner'],
        buy_url: 'https://example.com'
      }
    }
  }))
}));

describe('Ingredients Analysis E2E', () => {
  it('submits ingredients for analysis', () => {
    render(<IngredientForm />);

    // Find and fill the input field
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Water' } });

    // Click analyze button
    const analyzeButton = screen.getByRole('button', { name: /analyze ingredients/i });
    fireEvent.click(analyzeButton);

    // Basic check that analysis was performed
    expect(screen.getByText(/caution/i)).toBeInTheDocument();
  });
});
