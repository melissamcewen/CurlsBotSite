'use client';

import { useEffect } from 'react';
import { ReferencesList } from './ReferencesList';

// Track references at module level
let usedReferences: string[] = [];

// Add a reference and get its number
export function addReference(id: string): number {
  if (!usedReferences.includes(id)) {
    usedReferences.push(id);
  }
  return usedReferences.indexOf(id) + 1;
}

// Component to display the references
export function AutoReferencesList() {
  // Reset references when component mounts
  useEffect(() => {
    usedReferences = [];
  }, []);

  if (usedReferences.length === 0) return null;

  const references = usedReferences.map((id, index) => ({
    id,
    number: index + 1,
  }));

  return <ReferencesList references={references} />;
}
