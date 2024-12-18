'use client';

import { AnalysisResult } from '../../types/analysis';
import Link from 'next/link';

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
  if (!result) return null;

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-success text-success-content';
      case 'warning':
        return 'bg-error text-error-content';
      case 'caution':
        return 'bg-warning text-warning-content';
      default:
        return 'bg-base-200 text-base-content';
    }
  };

  const getIngredientClasses = (status: string) => {
    switch (status) {
      case 'ok':
        return 'border-success';
      case 'warning':
        return 'border-error';
      case 'caution':
        return 'border-warning';
      default:
        return 'border-base-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <div className={`card shadow-lg ${getStatusClasses(result.overallStatus)}`}>
        <div className="card-body">
          <h2 className="card-title">Overall Assessment</h2>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full bg-current"
            />
            <span className="capitalize font-medium">{result.overallStatus}</span>
          </div>
        </div>
      </div>

      {/* Ingredient Status */}
      {result.ingredients && result.ingredients.length > 0 && (
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-base-content mb-4">Ingredients</h2>
            <div className="space-y-4">
              {result.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={`bg-base-200 rounded-lg shadow-md border-l-4 ${getIngredientClasses(ingredient.status)}`}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-base-content">{ingredient.name}</span>
                      {ingredient.matched ? (
                        <>
                          <span className="text-base-content">→</span>
                          <Link
                            href={`/ingredients/${encodeURIComponent(ingredient.ingredient?.id || '')}`}
                            className="font-medium text-primary hover:text-primary-focus transition-colors"
                          >
                            {ingredient.ingredient?.name}
                          </Link>
                        </>
                      ) : (
                        <span className="badge badge-sm badge-warning">Not Found</span>
                      )}
                    </div>
                    {(ingredient.reason || ingredient.info) && (
                      <div className="mt-2 space-y-1">
                        {ingredient.reason && (
                          <p className="text-sm text-base-content/70">{ingredient.reason}</p>
                        )}
                        {ingredient.info && (
                          <p className="text-sm text-info">{ingredient.info}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
