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
  const createMockProduct = (buyLinks: { country?: string }[]): Product => ({
    id: 'test',
    name: 'Test Product',
    brand: 'Test Brand',
    buy_links: buyLinks,
  });

  it('returns false when product has no buy links', () => {
    const product = createMockProduct([]);
    expect(filterProductByCountry(product, 'US')).toBe(false);
  });

  it('filters US products correctly', () => {
    const usProduct = createMockProduct([{ country: 'US' }]);
    const nonUsProduct = createMockProduct([{ country: 'UK' }]);

    expect(filterProductByCountry(usProduct, 'US')).toBe(true);
    expect(filterProductByCountry(nonUsProduct, 'US')).toBe(false);
  });

  it('filters UK products correctly', () => {
    const ukProduct = createMockProduct([{ country: 'UK' }]);
    const nonUkProduct = createMockProduct([{ country: 'US' }]);

    expect(filterProductByCountry(ukProduct, 'UK')).toBe(true);
    expect(filterProductByCountry(nonUkProduct, 'UK')).toBe(false);
  });

  it('filters AU products correctly', () => {
    const auProduct = createMockProduct([{ country: 'AU' }]);
    const nonAuProduct = createMockProduct([{ country: 'US' }]);

    expect(filterProductByCountry(auProduct, 'AU')).toBe(true);
    expect(filterProductByCountry(nonAuProduct, 'AU')).toBe(false);
  });

  it('filters EU products correctly with UK fallback', () => {
    const euProduct = createMockProduct([{ country: 'EU' }]);
    const ukProduct = createMockProduct([{ country: 'UK' }]);
    const usProduct = createMockProduct([{ country: 'US' }]);
    const bothProduct = createMockProduct([
      { country: 'EU' },
      { country: 'UK' },
    ]);

    expect(filterProductByCountry(euProduct, 'EU')).toBe(true);
    expect(filterProductByCountry(ukProduct, 'EU')).toBe(true); // EU can use UK links
    expect(filterProductByCountry(usProduct, 'EU')).toBe(false); // EU can no longer use US links
    expect(filterProductByCountry(bothProduct, 'EU')).toBe(true);
  });

  it('handles products with multiple buy links', () => {
    const multiCountryProduct = createMockProduct([
      { country: 'US' },
      { country: 'UK' },
      { country: 'AU' },
    ]);

    expect(filterProductByCountry(multiCountryProduct, 'US')).toBe(true);
    expect(filterProductByCountry(multiCountryProduct, 'UK')).toBe(true);
    expect(filterProductByCountry(multiCountryProduct, 'AU')).toBe(true);
  });
});
