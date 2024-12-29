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

Remember that TypeScript types are removed at runtime, so we need both type annotations AND runtime checks to ensure safety.
