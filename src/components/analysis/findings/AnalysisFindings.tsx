import { IngredientResult } from 'haircare-ingredients-analyzer';

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
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Analysis Summary</h2>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total Ingredients</div>
              <div className="stat-value">{totalIngredients}</div>
              <div className="stat-desc">All ingredients in formula</div>
            </div>

            <div className="stat">
              <div className="stat-title">Known</div>
              <div className="stat-value text-info">{knownIngredients}</div>
              <div className="stat-desc">Found in database</div>
              <div className="stat-figure text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Unknown</div>
              <div className="stat-value">{unknownIngredients}</div>
              <div className="stat-desc">Not in database</div>
              <div className="stat-figure">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Caution</div>
              <div className="stat-value text-warning">{cautionIngredients}</div>
              <div className="stat-desc">May be problematic</div>
              <div className="stat-figure text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Warning</div>
              <div className="stat-value text-error">{warningIngredients}</div>
              <div className="stat-desc">Potentially harmful</div>
              <div className="stat-figure text-error">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Section */}
      {hasFindings && (
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Detailed Findings</h2>
            <div className="space-y-4">
              {Object.entries(groupedFindings).map(([setting, group]) => (
                <div
                  key={setting}
                  className={`card ${
                    group.status === 'warning'
                      ? 'bg-error/10 border-error'
                      : 'bg-warning/10 border-warning'
                  } border-l-4`}
                >
                  <div className="card-body p-4">
                    <h3 className="font-bold text-lg">{group.name}</h3>
                    <p className="text-sm opacity-70">{group.reason}</p>
                    <ul className="mt-3 space-y-3">
                      {group.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <div>
                            <div className="font-medium">
                              {ingredient.name}
                              {ingredient.ingredient && ingredient.name !== ingredient.ingredient.name && (
                                <span className="opacity-70 ml-2">
                                  (matched as {ingredient.ingredient.name})
                                </span>
                              )}
                            </div>
                            {ingredient.ingredient?.description && (
                              <p className="text-sm opacity-70 mt-1">
                                {ingredient.ingredient.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
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
