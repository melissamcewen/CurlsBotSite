import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import IngredientForm from '@/components/analysis/IngredientForm';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() })
}));

describe('IngredientForm', () => {
  it('renders form elements correctly', () => {
    render(<IngredientForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('analyze-button')).toBeInTheDocument();
  });

  it('handles ingredient input', () => {
    render(<IngredientForm />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Water' } });
    expect(textarea).toHaveValue('Water');
  });

  it('disables submit button when empty', () => {
    render(<IngredientForm />);
    const submitButton = screen.getByTestId('analyze-button');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button with input', () => {
    render(<IngredientForm />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Water' } });
    const submitButton = screen.getByTestId('analyze-button');
    expect(submitButton).not.toBeDisabled();
  });
});
