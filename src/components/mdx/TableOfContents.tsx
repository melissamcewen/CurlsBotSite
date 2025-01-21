'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    console.log('TableOfContents mounted');
    // Add small delay to let MDX content render
    const timer = setTimeout(() => {
      // Look for h2s only within .prose
      const contentArea = document.querySelector('.prose');
      if (!contentArea) {
        console.log('No content area found');
        return;
      }

      const headings = Array.from(
        contentArea.querySelectorAll('h2:not(.text-lg)'),
      );
      console.log('Found headings:', headings);

      // First pass: generate and set IDs for headings that don't have them
      headings.forEach((heading) => {
        if (!heading.id) {
          const text = heading.textContent || '';
          heading.id = slugify(text);
        }
      });

      const mappedHeadings = headings.map((heading) => {
        console.log('Processing heading:', {
          id: heading.id,
          text: heading.textContent,
        });
        return {
          id: heading.id,
          text: heading.textContent || '',
        };
      });

      const filteredHeadings = mappedHeadings.filter(
        (heading) => heading.text.trim() !== '',
      );
      console.log('Final TOC items:', filteredHeadings);

      setToc(filteredHeadings);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  console.log('Rendering with toc:', toc);

  if (toc.length === 0) {
    console.log('No TOC items found, returning null');
    return null;
  }

  return (
    <div className="card bg-base-100 p-4">
      <div className="flex items-center gap-2 mb-2">
        <List className="w-5 h-5" />
        <h2 className="text-lg font-bold">Table of Contents</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {toc.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className="hover:text-primary transition-colors"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
