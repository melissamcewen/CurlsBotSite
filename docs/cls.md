# CLS (Cumulative Layout Shift) Prevention Guidelines

## General Rules

1. **Always Reserve Space**
   - Use minimum height containers for dynamic content
   - Set explicit dimensions for containers that will load content asynchronously
   - Never let content "pop in" without reserved space

2. **Text Handling**
   - Use `line-clamp-1` for single-line text that might overflow (e.g., titles)
   - Use `line-clamp-2` or `line-clamp-3` for descriptions
   - Set minimum heights for text containers that might be empty

3. **Grid and List Items**
   - Ensure consistent heights for repeating elements
   - Wrap items in fixed-height containers
   - Use minimum heights for grid containers that might be empty

## Component-Specific Rules

### Blog Posts
```tsx
<article className="card">
  <div className="card-body min-h-[150px]">
    <h2>Title</h2>
    <div className="min-h-[48px]">
      {description && <p>{description}</p>}
    </div>
    <div>Date</div>
  </div>
</article>
```

### Product Recommendations
```tsx
<div className="p-4 min-h-[120px]">
  <div className="flex justify-between items-start gap-4">
    <div className="space-y-1 flex-1">
      <p className="line-clamp-1">{brand}</p>
      <p className="line-clamp-2">{name}</p>
    </div>
    <a className="shrink-0">Buy Now</a>
  </div>
</div>
```

### Ingredient Lists
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[300px]">
  {ingredients.map(ingredient => (
    <div className="min-h-[200px]">
      <IngredientItem ingredient={ingredient} />
    </div>
  ))}
</div>
```

### Analysis Results
```tsx
<div className="space-y-8">
  {/* Main content */}
  <div className="min-h-[100px]">
    <p>{description}</p>
  </div>

  {/* Conditional sections */}
  <div className="min-h-[200px]">
    {shouldShow && <Content />}
  </div>
</div>
```

## Common Patterns

1. **Conditional Rendering**
   - Always wrap conditional content in a container with minimum height
   - Use the same height as the tallest possible content
   ```tsx
   <div className="min-h-[200px]">
     {condition && <Content />}
   </div>
   ```

2. **Dynamic Lists**
   - Set minimum height on the list container
   - Set consistent heights for list items
   ```tsx
   <div className="min-h-[300px]">
     <div className="grid gap-4">
       {items.map(item => (
         <div className="min-h-[100px]">{item}</div>
       ))}
     </div>
   </div>
   ```

3. **Text Content**
   - Use line clamping for variable-length text
   - Set minimum heights for text containers
   ```tsx
   <div className="min-h-[48px]">
     <h2 className="line-clamp-1">{title}</h2>
     <p className="line-clamp-2">{description}</p>
   </div>
   ```

4. **Images**
   - Always specify width and height
   - Use aspect ratio containers
   ```tsx
   <div className="aspect-square w-full">
     <img src={src} alt={alt} className="object-cover" />
   </div>
   ```

## Testing for CLS

1. Use Chrome DevTools Performance panel to measure CLS
2. Test with different content lengths
3. Test with empty/missing content
4. Test with slow network connections
5. Test responsive layouts at different breakpoints

## Common CLS Causes to Avoid

1. Images without dimensions
2. Dynamically injected content without reserved space
3. Conditional renders without minimum heights
4. Variable length text without constraints
5. Async data loading without placeholders
6. Font loading without font-display strategy
7. Third-party widgets without reserved space
