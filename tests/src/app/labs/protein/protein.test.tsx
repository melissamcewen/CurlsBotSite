import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProteinLabPage from '@/app/labs/protein/page';
import '@testing-library/jest-dom';
import { Analyzer } from 'haircare-ingredients-analyzer';
import { proteinAnalysis } from '@/lib/proteinAnalysis';

jest.mock('haircare-ingredients-analyzer', () => {
  const originalModule = jest.requireActual('haircare-ingredients-analyzer');

  return {
    ...originalModule,
    Analyzer: jest.fn().mockImplementation(() => ({
      analyze: jest.fn().mockReturnValue({
        input: '',
        status: 'ok',
        reasons: [],
        ingredients: [
          {
            name: 'Hydrolyzed Wheat Protein',
            normalized: 'hydrolyzed wheat protein',
            status: 'ok',
            reasons: [],
            ingredient: {
              id: 'hydrolyzed_wheat_protein',
              name: 'Hydrolyzed Wheat Protein',
              categories: ['proteins'],
            },
          },
        ],
      }),
    })),
  };
});

jest.mock('@/lib/proteinAnalysis', () => ({
  proteinAnalysis: jest.fn().mockReturnValue({
    matches: [
      {
        id: 'hydrolyzed_wheat_protein',
        name: 'Hydrolyzed Wheat Protein',
        inputName: 'Hydrolyzed Wheat Protein',
        position: 1,
        kind: 'protein',
        categories: ['proteins'],
        description:
          'Acts like a hybrid between a film-forming humectant and a protein',
      },
    ],
    hasProteins: true,
    hasAminoAcids: false,
  }),
}));

describe('ProteinLabPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the protein checker page', () => {
    render(<ProteinLabPage />);

    expect(screen.getByText(/Protein Checker/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Check for protein ingredients/i }),
    ).toBeInTheDocument();
  });

  it('shows protein matches after analysis', async () => {
    render(<ProteinLabPage />);

    fireEvent.change(
      screen.getByPlaceholderText(/Hydrolyzed Wheat Protein/i),
      {
        target: { value: 'Hydrolyzed Wheat Protein' },
      },
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Check for protein ingredients/i }),
    );

    await waitFor(() => {
      expect(proteinAnalysis).toHaveBeenCalled();
      expect(
        screen.getByRole('link', { name: /Hydrolyzed Wheat Protein/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Acts like a hybrid between a film-forming humectant and a protein/i,
        ),
      ).toBeInTheDocument();
    });
  });
});
