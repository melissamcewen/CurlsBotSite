import { CardDescription } from '@/components/ui/Card';
import { getStatusConfig } from '../utils/statusConfig';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { IngredientResult } from 'haircare-ingredients-analyzer';
import Link from 'next/link';

interface IngredientItemProps {
  ingredient: IngredientResult;
}

function normalizeCategory(category: string): string {
  return category.replace(/_/g, ' ');
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
  const { bgClass } = getStatusConfig(ingredient.status);

  return (
    <div className="flex items-start gap-4 p-4 bg-base-300 rounded-lg border border-base-200 hover:border-base-300 transition-colors">
      <div className={`w-1 self-stretch rounded-full ${bgClass}`} />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/ingredients/${ingredient.ingredient?.id || ''}`}
            className="font-medium text-base-content hover:text-primary transition-colors"
          >
            {ingredient.name}
          </Link>

          {ingredient.ingredient ? (
            <div>
              <div className="font-medium text-primary hover:text-primary-focus transition-colors">
                {ingredient.ingredient.name}
              </div>
              {ingredient.ingredient.description && (
                <div className="mt-1">
                  <CardDescription>
                    {ingredient.ingredient.description}
                  </CardDescription>
                </div>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm px-2 py-0.5 badge badge-warning badge-outline">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Not Found
            </span>
          )}

          {ingredient.ingredient?.categories &&
            ingredient.ingredient.categories.length > 0 && (
              <span className="badge badge-sm badge-primary text-sm">
                {normalizeCategory(ingredient.ingredient.categories[0])}
              </span>
            )}
        </div>
        {ingredient.reasons?.length > 0 && (
          <div className="space-y-1">
            {ingredient.reasons.map((reason, index) => (
              <CardDescription key={index}>{reason.reason}</CardDescription>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
