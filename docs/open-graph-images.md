# OpenGraph Images Guide

## Image Specifications

### Default Site Image
- **Location**: `/public/images/og-default.jpg`
- **Dimensions**: 1200×630 pixels (1.91:1 aspect ratio)
- **Format**: JPG or PNG (JPG recommended for photos, PNG for graphics)
- **File Size**: Aim for under 300KB
- **Color Space**: sRGB
- **Resolution**: 72 DPI

### Best Practices
1. **Design Guidelines**:
   - Keep important content within the safe zone (1124×589)
   - Use clear, readable text
   - Include your logo
   - Use contrasting colors
   - Avoid small text that may be unreadable in thumbnails

2. **Testing**:
   - Test how it appears on:
     - Facebook
     - Twitter
     - LinkedIn
     - Slack
   - Use preview tools like [OpenGraph.xyz](https://www.opengraph.xyz/)

## Implementation

### Site-Wide Default
The default OpenGraph image is configured in `src/app/layout.tsx`:

```typescript
openGraph: {
  images: [
    {
      url: '/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'CurlsBot - Hair Care Ingredient Analysis',
      type: 'image/jpeg',
    }
  ]
}
```

### Page-Specific Images
Individual pages can override the default in their metadata:

```typescript
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/images/blog/post-name/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Post Title',
      }
    ]
  }
};
```

### Blog Posts
Blog posts can specify their OpenGraph image in the frontmatter:

```markdown
---
title: Post Title
description: Post description
image: /images/blog/post-name/og-image.jpg
---
```

## Directory Structure
```
public/
  images/
    og-default.jpg       # Site-wide default
    blog/
      post-name/
        og-image.jpg     # Post-specific image
```

## Image Templates
Consider creating templates for different types of content:

1. **Default Site Image**:
   - Brand-focused
   - Shows main value proposition
   - Includes logo and tagline

2. **Blog Post Template**:
   - Title overlay
   - Author info
   - Consistent branding elements

3. **Product Page Template**:
   - Product focus
   - Key features/benefits
   - Clear branding

## Technical Notes

1. **Next.js Image Optimization**:
   - OpenGraph images are served directly from `/public`
   - Not processed by Next.js Image component
   - Optimize images before adding them

2. **Performance**:
   - Use appropriate compression
   - Consider using WebP with JPG fallback
   - Keep file sizes reasonable

3. **Accessibility**:
   - Always include descriptive alt text
   - Ensure text has sufficient contrast
   - Don't rely solely on images for important information
