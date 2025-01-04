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

### Content Display Pattern

The site follows a consistent pattern for displaying content:

1. **List Pages**: When displaying lists of items (ingredients, categories, etc.), items with markdown content are prioritized and shown first. This helps highlight items with detailed documentation.

2. **Detail Pages**: Each detail page (e.g., ingredient, category) shows:

   - Basic information from the database (name, description, categories, etc.) always
   - Additional markdown content (if available) for in-depth information
   - The markdown content section is only rendered when a markdown file exists

3. **Search and Filtering**: Items with markdown content are marked as indexed for search engines, while those without are marked with `noindex`.

This pattern ensures that:

- Essential information from the database is always accessible
- Detailed documentation is prominently featured when available
- Users can easily distinguish between basic and detailed entries

The content is loaded using utility functions in `src/utils/markdown.ts`:

- `getMarkdownData(path)`: Loads and parses a markdown file
- `getCategoryContent(id)`: Loads category-specific content
- `getIngredientContent(id)`: Loads ingredient-specific content
- `getGroupContent(id)`: Loads group-specific content
- `getSystemContent(id)`: Loads system-specific content

If a markdown file doesn't exist for a particular item, the page will fall back to displaying basic information from the database.

## Custom Analysis Settings Feature

The site includes several currently disabled features that can be re-enabled:

### System Selector

The system selector allows users to choose between different analysis systems (e.g., curly hair, protein sensitive). To re-enable it:

1. Move from `todo/` back to the components directory:

   - `SystemSelector.tsx` → `src/components/analysis/SystemSelector.tsx`
   - `CustomSystemForm.tsx` → `src/components/analysis/CustomSystemForm.tsx`

2. In `src/components/analysis/IngredientForm.tsx`:

   ```typescript
   // Add imports
   import { getBundledSystems } from 'haircare-ingredients-analyzer';
   import SystemSelector from './SystemSelector';

   // Add state
   const [systemId, setSystemId] = useState('curly_default');
   const [customSettings, setCustomSettings] = useState<string[]>([]);

   // Update handleAnalysis to accept system
   const handleAnalysis = useCallback(
     (ingredientList: string, system: string, settings?: string[]) => {
       // ... existing setup ...

       // Handle system selection
       if (system !== 'curly_default') {
         const systems = getBundledSystems();
         const selectedSystem = systems.find((s) => s.id === system);
         if (!selectedSystem) {
           throw new Error('Invalid system selected');
         }
         analyzer.setSystem(selectedSystem);
       }

       // ... rest of analysis ...
     },
     [],
   );

   // Add to form
   <div className="w-full">
     <SystemSelector value={systemId} onChange={handleSystemChange} />
   </div>;
   ```

### Ingredients Search

The ingredients search feature provides a search box above the ingredients table. To re-enable it:

1. Move from `todo/` back to the components directory:

   - `IngredientsSearch.tsx` → `src/components/ingredients/IngredientsSearch.tsx`

2. In `src/app/ingredients/page.tsx`:

   ```typescript
   // Add imports
   import { Card, CardContent } from '@/components/ui/Card';
   import { useState } from 'react';

   // Add search state
   const [searchTerm, setSearchTerm] = useState('');

   // Update sortedIngredients to include search
   const sortedIngredients = useMemo(() => {
     let filtered = [...ingredients];

     // Apply search filter
     if (searchTerm) {
       const searchLower = searchTerm.toLowerCase();
       filtered = filtered.filter(
         (ingredient) =>
           ingredient.name.toLowerCase().includes(searchLower) ||
           ingredient.description?.toLowerCase().includes(searchLower) ||
           ingredient.synonyms?.some((syn) =>
             syn.toLowerCase().includes(searchLower),
           ) ||
           ingredient.categories?.some((cat) =>
             cat.toLowerCase().includes(searchLower),
           ),
       );
     }

     // Apply sorting
     // ... existing sorting code ...

     return filtered;
   }, [ingredients, searchTerm, sortField, sortDirection]);

   // Add search box above table
   <Card className="mb-8">
     <CardContent>
       <div className="form-control w-full max-w-xl">
         <label className="label">
           <span className="label-text">Search ingredients</span>
         </label>
         <input
           type="text"
           placeholder="Filter by name, category, or description..."
           className="input input-bordered bg-base-200 text-base-content w-full"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>
     </CardContent>
   </Card>;

   // Add empty state message
   {
     sortedIngredients.length === 0 && (
       <div className="alert alert-info">
         <span>No ingredients found matching "{searchTerm}"</span>
       </div>
     );
   }
   ```

### Custom Settings Feature

The custom settings feature allows users to create their own analysis system. To re-enable it:

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
slugToId('low-porosity'); // returns 'low_porosity'

// Convert internal ID to URL slug
idToSlug('low_porosity'); // returns 'low-porosity'

// Format a string as title case
formatTitle('low_porosity'); // returns 'Low Porosity'
```

This system is used across all dynamic routes:

- `/products/[tag]`
- `/categories/[name]`
- `/ingredients/[name]`
- `/groups/[name]`

Each page converts the URL parameter to an internal ID for database lookups, and converts IDs back to slugs for generating links.

## DaisyUI Chat Component Usage

The site extensively uses DaisyUI's chat component for consistent message-style layouts. The chat component uses CSS Grid under the hood for proper alignment of avatars and messages.

### Basic Structure

The chat component requires a specific structure to maintain proper alignment:

```jsx
<div className="chat chat-start">
  <div className="chat-image">{/* Avatar content */}</div>
  <div className="chat-header">{/* Optional header content */}</div>
  <div className="chat-bubble">{/* Main message content */}</div>
  <div className="chat-footer">{/* Optional footer content */}</div>
</div>
```

### Our Custom Implementation

We have two main chat components for consistent styling across the application:

1. **ChatBubbleRobot**: For system/bot messages

```typescript
<ChatBubbleRobot
  status="ok" // or 'caution', 'warning', 'error'
  imageUrl="/normal.svg" // optional custom avatar
>
  <ChatBubble status="ok">{/* Message content */}</ChatBubble>
</ChatBubbleRobot>
```

2. **ChatBubbleUser**: For user messages

```typescript
<ChatBubbleUser
  secondary={false} // optional: use secondary color theme
  accent={false} // optional: use accent color theme
>
  {/* Message content */}
</ChatBubbleUser>
```

The `ChatBubbleUser` component provides:

- Consistent right-aligned styling for user messages
- Simple interface for basic messages
- Optional color theme variants
- Automatic chat-end alignment

### Component Features

**ChatBubbleRobot**:

- Avatar styling with status-based borders
- Consistent message styling
- Proper grid alignment
- Support for complex content with headers/footers

**ChatBubbleUser**:

- Simplified interface for user messages
- Consistent right-aligned styling
- Color theme variants (primary, secondary, accent)
- Automatic chat-end positioning

### Important Layout Notes

1. **Grid Structure**:

   - DaisyUI's chat uses CSS Grid for layout
   - Direct children must use the proper chat-\* classes
   - Avoid adding extra wrapper divs that could break the grid

2. **Proper Usage**:

```typescript
// ✅ Correct - Complex bot message
<ChatBubbleRobot status="ok">
  <ChatHeader>Title</ChatHeader>
  <ChatBubble>Content</ChatBubble>
</ChatBubbleRobot>

// ✅ Correct - Simple user message
<ChatBubbleUser>
  Your message content here
</ChatBubbleUser>

// ❌ Incorrect - Extra wrapper breaks layout
<ChatBubbleRobot>
  <div>
    <ChatBubble>Content</ChatBubble>
  </div>
</ChatBubbleRobot>
```

3. **Status Colors**:
   - Bot messages:
     - `ok`: info color theme
     - `caution`: warning color theme
     - `warning`: error color theme
   - User messages:
     - Default: primary color theme
     - `secondary`: secondary color theme
     - `accent`: accent color theme

### Example Usage in Quiz

```typescript
// Bot question
<ChatBubbleRobot status="ok">
  <ChatBubble status="ok">
    <p>What type of hair do you have?</p>
  </ChatBubble>
</ChatBubbleRobot>

// User answer
<ChatBubbleUser
  message="My hair is curly and thick"
  secondary={true}
/>
```

This structure ensures consistent chat-style layouts across the application while maintaining proper alignment between avatars and messages. Using these components helps maintain visual consistency and reduces code duplication.
