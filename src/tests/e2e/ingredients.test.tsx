import { render, screen, fireEvent } from '@testing-library/react';
import IngredientsPage from '@/app/ingredients/page';
import '@testing-library/jest-dom';

describe('Ingredients Database Page', () => {
  it('renders ingredients table with basic functionality', () => {
    render(<IngredientsPage />);

    // Check for page title
    expect(screen.getByText('Ingredients Database')).toBeInTheDocument();

    // Check for name sorting
    expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();

    // Check for status sorting
    expect(screen.getByRole('button', { name: /status/i })).toBeInTheDocument();

    // Verify table is rendered
    expect(screen.getByRole('table')).toBeInTheDocument();

    // Verify table headers
    expect(
      screen.getByRole('columnheader', { name: /name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /categories/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /status/i }),
    ).toBeInTheDocument();
  });
});
