'use client';

import { useEffect, useState } from 'react';
import { ReferencesList } from './ReferencesList';

// Global array to track used reference IDs in order
let usedReferences: string[] = [];
let referenceMap = new Map<string, number>();

// Function to add a reference ID and get its display number
export function addReference(id: string): number {
  if (!referenceMap.has(id)) {
    usedReferences.push(id);
    referenceMap.set(id, usedReferences.length);
  }
  return referenceMap.get(id) || 0;
}

// Function to get a reference's display number
export function getReferenceNumber(id: string): number {
  return referenceMap.get(id) || 0;
}

// Component to display the references
export function AutoReferencesList() {
  const [references, setReferences] = useState<
    Array<{ id: string; number: number }>
  >([]);

  useEffect(() => {
    // Convert the array to reference objects with display numbers
    setReferences(
      usedReferences.map((id, index) => ({
        id,
        number: index + 1,
      })),
    );
  }, []); // Empty dependency array means this runs once on mount

  if (references.length === 0) return null;

  return <ReferencesList references={references} />;
}
