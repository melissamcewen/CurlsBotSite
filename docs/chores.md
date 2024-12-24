# Chores and Maintenance Tasks

## Impact Verification Tag Removal

Once Impact verification is complete, remove the verification tag from two locations in `src/app/layout.tsx`:

1. Remove from metadata configuration:
```typescript
verification: {
  google: 'google-site-verification-code',
  other: {
    'impact-site-verification': '1ade1083-f729-416f-9c92-6d0b179d94e3'
  }
},
```

2. Remove from head section:
```html
<meta name="impact-site-verification" value="1ade1083-f729-416f-9c92-6d0b179d94e3" />
```

After removing these, deploy the changes to remove the verification tag from the live site.
