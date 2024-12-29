import { render, screen } from '@testing-library/react';
import IngredientsPage from '@/app/ingredients/page';
import React from 'react';

describe('IngredientsPage Smoke Test', () => {
  it('renders the ingredients page without crashing', () => {
    render(<IngredientsPage />);
    // Check if the main heading exists
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    // Check if the table exists
    expect(screen.getByRole('table')).toBeInTheDocument();
    // Check if there are rows in the table
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // At least header row + one data row
  });
});
