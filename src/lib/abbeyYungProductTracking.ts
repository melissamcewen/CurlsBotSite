import type { Product } from 'haircare-ingredients-analyzer';
import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';

export function retailerFromAbbeyYungLink(
  url: string,
  linkText?: string,
): string | undefined {
  const lower = url.toLowerCase();
  if (lower.includes('amzn.to') || lower.includes('amazon.com')) {
    return 'Amazon';
  }
  if (lower.includes('ulta.com')) return 'Ulta';
  if (lower.includes('sephora.com')) return 'Sephora';
  if (lower.includes('target.com')) return 'Target';
  if (lower.includes('curlsmonthly.com')) return 'Curls Monthly';

  const text = linkText?.toLowerCase() ?? '';
  if (text.includes('amazon')) return 'Amazon';
  if (text.includes('ulta')) return 'Ulta';
  return undefined;
}

export function abbeyYungMockProduct(
  product: AbbeyYungProduct,
  url: string,
  retailer?: string,
): Product {
  return {
    id: product.product.toLowerCase().replace(/\s+/g, '-'),
    name: product.product,
    brand: '',
    product_categories: [],
    buy_links: [{ url, retailer }],
  } as Product;
}
