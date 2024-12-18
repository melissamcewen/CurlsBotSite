'use client';

import { useState, useMemo } from 'react';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import Fuse from 'fuse.js';
import Link from 'next/link';

interface Ingredient {
  id: string;
  name: string;
  categories?: string[];
  synonyms?: string[];
  description?: string;
}

interface SearchResult {
  item: Ingredient;
  refIndex: number;
  score?: number;
}

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Initialize Fuse instance with ingredients data
  const fuse = useMemo(() => {
    const database = getBundledDatabase();
    const ingredients = Object.values(database.ingredients);

    return new Fuse(ingredients, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'id', weight: 1 },
        { name: 'synonyms', weight: 1 }
      ],
      includeScore: true,
      threshold: 0.4,
      ignoreLocation: true
    });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results = fuse.search(term);
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-base-content">Search Ingredients</h1>

      <div className="form-control w-full max-w-xl mb-8">
        <label className="label">
          <span className="label-text">Enter an ingredient name</span>
        </label>
        <input
          type="text"
          placeholder="Type ingredient name..."
          className="input input-bordered bg-base-200 text-base-content w-full"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((result, index) => (
            <div key={index} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  <Link
                    href={`/ingredients/${encodeURIComponent(result.item.id)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {result.item.name}
                  </Link>
                  <Link
                    href={`/ingredients/${encodeURIComponent(result.item.id)}`}
                    className="badge badge-primary"
                  >
                    View Details
                  </Link>
                  {result.score && (
                    <span className="badge badge-ghost text-xs">
                      Match: {((1 - result.score) * 100).toFixed(0)}%
                    </span>
                  )}
                </h2>

                {result.item.description && (
                  <p className="text-sm opacity-70 mt-2">{result.item.description}</p>
                )}

                {result.item.categories?.length > 0 && (
                  <div className="mt-2">
                    <h3 className="font-semibold mb-1 text-base-content">Categories:</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.item.categories.map((category: string) => (
                        <span key={category} className="badge badge-secondary">
                          {category.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.item.synonyms?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1 text-base-content">Also known as:</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.item.synonyms.map((synonym: string) => (
                        <span key={synonym} className="badge badge-ghost">
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm && (
        <div className="alert alert-info">
          <span>No ingredients found matching "{searchTerm}"</span>
        </div>
      )}
    </div>
  );
}
