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

## Vercel Deployment Configuration

1. **Domain Setup**:
   - Go to your project in the Vercel dashboard
   - Navigate to "Settings" → "Domains"
   - Add your custom domain if not already added
   - Verify DNS configuration is correct
   - Ensure SSL/TLS is properly configured (Vercel handles this automatically)

2. **Environment Variables**:
   - Go to "Settings" → "Environment Variables"
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain
   - Ensure all environment variables are set for Production environment
   - Consider setting different values for Preview deployments

3. **Deployment Protection**:
   - Go to "Settings" → "Security"
   - Consider enabling "Vercel Authentication" if you want to password-protect preview deployments
   - Configure "Deployment Protection" settings as needed

4. **Analytics and Monitoring**:
   - Enable "Analytics" tab in your Vercel project
   - Set up "Speed Insights" for performance monitoring
   - Configure "Web Analytics" if you want to use Vercel's analytics

5. **Build Settings**:
   - Verify build settings in "Settings" → "General"
   - Check that the correct Node.js version is selected
   - Verify build command and output directory are correct

6. **Preview Deployments**:
   - Decide if you want to keep preview deployments enabled
   - Configure "Git" settings for preview deployment behavior
   - Set up any required preview environment variables

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
   - Check Core Web Vitals in Vercel Analytics
   - Verify all images are optimized
   - Review Vercel Speed Insights after deployment

5. **Security**:
   - Ensure all API keys and secrets are properly secured
   - Verify SSL/TLS is properly configured
   - Review Vercel deployment logs for any security warnings

6. **Backup**:
   - Create a backup of the development/draft version
   - Consider tagging the draft version in git
   - Vercel keeps deployment history, but consider downloading a backup

7. **Post-Deployment Checks**:
   - Verify production deployment in Vercel dashboard
   - Check deployment status and build logs
   - Test the live site thoroughly
   - Monitor error reporting in Vercel dashboard
