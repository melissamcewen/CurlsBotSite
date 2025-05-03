import {
  getCountryFromHostname,
  filterProductByCountry,
} from '@/lib/countryDetection';
import type { Product } from 'haircare-ingredients-analyzer';

describe('getCountryFromHostname', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns US by default when no hostname provided', () => {
    expect(getCountryFromHostname()).toBe('US');
  });

  it('returns US when window is undefined', () => {
    expect(getCountryFromHostname('example.com')).toBe('US');
  });

  it('detects UK from hostname', () => {
    expect(getCountryFromHostname('example.co.uk')).toBe('UK');
  });

  it('detects AU from hostname', () => {
    expect(getCountryFromHostname('example.com.au')).toBe('AU');
  });

  it('detects EU from .eu domain', () => {
    expect(getCountryFromHostname('example.eu')).toBe('EU');
  });

  it('detects EU from EU country TLDs', () => {
    expect(getCountryFromHostname('example.fr')).toBe('EU');
    expect(getCountryFromHostname('example.de')).toBe('EU');
    expect(getCountryFromHostname('example.it')).toBe('EU');
  });

  it('returns US for non-matching hostnames', () => {
    expect(getCountryFromHostname('example.com')).toBe('US');
    expect(getCountryFromHostname('example.net')).toBe('US');
  });

  it('respects TEST_COUNTRY environment variable', () => {
    process.env.NEXT_PUBLIC_TEST_COUNTRY = 'UK';
    // Need to re-import to get updated env variable
    const { getCountryFromHostname } = require('@/lib/countryDetection');
    expect(getCountryFromHostname('example.com')).toBe('UK');
  });
});

describe('filterProductByCountry', () => {
  const createMockProduct = (
    buyLinks: { countries?: string[] }[],
  ): Product => ({
    id: 'test-id',
    name: 'Test Product',
    brand: 'Test Brand',
    buy_links: buyLinks as any,
    product_categories: [],
  });

  it('returns false when product has no buy links', () => {
    const product = createMockProduct([]);
    expect(filterProductByCountry(product, 'US')).toBe(false);
  });

  it('filters US products correctly', () => {
    const usProduct = createMockProduct([{ countries: ['US'] }]);
    const nonUsProduct = createMockProduct([{ countries: ['UK'] }]);
    const bothProduct = createMockProduct([
      { countries: ['US'] },
      { countries: ['UK'] },
    ]);

    expect(filterProductByCountry(usProduct, 'US')).toBe(true);
    expect(filterProductByCountry(nonUsProduct, 'US')).toBe(false);
    expect(filterProductByCountry(bothProduct, 'US')).toBe(true);
  });

  it('filters UK products correctly', () => {
    const ukProduct = createMockProduct([{ countries: ['UK'] }]);
    const nonUkProduct = createMockProduct([{ countries: ['US'] }]);
    const bothProduct = createMockProduct([
      { countries: ['US'] },
      { countries: ['UK'] },
    ]);

    expect(filterProductByCountry(ukProduct, 'UK')).toBe(true);
    expect(filterProductByCountry(nonUkProduct, 'UK')).toBe(false);
    expect(filterProductByCountry(bothProduct, 'UK')).toBe(true);
  });

  it('filters AU products correctly', () => {
    const auProduct = createMockProduct([{ countries: ['AU'] }]);
    const nonAuProduct = createMockProduct([{ countries: ['US'] }]);
    const bothProduct = createMockProduct([
      { countries: ['US'] },
      { countries: ['AU'] },
    ]);

    expect(filterProductByCountry(auProduct, 'AU')).toBe(true);
    expect(filterProductByCountry(nonAuProduct, 'AU')).toBe(false);
    expect(filterProductByCountry(bothProduct, 'AU')).toBe(true);
  });

  it('filters EU products correctly with UK fallback', () => {
    const euProduct = createMockProduct([{ countries: ['EU'] }]);
    const ukProduct = createMockProduct([{ countries: ['UK'] }]);
    const usProduct = createMockProduct([{ countries: ['US'] }]);
    const bothProduct = createMockProduct([
      { countries: ['EU'] },
      { countries: ['UK'] },
    ]);

    expect(filterProductByCountry(euProduct, 'EU')).toBe(true);
    expect(filterProductByCountry(ukProduct, 'EU')).toBe(true); // EU can use UK links
    expect(filterProductByCountry(usProduct, 'EU')).toBe(false); // EU can no longer use US links
    expect(filterProductByCountry(bothProduct, 'EU')).toBe(true);
  });

  it('handles products with multiple buy links', () => {
    const multiCountryProduct = createMockProduct([
      { countries: ['US', 'UK', 'AU'] },
    ]);

    expect(filterProductByCountry(multiCountryProduct, 'US')).toBe(true);
    expect(filterProductByCountry(multiCountryProduct, 'UK')).toBe(true);
    expect(filterProductByCountry(multiCountryProduct, 'AU')).toBe(true);
  });

  it('treats products with missing countries array as US products', () => {
    const missingCountriesProduct = createMockProduct([{ url: 'test.com' }]);
    const emptyCountriesProduct = createMockProduct([
      { countries: [], url: 'test.com' },
    ]);

    // Should be available in US
    expect(filterProductByCountry(missingCountriesProduct, 'US')).toBe(true);
    expect(filterProductByCountry(emptyCountriesProduct, 'US')).toBe(true);

    // Should not be available in other countries
    expect(filterProductByCountry(missingCountriesProduct, 'UK')).toBe(false);
    expect(filterProductByCountry(emptyCountriesProduct, 'UK')).toBe(false);
    expect(filterProductByCountry(missingCountriesProduct, 'AU')).toBe(false);
    expect(filterProductByCountry(emptyCountriesProduct, 'AU')).toBe(false);
    expect(filterProductByCountry(missingCountriesProduct, 'EU')).toBe(false);
    expect(filterProductByCountry(emptyCountriesProduct, 'EU')).toBe(false);
  });
});
