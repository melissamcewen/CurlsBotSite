# BlogProductEnhanced Usage Examples

## Basic Usage (Backward Compatible)
The new component works exactly like the old one for existing usage:

```jsx
<BlogProductEnhanced
  name="Amika The Kure Strength Repair Conditioner"
  subtitle="A conditioner formulated for adding strength to damaged hair"
  image="/images/blog/the-abbey-yung-method/amika-conditioner.png"
  buyLink="https://loveamika.com/products/the-kure-strength-repair-conditioner"
  buyText="Buy at Amika"
  amazonLink="https://amzn.to/4fraofq"
/>
```

## Enhanced Usage with Multiple Links
Now you can add multiple links with custom text and icons:

```jsx
<BlogProductEnhanced
  name="Amika The Kure Strength Repair Conditioner"
  subtitle="A conditioner formulated for adding strength to damaged hair"
  image="/images/blog/the-abbey-yung-method/amika-conditioner.png"
  ingredients="Water, Cetearyl Alcohol, Behentrimonium Chloride..."
  links={[
    {
      url: "https://loveamika.com/products/the-kure-strength-repair-conditioner",
      text: "Buy at Amika",
      retailer: "Amika",
      icon: "shopping-cart"
    },
    {
      url: "https://amzn.to/4fraofq",
      text: "Buy on Amazon",
      retailer: "Amazon",
      icon: "shopping-cart"
    },
    {
      url: "https://www.sephora.com/product/amika-kure-strength-repair-conditioner",
      text: "Buy at Sephora",
      retailer: "Sephora",
      icon: "external-link"
    },
    {
      url: "https://www.ulta.com/p/amika-kure-strength-repair-conditioner",
      text: "Buy at Ulta",
      retailer: "Ulta",
      icon: "search"
    }
  ]}
/>
```

## Mixed Usage (Legacy + Enhanced)
You can mix legacy props with new links:

```jsx
<BlogProductEnhanced
  name="K18 Molecular Repair Hair Mask"
  subtitle="A bond repair hair mask formulated for repairing damaged hair"
  image="/images/blog/the-abbey-yung-method/k18.png"
  ingredients="Water, Cetearyl Alcohol, Behentrimonium Chloride..."
  // Legacy props
  amazonLink="https://amzn.to/4lqESzv"
  buyText="Buy at K18"
  buyLink="https://www.k18hair.com/products/leave-in-molecular-repair-hair-mask-50-ml"
  // Additional links
  links={[
    {
      url: "https://www.sephora.com/product/k18-molecular-repair-hair-mask",
      text: "Buy at Sephora",
      retailer: "Sephora",
      icon: "external-link"
    }
  ]}
/>
```

## Available Icons
- `shopping-cart` - Shopping cart icon (default)
- `external-link` - External link icon
- `search` - Search icon

## Migration Strategy
1. Use `BlogProductEnhanced` for new blog posts that need multiple links
2. Gradually migrate existing `BlogProduct` usage to `BlogProductEnhanced` when you need to add more links
3. The old `BlogProduct` component remains unchanged and fully functional
4. Both components can coexist in the same blog post
