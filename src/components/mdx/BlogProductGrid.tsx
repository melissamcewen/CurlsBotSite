import { ReactNode } from 'react';

interface BlogProductGridProps {
  children: ReactNode;
  title?: string;
  columns?: 2 | 3 | 4;
}

export function BlogProductGrid({
  children,
  title,
  columns = 3,
}: BlogProductGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div className="not-prose mb-6">
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-base-content">
          {title}
        </h3>
      )}
      <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]}`}>
        {children}
      </div>
    </div>
  );
}
