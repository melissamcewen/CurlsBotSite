'use client';

import React from 'react';
import { useState } from 'react';
import { getBundledDatabase, Ingredient } from 'haircare-ingredients-analyzer';
import { Suspense } from 'react';
import Loading from './loading';
import { ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

// Helper function to normalize category names
function normalizeCategory(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to get category icon and color
function getCategoryIcon(category: string): { icon: React.ReactElement; colorClass: string } {
  const categoryMap: Record<string, { icon: React.ReactElement; colorClass: string }> =
    {
      // Error status (red)
      drying_alcohols: {
        icon: <ExclamationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-error',
      },
      non_water_soluble_silicones: {
        icon: <ExclamationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-error',
      },
      soaps: {
        icon: <ExclamationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-error',
      },
      sulfates: {
        icon: <ExclamationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-error',
      },
      non_water_soluble_waxes: {
        icon: <ExclamationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-error',
      },
      petroleum_oils: {
        icon: <ExclamationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-error',
      },

      // Warning status (yellow)
      astringents: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },
      heavy_oils: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },
      other_detergents: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },
      parabens: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },
      sulfonates: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },
      water_soluble_silicones: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },
      evaporative_silicones: {
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
        colorClass: 'text-warning',
      },

      // Info status (blue)
      emollient_alcohols: {
        icon: <InformationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-info',
      },
      light_oils: {
        icon: <InformationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-info',
      },
      medium_oils: {
        icon: <InformationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-info',
      },
      mild_detergents: {
        icon: <InformationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-info',
      },
      water_soluble_waxes: {
        icon: <InformationCircleIcon className="w-4 h-4" />,
        colorClass: 'text-info',
      },
    };

  return categoryMap[category.toLowerCase()] || {
    icon: <InformationCircleIcon className="w-4 h-4" />,
    colorClass: 'text-base-content/50'
  };
}

function IngredientsTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ingredient;
    direction: 'asc' | 'desc';
  }>({
    key: 'name',
    direction: 'asc',
  });

  // Get ingredients from the library
  const ingredients = Object.values(getBundledDatabase().ingredients);

  const sortedIngredients = [...ingredients].sort((a, b) => {
    if (sortConfig.key === 'categories') {
      const aCategories = a.categories.join(',');
      const bCategories = b.categories.join(',');
      return sortConfig.direction === 'asc'
        ? aCategories.localeCompare(bCategories)
        : bCategories.localeCompare(aCategories);
    }

    const aValue = a[sortConfig.key]?.toString() || '';
    const bValue = b[sortConfig.key]?.toString() || '';
    return sortConfig.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const requestSort = (key: keyof Ingredient) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Ingredient) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '↕️';
  };

  return (
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>
            <button
              onClick={() => requestSort('name')}
              className="flex items-center gap-2"
            >
              Name {getSortIcon('name')}
            </button>
          </th>
          <th>
            <button
              onClick={() => requestSort('categories')}
              className="flex items-center gap-2"
            >
              Categories {getSortIcon('categories')}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedIngredients.map((ingredient) => (
          <tr key={ingredient.name}>
            <td className="font-medium">
              {ingredient.name}
              {ingredient.synonyms && ingredient.synonyms.length > 0 && (
                <div className="text-sm text-base-content/70">
                  Also: {ingredient.synonyms.join(', ')}
                </div>
              )}
            </td>
            <td>
              <div className="flex flex-wrap gap-2">
                {ingredient.categories.map((category) => {
                  const { icon, colorClass } = getCategoryIcon(category);
                  return (
                    <div key={category} className="flex items-center gap-1.5">
                      <span className={colorClass}>
                        {icon}
                      </span>
                      <span className="text-sm">
                        {normalizeCategory(category)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function IngredientsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ingredients Database</h1>
      <div className="overflow-x-auto">
        <Suspense fallback={<Loading />}>
          <IngredientsTable />
        </Suspense>
      </div>
    </div>
  );
}
