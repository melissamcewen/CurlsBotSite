# Going Live Checklist

## Search Engine Indexing

When you're ready to make the site public and indexed by search engines, you'll need to update two files:

### 1. Update Root Layout (`src/app/layout.tsx`)

Change the robots metadata to allow indexing:

```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
},
```

### 2. Update Robots File (`src/app/robots.ts`)

Replace the current content with:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://curlsbot.com/sitemap.xml',
  };
}
```

### 3. Remove Draft Banner

Delete or comment out the draft banner import and usage in `src/app/layout.tsx`:

```typescript
// Remove this import
import { DraftBanner } from '@/components/layout/DraftBanner';

// Remove this line from the JSX
<DraftBanner />
```

You can also delete the file `src/components/layout/DraftBanner.tsx` if you won't need it again.

## Additional Going Live Considerations

1. **Environment Variables**:
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain
   - Verify all other environment variables are set correctly

2. **Analytics**:
   - Ensure Google Analytics is configured for the production domain
   - Verify tracking is working correctly

3. **Social Media**:
   - Test all OpenGraph images and metadata
   - Verify social sharing works as expected

4. **Performance**:
   - Run Lighthouse tests
   - Check Core Web Vitals
   - Verify all images are optimized

5. **Security**:
   - Ensure all API keys and secrets are properly secured
   - Verify SSL/TLS is properly configured

6. **Backup**:
   - Create a backup of the development/draft version
   - Consider tagging the draft version in git
