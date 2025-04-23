import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogProduct } from '../../src/components/mdx/BlogProduct';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('BlogProduct Component', () => {
  test('renders product with basic information', () => {
    render(
      <BlogProduct
        name="Test Product"
        image="/test-image.jpg"
        ingredients="ingredient1, ingredient2"
      />,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Analyze with Curlsbot')).toBeInTheDocument();
  });

  test('renders product with all purchase options', () => {
    render(
      <BlogProduct
        name="Test Product"
        image="/test-image.jpg"
        ingredients="ingredient1, ingredient2"
        buyLink="https://example.com"
        amazonLink="https://amazon.com"
        buyText="Buy Direct"
        sample={true}
      />,
    );

    expect(screen.getByText('Buy Direct')).toBeInTheDocument();
    expect(screen.getByText('Buy on Amazon')).toBeInTheDocument();
    expect(screen.getByText('Try a sample')).toBeInTheDocument();
  });

  test('renders product badges correctly', () => {
    render(
      <BlogProduct
        name="Test Product"
        image="/test-image.jpg"
        ingredients="ingredient1, ingredient2"
        cgmApproved
        sulfateFree
        siliconeFree
      />,
    );

    expect(screen.getByText('CGM Approved')).toBeInTheDocument();
    expect(screen.getByText('Sulfate Free')).toBeInTheDocument();
    expect(screen.getByText('Silicone Free')).toBeInTheDocument();
  });

  test('sample button is not rendered when sample prop is not provided', () => {
    render(
      <BlogProduct
        name="Test Product"
        image="/test-image.jpg"
        ingredients="ingredient1, ingredient2"
      />,
    );

    expect(screen.queryByText('Try a sample')).not.toBeInTheDocument();
  });

  test('sample button is rendered when sample prop is true', () => {
    render(
      <BlogProduct
        name="Test Product"
        image="/test-image.jpg"
        ingredients="ingredient1, ingredient2"
        sample={true}
      />,
    );

    const sampleButton = screen.getByText('Try a sample');
    expect(sampleButton).toBeInTheDocument();
    expect(sampleButton.closest('a')).toHaveAttribute(
      'href',
      'https://curlsmonthly.com/?ref=curlsbot',
    );
  });
});
