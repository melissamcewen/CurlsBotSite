import { render, screen, fireEvent } from '@testing-library/react';
import IngredientForm from '@/components/analysis/IngredientForm';
import '@testing-library/jest-dom';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

describe('IngredientForm', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('renders form with required elements', () => {
    render(<IngredientForm />);

    // Check for essential form elements
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /analyze ingredients/i })
    ).toBeInTheDocument();
  });

  it('handles ingredient input and submission', () => {
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });

    // Initially button should be disabled
    expect(submitButton).toBeDisabled();

    // Type in the textarea
    fireEvent.change(textarea, { target: { value: 'Water' } });
    expect(textarea).toHaveValue('Water');
    expect(submitButton).not.toBeDisabled();

    // Submit the form
    fireEvent.click(submitButton);
    expect(mockReplace).toHaveBeenCalledWith('/?ingredients=Water', { scroll: false });
  });

  it('trims whitespace from input', () => {
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });

    // Type in the textarea with extra spaces
    fireEvent.change(textarea, { target: { value: '  Water  ' } });
    fireEvent.click(submitButton);

    // Check that the URL was updated with trimmed input
    expect(mockReplace).toHaveBeenCalledWith('/?ingredients=Water', { scroll: false });
  });
});
