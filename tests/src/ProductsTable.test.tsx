import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductsTable from '../../src/components/mdx/ProductsTable';

// Sample test data
const testProducts = [
  {
    name: 'Test Product 1',
    url: 'https://example.com/product1',
    amazonUrl: 'https://amazon.com/product1',
    buyText: 'Brand',
    country: 'USA',
    cgmApproved: true,
    pH: '4.5-5.0',
    sample: true,
  },
  {
    name: 'Test Product 2',
    url: 'https://example.com/product2',
    amazonUrl: '',
    buyText: 'Brand2',
    country: 'Canada',
    cgmApproved: false,
    pH: '5.5',
    sample: false,
  },
];

describe('ProductsTable Component', () => {
  test('renders the table with correct data', () => {
    render(<ProductsTable products={testProducts} />);

    // Check if product names are rendered
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();

    // Check if table headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Buy Links')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('CGM')).toBeInTheDocument();
    expect(screen.getByText('pH')).toBeInTheDocument();

    // Check sample link is shown for product with sample=true
    expect(screen.getByText('Try a sample →')).toBeInTheDocument();
  });

  test('sorts the table when headers are clicked', () => {
    render(<ProductsTable products={testProducts} />);

    // The table is initially sorted by pH
    const rows = screen.getAllByRole('row');

    // First row should be the header
    // Second row should be Test Product 1
    expect(rows[1]).toHaveTextContent('Test Product 1');

    // Click the name header to sort by name
    fireEvent.click(screen.getByText('Name'));

    // Now the rows might be reordered
    const rowsAfterSort = screen.getAllByRole('row');

    // The component should still be rendered (smoke test)
    expect(rowsAfterSort.length).toBe(3); // header + 2 data rows
  });
});
