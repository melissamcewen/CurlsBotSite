import { IngredientItem } from './IngredientItem';
import { IngredientResult } from 'haircare-ingredients-analyzer';
import { useState } from 'react';
import { ArrowsUpDownIcon, BeakerIcon } from '@heroicons/react/24/outline';

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
  const [isAlphabetical, setIsAlphabetical] = useState(false);

  if (!ingredients?.length) return null;

  // Sort ingredients based on current sorting mode
  const sortedIngredients = [...ingredients].sort((a, b) => {
    if (isAlphabetical) {
      return a.name.localeCompare(b.name);
    }

    // Priority sorting (default)
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
    <div className="space-y-4 mt-5">
      <div className="flex justify-between items-center">
        <div className="cb-header mb-0">
          <BeakerIcon className="cb-header-icon" />
          Ingredient Details
        </div>
        <button
          onClick={() => setIsAlphabetical(!isAlphabetical)}
          className="btn cb-border btn-sm gap-2 normal-case"
          title={isAlphabetical ? 'Sort by priority' : 'Sort alphabetically'}
        >
          <ArrowsUpDownIcon className="w-4 h-4" />
          {isAlphabetical ? 'Priority Sort' : 'A-Z Sort'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedIngredients.map((ingredient, index) => (
          <IngredientItem key={index} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}
