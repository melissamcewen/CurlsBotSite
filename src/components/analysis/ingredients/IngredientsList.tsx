import { AnalysisResult } from '../../../types/analysis';
import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface IngredientsListProps {
  ingredients: AnalysisResult['ingredients'];
}

type SortField = 'name' | 'category' | 'status';
type SortDirection = 'asc' | 'desc';

const statusPriority = {
  'warning': 0,
  'caution': 1,
  'ok': 2,
  'not found': 3
};

const normalizeCategory = (category: string) => {
  return category.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function IngredientsList({ ingredients }: IngredientsListProps) {
  const [sortField, setSortField] = useState<SortField>('status');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  if (!ingredients?.length) return null;

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'warning':
        return {
          row: 'bg-error/10',
          badge: 'badge-error'
        };
      case 'caution':
        return {
          row: 'bg-warning/10',
          badge: 'badge-warning'
        };
      case 'ok':
        return {
          row: 'bg-success/10',
          badge: 'badge-success'
        };
      case 'not found':
        return {
          row: 'bg-base-200/50',
          badge: 'badge-ghost'
        };
      default:
        return {
          row: '',
          badge: 'badge-ghost'
        };
    }
  };

  const sortedIngredients = [...ingredients].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    switch (sortField) {
      case 'name':
        // Always put "not found" last regardless of sort direction
        if (!a.matched && b.matched) return 1;
        if (!b.matched && a.matched) return -1;
        return direction * a.name.localeCompare(b.name);
      case 'category':
        // Always put "not found" last regardless of sort direction
        if (!a.matched && b.matched) return 1;
        if (!b.matched && a.matched) return -1;
        const aCategory = a.ingredient?.categories?.[0] || '';
        const bCategory = b.ingredient?.categories?.[0] || '';
        return direction * aCategory.localeCompare(bCategory);
      case 'status':
        // Use priority map for status sorting
        const aPriority = statusPriority[a.status] ?? 999;
        const bPriority = statusPriority[b.status] ?? 999;
        return direction * (aPriority - bPriority);
      default:
        return 0;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="min-w-[200px]">
              <button
                onClick={() => toggleSort('name')}
                className="flex items-center gap-2"
              >
                Name {getSortIcon('name')}
              </button>
            </th>
            <th className="hidden sm:table-cell">
              <button
                onClick={() => toggleSort('category')}
                className="flex items-center gap-2"
              >
                Category {getSortIcon('category')}
              </button>
            </th>
            <th>
              <button
                onClick={() => toggleSort('status')}
                className="flex items-center gap-2"
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th className="hidden md:table-cell">Description</th>
            <th className="hidden sm:table-cell">Reason</th>
          </tr>
        </thead>
        <tbody>
          {sortedIngredients.map((ingredient, index) => {
            const statusStyles = getStatusStyles(ingredient.status);
            return (
              <tr key={index} className={statusStyles.row}>
                <td className="min-w-[200px]">
                  <div className="flex flex-col gap-1">
                    <span>{ingredient.name}</span>
                    {!ingredient.matched ? (
                      <span className="badge badge-ghost badge-sm gap-1 whitespace-nowrap">
                        <QuestionMarkCircleIcon className="w-4 h-4" />
                        Not Found
                      </span>
                    ) : ingredient.ingredient?.name ? (
                      <div className="text-sm opacity-50">
                        {ingredient.ingredient.name}
                      </div>
                    ) : null}
                    <div className="sm:hidden text-sm">
                      {ingredient.ingredient?.categories?.map((category, i) => (
                        <span key={i}>
                          {i > 0 ? ', ' : ''}
                          {normalizeCategory(category)}
                        </span>
                      ))}
                    </div>
                    <div className="sm:hidden text-sm opacity-70">
                      {ingredient.reason || '-'}
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">
                  {ingredient.ingredient?.categories?.map((category, i) => (
                    <span key={i} className="text-sm">
                      {i > 0 ? ', ' : ''}
                      {normalizeCategory(category)}
                    </span>
                  ))}
                </td>
                <td>
                  {ingredient.matched && (
                    <span className={`badge badge-sm ${statusStyles.badge}`}>
                      {ingredient.status}
                    </span>
                  )}
                </td>
                <td className="hidden md:table-cell text-sm max-w-md">
                  {ingredient.ingredient?.description || '-'}
                </td>
                <td className="hidden sm:table-cell text-sm opacity-70">
                  {ingredient.reason || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
