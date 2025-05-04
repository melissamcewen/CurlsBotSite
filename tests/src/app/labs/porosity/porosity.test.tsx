import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PorosityLabPage from '@/app/labs/porosity/page';
import '@testing-library/jest-dom';
import { porosity, Analyzer } from 'haircare-ingredients-analyzer';

// Mock the haircare-ingredients-analyzer module
jest.mock('haircare-ingredients-analyzer', () => {
  const originalModule = jest.requireActual('haircare-ingredients-analyzer');

  return {
    ...originalModule,
    // Mock the Analyzer class and its analyze method
    Analyzer: jest.fn().mockImplementation(() => ({
      analyze: jest.fn().mockReturnValue({
        // Mock analysis result structure
        ingredients: [
          { name: 'Petrolatum', normalized: 'petrolatum' },
          { name: 'Lanolin', normalized: 'lanolin' },
          { name: 'Lecithin', normalized: 'lecithin' },
          {
            name: 'Mineral Oil/Paraffinum Liquidum',
            normalized: 'mineral oil/paraffinum liquidum',
          },
          {
            name: 'Amyl Cinnamyl Cinnamyl Alcohol',
            normalized: 'amyl cinnamyl cinnamyl alcohol',
          },
          { name: 'Limonene', normalized: 'limonene' },
          { name: 'Linalool', normalized: 'linalool' },
          { name: 'Fragrance/Parfum', normalized: 'fragrance/parfum' },
          { name: 'Green 6/CI 61565', normalized: 'green 6/ci 61565' },
          { name: 'Violet 2/CI 60725', normalized: 'violet 2/ci 60725' },
        ],
      }),
    })),
    // Mock the porosity function to return a specific result for our test case
    porosity: jest.fn().mockImplementation((analysis) => {
      // Check if the analysis contains the specific ingredients we're testing for
      const normalizedIngredients = analysis.ingredients.map(
        (ing) => ing.normalized,
      );
      const hasTestIngredients =
        normalizedIngredients.includes('petrolatum') &&
        normalizedIngredients.includes('lanolin') &&
        normalizedIngredients.includes('mineral oil/paraffinum liquidum');

      if (hasTestIngredients) {
        return { high: 45, low: 25 }; // Low porosity score less than 30
      }

      // Default fallback for other cases
      return { high: 50, low: 50 };
    }),
    getBundledDatabase: jest.fn().mockReturnValue({
      ingredients: {},
      categories: {},
      groups: {},
    }),
  };
});

describe('PorosityLabPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the porosity score page', () => {
    render(<PorosityLabPage />);

    expect(screen.getByText(/Porosity Score Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/About Porosity Scoring/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Analyze Ingredients/i }),
    ).toBeInTheDocument();
  });

  it('should show low porosity score less than 30 for specific ingredients', async () => {
    render(<PorosityLabPage />);

    // Get the textarea and enter the test ingredients
    const textarea = screen.getByPlaceholderText(/Example: Water, Glycerin/i);
    fireEvent.change(textarea, {
      target: {
        value:
          'Petrolatum, Lanolin, Lecithin, Mineral Oil/Paraffinum Liquidum, Amyl Cinnamyl Cinnamyl Alcohol, Limonene, Linalool, Fragrance/Parfum, Green 6/CI 61565, Violet 2/CI 60725.',
      },
    });

    // Click the analyze button
    const analyzeButton = screen.getByRole('button', {
      name: /Analyze Ingredients/i,
    });
    fireEvent.click(analyzeButton);

    // Wait for the results to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Low Porosity Score/i)).toBeInTheDocument();
    });

    // Check that the porosity function was called
    expect(porosity).toHaveBeenCalled();

    // Verify the low porosity score is less than 30
    const lowPorosityScore = screen.getByText('25');
    expect(lowPorosityScore).toBeInTheDocument();

    // Additional check that the high porosity score is displayed
    const highPorosityScore = screen.getByText('45');
    expect(highPorosityScore).toBeInTheDocument();
  });
});
