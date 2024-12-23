# Dynamic Routes in Next.js 14

## Handling Route Parameters

In Next.js 14, dynamic route parameters (like `[slug]` or `[id]`) are handled asynchronously. This means you need to await the parameters before using them.

### Example Structure

```
src/app/blog/[slug]/page.tsx  // Dynamic route
```

### Parameter Handling

#### ❌ Old Way (Will Error)
```typescript
interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  // Error: params.slug needs to be awaited
  const data = await getData(params.slug);
}
```

#### ✅ Correct Way
```typescript
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  // Await the params before using
  const resolvedParams = await params;
  const data = await getData(resolvedParams.slug);
}
```

### Why This Is Required

1. **Streaming Support**:
   - Next.js 14 supports streaming rendering
   - Route parameters are loaded asynchronously to enable parallel loading
   - This allows for better performance and progressive rendering

2. **Parallel Routing**:
   - Multiple routes can load simultaneously
   - Parameters become available as they're resolved
   - Prevents blocking while waiting for parameters

### Common Use Cases

1. **Metadata Generation**:
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  return {
    title: post.title,
    // ... other metadata
  };
}
```

2. **Page Content**:
```typescript
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const content = await getContent(resolvedParams.id);

  return <div>{content}</div>;
}
```

### Best Practices

1. **Type Safety**:
   - Always define the params interface with Promise
   - Include all possible parameters
   ```typescript
   interface Props {
     params: Promise<{
       slug: string;
       // other params...
     }>;
   }
   ```

2. **Error Handling**:
   ```typescript
   export default async function Page({ params }: Props) {
     try {
       const resolvedParams = await params;
       const data = await getData(resolvedParams.slug);
     } catch (error) {
       // Handle parameter resolution errors
     }
   }
   ```

3. **Loading States**:
   - Consider using loading.tsx for parameter resolution time
   - Show appropriate loading states while params resolve

### Common Issues

1. **Type Errors**:
   ```typescript
   // ❌ Wrong
   const slug = params.slug;  // Error: params is a Promise

   // ✅ Correct
   const { slug } = await params;
   ```

2. **Metadata Generation**:
   - Remember to await params in generateMetadata
   - Handle cases where params might not resolve

3. **Server Components**:
   - This only applies to Server Components
   - Client Components don't need to await params
