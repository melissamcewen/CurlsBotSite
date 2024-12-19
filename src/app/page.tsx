import IngredientForm from '@/components/analysis/IngredientForm';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <div>
      <Card>
        <CardTitle>Analyze Ingredients</CardTitle>
        <CardContent>
          <IngredientForm />
        </CardContent>
      </Card>
    </div>
  );
}
