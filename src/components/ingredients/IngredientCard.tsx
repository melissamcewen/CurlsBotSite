import { ReactNode } from 'react';

interface IngredientCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  warning?: boolean;
}

export function IngredientCard({ title, icon, children, warning }: IngredientCardProps) {
  return (
    <div className="bg-base-100 rounded-box p-6 space-y-6 cb-border">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="cb-smaller-header">{title}</h2>
        </div>
        {warning && (
          <div className="badge badge-warning cb-badge">
            Caution
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
