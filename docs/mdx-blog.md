# Blog MDX Migration Plan

## Overview

This document outlines the plan for migrating the blog from markdown to MDX format, with a focus on maintaining image optimization and content features.

## Completed Steps

- ✓ Install and configure MDX support
  - Installed `@next/mdx` and `@types/mdx`
  - Configured Next.js for MDX support
  - Set up `mdx-components.tsx`

## 1. Current Blog Structure

- Blog posts are in `src/content/blog/*.md`
- Uses frontmatter for metadata (title, description, date, image)
- Renders content using dangerouslySetInnerHTML
- Supports images with Next.js Image optimization
- Has loading states and streaming support

## 2. Migration Steps

### 2.1 Add MDX Components

1. Create Image component for MDX:

   - Create `src/components/mdx/MdxImage.tsx`
   - Wrap Next.js Image component
   - Support relative paths from blog content
   - Handle alt text and dimensions
   - Add lazy loading

2. Add components to MDX:
   - Add Image component to `mdx-components.tsx`
   - Add any other needed components (headings, links, etc.)

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

### 2.3 Content Migration

1. For each blog post:
   - Convert `.md` to `.mdx`
   - Update image syntax to use MDX Image component
   - Test rendering and images
   - Verify images still work
   - Check frontmatter

### 2.4 Update Utilities

1. Modify `src/utils/markdown.ts`:

   - Update `getBlogPost` to handle .mdx
   - Update types for MDX content

2. Update metadata handling:
   - Keep OpenGraph image support
   - Maintain date formatting
   - Preserve structured data

## 3. Testing

### 3.1 Component Tests

- Test blog post rendering
- Test image optimization
- Test loading states

### 3.2 Content Tests

- Verify each post renders correctly
- Verify images and metadata
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
- Support both .md and .mdx during migration
- Images should maintain quality and performance
