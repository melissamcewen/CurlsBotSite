import { IngredientResult } from 'haircare-ingredients-analyzer';

interface Props {
  ingredients: IngredientResult[];
}

interface GroupedFindings {
  [key: string]: {
    name: string;
    reason: string;
    status: 'warning' | 'caution';
    ingredients: IngredientResult[];
  }
}

export function AnalysisFindings({ ingredients }: Props) {
  const hasFindings = ingredients.some(
    (i) => i.status === 'caution' || i.status === 'warning',
  );

  if (!hasFindings) return null;

  // Group ingredients by their status reason setting
  const groupedFindings = ingredients
    .filter((i) => i.status === 'caution' || i.status === 'warning')
    .reduce((acc: GroupedFindings, ingredient) => {
      // Use the first reason if there are multiple
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
    <div className="space-y-4">
      <div className="text-lg font-bold border-b-2 border-primary pb-2">
        What I found:
      </div>
      {Object.entries(groupedFindings).map(([setting, group]) => (
        <div key={setting} className={`rounded-lg border-l-4 p-4 bg-base-100 ${
          group.status === 'warning'
            ? 'border-error'
            : 'border-warning'
        }`}>
          <div className="space-y-1">
            <div className="text-lg font-bold text-base-content">
              {group.name}
            </div>
            <p className="text-sm text-base-content/70">
              {group.reason}
            </p>
          </div>
          <ul className="list-disc list-inside space-y-2 mt-3">
            {group.ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <div className="flex-1">
                  <div>
                    <span className="font-medium">{ingredient.name}</span>
                    {ingredient.ingredient &&
                      ingredient.name !== ingredient.ingredient.name && (
                        <span className="text-base-content/70 ml-2">
                          (matched as {ingredient.ingredient.name})
                        </span>
                      )}
                  </div>
                  {ingredient.ingredient?.description && (
                    <p className="text-sm text-base-content/70 mt-1">
                      {ingredient.ingredient.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
