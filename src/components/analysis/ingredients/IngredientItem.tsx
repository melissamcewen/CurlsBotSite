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
    <div className="bg-base-100 rounded-box p-6 space-y-6 cb-border">
      {/* Header with Status */}
      <div className="flex justify-between items-start">
        <h2 className="cb-smaller-header">{ingredient.name}</h2>
        {ingredient.ingredient ? (
          <div className={`badge ${
            ingredient.status === 'warning'
              ? 'badge-error'
              : ingredient.status === 'caution'
              ? 'badge-warning'
              : 'badge-info'
          } cb-badge capitalize`}>
            {ingredient.status}
          </div>
        ) : (
          <div className="badge badge-ghost cb-badge">Unknown</div>
        )}
      </div>

      {/* Only show matched ingredient and category sections if there's a match */}
      {ingredient.ingredient && (
        <>
          {/* Matched Ingredient */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base-content/70">
              <TagIcon className="w-5 h-5" />
              <span className="cb-grouping-header">Matched Ingredient</span>
            </div>
            <div className="pl-7">
              <span className="font-medium">
                {ingredient.ingredient.name}
              </span>
            </div>
          </div>

          {/* Category */}
          {ingredient.ingredient.categories && ingredient.ingredient.categories.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base-content/70">
                <FolderIcon className="w-5 h-5" />
                <span className="cb-grouping-header">Category</span>
              </div>
              <div className="pl-7">
                {normalizeCategory(ingredient.ingredient.categories[0])}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
