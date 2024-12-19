import { IngredientItem } from './IngredientItem';
import { AnalysisResult } from '../../../types/analysis';

interface IngredientsListProps {
  ingredients: AnalysisResult['ingredients'];
}

// Status priority order for sorting
const statusPriority = {
  warning: 0,
  caution: 1,
  matched: 2
};

export function IngredientsList({ ingredients }: IngredientsListProps) {
  if (!ingredients?.length) return null;

  // Sort ingredients by status priority
  const sortedIngredients = [...ingredients].sort((a, b) => {
    // First sort by matched status
    if (a.matched !== b.matched) {
      return a.matched ? -1 : 1; // matched ingredients come first
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
