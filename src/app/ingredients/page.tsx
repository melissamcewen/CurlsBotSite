'use client';

import { useState } from 'react';
import { getBundledDatabase, findIngredient } from 'haircare-ingredients-analyzer';
import Link from 'next/link';

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResult(null);
      return;
    }

    const database = getBundledDatabase();
    const result = findIngredient(database, term);
    setSearchResult(result);
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

      {searchResult && (
        <div className="space-y-4">
          {searchResult.ingredient ? (
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  {searchResult.ingredient.name}
                  <Link
                    href={`/ingredients/${encodeURIComponent(searchResult.ingredient.id)}`}
                    className="badge badge-primary"
                  >
                    View Details
                  </Link>
                </h2>

                {searchResult.ingredient.categories?.length > 0 && (
                  <div className="mt-2">
                    <h3 className="font-semibold mb-1 text-base-content">Categories:</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.ingredient.categories.map((category: string) => (
                        <span key={category} className="badge badge-secondary">
                          {category.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {searchResult.ingredient.synonyms?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1 text-base-content">Also known as:</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.ingredient.synonyms.map((synonym: string) => (
                        <span key={synonym} className="badge badge-ghost">
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              <span>No ingredient found matching "{searchTerm}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
