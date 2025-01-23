import { IngredientItem } from './IngredientItem';
import { IngredientResult } from 'haircare-ingredients-analyzer';
import { FlaskConical } from 'lucide-react';

interface IngredientsListProps {
  ingredients: IngredientResult[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  if (!ingredients?.length) return null;

  return (
    <div className="space-y-4 mt-5">
      <div className="flex justify-between items-center">
        <div className="cb-header mb-0">
          <FlaskConical className="cb-header-icon" />
          Ingredient Details
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 min-h-[300px]">
        {ingredients.map((ingredient, index) => (
          <IngredientItem key={index} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}
