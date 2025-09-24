import type { Product } from 'haircare-ingredients-analyzer';

/**
 * Adds product tracking data attributes to a link element for GA4 tracking
 */
export function addProductTrackingAttributes(
  link: HTMLAnchorElement,
  product: Product,
  linkType: 'buy' | 'analyze' | 'sample' = 'buy',
  retailer?: string,
) {
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
