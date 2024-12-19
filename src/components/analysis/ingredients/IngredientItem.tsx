import Link from 'next/link';
import { CardDescription } from '@/components/ui/Card';
import { getStatusConfig } from '../utils/statusConfig';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

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
  const { bgClass } = getStatusConfig(ingredient.status);

  return (
    <div className="flex items-start gap-4 p-4 bg-base-100 rounded-lg border border-base-200 hover:border-base-300 transition-colors">
      <div className={`w-1 self-stretch rounded-full ${bgClass}`} />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-base-content">{ingredient.name}</span>
          {ingredient.matched ? (
            <>
              <ArrowRightIcon className="w-4 h-4 text-base-content/50" />
              <Link
                href={`/ingredients/${encodeURIComponent(ingredient.ingredient?.id || '')}`}
                className="font-medium text-primary hover:text-primary-focus transition-colors"
              >
                {ingredient.ingredient?.name}
              </Link>
            </>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-full bg-warning/20 text-warning-content border border-warning/20">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Not Found
            </span>
          )}
        </div>
        {(ingredient.reason || ingredient.info) && (
          <div className="space-y-1">
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
