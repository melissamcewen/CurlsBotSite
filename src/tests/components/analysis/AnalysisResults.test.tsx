import { render, screen, act } from '@testing-library/react';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import '@testing-library/jest-dom';

describe('AnalysisResults', () => {
  const mockOnTryAnother = jest.fn();

  beforeEach(() => {
    mockOnTryAnother.mockClear();
  });

  it('renders nothing when result is null', () => {
    const { container } = render(
      <AnalysisResults
        result={null as unknown as AnalysisResult}
        onTryAnother={mockOnTryAnother}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  describe('product recommendations', () => {
    it('shows recommendations for warning status', async () => {
      await act(async () => {
        render(
          <AnalysisResults
            result={{
              status: 'warning',
              ingredients: [],
            }}
            onTryAnother={mockOnTryAnother}
          />,
        );
      });

      // Verify the basic structure exists
      expect(screen.getByRole('button')).toBeInTheDocument();
      // Should have at least two links (product and quiz)
      expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(2);
    });

    it('shows recommendations for caution status', async () => {
      await act(async () => {
        render(
          <AnalysisResults
            result={{
              status: 'caution',
              ingredients: [],
            }}
            onTryAnother={mockOnTryAnother}
          />,
        );
      });

      // Verify the basic structure exists
      expect(screen.getByRole('button')).toBeInTheDocument();
      // Should have at least two links (product and quiz)
      expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('status indicators', () => {
    it('displays status indicator for warning', () => {
      render(
        <AnalysisResults
          result={{
            status: 'warning',
            ingredients: [],
          }}
          onTryAnother={mockOnTryAnother}
        />,
      );

      // Verify the basic structure exists
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
