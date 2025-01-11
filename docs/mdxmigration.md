# MDX Migration Plan

## Category Pages Migration

1. **Move Content** (Don't do this, I'm going to do it manually)

   - Move existing markdown files from `src/content/categories/*.md` to `src/content/categories/*.mdx`
   - Update frontmatter to match new format
   - Add `<InlineReference>` components to replace markdown links
   - Add `<AutoReferencesList />` at the bottom of each file

2. **Update Category Page Component**

   - Simplify `src/app/categories/[name]/page.tsx`
   - Remove old markdown content handling
   - Update metadata generation to work with MDX
   - Keep category list functionality
   - Move metadata and structured data logic to `src/utils/category-metadata.ts`
   - Add fallback to display basic info when no MDX content exists
   - Use data from haircare-ingredients-analyzer library for fallback

3. **Create Category Metadata Utilities**

   - Create `src/utils/category-metadata.ts`
   - Move metadata generation logic from page component
   - Move structured data generation
   - Follow pattern used in `group-metadata.ts`

4. **Testing**

   - Test each category page renders correctly
   - Test fallback content for categories without MDX
   - Verify references are numbered correctly
   - Check metadata is generated properly
   - Ensure category list still works
   - Verify structured data is correct

5. **Cleanup**
   - Remove old markdown files after confirming MDX versions work
   - Update any imports or utilities that reference old markdown files
   - Remove unused markdown utilities
   - Archive old code in `/todo` directory for reference

## Notes

- Keep the same URL structure
- Preserve all existing metadata and structured data
- Maintain current category listing functionality
- Follow same pattern used in groups migration
- Pages without MDX content should display basic info from the database
