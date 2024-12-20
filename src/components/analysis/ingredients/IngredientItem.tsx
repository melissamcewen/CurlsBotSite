import { IngredientResult } from 'haircare-ingredients-analyzer';
import { TagIcon, InformationCircleIcon, FolderIcon } from '@heroicons/react/24/solid';

interface IngredientItemProps {
  ingredient: IngredientResult;
}

function normalizeCategory(category: string): string {
  return category.replace(/_/g, ' ');
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
  return (
    <div className="bg-base-100 rounded-box p-6 space-y-6">
      {/* Header with Status */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{ingredient.name}</h2>
        <div className={`badge ${
          ingredient.status === 'warning'
            ? 'badge-error'
            : ingredient.status === 'caution'
            ? 'badge-warning'
            : 'badge-info'
        } badge-lg capitalize`}>
          {ingredient.status}
        </div>
      </div>

      {/* Matched Ingredient */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-base-content/70">
          <TagIcon className="w-5 h-5" />
          <span className="font-semibold">Matched Ingredient</span>
        </div>
        <div className="pl-7">
          {ingredient.ingredient ? (
            <span className="font-medium">
              {ingredient.ingredient.name}
            </span>
          ) : (
            <span className="text-warning">Unknown {ingredient.name}</span>
          )}
        </div>
      </div>

      {/* Category */}
      {ingredient.ingredient?.categories && ingredient.ingredient.categories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <FolderIcon className="w-5 h-5" />
            <span className="font-semibold">Category</span>
          </div>
          <div className="pl-7">
            {normalizeCategory(ingredient.ingredient.categories[0])}
          </div>
        </div>
      )}

      {/* Description */}
      {ingredient.ingredient?.description && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <InformationCircleIcon className="w-5 h-5" />
            <span className="font-semibold">Description</span>
          </div>
          <div className="pl-7">
            {ingredient.ingredient.description}
          </div>
        </div>
      )}

      {/* Reasons */}
      {ingredient.reasons?.length > 0 && (
        <div className="pt-4">
          {ingredient.reasons.map((reason, index) => (
            <p key={index} className="text-sm mt-2">
              {reason.reason}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
