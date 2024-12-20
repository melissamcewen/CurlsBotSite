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
    <div className="flex flex-col gap-6 bg-base-200 rounded-box p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold ">{ingredient.name}</h4>


        {ingredient.ingredient?.categories && ingredient.ingredient.categories.length > 0 ? (
          <span className="badge badge-primary badge-lg">
            {normalizeCategory(ingredient.ingredient.categories[0])}
          </span>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        {ingredient.ingredient ? (
          <>
            <h3 className="font-bold text-lg text-primary">
              {ingredient.ingredient.name}
            </h3>
            {ingredient.ingredient.description && (
              <CardDescription>
                {ingredient.ingredient.description}
              </CardDescription>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-warning" />
            <span className="text-warning">Ingredient Not Found</span>
          </div>
        )}

        {ingredient.reasons?.length > 0 && (
          <div className="mt-2 space-y-1">
            {ingredient.reasons.map((reason, index) => (
              <CardDescription key={index} className="text-sm">
                {reason.reason}
              </CardDescription>
            ))}
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className={`h-1 rounded-full ${bgClass} mt-auto`} />
    </div>
  );
}
