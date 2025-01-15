# Common Bugs and Solutions

## Next.js Build Error with getBundledDatabase()

### Issue

When using `getBundledDatabase()` from haircare-ingredients-analyzer, you might encounter this error during Next.js build:

```
Error occurred prerendering page "/ingredients". Read more: https://nextjs.org/docs/messages/prerender-error
TypeError: Cannot read properties of undefined (reading 'name')
```

### Root Cause

This error occurs when accessing properties of potentially undefined objects from the database without proper type checking. The database is available at build time, but TypeScript's type checking isn't enough to prevent runtime errors if we don't handle nullish values correctly.

### Solution

1. Always use the types from haircare-ingredients-analyzer:

```typescript
import type {
  Ingredient,
  IngredientDatabase,
} from 'haircare-ingredients-analyzer';
```

2. Add explicit type annotations when getting data:

```typescript
const database: IngredientDatabase = getBundledDatabase();
const ingredients: Ingredient[] = Object.values(database.ingredients);
```

3. Add null checks when accessing nested properties:

```typescript
// Before accessing category.name
if (!category?.name) return null;
```

4. Use optional chaining and nullish coalescing:

```typescript
const groupName = category?.group
  ? database.groups[category.group]?.name || ''
  : '';
```

### Prevention

- Always use TypeScript types from the library
- Add explicit type annotations
- Use optional chaining (?.) when accessing nested properties
- Add null checks before using properties that might be undefined
- Test the build process locally before deploying

### Understanding TypeScript Runtime Behavior

TypeScript types are removed during compilation to JavaScript. This is because:

1. **Browser Compatibility**: Browsers only understand JavaScript, not TypeScript. The TypeScript compiler (tsc) removes all type information when converting to JavaScript.

2. **Performance**: Keeping type information at runtime would increase bundle size and slow down execution.

3. **JavaScript Design**: JavaScript is dynamically typed by design. TypeScript adds static typing during development but preserves JavaScript's runtime behavior.

Example of what happens during compilation:

```typescript
// TypeScript code
interface User {
  name: string;
  age: number;
}

function greet(user: User) {}

// Compiled JavaScript
function greet(user) {}
```

This is why we need both:

- TypeScript types for compile-time checks (development)
- Runtime checks (like `if (!category?.name)`) for production safety
