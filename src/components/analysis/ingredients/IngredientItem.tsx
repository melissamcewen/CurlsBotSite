import { CardDescription } from '@/components/ui/Card';
import { getStatusConfig } from '../utils/statusConfig';
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { IngredientResult } from 'haircare-ingredients-analyzer';
import Link from 'next/link';

interface IngredientItemProps {
  ingredient: IngredientResult;
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
  const { bgClass } = getStatusConfig(ingredient.status);

  return (
    <div className="flex items-start gap-4 p-4 bg-base-100 rounded-lg border border-base-200 hover:border-base-300 transition-colors">
      <div className={`w-1 self-stretch rounded-full ${bgClass}`} />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/ingredients/${ingredient.ingredient?.id || ''}`}
            className="font-medium text-base-content hover:text-primary transition-colors"
          >
            {ingredient.name}
          </Link>
          {ingredient.ingredient?.categories && ingredient.ingredient.categories.length > 0 && (
            <span className="badge badge-sm">{ingredient.ingredient.categories[0]}</span>
          )}
          {ingredient.ingredient ? (
            <div>
              <div className="font-medium text-primary hover:text-primary-focus transition-colors">
                {ingredient.ingredient.name}
              </div>
              {ingredient.ingredient.description && (
                <div className="mt-1">
                  <CardDescription>{ingredient.ingredient.description}</CardDescription>
                </div>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-full bg-warning/20 text-warning-content border border-warning/20">
              <ExclamationTriangleIcon className="w-4 h-4" />
              Not Found
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
