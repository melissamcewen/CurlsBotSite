'use client';

import { useState } from 'react';
import { getBundledDatabase, Ingredient } from 'haircare-ingredients-analyzer';

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
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString())
      : b[sortConfig.key].toString().localeCompare(a[sortConfig.key].toString());
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
    <div>
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
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sortedIngredients.map((ingredient) => (
              <tr key={ingredient.name}>
                <td className="font-medium">
                  <span className="hover:text-primary">
                    {ingredient.name}
                  </span>
                  {ingredient.synonyms && ingredient.synonyms.length > 0 && (
                    <div className="text-sm text-base-content/70">
                      Also: {ingredient.synonyms.join(', ')}
                    </div>
                  )}
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.categories.map((category) => (
                      <span key={category} className="badge badge-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="max-w-md">
                  {ingredient.description ? (
                    ingredient.description
                  ) : (
                    <span className="text-base-content/50">
                      No description available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
