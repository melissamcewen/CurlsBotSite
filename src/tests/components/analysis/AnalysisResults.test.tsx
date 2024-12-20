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

    // Look for the analysis section by its text content
    const analysisSection = screen.getByText(/view detailed ingredients analysis/i);
    expect(analysisSection).toBeInTheDocument();

    // Test expanding the analysis section
    fireEvent.click(analysisSection);
    expect(screen.getByRole('heading', { name: 'Water' })).toBeInTheDocument();
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

      // Check for product recommendation presence
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test Brand')).toBeInTheDocument();
    });

    it('shows for caution status', () => {
      const cautionResult: AnalysisResult = {
        ...baseResult,
        status: 'caution',
        reasons: [{ setting: 'test', reason: 'Test caution' }]
      };
      render(<AnalysisResults result={cautionResult} onTryAnother={mockOnTryAnother} />);

      // Check for product recommendation presence
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test Brand')).toBeInTheDocument();
    });

    it('does not show for ok status', () => {
      render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    });
  });

  describe('status indicators', () => {
    it('displays correct status badge', () => {
      const warningResult: AnalysisResult = {
        ...baseResult,
        status: 'warning',
        reasons: [{ setting: 'test', reason: 'Test warning' }]
      };
      render(<AnalysisResults result={warningResult} onTryAnother={mockOnTryAnother} />);

      const statusBadge = screen.getByText('warning');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge.closest('.badge')).toHaveClass('badge-error');
    });
  });
});
