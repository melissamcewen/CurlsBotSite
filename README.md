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

The content is loaded using utility functions in `src/utils/markdown.ts`:
- `getMarkdownData(path)`: Loads and parses a markdown file
- `getCategoryContent(id)`: Loads category-specific content
- `getIngredientContent(id)`: Loads ingredient-specific content
- `getGroupContent(id)`: Loads group-specific content

If a markdown file doesn't exist for a particular item, the page will fall back to displaying basic information from the database.

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
