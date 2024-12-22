import { ReactNode } from 'react';

interface IngredientExampleProps {
  children: ReactNode;
}

export function IngredientExample({ children }: IngredientExampleProps) {
  return (
    <li className="flex items-center gap-2">
      <svg
        className="w-4 h-4 text-success flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <code className="bg-base-200 px-1.5 py-0.5 rounded text-sm font-medium">{children}</code>
    </li>
  );
}
