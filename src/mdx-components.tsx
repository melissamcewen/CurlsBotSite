//'use client';

import type { MDXComponents } from 'mdx/types';
import { MdxImage } from '@/components/mdx/MdxImage';
import { AutoReferencesList } from '@/components/references/AutoReferencesList';
import { InlineReference } from '@/components/references/InlineReference';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: MdxImage,
    InlineReference: InlineReference,
    AutoReferencesList: AutoReferencesList,
    ...components,
  };
}
