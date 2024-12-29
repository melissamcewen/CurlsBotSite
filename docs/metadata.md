# Metadata in Next.js

## Dynamic Metadata

Next.js allows you to generate dynamic metadata for your pages. This is crucial for SEO and social sharing. Here are the patterns we use in this project:

### Basic Dynamic Metadata

For pages with dynamic routes (like `[type]` or `[name]`), export a `generateMetadata` function:

```typescript
export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Dynamic Title | CurlsBot`,
    description: 'Dynamic description',
    // ... other metadata
  };
}
```

### Conditional Metadata (Categories Example)

For pages that should only be indexed under certain conditions:

```typescript
export function generateMetadata({ params }: Props): Metadata {
  // Get your content
  const markdownContent = await getContent(params.id);

  return {
    title: 'Page Title',
    description: 'Description',
    // Only index if there's proper content
    robots: markdownContent
      ? {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
        }
      : {
          index: false,
          follow: true,
        },
  };
}
```

### Dynamic Canonical URLs

Always use the www version of the domain and include the full path:

```typescript
alternates: {
  canonical: `https://www.curlsbot.com/your-path/${dynamicParam}`,
}
```

### Social Media Metadata

Include OpenGraph and Twitter metadata for better social sharing:

```typescript
{
  openGraph: {
    title: dynamicTitle,
    description: dynamicDescription,
    url: `https://www.curlsbot.com/path/${param}`,
    type: 'article',
    images: [{
      url: '/images/og-default.png',
      width: 1200,
      height: 630,
      alt: `${dynamicTitle}`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: dynamicTitle,
    description: dynamicDescription,
    images: ['/images/og-default.png'],
  },
}
```

## Best Practices

1. **Always Include Required Fields**:

   - title
   - description
   - canonical URL
   - robots directives

2. **Use Conditional Indexing** when:

   - The page requires specific content to be valuable
   - The page is a duplicate or temporary
   - The page is meant for internal navigation only

3. **Consistent URLs**:

   - Always use www version
   - Use https
   - Include trailing slashes consistently
   - Use lowercase URLs

4. **Error Handling**:
   - Use `notFound()` for invalid parameters
   - Provide fallback metadata when dynamic data isn't available

## Using Relative URLs with metadataBase

Next.js recommends using relative URLs in metadata when `metadataBase` is set in the root layout. This makes the code more maintainable and follows best practices. The base URL should be set once in `layout.tsx`, and then all other URLs should be relative to that base.

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.curlsbot.com'),
  // ... other metadata
};

// src/app/categories/[name]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/categories/${params.name}`, // relative URL
    },
    openGraph: {
      url: `/categories/${params.name}`, // relative URL
      images: [
        {
          url: '/images/og-default.png', // relative URL
          width: 1200,
          height: 630,
          alt: 'Category Image',
        },
      ],
    },
  };
}

The only URLs that should remain absolute are:
1. The `metadataBase` URL in `layout.tsx`
2. URLs in `robots.ts` (these need to be absolute)
3. External URLs (like references, citations, or links to other websites)
4. Email addresses and other actual links to your domain in content

This approach ensures that your metadata is consistent and easier to maintain, as you only need to update the base URL in one place if it changes.

## Example Metadata Configuration
