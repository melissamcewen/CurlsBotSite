/// do not use 'use client';

import type { MDXComponents } from 'mdx/types';
import { InlineReference } from '@/components/references/InlineReference';
import { AutoReferencesList } from '@/components/references/AutoReferencesList';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    InlineReference,
    AutoReferencesList,
    ...components,
  };
}
