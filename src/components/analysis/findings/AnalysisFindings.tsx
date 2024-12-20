import { IngredientResult } from 'haircare-ingredients-analyzer';

interface Props {
  ingredients: IngredientResult[];
}

export function AnalysisFindings({ ingredients }: Props) {
  const hasFindings = ingredients.some(
    (i) => i.status === 'caution' || i.status === 'warning',
  );

  if (!hasFindings) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium">What I found:</p>
      <ul className="list-disc list-inside space-y-2">
        {ingredients
          .filter((i) => i.status === 'caution' || i.status === 'warning')
          .map((ingredient, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <span className="mt-1">•</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{ingredient.name}</span>
                  {ingredient.ingredient &&
                    ingredient.name !== ingredient.ingredient.name && (
                      <span className="opacity-80">
                        (matched as {ingredient.ingredient.name})
                      </span>
                    )}
                  <span
                    className={`badge badge-sm ${
                      ingredient.status === 'warning'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {ingredient.status}
                  </span>
                </div>
                {ingredient.reasons && ingredient.reasons[0] && (
                  <p className="opacity-80 mt-0.5">
                    {ingredient.reasons[0].reason}
                  </p>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
