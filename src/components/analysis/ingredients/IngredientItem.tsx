import { IngredientResult } from 'haircare-ingredients-analyzer';
import { Tag, Info, Folder, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { idToSlug } from '@/utils/slugs';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';

interface IngredientItemProps {
  ingredient: IngredientResult;
}

function normalizeCategory(category: string): string {
  return category.replace(/_/g, ' ');
}

export function IngredientItem({ ingredient }: IngredientItemProps) {
  const database = getBundledDatabase();
  const firstCategory = ingredient.ingredient?.categories[0];
  const categoryInfo = firstCategory
    ? database.categories[firstCategory]
    : null;
  const groupInfo = categoryInfo?.group
    ? database.groups[categoryInfo.group]
    : null;

  return (
    <div className="bg-base-100 rounded-box p-6 space-y-6 cb-border">
      {/* Header with Status */}
      <div className="flex justify-between items-start">
        <h2 className="cb-smaller-header">
          {ingredient.ingredient ? (
            <Link
              href={`/ingredients/${idToSlug(ingredient.ingredient.id)}`}
              className="hover:text-primary link-primary"
            >
              {ingredient.name}
            </Link>
          ) : (
            ingredient.name
          )}
        </h2>
        {ingredient.ingredient ? (
          <div
            className={`badge ${
              ingredient.status === 'warning'
                ? 'badge-error'
                : ingredient.status === 'caution'
                ? 'badge-warning'
                : 'badge-info'
            } cb-badge capitalize`}
          >
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
              <Tag className="w-5 h-5" />
              <span className="cb-grouping-header">Matched Ingredient</span>
            </div>
            <div className="pl-7">
              <Link
                href={`/ingredients/${idToSlug(ingredient.ingredient.id)}`}
                className="font-medium hover:text-primary"
              >
                {ingredient.ingredient.name}
              </Link>
            </div>
          </div>

          {/* Description */}
          {ingredient.ingredient?.description && (
            <div className="space-y-2">
              <div
                className="flex items-center gap-2
          text-base-content/70"
              >
                <Info className="w-5 h-5" />
                <span className="font-semibold">Description</span>
              </div>
              <div className="pl-7 text-sm">
                {ingredient.ingredient.description}
              </div>
            </div>
          )}

          {/* Category and Group */}
          {ingredient.ingredient.categories &&
            ingredient.ingredient.categories.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-base-content/70">
                  <Folder className="w-5 h-5" />
                  <span className="cb-grouping-header">Classification</span>
                </div>
                <div className="pl-7 flex gap-2 items-center">
                  {groupInfo && categoryInfo && (
                    <>
                      <Link
                        href={`/groups/${idToSlug(categoryInfo.group)}`}
                        className="badge badge-secondary"
                      >
                        {groupInfo.name}
                      </Link>
                      <span className="text-base-content/70">→</span>
                    </>
                  )}
                  <Link
                    href={`/categories/${idToSlug(
                      ingredient.ingredient.categories[0],
                    )}`}
                    className="badge badge-primary"
                  >
                    {normalizeCategory(ingredient.ingredient.categories[0])}
                  </Link>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}
