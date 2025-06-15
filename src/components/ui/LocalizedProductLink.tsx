'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import type { Product, Products } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface LocalizedProductIds {
  US: string;
  UK: string;
  AU: string;
  EU?: string;
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

  // Determine which product ID to use
  let productId: string;
  if (country === 'EU') {
    productId = productIds.EU || productIds.US;
  } else {
    productId = productIds[country];
  }

  const product = products[productId];

  if (!product) {
    console.warn(
      `Product with ID ${productId} not found for country ${country}`,
    );
    return (
      <span className={className}>{children || 'Product Unavailable'}</span>
    );
  }

  // Get the buy link for the current country, fall back to US for EU
  const buyLink = product.buy_links?.find(
    (link) =>
      link.countries?.includes(country === 'EU' ? 'US' : country) ||
      ((country === 'US' || country === 'EU') &&
        (!link.countries || link.countries.length === 0)),
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
          href={`/cgm-analyzer?ingredients=${encodeURIComponent(
            product.ingredients_raw,
          )}`}
          className="link link-primary"
        >
          click here to analyze
        </a>{' '}
        <a
          href={buyLink.url}
          className="link link-secondary"
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
