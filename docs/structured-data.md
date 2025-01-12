# Structured Data Implementation

CurlsBot uses JSON-LD structured data to help search engines better understand the content and functionality of the site. The implementation uses the `schema-dts` package for TypeScript type safety.

## Setup

The structured data is implemented in two main files:
- `src/utils/structured-data.ts` - Contains the schema generators
- `src/app/(home)/page.tsx` - Implements the schemas on the home page

## Schemas

### WebApplication Schema

Describes the CurlsBot ingredient analyzer tool:

```typescript
{
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

- The `@context` property is automatically added during serialization
- Type safety is enforced using `schema-dts` TypeScript types
- Schemas are implemented using `script` tags with `type="application/ld+json"`
