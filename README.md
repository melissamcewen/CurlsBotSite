## Markdown Content System

The site uses markdown files to provide rich content for various pages. These files are stored in `src/content/` with subdirectories matching the routes:

```
src/content/
├── products/
│   ├── low-porosity.md
│   ├── high-porosity.md
│   └── normal-porosity.md
├── categories/
│   └── [category-id].md
├── ingredients/
│   └── [ingredient-id].md
├── systems/
│   ├── curly_default.md
│   ├── curly_strict.md
│   └── protein_sensitive.md
└── groups/
    └── [group-id].md
```

Each markdown file uses frontmatter for metadata and markdown content for the body:

```markdown
---
title: Low Porosity Hair Products
description: Products suitable for low porosity hair, which has a tightly bound cuticle layer.
---

# Understanding Low Porosity Hair

Content goes here...
```

For analysis systems, the markdown files include additional metadata:

```markdown
---
title: Default Curly Hair System
description: A balanced system for analyzing ingredients suitable for curly hair
systemId: curly_default
rules:
  - Avoid harsh sulfates
  - Look for moisturizing ingredients
  - Moderate protein content
---

# Default Curly Hair Analysis System

This system provides a balanced approach...
```

The content is loaded using utility functions in `src/utils/markdown.ts`:
- `getMarkdownData(path)`: Loads and parses a markdown file
- `getCategoryContent(id)`: Loads category-specific content
- `getIngredientContent(id)`: Loads ingredient-specific content
- `getGroupContent(id)`: Loads group-specific content
- `getSystemContent(id)`: Loads system-specific content

If a markdown file doesn't exist for a particular item, the page will fall back to displaying basic information from the database.

## Custom Analysis Settings Feature

The site includes a currently disabled custom analysis settings feature. To re-enable it:

1. In `src/components/analysis/SystemSelector.tsx`:
   - Re-import the CustomSystemForm component
   - Restore the showCustomForm and defaultSettings states
   - Add back the custom option to the select dropdown
   - Restore the handleSystemChange and handleCustomSettings functions
   - Add back the CustomSystemForm component render logic

2. The following components are preserved but currently unused:
   - `src/components/analysis/CustomSystemForm.tsx`
   - Related custom settings utilities and types

The custom settings feature allows users to create their own analysis system by selecting specific rules to apply. This can be useful for advanced users who want to customize their ingredient analysis criteria.

## URL Slugs and Internal IDs

The site uses a consistent system for handling URLs and internal IDs:

- URLs use hyphens (e.g., `/products/low-porosity`)
- Internal IDs use underscores (e.g., `low_porosity`)

The conversion between these formats is handled by utility functions in `src/utils/slugs.ts`:

```typescript
// Convert URL slug to internal ID
slugToId('low-porosity') // returns 'low_porosity'

// Convert internal ID to URL slug
idToSlug('low_porosity') // returns 'low-porosity'

// Format a string as title case
formatTitle('low_porosity') // returns 'Low Porosity'
```

This system is used across all dynamic routes:
- `/products/[tag]`
- `/categories/[name]`
- `/ingredients/[name]`
- `/groups/[name]`

Each page converts the URL parameter to an internal ID for database lookups, and converts IDs back to slugs for generating links.
