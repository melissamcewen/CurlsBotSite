import { IngredientResult } from 'haircare-ingredients-analyzer';
import {
  DocumentChartBarIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';

interface Props {
  ingredients: IngredientResult[];
}

export function AnalysisSummary({ ingredients }: Props) {
  // Calculate summary stats
  const totalIngredients = ingredients.length;
  const knownIngredients = ingredients.filter(i => i.ingredient).length;
  const unknownIngredients = totalIngredients - knownIngredients;
  const cautionIngredients = ingredients.filter(i => i.status === 'caution').length;
  const warningIngredients = ingredients.filter(i => i.status === 'warning').length;

  return (
    <div className="bg-base-100">
      <h2 className="cb-header">
        <DocumentChartBarIcon className="cb-header-icon" />
        Analysis Summary
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
          <div className="flex items-center gap-2">
            <DocumentChartBarIcon className="w-6 h-6" />
            <div>Total</div>
          </div>
          <div className="text-xl font-bold">{totalIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-info/10 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-6 h-6 text-info" />
            <div>Known</div>
          </div>
          <div className="text-xl font-bold text-info">{knownIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
          <div className="flex items-center gap-2">
            <QuestionMarkCircleIcon className="w-6 h-6" />
            <div>Unknown</div>
          </div>
          <div className="text-xl font-bold">{unknownIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-6 h-6 text-warning" />
            <div>Caution</div>
          </div>
          <div className="text-xl font-bold text-warning">{cautionIngredients}</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-error/10 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircleIcon className="w-6 h-6 text-error" />
            <div>Warning</div>
          </div>
          <div className="text-xl font-bold text-error">{warningIngredients}</div>
        </div>
      </div>
    </div>
  );
}
