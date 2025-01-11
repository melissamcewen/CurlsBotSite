

import type { MDXComponents } from 'mdx/types';
import { InlineReference } from '@/components/references/InlineReference';
import { ReferencesList } from '@/components/references/ReferencesList';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    InlineReference,
    ReferencesList,
    ...components,
  };
}
