# Product Tracking System

This document explains how to set up and use the product tracking system for GA4 analytics through Google Tag Manager (GTM).

## Overview

The product tracking system automatically captures product interaction data when users click on product links throughout the site. It sends structured data to GA4 via GTM, allowing you to track which products are most popular, which retailers users prefer, and how users interact with your product recommendations.

## What Gets Tracked

Every product link click sends the following data:

- **Product ID**: Unique identifier for the product
- **Product Name**: Full product name (brand + name)
- **Product Brand**: Brand name
- **Product Category**: Product categories (comma-separated)
- **Link Type**: Type of interaction (`buy`, `analyze`, or `sample`)
- **Retailer**: Where the product is sold (Amazon, Curls Monthly, etc.)
- **Event Category**: Always "Product Interaction"
- **Event Label**: Formatted as `{linkType}_{productName}`

## GTM Setup Instructions

### 1. Create Custom Event Trigger

1. Go to **Triggers** → **New** → **Custom Event**
2. **Trigger Name**: `Product Link Click`
3. **Event Name**: `product_link_click`
4. **This trigger fires on**: `All Custom Events`

### 2. Create Built-in Variables

1. Go to **Variables** → **Configure** → **Built-In Variables**
2. Enable these variables:
   - Click Element
   - Click URL
   - Click Classes
   - Click ID
   - Click Target

### 3. Create Custom Variables for Product Data

Create these **Data Layer Variables**:

#### Product ID Variable:

- **Variable Name**: `Product ID`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `product_id`

#### Product Name Variable:

- **Variable Name**: `Product Name`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `product_name`

#### Product Brand Variable:

- **Variable Name**: `Product Brand`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `product_brand`

#### Product Category Variable:

- **Variable Name**: `Product Category`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `product_category`

#### Link Type Variable:

- **Variable Name**: `Link Type`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `link_type`

#### Retailer Variable:

- **Variable Name**: `Retailer`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `retailer`

### 4. Create GA4 Event Tag

1. Go to **Tags** → **New** → **Google Analytics: GA4 Event**
2. **Tag Name**: `GA4 - Product Link Click`
3. **Configuration Tag**: Select your GA4 Configuration tag
4. **Event Name**: `product_link_click`
5. **Event Parameters**:

   - `product_id`: `{{Product ID}}`
   - `product_name`: `{{Product Name}}`
   - `product_brand`: `{{Product Brand}}`
   - `product_category`: `{{Product Category}}`
   - `link_type`: `{{Link Type}}`
   - `retailer`: `{{Retailer}}`
   - `event_category`: `Product Interaction`
   - `event_label`: `{{Link Type}}_{{Product Name}}`

6. **Triggering**: Select `Product Link Click` trigger

### 5. Alternative: CSS Selector Trigger (Backup Method)

If you want to also capture clicks via CSS selectors as a backup:

1. Go to **Triggers** → **New** → **Click - All Elements**
2. **Trigger Name**: `Product Link CSS Click`
3. **This trigger fires on**: `Some Clicks`
4. **Conditions**: `Click Classes` `contains` `product-link`

Then create a second tag that uses this trigger with the same configuration as above.

### 6. Test Your Setup

1. **Preview Mode**: Enable GTM Preview mode
2. **Test on your site**: Click on product links
3. **Check GTM**: Verify the `product_link_click` event fires with correct data
4. **Check GA4**: Go to GA4 → Events → Real-time to see events coming in

## How to Use in Future Components

### For Components with Real Product Objects

If your component has access to a real `Product` object from the `haircare-ingredients-analyzer` library:

```tsx
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';
import type { Product } from 'haircare-ingredients-analyzer';

// In your component
<a
  href={buyLink.url}
  target="_blank"
  rel="noopener noreferrer"
  ref={(el) => {
    if (el) {
      addProductTrackingAttributes(el, product, 'buy', buyLink.retailer);
    }
  }}
  onClick={() => trackProductInteraction(product, 'buy', buyLink.retailer)}
>
  Buy on {buyLink.retailer || 'Amazon'}
</a>;
```

### For Components with Mock Product Data

If your component doesn't have access to a real `Product` object, create a mock one:

```tsx
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

// In your component
<a
  href={productUrl}
  target="_blank"
  rel="noopener noreferrer"
  ref={(el) => {
    if (el) {
      // Create a mock product object for tracking
      const mockProduct = {
        id: productName.toLowerCase().replace(/\s+/g, '-'),
        name: productName,
        brand: brandName || '',
        product_categories: [],
        buy_links: [{ url: productUrl, retailer: retailerName }],
      };
      addProductTrackingAttributes(el, mockProduct, 'buy', retailerName);
    }
  }}
  onClick={() => {
    // Create a mock product object for tracking
    const mockProduct = {
      id: productName.toLowerCase().replace(/\s+/g, '-'),
      name: productName,
      brand: brandName || '',
      product_categories: [],
      buy_links: [{ url: productUrl, retailer: retailerName }],
    };
    trackProductInteraction(mockProduct, 'buy', retailerName);
  }}
>
  Buy on {retailerName || 'Amazon'}
</a>;
```

### Link Types

Use these link types based on the interaction:

- `'buy'` - For product purchase links (Amazon, brand websites, etc.)
- `'analyze'` - For ingredient analyzer links
- `'sample'` - For sample/trial links (Curls Monthly, etc.)

### Common Retailers

Use these retailer names for consistency:

- `'Amazon'` - Amazon links
- `'Curls Monthly'` - Curls Monthly sample links
- `undefined` - For direct brand website links

## Components Already Implemented

The following components already have product tracking implemented:

### Main Product Components

- `LocalizedProductLink` - handles localized product links
- `ProductCard` - product cards in routine builder
- `ProductListicle` - product listings in best products pages
- `ProductsPage` - main products table
- `HairRoutine` - routine builder product links

### MDX Components

- `AbbeyYungTable` - Abbey Yung method product table
- `BlogProduct` - blog product cards
- `BlogProductCard` - blog product cards (alternative)
- `ProductsTable` - products table in MDX
- `CompactBlogProductList` - compact product lists in blogs
- `ProductStepCard` - product step cards

## Data Structure

### Product Object (from haircare-ingredients-analyzer)

```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  product_categories: string[];
  buy_links: BuyLink[];
  // ... other properties
}

interface BuyLink {
  url: string;
  retailer?: string;
  countries?: string[];
}
```

### Mock Product Object (for components without real Product objects)

```typescript
interface MockProduct {
  id: string;
  name: string;
  brand: string;
  product_categories: string[];
  buy_links: { url: string; retailer?: string }[];
}
```

## Troubleshooting

### Events Not Firing

1. Check browser console for JavaScript errors
2. Verify GTM is loaded: `window.dataLayer` should exist
3. Use GTM Preview mode to debug
4. Check that the `product_link_click` event is being pushed to dataLayer

### Missing Data

1. Ensure all required data layer variables are created in GTM
2. Check that the GA4 event tag is configured with all parameters
3. Verify the trigger is set up correctly

### Testing

1. Use GTM Preview mode to see real-time data
2. Check GA4 Real-time reports
3. Use browser dev tools to inspect dataLayer pushes

## Analytics Use Cases

With this tracking system, you can:

1. **Track Product Performance**: See which products get the most clicks
2. **Retailer Analysis**: Understand which retailers users prefer
3. **Content Performance**: See which blog posts drive the most product interest
4. **User Journey**: Track how users interact with products across different pages
5. **Conversion Funnel**: Analyze the path from content to product clicks

## Maintenance

### Adding New Components

1. Import the tracking utilities
2. Add `ref` and `onClick` handlers to product links
3. Use appropriate link type (`buy`, `analyze`, `sample`)
4. Test in GTM Preview mode

### Updating Existing Components

1. Follow the same pattern as existing implementations
2. Ensure consistent retailer naming
3. Test thoroughly before deploying

### Monitoring

1. Regularly check GA4 reports for data quality
2. Monitor GTM container for errors
3. Update documentation when adding new link types or retailers
