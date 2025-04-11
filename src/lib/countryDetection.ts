import { Product, BuyLink } from 'haircare-ingredients-analyzer';

export type CountryCode = 'US' | 'AU' | 'UK' | 'EU';

// List of EU country TLDs (excluding UK)
const EU_TLDS = [
  'at', // Austria
  'be', // Belgium
  'bg', // Bulgaria
  'hr', // Croatia
  'cy', // Cyprus
  'cz', // Czech Republic
  'dk', // Denmark
  'ee', // Estonia
  'fi', // Finland
  'fr', // France
  'de', // Germany
  'gr', // Greece
  'hu', // Hungary
  'ie', // Ireland
  'it', // Italy
  'lv', // Latvia
  'lt', // Lithuania
  'lu', // Luxembourg
  'mt', // Malta
  'nl', // Netherlands
  'pl', // Poland
  'pt', // Portugal
  'ro', // Romania
  'sk', // Slovakia
  'si', // Slovenia
  'es', // Spain
  'se', // Sweden
];

// For development testing
const TEST_COUNTRY = process.env.NEXT_PUBLIC_TEST_COUNTRY as
  | CountryCode
  | undefined;

export function getCountryFromHostname(hostname?: string): CountryCode {
  // Check for test environment override first
  if (TEST_COUNTRY) {
    return TEST_COUNTRY;
  }

  // If no hostname provided or running on client side, default to US
  if (typeof window === 'undefined' || !hostname) {
    return 'US';
  }

  if (hostname.endsWith('.co.uk')) {
    return 'UK';
  } else if (hostname.endsWith('.com.au')) {
    return 'AU';
  } else if (
    hostname.endsWith('.eu') ||
    EU_TLDS.some((tld) => hostname.endsWith(`.${tld}`))
  ) {
    return 'EU';
  }
  return 'US';
}

export function filterProductByCountry(
  product: Product,
  country: string,
): boolean {
  if (!product.buy_links) {
    return false;
  }

  switch (country) {
    case 'UK':
      return product.buy_links.some((link: BuyLink) => link.country === 'UK');
    case 'AU':
      return product.buy_links.some((link: BuyLink) => link.country === 'AU');
    case 'EU':
      return (
        product.buy_links.some((link: BuyLink) => link.country === 'EU') ||
        product.buy_links.some((link: BuyLink) => link.country === 'UK')
      );
    case 'US':
    default:
      return product.buy_links.some((link: BuyLink) => link.country === 'US');
  }
}
