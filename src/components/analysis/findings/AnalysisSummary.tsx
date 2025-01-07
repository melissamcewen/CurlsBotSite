import { IngredientResult } from 'haircare-ingredients-analyzer';
import {
  BarChart3,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

interface Props {
  ingredients: IngredientResult[];
}

export function AnalysisSummary({ ingredients }: Props) {
  // Calculate summary stats
  const totalIngredients = ingredients.length;
  const knownIngredients = ingredients.filter((i) => i.ingredient).length;
  const unknownIngredients = totalIngredients - knownIngredients;
  const cautionIngredients = ingredients.filter(
    (i) => i.status === 'caution',
  ).length;
  const warningIngredients = ingredients.filter(
    (i) => i.status === 'warning',
  ).length;

  return (
    <div className="bg-base-100 cb-card-lite ">
      <h2 className="cb-header">
        <BarChart3 className="cb-header-icon " />
        Analysis Summary
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            <div>Total Ingredients</div>
          </div>
          <div className="text-xl font-bold">{totalIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-info/10 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-info" />
            <div>Known</div>
          </div>
          <div className="text-xl font-bold text-info">{knownIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6" />
            <div>Unknown</div>
          </div>
          <div className="text-xl font-bold">{unknownIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-warning" />
            <div>Caution</div>
          </div>
          <div className="text-xl font-bold text-warning">
            {cautionIngredients}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-error/10 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-error" />
            <div>Warning</div>
          </div>
          <div className="text-xl font-bold text-error">
            {warningIngredients}
          </div>
        </div>
      </div>
    </div>
  );
}
