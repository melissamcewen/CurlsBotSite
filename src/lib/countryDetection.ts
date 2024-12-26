export type CountryCode = 'US' | 'AU' | 'UK';

// For development testing
const TEST_COUNTRY = process.env.NEXT_PUBLIC_TEST_COUNTRY as
  | CountryCode
  | undefined;

export function getCountryFromHostname(): CountryCode {
  // Allow override for testing
  if (process.env.NODE_ENV === 'development' && TEST_COUNTRY) {
    return TEST_COUNTRY;
  }

  if (typeof window === 'undefined') return 'US';

  const hostname = window.location.hostname;
  if (hostname.endsWith('.au')) return 'AU';
  if (hostname.endsWith('.uk')) return 'UK';
  return 'US'; // default to US for no country code or .com
}

export function filterProductByCountry(product: { country?: string }) {
  const country = getCountryFromHostname();

  // For US, show products with no country specified
  if (country === 'US') {
    return !product.country;
  }

  // For other countries, match the country code
  return product.country === country;
}
