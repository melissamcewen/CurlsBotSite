import { render, screen } from '@testing-library/react';
import IngredientsPage from '@/app/ingredients/page';
import '@testing-library/jest-dom';

describe('Ingredients Database Page Smoke Test', () => {
  it('renders ingredients page without crashing', () => {
    render(<IngredientsPage />);

    // Check for page title
    expect(screen.getByText('Ingredients Database')).toBeInTheDocument();

    // Check if table exists
    expect(screen.getByRole('table')).toBeInTheDocument();

    // Check if there are any rows in the table
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // At least header row + one data row
  });
});
