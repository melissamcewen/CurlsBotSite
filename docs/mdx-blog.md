# Blog MDX Migration Plan

## Overview

This document outlines the plan for migrating the blog from markdown to MDX format, including the reference system integration.

## 1. Current Blog Structure

- Blog posts are in `src/content/blog/*.md`
- Uses frontmatter for metadata (title, description, date, image)
- Renders content using dangerouslySetInnerHTML
- Supports images with Next.js Image optimization
- Has loading states and streaming support

## 2. Migration Steps

### 2.1 Update Dependencies

- [x] Install `@next/mdx` and `@types/mdx`
- [x] Configure Next.js for MDX support

### 2.2 Update Blog Components

1. Modify `src/app/blog/[slug]/page.tsx`:

   - Remove markdown content handling
   - Update to use dynamic MDX imports
   - Keep frontmatter handling
   - Keep image optimization
   - Add fallback for non-MDX content

2. Update `src/app/blog/page.tsx`:
   - Keep streaming support
   - Keep sorting by date
   - Update to handle both .md and .mdx files
   - Maintain loading states

### 2.3 Add Reference Support

1. Add reference components to MDX:

   - Make `InlineReference` available
   - Make `AutoReferencesList` available
   - Add to `mdx-components.tsx`

2. Update blog post layout:
   - Add references section at bottom
   - Style reference citations
   - Ensure references reset per post

### 2.4 Content Migration

1. For each blog post:
   - Convert `.md` to `.mdx`
   - Update markdown links to use `<InlineReference>`
   - Add `<AutoReferencesList />` at bottom
   - Test rendering and references
   - Verify images still work
   - Check frontmatter

### 2.5 Update Utilities

1. Modify `src/utils/markdown.ts`:

   - Update `getBlogPost` to handle .mdx
   - Keep backwards compatibility for .md
   - Update types for MDX content

2. Update metadata handling:
   - Keep OpenGraph image support
   - Maintain date formatting
   - Preserve structured data

## 3. Testing

### 3.1 Component Tests

- Test blog post rendering
- Test reference integration
- Test image optimization
- Test loading states

### 3.2 Content Tests

- Verify each post renders correctly
- Check reference numbering
- Verify metadata and images
- Test streaming performance

## 4. Cleanup

1. Move old markdown files to `/todo`
2. Update documentation
3. Remove unused markdown utilities
4. Update imports and dependencies

## Notes

- Keep same URL structure
- Preserve existing metadata
- Maintain image optimization
- Keep streaming support
- References should reset per post
- Support both .md and .mdx during migration
