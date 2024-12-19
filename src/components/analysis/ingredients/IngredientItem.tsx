import Link from 'next/link';
import { CardDescription } from '@/components/ui/Card';
import { getStatusConfig } from '../utils/statusConfig';

interface IngredientItemProps {
  ingredient: {
    name: string;
    matched: boolean;
    status: string;
    reason?: string;
    info?: string;
    ingredient?: {
      id: string;
      name: string;
    };
  };
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
  const { color } = getStatusConfig(ingredient.status);

  return (
    <div className={`bg-base-200 rounded-lg shadow-sm border-l-4 border-${color} hover:shadow-md transition-shadow`}>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-base-content">{ingredient.name}</span>
          {ingredient.matched ? (
            <>
              <span className="text-base-content/50">→</span>
              <Link
                href={`/ingredients/${encodeURIComponent(ingredient.ingredient?.id || '')}`}
                className="font-medium text-primary hover:text-primary-focus transition-colors"
              >
                {ingredient.ingredient?.name}
              </Link>
            </>
          ) : (
            <span className="badge badge-sm badge-warning">Not Found</span>
          )}
        </div>
        {(ingredient.reason || ingredient.info) && (
          <div className="mt-2 space-y-1">
            {ingredient.reason && (
              <CardDescription>{ingredient.reason}</CardDescription>
            )}
            {ingredient.info && (
              <p className="text-sm text-info">{ingredient.info}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
