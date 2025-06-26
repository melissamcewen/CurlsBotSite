import { IngredientResult } from 'haircare-ingredients-analyzer';
import { Star, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Props {
  ingredients: IngredientResult[];
}

interface GroupedFindings {
  [key: string]: {
    name: string;
    reason: string;
    status: 'warning' | 'caution' | 'ok';
    ingredients: IngredientResult[];
    guide?: string;
  };
}

// Mapping of setting IDs to their guide URLs
const SETTING_GUIDES: Record<string, string> = {
  sulfate_free: '/categories/sulfates',
  paraben_caution: '/categories/parabens',
  drying_alcohol: '/groups/alcohols',
  mild_surfactants_only: '/groups/surfactants',
  mild_surfactants_caution_others: '/groups/surfactants',
  no_water_insoluble_silicones: '/groups/silicones',
  caution_silicones: '/groups/silicones',
  no_waxes: '/groups/waxes',
  soap_free: '/categories/soaps',
  no_petroleum: '/categories/petroleum-oils',
};

export function AnalysisFindings({ ingredients }: Props) {
  const hasFindings = ingredients.some(
    (i) => i.status === 'caution' || i.status === 'warning',
  );

  // Group ingredients by their status reason setting
  const groupedFindings = ingredients
    .filter((i) => i.status === 'caution' || i.status === 'warning')
    .reduce((acc: GroupedFindings, ingredient) => {
      const reason = ingredient.reasons[0];
      if (!reason) return acc;

      if (!acc[reason.setting]) {
        acc[reason.setting] = {
          name: reason.name,
          reason: reason.reason,
          status: ingredient.status,
          ingredients: [],
          guide: SETTING_GUIDES[reason.setting],
        };
      }
      acc[reason.setting].ingredients.push(ingredient);
      return acc;
    }, {});

  if (!hasFindings) return null;

  return (
    <div>
      <div>
        <h2 className="cb-header">
          <Star className="cb-header-icon" aria-hidden="true" />
          Highlights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.entries(groupedFindings).map(([setting, group]) => (
            <div key={setting} className="card card-border bg-base-100 h-full">
              <div className="card-body flex flex-col h-full">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="card-title">{group.name}</h2>
                  <span
                    className={`cb-badge capitalize ${
                      group.status === 'warning'
                        ? 'text-error border-error'
                        : 'text-warning border-warning'
                    }`}
                  >
                    {group.status}
                  </span>
                </div>
                <span className="text-sm text-base-content/70">
                  {group.reason}
                </span>

                <div className="flex-1">
                  <div className="space-y-4 mt-4">
                    {group.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className={`border-l-4 pl-4 ${
                          group.status === 'warning'
                            ? 'border-error'
                            : 'border-warning'
                        }`}
                      >
                        <div className="font-medium">{ingredient.name}</div>
                        {ingredient.ingredient &&
                          ingredient.name !== ingredient.ingredient.name && (
                            <div className="text-base-content/70 text-sm">
                              matched {ingredient.ingredient.name}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>

                {group.guide && (
                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                    <Link
                      href={group.guide}
                      className="btn btn-sm btn-secondary btn-outline gap-2 w-full"
                    >
                      <BookOpen className="w-4 h-4" />
                      Learn More
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
