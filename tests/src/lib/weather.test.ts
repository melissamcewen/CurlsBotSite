import { analyzeDewPoint } from '@/lib/weather';

describe('analyzeDewPoint', () => {
  it('returns correct status for different dew point ranges', () => {
    // Test dry range (<= 30°F)
    const dryResult = analyzeDewPoint(-2, 'celsius'); // ~28°F
    expect(dryResult.status).toBe('warning');
    expect(dryResult.range).toBe('dry');

    // Test mid range (31-40°F)
    const midResult = analyzeDewPoint(4, 'celsius'); // ~39°F
    expect(midResult.status).toBe('caution');
    expect(midResult.range).toBe('mid');

    // Test optimal range (41-60°F)
    const optimalResult = analyzeDewPoint(15, 'celsius'); // ~59°F
    expect(optimalResult.status).toBe('ok');
    expect(optimalResult.range).toBe('optimal');

    // Test high range (> 60°F)
    const highResult = analyzeDewPoint(20, 'celsius'); // ~68°F
    expect(highResult.status).toBe('warning');
    expect(highResult.range).toBe('high');
  });

  it('handles Fahrenheit input correctly', () => {
    const result = analyzeDewPoint(70, 'fahrenheit');
    expect(result.status).toBe('warning');
    expect(result.range).toBe('high');
  });
});

