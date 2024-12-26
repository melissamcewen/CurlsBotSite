# Geotargeting Approaches

## Current Implementation (Component-Level)

Currently implemented in `ProductRecommendations.tsx`:

- Simple domain-based detection (`.au` for Australia)
- Filters products based on country if specified
- Shows products without country specification to all users
- Defaults to US for non-AU domains

### Pros

- Simple to implement and test
- Non-breaking change
- Easy to understand
- Works well for single-component needs

### Cons

- Not reusable across components
- Inconsistent if we need geotargeting elsewhere
- Limited to domain-based detection

## Future Enhancement Options

### 1. Site-Wide Context Approach

Create a global geotargeting context:

```typescript
// contexts/GeotargetingContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface GeotargetingContextType {
  country: string;
  setCountry: (country: string) => void;
}

const GeotargetingContext = createContext<GeotargetingContextType>({
  country: 'US',
  setCountry: () => {},
});

export function GeotargetingProvider({ children }) {
  const [country, setCountry] = useState('US');

  useEffect(() => {
    // Detect country on mount
    const detected = detectCountry();
    setCountry(detected);
  }, []);

  return (
    <GeotargetingContext.Provider value={{ country, setCountry }}>
      {children}
    </GeotargetingContext.Provider>
  );
}
```

#### Pros

- Consistent across the site
- Single source of truth
- Easy to modify detection logic in one place
- Can add more sophisticated detection methods

#### Cons

- More setup required
- Adds complexity for simple use cases
- Need to wrap app in provider

### 2. Middleware/API Approach

Use Next.js middleware or API routes for geotargeting:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get country from headers or IP
  const country = request.geo?.country || 'US';

  // Add country to headers or rewrite to country-specific route
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);
  return response;
}
```

#### Pros

- More accurate detection using server-side information
- Can use IP-based detection
- Can cache results
- Works with CDN/edge functions

#### Cons

- More complex to implement
- Requires server-side changes
- May impact performance if not cached properly

### 3. Enhanced Client-Side Detection

Improve the current client-side approach with better detection methods:

```typescript
async function detectCountry(): Promise<string> {
  // Try multiple methods in order of preference

  // 1. Check URL/domain
  if (window.location.hostname.endsWith('.au')) return 'AU';

  // 2. Check browser language
  const lang = navigator.language;
  if (lang.includes('en-AU')) return 'AU';

  // 3. Use IP geolocation service (if needed)
  try {
    const response = await fetch('https://ip-api.com/json/');
    const data = await response.json();
    return data.countryCode;
  } catch {
    // Fallback to default
    return 'US';
  }
}
```

#### Pros

- Better accuracy than simple domain check
- No server-side changes needed
- Can be implemented gradually
- Falls back gracefully

#### Cons

- May need external service for IP detection
- Can be blocked by privacy settings
- Less reliable than server-side detection

## Recommendation

For future implementation:

1. Start with Enhanced Client-Side Detection (#3) as it's the easiest upgrade path
2. Move to Site-Wide Context (#1) if we need geotargeting in multiple components
3. Consider Middleware Approach (#2) only if we need more accurate detection or have performance issues

Remember to:

- Keep fallbacks for when detection fails
- Consider privacy implications
- Test with users from different regions
- Document any region-specific business logic
