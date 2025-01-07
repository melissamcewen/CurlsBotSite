import { Tag, Info, Folder, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { idToSlug } from '@/utils/slugs';
import { type Category, type Group } from 'haircare-ingredients-analyzer';

interface IngredientDetailsCardProps {
  name: string;
  description?: string;
  categories: string[];
  synonyms?: string[];
  categoryNames: Record<string, Category>;
  groupNames: Record<string, Group>;
}

export function IngredientDetailsCard({
  name,
  description,
  categories,
  synonyms,
  categoryNames,
  groupNames,
}: IngredientDetailsCardProps) {
  // Get the group from the first category that exists in categoryNames
  const firstCategory = categories.find((cat) => categoryNames[cat]);
  const group = firstCategory ? categoryNames[firstCategory]?.group : undefined;
  const groupInfo = group ? groupNames[group] : undefined;

  // Filter out categories that don't exist in categoryNames
  const validCategories = categories.filter((cat) => categoryNames[cat]);

  return (
    <div className="bg-base-100 rounded-box p-6 space-y-6 cb-border">
      {/* Name */}
      <div className="flex justify-between items-start">
        <h2 className="cb-smaller-header">{name}</h2>
      </div>

      {/* Description */}
      {description && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <Info className="w-5 h-5" />
            <span className="cb-grouping-header">Description</span>
          </div>
          <div className="pl-7">{description}</div>
        </div>
      )}

      {/* Synonyms */}
      {synonyms && synonyms.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <Tag className="w-5 h-5" />
            <span className="cb-grouping-header">Also Known As</span>
          </div>
          <div className="pl-7 flex flex-wrap gap-2">
            {synonyms.map((synonym) => (
              <span key={synonym} className="badge badge-ghost">
                {synonym}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Group */}
      {groupInfo && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <LayoutGrid className="w-5 h-5" />
            <span className="cb-grouping-header">Group</span>
          </div>
          <div className="pl-7">
            <Link
              href={group ? `/groups/${idToSlug(group)}` : '#'}
              className="badge badge-secondary"
            >
              {groupInfo.name}
            </Link>
          </div>
        </div>
      )}

      {/* Categories */}
      {validCategories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <Folder className="w-5 h-5" />
            <span className="cb-grouping-header">Categories</span>
          </div>
          <div className="pl-7 flex flex-wrap gap-2">
            {validCategories.map((categoryId) => {
              const category = categoryNames[categoryId];
              if (!category) return null;
              return (
                <Link
                  key={categoryId}
                  href={`/categories/${idToSlug(categoryId)}`}
                  className="badge badge-primary"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
