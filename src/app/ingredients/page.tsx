'use client';

import { useState } from 'react';
import { getBundledDatabase, Ingredient } from 'haircare-ingredients-analyzer';

// Helper function to normalize category names
function normalizeCategory(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to get category color
function getCategoryColorClass(category: string): string {
  const categoryMap: Record<string, string> = {
    // Error status (red)
    drying_alcohols: 'text-error',
    non_water_soluble_silicones: 'text-error',
    soaps: 'text-error',
    sulfates: 'text-error',

    // Warning status (yellow)
    astringents: 'text-warning',
    heavy_oils: 'text-warning',
    other_detergents: 'text-warning',
    parabens: 'text-warning',
    sulfonates: 'text-warning',
    water_soluble_silicones: 'text-warning',

    // Info status (blue)
    emollient_alcohols: 'text-info',
    light_oils: 'text-info',
    medium_oils: 'text-info',
    mild_detergents: 'text-info',
    water_soluble_waxes: 'text-info',

    // No color for "other" category
    other: 'text-base-content'
  };

  return categoryMap[category.toLowerCase()] || 'text-base-content';
}

export default function IngredientsPage() {
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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ingredients Database</h1>
      <div className="overflow-x-auto">
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
                    {ingredient.categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center gap-1.5"
                      >
                        <span className={`inline-block w-2 h-2 rounded-full ${getCategoryColorClass(category)} ring-1 ring-current`} />
                        <span className="text-sm">
                          {normalizeCategory(category)}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
