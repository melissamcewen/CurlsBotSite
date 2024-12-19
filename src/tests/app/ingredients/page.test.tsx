import { render, screen } from '@testing-library/react';
import IngredientsPage from '@/app/ingredients/page';
import React from 'react';

describe('IngredientsPage', () => {
  it('renders the ingredients table', () => {
    render(<IngredientsPage />);
    // Check if the main heading exists
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    // Check if the table exists
    expect(screen.getByRole('table')).toBeInTheDocument();
    // Check if table headers exist (using regex to match text with or without arrows)
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /categories/i })).toBeInTheDocument();
    // Check if there are rows in the table (there should be multiple)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // At least header row + one data row
  });
});
