import '@testing-library/jest-dom';
import { jest, beforeEach } from '@jest/globals';

// Mock fetch API globally
const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: 'Test Product',
        brand: 'Test Brand',
        buyUrl: 'https://example.com',
      }),
  })
) as jest.Mock;

global.fetch = mockFetch as unknown as typeof global.fetch;

beforeEach(() => {
  // Clear all mocks before each test
  mockFetch.mockClear();
});
