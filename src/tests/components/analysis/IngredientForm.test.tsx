import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, useSearchParams } from 'next/navigation';
import IngredientForm from '@/components/analysis/IngredientForm';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock haircare-ingredients-analyzer
jest.mock('haircare-ingredients-analyzer', () => ({
  Analyzer: jest.fn().mockImplementation(() => ({
    analyze: jest.fn().mockReturnValue({
      status: 'ok',
      ingredients: [
        {
          name: 'Water',
          status: 'ok',
          ingredient: {
            id: 'water',
            name: 'Water',
            description: 'Universal solvent',
            categories: [],
            synonyms: []
          },
          reasons: []
        }
      ]
    })
  }))
}));

describe('IngredientForm', () => {
  const mockRouter = {
    replace: jest.fn(),
  };

  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('renders the form correctly', () => {
    render(<IngredientForm />);

    expect(screen.getByText('Paste your ingredients list')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze ingredients/i })).toBeInTheDocument();
  });

  it('disables submit button when textarea is empty', () => {
    render(<IngredientForm />);

    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when ingredients are entered', async () => {
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Water');

    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('shows loading state during analysis', async () => {
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Water');

    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Analyzing...')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Water');

    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/?ingredients=Water', { scroll: false });
    });
  });

  it('loads ingredients from URL params on initial load', () => {
    mockSearchParams.get.mockReturnValue('Water');
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Water');
  });

  it('shows analysis results after successful submission', async () => {
    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Water');

    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  it('handles analysis errors correctly', async () => {
    // Mock analyzer to throw an error
    jest.mock('haircare-ingredients-analyzer', () => ({
      Analyzer: jest.fn().mockImplementation(() => ({
        analyze: jest.fn().mockImplementation(() => {
          throw new Error('Analysis failed');
        })
      }))
    }));

    render(<IngredientForm />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Invalid ingredient');

    const submitButton = screen.getByRole('button', { name: /analyze ingredients/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/analysis failed/i)).toBeInTheDocument();
    });
  });
});
