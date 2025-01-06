export type DewPointRange = 'dry' | 'mid' | 'optimal' | 'high';

export interface WeatherData {
  temp: number;
  humidity: number;
  dewPoint: number;
}

export interface WeatherAnalysis {
  range: DewPointRange;
  status: 'caution' | 'ok' | 'warning';
  recommendations: string[];
  forecast: string;
  explanation: string;
}

export function analyzeDewPoint(dewPoint: number): WeatherAnalysis {
  // Convert to Fahrenheit for analysis (since the docs use Fahrenheit)
  const dewPointF = (dewPoint * 9) / 5 + 32;

  if (dewPointF <= 30) {
    return {
      range: 'dry',
      status: 'warning',
      forecast: 'FRIZZ ALERT: Very Dry Air!',
      explanation: `The dew point is ${Math.round(dewPointF)}°F (${Math.round(
        dewPoint,
      )}°C), which means the air is very dry. In these conditions, humectants in your products might draw moisture out of your hair instead of from the air, potentially causing dryness and frizz.`,
      recommendations: [
        'Be careful with simple humectants, make sure they are balanced with anti-humectants to keep moisture in',
        'Film forming complex humectants are your best bet'
      ],
    };
  } else if (dewPointF <= 40) {
    return {
      range: 'mid',
      status: 'caution',
      forecast: 'Hair Day: Proceed with Caution',
      explanation: `The dew point is ${Math.round(dewPointF)}°F (${Math.round(
        dewPoint,
      )}°C), which is in a tricky range. At this dew point, your hair's reaction to humectants can be unpredictable - they might help or hurt depending on your specific hair type.`,
      recommendations: [
        'This will require trial and error to see what your hair likes',
        'Simple humectants might be fine, but it also might be a good idea to use anti-humectants to balance them out',
        'Film forming complex humectants are your best bet',
      ],
    };
  } else if (dewPointF <= 60) {
    return {
      range: 'optimal',
      status: 'ok',
      forecast: "You're Going to Have a Great Hair Day!",
      explanation: `The dew point is ${Math.round(dewPointF)}°F (${Math.round(
        dewPoint,
      )}°C) - this is the sweet spot for most curly hair! There's just enough moisture in the air for humectants to work effectively without causing frizz.`,
      recommendations: [
        'You will enjoy the best curls at this dew point',
        'You probably don\'t need to worry about what type of humectants you use',
      ],
    };
  } else {
    return {
      range: 'high',
      status: 'warning',
      forecast: 'FRIZZ ALERT: High Humidity!',
      explanation: `The dew point is ${Math.round(dewPointF)}°F (${Math.round(
        dewPoint,
      )}°C), which means there's a lot of moisture in the air. Your hair may absorb excess moisture, leading to frizz unless you use the right products to seal your hair.`,
      recommendations: [
        'Use hard hold products like gels to control your hair',
        'Some people avoid simple humectants in high humidity, others balance them out with anti-humectants',
        'Film forming complex humectants can be fine or even beneficial especially if they have a lot of hold',
      ],
    };
  }
}
