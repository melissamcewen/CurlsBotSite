'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import type { Product, Products } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface LocalizedProductIds {
  US: string;
  UK: string;
  AU: string;
}

interface Props {
  productIds: LocalizedProductIds;
  products: Products;
  children?: React.ReactNode;
  className?: string;
  showAnalysisLink?: boolean;
  showStatus?: boolean;
}

const getStatusColor = (status?: Product['status']) => {
  switch (status) {
    case 'ok':
      return 'badge-info';
    case 'caution':
      return 'badge-warning';
    case 'warning':
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
};

const LocalizedProductLink = ({
  productIds,
  products,
  children,
  className = 'link',
  showAnalysisLink = false,
  showStatus = false,
}: Props) => {
  const { country } = useLocalization();
  const productId = productIds[country];
  const product = products[productId];

  if (!product) {
    console.warn(
      `Product with ID ${productId} not found for country ${country}`,
    );
    return (
      <span className={className}>{children || 'Product Unavailable'}</span>
    );
  }

  // Get the buy link for the current country
  const buyLink = product.buy_links?.find(
    (link) => (link.country || 'US') === country,
  );

  if (!buyLink?.url) {
    console.warn(
      `No buy link found for product ${productId} in country ${country}`,
    );
    return <span className={className}>{children || product.name}</span>;
  }

  const productName = children || product.name;
  const displayName = product.brand
    ? `${product.brand} ${productName}`
    : productName;

  if (showAnalysisLink && product.ingredients_raw) {
    return (
      <>
        <a
          href={`/?ingredients=${encodeURIComponent(product.ingredients_raw)}`}
          className={className}
        >
          click here to analyze
        </a>{' '}
        <a
          href={buyLink.url}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayName}
        </a>
      </>
    );
  }

  return (
    <a
      href={buyLink.url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {displayName}
    </a>
  );
};

export default LocalizedProductLink;
