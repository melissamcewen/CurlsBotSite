import IngredientForm from '@/components/analysis/IngredientForm';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <div>
      <Card>
        <CardTitle>Analyze Ingredients</CardTitle>
        <CardContent>
          <p className="text-base-content/70 mb-6">
            Enter your product ingredients to analyze them for various properties and potential concerns.
          </p>
          <IngredientForm />
        </CardContent>
      </Card>
    </div>
  );
}
