import { ReactNode } from 'react';

interface IngredientAlertProps {
  type: 'warning' | 'info';
  children: ReactNode;
}

export function IngredientAlert({ type, children }: IngredientAlertProps) {
  return (
    <div className={`flex gap-2 p-4 rounded-lg ${type === 'warning' ? 'bg-warning/10' : 'bg-info/10'} text-sm`}>
      {type === 'warning' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-warning shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )}
      <span className="text-base-content">{children}</span>
    </div>
  );
}
