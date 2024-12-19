import { IngredientItem } from './IngredientItem';
import { AnalysisResult, IngredientResult } from 'haircare-ingredients-analyzer';

interface IngredientsListProps {
  ingredients: IngredientResult[];
}

// Status priority order for sorting
const statusPriority = {
  warning: 0,
  caution: 1,
  ok: 2,
};

export function IngredientsList({ ingredients }: IngredientsListProps) {
  if (!ingredients?.length) return null;

  // Sort ingredients by status priority
  const sortedIngredients = [...ingredients].sort((a, b) => {
    // First sort by whether ingredient was found
    if (!!a.ingredient !== !!b.ingredient) {
      return a.ingredient ? -1 : 1; // found ingredients come first
    }

    // Then sort by status priority
    const priorityA = statusPriority[a.status as keyof typeof statusPriority] ?? 3;
    const priorityB = statusPriority[b.status as keyof typeof statusPriority] ?? 3;

    // If priorities are different, sort by priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If same priority, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-3">
      {sortedIngredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient} />
      ))}
    </div>
  );
}
