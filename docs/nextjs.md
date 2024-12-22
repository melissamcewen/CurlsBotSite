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

## Routing and Route Groups

### Basic Routing
- Next.js uses file-system based routing
- Files in `app` directory automatically become routes
- Examples:
```
app/
  page.tsx         → /
  about/page.tsx   → /about
  blog/page.tsx    → /blog
```

### Route Groups (folders with parentheses)
- Folders starting with parentheses () are route groups
- They **don't affect the URL structure**
- Used for organizing code without changing URLs
- Example:
```
app/
  (quiz)/
    page.tsx           → / (home page)
    porosity/page.tsx  → /porosity
  (marketing)/
    about/page.tsx     → /about
    contact/page.tsx   → /contact
```

### Why Use Route Groups?
1. **Shared Layouts**: Group pages that share the same layout
2. **Shared Loading States**: Use same loading.tsx for related pages
3. **Code Organization**: Group related features together

### Real Example from Our Code
```
app/
  (quiz)/
    loading.tsx        # Shared loading state with chat bubbles
    page.tsx          # Main ingredient analyzer (homepage)
    porosity/
      page.tsx        # Porosity quiz page
  blog/
    loading.tsx       # Blog-specific loading
    page.tsx          # Blog listing
  ingredients/
    loading.tsx       # Table loading skeleton
    page.tsx          # Ingredients database
```

In this structure:
- `(quiz)` group contains pages with chat interface
- The URL is still just `/` for the homepage
- Loading states are scoped to their group

## Route Groups Deep Dive

### What Are Route Groups?
- Folders in Next.js that start with parentheses: `(folderName)`
- They're organizational tools, not URL segments
- Help organize code without affecting the URL structure
- Can share components, styles, and loading states

### How Route Groups Work

1. **URL Structure**
```
# This structure:
app/
  (marketing)/
    about/page.tsx
    team/page.tsx
  (shop)/
    products/page.tsx
    cart/page.tsx

# Creates these URLs:
/about
/team
/products
/cart

# NOT these URLs:
/marketing/about    ❌
/shop/products      ❌
```

2. **Shared Loading States**
```
app/
  (marketing)/
    loading.tsx       # Used for all marketing pages
    about/page.tsx    # Shows marketing loading state
    team/page.tsx     # Shows same marketing loading state
  (shop)/
    loading.tsx       # Different loading state for shop
    products/page.tsx # Shows shop loading state
```

3. **Shared Layouts**
```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <div className="marketing-theme">
      <MarketingNav />
      {children}
      <MarketingFooter />
    </div>
  );
}

// This layout only applies to pages in (marketing)
```

### Real-World Example: Chat Interface Group

```
app/
  (chat)/                 # Group for chat-style interfaces
    loading.tsx           # Shared loading with chat bubbles
    page.tsx             # Ingredient analyzer (URL: /)
    porosity-quiz/       # Porosity quiz feature
      page.tsx           # Quiz page (URL: /porosity-quiz)
      loading.tsx        # Optional: Override group loading
    layout.tsx           # Shared chat interface layout

  (static)/              # Group for static pages
    about/page.tsx       # About page (URL: /about)
    contact/page.tsx     # Contact page (URL: /contact)
    layout.tsx           # Different layout for static pages
```

### Benefits of This Structure

1. **Organization**
   - Related features stay together
   - Easier to find associated files
   - Clear separation of concerns

2. **Shared Resources**
   - Loading states
   - Layouts
   - Utility functions
   - Components
   - Styles

3. **Independent Development**
   - Teams can work on different groups
   - Changes in one group don't affect others
   - Easy to move or refactor groups

4. **Performance**
   - Loading states scoped to groups
   - Layouts only load for relevant pages
   - Better code splitting

### When to Use Route Groups

Use route groups when you have:
1. Pages that share similar UI/UX (like chat interfaces)
2. Features that belong together logically
3. Pages that need the same loading states
4. Sections that share layouts or components

Don't use route groups when:
1. You want the group name in the URL
2. Pages don't share any common elements
3. You're just trying to organize by feature (use regular folders)
