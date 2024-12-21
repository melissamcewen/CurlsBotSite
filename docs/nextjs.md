# Next.js Implementation Guide

## Server Components vs Client Components

### Server Components
- Default in Next.js 13+ (no need for 'use client' directive)
- Run on the server only
- Can't use:
  - useState, useEffect, or other React hooks
  - Browser APIs (window, document)
  - Event handlers (onClick, etc.)
- Benefits:
  - Better performance (less JavaScript sent to client)
  - Direct database/filesystem access
  - Better SEO (server-rendered content)
- Example:
```tsx
// This is a server component (no 'use client')
export default function BlogPage() {
  // Can directly fetch data
  const posts = await getBlogPosts();

  return <div>{/* render posts */}</div>;
}
```

### Client Components
- Must have 'use client' directive
- Run in the browser
- Can use:
  - All React hooks
  - Browser APIs
  - Event handlers
- Example:
```tsx
'use client';

export default function Form() {
  // Can use hooks
  const [value, setValue] = useState('');

  return <input onChange={e => setValue(e.target.value)} />;
}
```

## Suspense and Loading States

### How Suspense Works
- Suspense lets you show a loading state while content loads
- Works with streaming server rendering
- Prevents content flashing
- Example:
```tsx
<Suspense fallback={<Loading />}>
  <SlowLoadingComponent />
</Suspense>
```

### Loading Files
- Create loading.tsx in a route directory
- Automatically used as fallback for loading states
- Should match layout of the content being loaded
- Example:
```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div className="animate-pulse">{/* skeleton */}</div>;
}
```

### Route Groups
- Directories starting with () don't affect URL structure
- Useful for organizing related pages
- Can have their own loading states
- Example:
```
app/
  (quiz)/
    loading.tsx  # Only affects quiz pages
    page.tsx     # Main quiz page
  blog/
    loading.tsx  # Only affects blog pages
    page.tsx     # Blog listing
```

## Environment Variables

### Local Development
- Create .env.local file:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
- Not committed to git
- Only used in development

### Vercel Deployment
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add variable:
   - Name: NEXT_PUBLIC_BASE_URL
   - Value: https://your-domain.com
   - Environment: Production
4. Optional: Add preview value for deployment previews

### Using Environment Variables
- NEXT_PUBLIC_ prefix makes them available client-side
- Access in code:
```tsx
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
```
- Used in metadata:
```tsx
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
};
```

## Performance Optimizations

### Content Loading
1. Use Suspense boundaries:
```tsx
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

2. Create matching loading skeletons:
```tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Match exact layout of content */}
    </div>
  );
}
```

3. Use route groups for specific loading states:
```
app/
  (quiz)/        # Chat bubble loading only here
  blog/          # Blog-specific loading
  ingredients/   # Table loading skeleton
```

### Server vs Client Rendering
- Use server components when possible
- Move interactivity to client components
- Split large components:
```tsx
// Server component wrapper
export default function Page() {
  const data = await getData();
  return <ClientComponent initialData={data} />;
}

// Interactive client part
'use client';
function ClientComponent({ initialData }) {
  const [state, setState] = useState(initialData);
  // ... handle interactivity
}
```
