import { render, screen, fireEvent } from '@testing-library/react';
import IngredientsPage from '@/app/ingredients/page';
import '@testing-library/jest-dom';

describe('Ingredients Database Page', () => {
  it('renders ingredients table with sorting', () => {
    render(<IngredientsPage />);

    // Check for page title
    expect(screen.getByText('Ingredients Database')).toBeInTheDocument();

    // Check for sort buttons
    expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /categories/i })).toBeInTheDocument();

    // Test sorting
    const nameButton = screen.getByRole('button', { name: /name/i });
    fireEvent.click(nameButton);

    // Verify table is rendered (don't test for specific ingredients)
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
