import { render, screen, fireEvent } from '@testing-library/react';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { getBundledProducts } from 'haircare-ingredients-analyzer';

// Mock the getBundledProducts function to reduce console noise and make tests deterministic
jest.mock('haircare-ingredients-analyzer', () => ({
  ...jest.requireActual('haircare-ingredients-analyzer'),
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

describe('AnalysisResults', () => {
  const mockOnTryAnother = jest.fn();

  const baseResult: AnalysisResult = {
    input: 'Water',
    status: 'ok',
    reasons: [],
    ingredients: [
      {
        name: 'Water',
        normalized: 'water',
        status: 'ok',
        reasons: [],
        ingredient: {
          id: 'water',
          name: 'Water',
          description: 'Universal solvent',
          categories: []
        }
      }
    ]
  };

  beforeEach(() => {
    mockOnTryAnother.mockClear();
  });

  it('renders nothing when result is null', () => {
    const { container } = render(
      <AnalysisResults result={null as any} onTryAnother={mockOnTryAnother} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows ingredients analysis section when ingredients exist', () => {
    render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);

    // Look for the Analysis Summary heading
    const analysisSection = screen.getByText('Analysis Summary');
    expect(analysisSection).toBeInTheDocument();

    // Check for ingredient name in the header
    const ingredientHeader = screen.getByRole('heading', { name: 'Water' });
    expect(ingredientHeader).toBeInTheDocument();
  });

  it('handles try another click', () => {
    render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);

    const tryAnotherButton = screen.getByRole('button', {
      name: /try another ingredients list/i
    });
    fireEvent.click(tryAnotherButton);
    expect(mockOnTryAnother).toHaveBeenCalledTimes(1);
  });

  describe('product recommendations', () => {
    it('shows for warning status', () => {
      const warningResult: AnalysisResult = {
        ...baseResult,
        status: 'warning',
        reasons: [{ setting: 'test', reason: 'Test warning' }]
      };
      render(<AnalysisResults result={warningResult} onTryAnother={mockOnTryAnother} />);

      // Check for warning message
      expect(screen.getByText(/yikes/i)).toBeInTheDocument();
    });

    it('shows for caution status', () => {
      const cautionResult: AnalysisResult = {
        ...baseResult,
        status: 'caution',
        reasons: [{ setting: 'test', reason: 'Test caution' }]
      };
      render(<AnalysisResults result={cautionResult} onTryAnother={mockOnTryAnother} />);

      // Check for caution message
      expect(screen.getByText(/hmm/i)).toBeInTheDocument();
    });

    it('does not show warning for ok status', () => {
      render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);
      expect(screen.queryByText(/yikes/i)).not.toBeInTheDocument();
    });
  });

  describe('status indicators', () => {
    it('displays correct status message for warning', () => {
      const warningResult: AnalysisResult = {
        ...baseResult,
        status: 'warning',
        reasons: [{ setting: 'test', reason: 'Test warning' }]
      };
      render(<AnalysisResults result={warningResult} onTryAnother={mockOnTryAnother} />);

      expect(screen.getByText(/yikes/i)).toBeInTheDocument();
    });
  });
});
