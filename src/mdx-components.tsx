/// do not use 'use client';

import type { MDXComponents } from 'mdx/types';
import { InlineReference } from '@/components/references/InlineReference';
import { AutoReferencesList } from '@/components/references/AutoReferencesList';
import { BlogImage, DualImage } from '@/components/mdx/BlogImage';
import { BlogProduct } from '@/components/mdx/BlogProduct';
import { Affiliate } from '@/components/mdx/Affiliate';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { SiteFixBanner } from '@/components/mdx/SiteFixBanner';
import { AuthorBio } from '@/components/mdx/AuthorBio';
import RoutineTable from '@/components/mdx/RoutineTable';
import ProductComparisonTable from '@/components/mdx/ProductComparisonTable';
import NewsletterSignup from '@/components/mdx/NewsletterSignup';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    InlineReference,
    AutoReferencesList,
    BlogImage,
    DualImage,
    BlogProduct,
    Affiliate,
    TableOfContents,
    SiteFixBanner,
    AuthorBio,
    RoutineTable,
    ProductComparisonTable,
    NewsletterSignup,
    ...components,
  };
}
