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

export default function IngredientsSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  // Get all ingredients and memoize them
  const ingredients = useMemo(() => {
    const database = getBundledDatabase();
    return Object.entries(database.ingredients).map(([id, ingredient]) => ({
      ...ingredient,
      id
    }));
  }, []);

  // Filter ingredients
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

    return filtered;
  }, [ingredients, searchTerm]);

  return (
    <div>
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
              <th>Name</th>
              <th>Categories</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map(ingredient => (
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

      {filteredIngredients.length === 0 && (
        <div className="alert alert-info">
          <span>No ingredients found matching &quot;{searchTerm}&quot;</span>
        </div>
      )}
    </div>
  );
}
