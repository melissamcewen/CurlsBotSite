import type { Product } from 'haircare-ingredients-analyzer';

export const CURLS_MONTHLY_AFFILIATE_URL =
  'https://curlsmonthly.com/?ref=curlsbot';

export const curlsMonthlySampleProduct = {
  id: 'curls-monthly',
  name: 'Curls Monthly',
  brand: 'Curls Monthly',
  product_categories: ['samples'],
  buy_links: [
    { url: CURLS_MONTHLY_AFFILIATE_URL, retailer: 'Curls Monthly' },
  ],
} as Product;

export const STRANDPRINT_URL = 'https://www.strandprint.com/';

export const strandprintPartnerProduct = {
  id: 'strandprint',
  name: 'Strandprint Hair Analysis',
  brand: 'Strandprint',
  product_categories: ['partner'],
  buy_links: [{ url: STRANDPRINT_URL, retailer: 'Strandprint' }],
} as Product;

export const TOOTILAB_STARTER_URL = 'https://collabs.shop/ea393f';

export const tootilabStarterProduct = {
  id: 'tootilab-starter-bundle',
  name: 'Tootilab Curly Hair Starter Bundle',
  brand: 'Tootilab',
  product_categories: ['partner'],
  buy_links: [{ url: TOOTILAB_STARTER_URL, retailer: 'Tootilab' }],
} as Product;

export function partnerTrackingProduct(
  id: string,
  name: string,
  url: string,
  retailer: string,
): Product {
  return {
    id,
    name,
    brand: retailer,
    product_categories: ['partner'],
    buy_links: [{ url, retailer }],
  } as Product;
}

/**
 * Adds product tracking data attributes to a link element for GA4 tracking
 */
export function addProductTrackingAttributes(
  link: HTMLAnchorElement,
  product: Product,
  linkType: 'buy' | 'analyze' | 'sample' = 'buy',
  retailer?: string,
) {
  // Check if link exists
  if (!link) {
    return;
  }

  const productName = product.brand
    ? `${product.brand} ${product.name}`
    : product.name;

  // Add data attributes for GTM to pick up
  link.setAttribute('data-product-id', product.id);
  link.setAttribute('data-product-name', productName);
  link.setAttribute('data-product-brand', product.brand || '');
  link.setAttribute(
    'data-product-category',
    product.product_categories?.join(',') || '',
  );
  link.setAttribute('data-link-type', linkType);

  if (retailer) {
    link.setAttribute('data-retailer', retailer);
  }

  // Add a CSS class for GTM trigger targeting
  link.classList.add('product-link');
}

/**
 * Creates product tracking data for programmatic event firing
 */
export function createProductTrackingData(
  product: Product,
  linkType: 'buy' | 'analyze' | 'sample' = 'buy',
  retailer?: string,
) {
  const productName = product.brand
    ? `${product.brand} ${product.name}`
    : product.name;

  return {
    product_id: product.id,
    product_name: productName,
    product_brand: product.brand || '',
    product_category: product.product_categories?.join(',') || '',
    link_type: linkType,
    retailer: retailer || '',
    event_category: 'Product Interaction',
    event_label: `${linkType}_${productName}`,
  };
}

/**
 * Fires a custom GA4 event for product interactions
 */
export function trackProductInteraction(
  product: Product,
  linkType: 'buy' | 'analyze' | 'sample' = 'buy',
  retailer?: string,
) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const trackingData = createProductTrackingData(product, linkType, retailer);

    window.dataLayer.push({
      event: 'product_link_click',
      ...trackingData,
    });
  }
}
