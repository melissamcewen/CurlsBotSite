'use client';

import { useState, useMemo } from 'react';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { Card, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';

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

      <Card className="mb-8">
        <CardContent>
          <div className="form-control w-full max-w-xl">
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
        </CardContent>
      </Card>

      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((result, index) => (
            <Card key={index}>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle>
                      <Link
                        href={`/ingredients/${encodeURIComponent(result.item.id)}`}
                        className="hover:text-primary transition-colors"
                      >
                        {result.item.name}
                      </Link>
                    </CardTitle>
                    {result.score && (
                      <span className="badge badge-ghost text-xs">
                        Match: {((1 - result.score) * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/ingredients/${encodeURIComponent(result.item.id)}`}
                    className="badge badge-primary"
                  >
                    View Details
                  </Link>
                </div>

                {result.item.description && (
                  <CardDescription>{result.item.description}</CardDescription>
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
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchTerm && (
        <Card>
          <CardContent>
            <div className="alert alert-info">
              <span>No ingredients found matching "{searchTerm}"</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
