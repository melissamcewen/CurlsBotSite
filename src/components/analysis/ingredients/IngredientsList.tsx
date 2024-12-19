import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { IngredientItem } from './IngredientItem';
import { AnalysisResult } from '../../../types/analysis';

interface IngredientsListProps {
  ingredients: AnalysisResult['ingredients'];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  if (!ingredients?.length) return null;

  return (
    <Card>
      <CardContent>
        <CardTitle className="mb-4">Ingredients Analysis</CardTitle>
        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <IngredientItem key={index} ingredient={ingredient} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
