import { render, screen, fireEvent } from '@testing-library/react';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import { AnalysisResult } from 'haircare-ingredients-analyzer';

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
      status: 'warning',
      reasons: [{ setting: 'test', reason: 'Test warning' }]
    };
    render(<AnalysisResults result={warningResult} onTryAnother={mockOnTryAnother} />);
    expect(screen.getByText(/here's a product that might work better/i)).toBeInTheDocument();
  });

  it('shows product recommendation for caution status', () => {
    const cautionResult: AnalysisResult = {
      ...baseResult,
      status: 'caution',
      reasons: [{ setting: 'test', reason: 'Test caution' }]
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
