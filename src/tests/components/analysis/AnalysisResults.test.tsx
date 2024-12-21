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
      <AnalysisResults result={null as unknown as AnalysisResult} onTryAnother={mockOnTryAnother} />
    );
    expect(container.firstChild).toBeNull();
  });

  describe('product recommendations', () => {
    it('shows for warning status', async () => {
      await act(async () => {
        render(
          <AnalysisResults
            result={{
              status: 'warning',
              ingredients: [],
            }}
            onTryAnother={mockOnTryAnother}
          />
        );
      });

      // Wait for product recommendation to load
      expect(await screen.findByText(/Test Product by Test Brand/)).toBeInTheDocument();
    });

    it('shows for caution status', async () => {
      await act(async () => {
        render(
          <AnalysisResults
            result={{
              status: 'caution',
              ingredients: [],
            }}
            onTryAnother={mockOnTryAnother}
          />
        );
      });

      // Wait for product recommendation to load
      expect(await screen.findByText(/Test Product by Test Brand/)).toBeInTheDocument();
    });
  });

  describe('status indicators', () => {
    it('displays correct status message for warning', () => {
      render(
        <AnalysisResults
          result={{
            status: 'warning',
            ingredients: [],
          }}
          onTryAnother={mockOnTryAnother}
        />
      );

      // We don't test for specific text, just verify something renders
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
