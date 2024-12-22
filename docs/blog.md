# Blog Documentation

## Blog Post Structure

Each blog post is a markdown file in `src/content/blog/` with frontmatter metadata at the top.

### Frontmatter Fields

```markdown
---
title: Post Title
description: A brief description of the post
date: YYYY-MM-DD
image: /images/blog/post-slug/hero.jpg  # Optional, but recommended for social sharing
---
```

### Image Guidelines

#### Directory Structure
```
public/
  images/
    blog/
      post-slug/
        hero.jpg        # Main image for social/OpenGraph
        content-1.jpg   # Additional post images
        content-2.jpg
```

#### Image Specifications

1. **Hero Images** (for social sharing):
   - Dimensions: 1200x630px
   - Format: WebP preferred, JPG as fallback
   - Max file size: 200KB
   - Used in frontmatter `image` field
   - Will appear on social media when post is shared

2. **Content Images**:
   - Images in post content are automatically wrapped with Next.js Image component
   - Use standard markdown syntax in post content
   - Example: `![Alt text](/images/blog/post-slug/content-1.jpg)`
   - Include descriptive alt text for accessibility
   - Next.js will handle:
     - Automatic optimization
     - Lazy loading
     - Responsive sizing
     - WebP conversion when supported
     - Placeholder blur generation

#### Best Practices

1. **File Organization**:
   - Create a dedicated directory for each post's images
   - Use the post's slug as the directory name
   - Use descriptive, kebab-case filenames

2. **Image Optimization**:
   - While Next.js handles optimization, still compress images before adding
   - Provide images at their maximum intended display size
   - Consider loading time and performance
   - Use modern image formats (WebP, AVIF) when possible

3. **Naming Conventions**:
   - `hero.jpg` - Main social sharing image
   - `content-1.jpg`, `content-2.jpg` - Sequential naming for content images
   - Use descriptive names when appropriate (e.g., `diagram-flow.jpg`)

### Example Blog Post

```markdown
---
title: Welcome Back
description: CurlsBot is back, and I'm ready to make it even better.
date: 2025-01-01
image: /images/blog/welcome-back/hero.jpg
---

## Introduction

Welcome to our new blog post! Here's an image:

![Diagram showing the new architecture](/images/blog/welcome-back/architecture.jpg)

More content...
```

### Image Requirements

- **Hero Images**:
  - Must be 1200x630px for optimal social media display
  - Should be relevant to the post content
  - Should include visual elements that work well when scaled down
  - Avoid small text that may be unreadable in thumbnails

- **Content Images**:
  - Provide at 2x intended display size for retina displays
  - Width should not exceed 1600px (will be displayed at 800px)
  - Height: flexible, but maintain reasonable aspect ratios
  - Include meaningful alt text
  - Let Next.js handle optimization and responsive sizing

### Technical Implementation

The blog uses Next.js Image component for all content images. This is handled through a custom markdown renderer that automatically wraps image tags. Benefits include:

- Automatic WebP/AVIF conversion
- Lazy loading
- Blur placeholder generation
- Responsive sizing
- Prevents Cumulative Layout Shift (CLS)
- Optimized loading performance
