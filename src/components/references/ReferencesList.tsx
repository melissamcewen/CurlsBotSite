'use client';

import { defaultReferences } from '@/data/references';

interface ReferencesListProps {
  references: Array<{ id: string; number: number }>;
}

function formatCitation(
  reference: (typeof defaultReferences)[keyof typeof defaultReferences],
) {
  const parts = [];

  // Author and date
  if (reference.author) {
    parts.push(reference.author);
    if (reference.date) {
      parts.push(` (${reference.date})`);
    }
    parts.push('. ');
  }



  // Title
  if (reference.title) {
    parts.push(reference.title);
    if (!reference.title.endsWith('.')) {
      parts.push('.');
    }
    parts.push(' ');
  }



  // Source
  if (reference.source) {
    parts.push(reference.source);
    if (!reference.source.endsWith('.')) {
      parts.push('.');
    }
  }

  return parts.join('');
}

export function ReferencesList({ references }: ReferencesListProps) {
  if (references.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">References</h2>
      <div className="space-y-4">
        {references.map(({ id, number }) => {
          const reference = defaultReferences[id];
          if (!reference) return null;

          return (
            <div key={id} className="flex gap-2">
              <span className="text-base-content/70 font-medium min-w-[2rem]">
                {number}.
              </span>
              <div>
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-info"
                >
                  {formatCitation(reference)}
                </a>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
