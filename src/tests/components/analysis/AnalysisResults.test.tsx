import { render, screen, fireEvent } from '@testing-library/react';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import type { AnalysisResult } from '@/types/analysis';

describe('AnalysisResults', () => {
  const mockOnTryAnother = jest.fn();

  const baseResult: AnalysisResult = {
    overallStatus: 'ok',
    ingredients: [
      {
        name: 'Water',
        matched: true,
        status: 'ok',
        info: 'Universal solvent',
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

  it('renders ingredients analysis button when ingredients exist', () => {
    render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);
    expect(screen.getByText('View detailed ingredients analysis')).toBeInTheDocument();
  });

  it('handles try another click', () => {
    render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);
    fireEvent.click(screen.getByText('Try another ingredients list'));
    expect(mockOnTryAnother).toHaveBeenCalled();
  });

  it('shows product recommendation for warning status', () => {
    const warningResult: AnalysisResult = {
      ...baseResult,
      overallStatus: 'warning',
    };
    render(<AnalysisResults result={warningResult} onTryAnother={mockOnTryAnother} />);
    expect(screen.getByText(/here's a product that might work better/i)).toBeInTheDocument();
  });

  it('shows product recommendation for caution status', () => {
    const cautionResult: AnalysisResult = {
      ...baseResult,
      overallStatus: 'caution',
    };
    render(<AnalysisResults result={cautionResult} onTryAnother={mockOnTryAnother} />);
    expect(screen.getByText(/here's a product that might work better/i)).toBeInTheDocument();
  });

  it('does not show product recommendation for ok status', () => {
    render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);
    expect(screen.queryByText(/here's a product that might work better/i)).not.toBeInTheDocument();
  });

  it('shows ingredients list when expanded', () => {
    render(<AnalysisResults result={baseResult} onTryAnother={mockOnTryAnother} />);
    fireEvent.click(screen.getByText('View detailed ingredients analysis'));
    expect(screen.getByText('Universal solvent')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Water' })).toBeInTheDocument();
  });
});
