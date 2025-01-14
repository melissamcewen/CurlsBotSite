# Structured Data Implementation

CurlsBot uses JSON-LD structured data to help search engines better understand the content and functionality of the site. The implementation uses the `schema-dts` package for TypeScript type safety.

## Setup

The structured data is implemented in two main files:

- `src/utils/structured-data.ts` - Contains the schema generators
- `src/app/(home)/page.tsx` - Implements the schemas on the home page

## Implementation

The implementation uses a custom `JsonLd` type to ensure proper typing with the `@context` property:

```typescript
type JsonLd<T> = T & {
  '@context': 'https://schema.org';
};
```

Schema generators return this type to ensure valid JSON-LD:

```typescript
export function generateWebAppSchema(): JsonLd<WebApplication> {
  return {
    '@context': 'https://schema.org',
    // ... schema properties
  };
}
```

Usage in pages:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateWebAppSchema()),
  }}
/>
```

## Schemas

### WebApplication Schema

Describes the CurlsBot ingredient analyzer tool:

```typescript
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CurlsBot Hair Care Ingredient Analyzer",
  "description": "Analyze hair care ingredients and learn about their effects on curly and wavy hair",
  "applicationCategory": "Beauty",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Hair care ingredient analysis",
    "Curly hair product recommendations",
    "Ingredient safety information"
  ]
}
```

### Organization Schema

Describes CurlsBot as an organization:

```typescript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CurlsBot",
  "url": "https://curlsbot.com",
  "logo": "https://curlsbot.com/logo.png",
  "sameAs": ["https://twitter.com/curlsbot"],
  "description": "CurlsBot helps people with curly and wavy hair understand product ingredients and find suitable hair care products."
}
```

## Testing

You can validate the structured data implementation using:

- [Google's Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Notes

- The `@context` property is included in each schema through the `JsonLd` type
- Type safety is enforced using `schema-dts` TypeScript types
- Each schema is implemented as a separate `script` tag with `type="application/ld+json"`
