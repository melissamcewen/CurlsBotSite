'use client';

import { useState, useMemo } from 'react';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';

interface Ingredient {
  id: string;
  name: string;
  categories?: string[];
  synonyms?: string[];
  description?: string;
}

type SortField = 'name' | 'categories';
type SortDirection = 'asc' | 'desc';

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Filter and sort ingredients
  const filteredIngredients = useMemo(() => {
    let filtered = [...ingredients];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchLower) ||
        ingredient.description?.toLowerCase().includes(searchLower) ||
        ingredient.synonyms?.some(syn => syn.toLowerCase().includes(searchLower)) ||
        ingredient.categories?.some(cat => cat.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
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

    return filtered;
  }, [ingredients, searchTerm, sortField, sortDirection]);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-base-content">Ingredients Database</h1>

      <Card className="mb-8">
        <CardContent>
          <div className="form-control w-full max-w-xl">
            <label className="label">
              <span className="label-text">Search ingredients</span>
            </label>
            <input
              type="text"
              placeholder="Filter by name, category, or description..."
              className="input input-bordered bg-base-200 text-base-content w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map(ingredient => (
              <tr key={ingredient.id}>
                <td className="font-medium">
                  {ingredient.name}
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
                <td>
                  <Link
                    href={`/ingredients/${encodeURIComponent(ingredient.id)}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredIngredients.length === 0 && (
        <div className="alert alert-info">
          <span>No ingredients found matching &quot;{searchTerm}&quot;</span>
        </div>
      )}
    </div>
  );
}
