import { IngredientItem } from './IngredientItem';
import { AnalysisResult } from '../../../types/analysis';

interface IngredientsListProps {
  ingredients: AnalysisResult['ingredients'];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  if (!ingredients?.length) return null;

  return (
    <div className="space-y-3">
      {ingredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient} />
      ))}
    </div>
  );
}
