'use client';

import { useState, useMemo } from 'react';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import type { Ingredient } from 'haircare-ingredients-analyzer';
import Link from 'next/link';

type SortField = 'name' | 'categories';
type SortDirection = 'asc' | 'desc';

export default function IngredientsPage() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Get all ingredients and memoize them
  const ingredients = useMemo(() => {
    const database = getBundledDatabase();
    return Object.entries(database.ingredients).map(([id, ingredient]) => ({
      ...ingredient,
      id
    }));
  }, []);

  // Sort ingredients
  const sortedIngredients = useMemo(() => {
    const sorted = [...ingredients];

    // Apply sorting
    sorted.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'categories') {
        const aCats = a.categories?.join(', ') || '';
        const bCats = b.categories?.join(', ') || '';
        return sortDirection === 'asc'
          ? aCats.localeCompare(bCats)
          : bCats.localeCompare(aCats);
      }
      return 0;
    });

    return sorted;
  }, [ingredients, sortField, sortDirection]);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ingredients Database</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <button
                  className="flex items-center gap-2"
                  onClick={() => toggleSort('name')}
                >
                  Name {getSortIcon('name')}
                </button>
              </th>
              <th>
                <button
                  className="flex items-center gap-2"
                  onClick={() => toggleSort('categories')}
                >
                  Categories {getSortIcon('categories')}
                </button>
              </th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {sortedIngredients.map(ingredient => (
              <tr key={ingredient.id}>
                <td className="font-medium">
                  <Link
                    href={`/ingredients/${encodeURIComponent(ingredient.id)}`}
                    className="hover:text-primary"
                  >
                    {ingredient.name}
                  </Link>
                  {ingredient.synonyms && ingredient.synonyms.length > 0 && (
                    <div className="text-sm text-base-content/70">
                      Also: {ingredient.synonyms.join(', ')}
                    </div>
                  )}
                </td>
                <td>
                  {ingredient.categories && ingredient.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ingredient.categories.map(category => (
                        <span key={category} className="badge badge-sm">
                          {category.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="max-w-md">
                  {ingredient.description || (
                    <span className="text-base-content/50">No description available</span>
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
