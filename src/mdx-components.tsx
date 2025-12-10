/// do not use 'use client';

import type { MDXComponents } from 'mdx/types';
import { InlineReference } from '@/components/references/InlineReference';
import { AutoReferencesList } from '@/components/references/AutoReferencesList';
import {
  BlogImage,
  DualImage,
  FlowchartImage,
} from '@/components/mdx/BlogImage';
import { BlogProduct } from '@/components/mdx/BlogProduct';
import { BlogProductEnhanced } from '@/components/mdx/BlogProductEnhanced';
import { BlogProductCard } from '@/components/mdx/BlogProductCard';
import { BlogProductCardEnhanced } from '@/components/mdx/BlogProductCardEnhanced';
import { CompactBlogProductList } from '@/components/mdx/CompactBlogProductList';
import { BlogProductGrid } from '@/components/mdx/BlogProductGrid';
import { Affiliate } from '@/components/mdx/Affiliate';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { SiteFixBanner } from '@/components/mdx/SiteFixBanner';
import { HairTypeQuizBanner } from '@/components/mdx/HairTypeQuizBanner';
import { AuthorBio } from '@/components/mdx/AuthorBio';
import RoutineTable from '@/components/mdx/RoutineTable';
import ProductComparisonTable from '@/components/mdx/ProductComparisonTable';
import NewsletterSignup from '@/components/mdx/NewsletterSignup';
import AbbeyYungMethodTable from '@/components/mdx/AbbeyYungMethodTable';
import AbbeyYungTable from '@/components/mdx/AbbeyYungTable';
import BondProductsTable from '@/components/mdx/BondProductsTable';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    InlineReference,
    AutoReferencesList,
    BlogImage,
    DualImage,
    FlowchartImage,
    BlogProduct,
    BlogProductEnhanced,
    BlogProductCard,
    BlogProductCardEnhanced,
    CompactBlogProductList,
    BlogProductGrid,
    Affiliate,
    TableOfContents,
    SiteFixBanner,
    HairTypeQuizBanner,
    AuthorBio,
    RoutineTable,
    ProductComparisonTable,
    NewsletterSignup,
    AbbeyYungMethodTable,
    AbbeyYungTable,
    BondProductsTable,
    ...components,
  };
}
