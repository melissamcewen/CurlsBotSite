'use client';

import { AnalysisResult, IngredientStatus } from '@/types/analysis';

const StatusBadge = ({ status }: { status: IngredientStatus }) => {
  const colors = {
    ok: 'badge-success',
    warning: 'badge-warning',
    caution: 'badge-error'
  };

  return (
    <span className={`badge ${colors[status]} gap-2`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function AnalysisResults({ result }: { result: AnalysisResult }) {
  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Overall Assessment</div>
          <div className="stat-value flex items-center gap-4">
            <StatusBadge status={result.overallStatus} />
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Ingredient Analysis</h3>
        <div className="space-y-4">
          {result.ingredients.map((ingredient, index) => (
            <div key={index} className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="card-title">{ingredient.name}</h4>
                    {ingredient.matched && (
                      <div className="badge badge-outline badge-success gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Matched
                      </div>
                    )}
                  </div>
                  <StatusBadge status={ingredient.status} />
                </div>

                {ingredient.info && (
                  <p className="text-sm opacity-70 mb-2">
                    {ingredient.info}
                  </p>
                )}

                {ingredient.reason && (
                  <div className="text-sm opacity-70">
                    <span className="font-medium">Reason:</span> {ingredient.reason}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
