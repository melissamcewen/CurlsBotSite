import { render, screen, fireEvent } from '@testing-library/react';
import IngredientForm from '@/components/analysis/IngredientForm';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock haircare-ingredients-analyzer
jest.mock('haircare-ingredients-analyzer', () => ({
  Analyzer: jest.fn().mockImplementation(() => ({
    analyze: jest.fn().mockReturnValue({
      status: 'caution',
      input: 'test',
      reasons: [{ setting: 'test', reason: 'Test reason' }],
      ingredients: [
        {
          name: 'PEG-12 Dimethicone',
          normalized: 'peg-12 dimethicone',
          status: 'caution',
          reasons: [{ setting: 'silicones', reason: 'This is a silicone that may build up' }],
          ingredient: {
            id: 'peg-12-dimethicone',
            name: 'PEG-12 Dimethicone',
            description: 'A silicone',
            categories: ['silicones']
          }
        },
        {
          name: 'Sodium C14-16 Olefin Sulfonate',
          normalized: 'sodium-c14-16-olefin-sulfonate',
          status: 'caution',
          reasons: [{ setting: 'harsh_surfactants', reason: 'This is a harsh surfactant' }],
          ingredient: {
            id: 'sodium-c14-16-olefin-sulfonate',
            name: 'Sodium C14-16 Olefin Sulfonate',
            description: 'A surfactant',
            categories: ['surfactants']
          }
        }
      ]
    })
  })),
  getBundledProducts: jest.fn().mockReturnValue({
    products: {
      'test-product': {
        id: 'test-product',
        name: 'Test Product',
        brand: 'Test Brand',
        buy_url: 'https://example.com',
        product_categories: ['moisturizing']
      }
    }
  })
}));

describe('Ingredients Analysis E2E', () => {
  const testIngredients = `Water (Aqua), Disodium Laureth Sulfosuccinate, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Cocamidopropyl Hydroxysultaine, PEG-12 Dimethicone, Cocamide MIPA, Glycol Distearate, Hydrolyzed Keratin, Theobroma Cacao (Cocoa) Seed Butter, Fragrance (Parfum), Cocos Nucifera (Coconut) Oil, Persea Gratissima (Avocado) Oil, Aloe Barbadensis Leaf Extract, Panthenol, Polyquaternium-11, DMDM Hydantoin, Sodium Chloride, Cetyl Alcohol, Guar Hydroxypropyltrimonium Chloride, PEG-14M, Blue 1 (CI 42090), Red 40 (CI 16035), Yellow 5 (CI 19140)`;

  it('analyzes ingredients list and shows correct results', () => {
    render(<IngredientForm />);

    // Find and fill the input field
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: testIngredients } });

    // Click analyze button
    const analyzeButton = screen.getByRole('button', { name: /analyze ingredients/i });
    fireEvent.click(analyzeButton);

    // Check overall result
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('caution');
    expect(screen.getByText(/some ingredients in this product require caution/i)).toBeInTheDocument();

    // Click to expand ingredients list
    fireEvent.click(screen.getByText('View detailed ingredients analysis'));

    // Check ingredient names and categories are present somewhere in the document
    expect(screen.getAllByText('PEG-12 Dimethicone')[0]).toBeInTheDocument();
    expect(screen.getAllByText('silicones')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Sodium C14-16 Olefin Sulfonate')[0]).toBeInTheDocument();
    expect(screen.getAllByText('surfactants')[0]).toBeInTheDocument();

    // Verify caution status appears
    expect(screen.getAllByText(/caution/i).length).toBeGreaterThan(0);

    // Make sure we don't see the "couldn't determine status" message
    expect(screen.queryByText(/we couldn't determine the status/i)).not.toBeInTheDocument();

    // Check chat bubble styling
    const chatBubbleContainer = screen.getByText(/some ingredients in this product require caution/i).closest('.chat');
    const chatBubble = chatBubbleContainer?.querySelector('.chat-bubble');
    const avatarBorder = chatBubbleContainer?.querySelector('.chat-image');

    expect(chatBubble).toHaveClass('bg-warning', 'text-warning-content');
    expect(avatarBorder).toHaveClass('border-warning');
  });
});
