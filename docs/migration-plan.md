# Migration Plan

## Overview

This document outlines the plan for migrating content pages to MDX format and implementing the new reference system.

## 1. Reference System Setup

### 1.1 Core Components

- [x] Create `src/data/references.ts` with reference data and types
- [x] Create `InlineReference` component for inline citations
- [x] Create `AutoReferencesList` component for automatic reference tracking
- [x] Create `ReferencesList` component for displaying references

### 1.2 Reference System Features

- References are tracked automatically as they appear in content
- Reference numbers are assigned in order of appearance
- References display as inline citations with icons
- Full reference list appears at bottom of content
- References include author, date, title, and source where available

## 2. Content Migration Steps

### 2.1 Move Content Files

- Move existing markdown files from `src/content/categories/*.md` to `src/content/categories/*.mdx`
- Move existing markdown files from `src/content/groups/*.md` to `src/content/groups/*.mdx`

### 2.2 Update Content

For each content file:

1. Update frontmatter format if needed
2. Replace markdown links with `<InlineReference id="X" />` components
3. Add `<AutoReferencesList />` component at bottom of content
4. Test rendering and reference numbering
5. Verify all references appear correctly

### 2.3 Update Page Components

1. Simplify `src/app/categories/[name]/page.tsx`:
   - Remove old markdown content handling
   - Update metadata generation for MDX
   - Move metadata/structured data logic to utils
2. Simplify `src/app/groups/[name]/page.tsx`:
   - Remove old markdown content handling
   - Update metadata generation for MDX
   - Move metadata/structured data logic to utils

### 2.4 Create Utility Functions

1. Create `src/utils/category-metadata.ts`:
   - Move category metadata generation
   - Move structured data generation
2. Update `src/utils/group-metadata.ts` if needed

## 3. Testing

### 3.1 Component Tests

- Test `InlineReference` component
- Test `AutoReferencesList` component
- Test `ReferencesList` component

### 3.2 Content Tests

- Verify each category page renders correctly
- Verify each group page renders correctly
- Check reference numbering is correct
- Verify metadata and structured data

## 4. Cleanup

1. Archive old markdown files in `/todo` directory
2. Remove unused markdown utilities
3. Update imports and dependencies
4. Document new MDX content creation process

## Notes

- Maintain same URL structure
- Preserve existing metadata
- References should be numbered in order of appearance
- Each page's references reset on load
- No client/server conflicts in reference handling
