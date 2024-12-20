import { IngredientResult } from 'haircare-ingredients-analyzer';
import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  DocumentChartBarIcon,
  StarIcon
} from '@heroicons/react/24/solid';
import { capitalizeFirstLetter } from '@/utils/text';

interface Props {
  ingredients: IngredientResult[];
}

interface GroupedFindings {
  [key: string]: {
    name: string;
    reason: string;
    status: 'warning' | 'caution' | 'ok';
    ingredients: IngredientResult[];
  }
}

export function AnalysisFindings({ ingredients }: Props) {
  const hasFindings = ingredients.some(
    (i) => i.status === 'caution' || i.status === 'warning',
  );

  // Calculate summary stats
  const totalIngredients = ingredients.length;
  const knownIngredients = ingredients.filter(i => i.ingredient).length;
  const unknownIngredients = totalIngredients - knownIngredients;
  const cautionIngredients = ingredients.filter(i => i.status === 'caution').length;
  const warningIngredients = ingredients.filter(i => i.status === 'warning').length;

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
          ingredients: []
        };
      }
      acc[reason.setting].ingredients.push(ingredient);
      return acc;
    }, {});

  return (
    <div className="space-y-6">
      {/* Summary Stats Card */}
      <div className=" bg-base-100">
        <div className="">
          <h2 className="cb-header ">
            <DocumentChartBarIcon className="cb-header-icon" />
            Analysis Summary
          </h2>
          <div className="stats stats-vertical lg:stats-horizontal cb-border w-full">
            <div className="stat min-w-[200px]">
              <div className="stat-title">Total</div>
              <div className="stat-value">{totalIngredients}</div>
              <div className="stat-desc">Ingredients</div>
            </div>

            <div className="stat hidden xl:flex min-w-[200px]">
              <div className="flex-1">
                <div className="stat-title">Known</div>
                <div className="stat-value text-info">{knownIngredients}</div>
                <div className="stat-desc">In database</div>
              </div>
              <div className="stat-figure flex items-center justify-center text-info">
                <CheckCircleIcon className="w-8 h-8" />
              </div>
            </div>

            <div className="stat hidden xl:flex min-w-[200px]">
              <div className="flex-1">
                <div className="stat-title">Unknown</div>
                <div className="stat-value">{unknownIngredients}</div>
                <div className="stat-desc">Not found</div>
              </div>
              <div className="stat-figure flex items-center justify-center text-base-content">
                <QuestionMarkCircleIcon className="w-8 h-8" />
              </div>
            </div>

            <div className="stat min-w-[200px]">
              <div className="flex-1">
                <div className="stat-title">Caution</div>
                <div className="stat-value text-warning">
                  {cautionIngredients}
                </div>
                <div className="stat-desc">May be problematic</div>
              </div>
              <div className="stat-figure flex items-center justify-center text-warning">
                <ExclamationTriangleIcon className="w-8 h-8" />
              </div>
            </div>

            <div className="stat min-w-[200px]">
              <div className="flex-1">
                <div className="stat-title">Warning</div>
                <div className="stat-value text-error">
                  {warningIngredients}
                </div>
                <div className="stat-desc">Potentially harmful</div>
              </div>
              <div className="stat-figure flex items-center justify-center text-error">
                <XCircleIcon className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Section */}
      {hasFindings && (
        <div className="">
          <div className="">
            <h2 className="cb-header ">
              <StarIcon className="cb-header-icon" aria-hidden="true" />
              Highlights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {Object.entries(groupedFindings).map(([setting, group]) => (
                <div key={setting} className={`card bg-base-100 cb-border`}>
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3
                          className={`cb-smaller-header ${
                            group.status === 'warning'
                              ? 'text-error'
                              : 'text-warning'
                          }`}
                        >
                          {group.status === 'warning' ? (
                            <XCircleIcon className="cb-smaller-header-icon" />
                          ) : (
                            <ExclamationTriangleIcon className="cb-smaller-header-icon" />
                          )}
                          {capitalizeFirstLetter(group.status)}: {group.name}
                        </h3>
                        <p className="text-sm text-base-content">
                          {group.reason}
                        </p>
                      </div>
                    </div>

                    <div className="stats stats-vertical">
                      {group.ingredients.map((ingredient, index) => (
                        <div key={index} className={`stat p-4`}>
                          <div className="text-center ">
                            <div className="cb-bold">{ingredient.name}</div>
                            {ingredient.ingredient &&
                              ingredient.name !==
                                ingredient.ingredient.name && (
                                <div className="">
                                  <span className="cb-text-ghost text-sm">Matches:</span>
                                  <span className="font-light text-sm">{ingredient.ingredient.name}</span>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
