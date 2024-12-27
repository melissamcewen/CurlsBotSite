import {
  TagIcon,
  InformationCircleIcon,
  FolderIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { idToSlug } from '@/utils/slugs';

interface IngredientDetailsCardProps {
  name: string;
  description?: string;
  categories: string[];
  synonyms?: string[];
  categoryNames: Record<string, { name: string }>;
}

export function IngredientDetailsCard({
  name,
  description,
  categories,
  synonyms,
  categoryNames,
}: IngredientDetailsCardProps) {
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
            <InformationCircleIcon className="w-5 h-5" />
            <span className="cb-grouping-header">Description</span>
          </div>
          <div className="pl-7">{description}</div>
        </div>
      )}

      {/* Synonyms */}
      {synonyms && synonyms.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <TagIcon className="w-5 h-5" />
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

      {/* Categories */}
      {categories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-base-content/70">
            <FolderIcon className="w-5 h-5" />
            <span className="cb-grouping-header">Categories</span>
          </div>
          <div className="pl-7 flex flex-wrap gap-2">
            {categories.map((categoryId) => {
              const category = categoryNames[categoryId];
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
