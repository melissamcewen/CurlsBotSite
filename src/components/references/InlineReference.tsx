'use client';

import { Info } from 'lucide-react';
import { addReference } from './AutoReferencesList';
import { defaultReferences } from '@/data/references';

interface InlineReferenceProps {
  id: string;
}

export function InlineReference({ id }: InlineReferenceProps) {
  const reference = defaultReferences[id];
  const number = addReference(id);

  if (!reference) {
    return null;
  }

  return (
    <sup>
      <a
        href={reference.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-info hover:text-info-content inline-flex items-center"
        title={reference.title || 'Reference'}
      >
        <Info className="w-3 h-3" />[{number}]
      </a>
    </sup>
  );
}
