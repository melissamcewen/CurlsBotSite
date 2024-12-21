'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BeakerIcon } from '@heroicons/react/24/solid';
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
    sulfates: 'text-error',
    harsh_detergents: 'text-error',
    mild_detergents: 'text-info',
    other_detergents: 'text-warning'
  };

  return categoryMap[category.toLowerCase()] || 'text-base-content';
}

type SortKey = 'name' | 'category';
type SortDirection = 'asc' | 'desc';

export default function DetergentsPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'name',
    direction: 'asc',
  });

  // Get all detergent ingredients from the database
  const database = getBundledDatabase();
  const detergents = Object.values(database.ingredients)
    .filter(ingredient =>
      ingredient.categories.some(cat =>
        ['sulfates', 'harsh_detergents', 'mild_detergents', 'other_detergents'].includes(cat)
      )
    );

  // Sort the detergents based on current sort configuration
  const sortedDetergents = [...detergents].sort((a, b) => {
    if (sortConfig.key === 'category') {
      // Get the first matching detergent category for each ingredient
      const aCategory = a.categories.find(cat =>
        ['sulfates', 'harsh_detergents', 'mild_detergents', 'other_detergents'].includes(cat)
      ) || '';
      const bCategory = b.categories.find(cat =>
        ['sulfates', 'harsh_detergents', 'mild_detergents', 'other_detergents'].includes(cat)
      ) || '';

      return sortConfig.direction === 'asc'
        ? aCategory.localeCompare(bCategory)
        : bCategory.localeCompare(aCategory);
    }

    // Sort by name
    return sortConfig.direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '↕️';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-100 rounded-xl">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <BeakerIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Understanding Detergents in Hair Care</h1>
          </div>

          <div className="prose prose-lg">
            <p>
              When the <a href="http://amzn.to/2nT3w1V" className="link link-primary" target="_blank" rel="noopener noreferrer">Curly Girl Method was first introduced by Lorraine Massey</a>, it primarily focused on avoiding sulfates - the harshest detergents commonly found in shampoos. However, as our understanding of hair care has evolved, so has the conversation around cleansing agents.
            </p>

            <blockquote className="bg-base-200 p-4 rounded-xl my-4">
              The original rule was simple: avoid sulfates like sodium lauryl sulfate, ammonium laureth sulfate, and sodium laureth sulfate. These harsh detergents can strip your hair of its natural oils and disrupt your curl pattern.
            </blockquote>

            <p>
              Today, many curly hair communities have developed more nuanced approaches. Some advocate for completely avoiding all detergents (co-washing only), while others distinguish between harsh and mild cleansing agents.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the Color Coding</h2>
            <ul>
              <li><span className="text-error font-medium">Red</span>: Detergents that have a reputation for being harsh and drying, and many curly hair communities recommend avoiding them</li>
              <li><span className="text-warning font-medium">Yellow</span>: Moderate detergents that may work for some hair types</li>
              <li><span className="text-info font-medium">Blue</span>: Mild detergents that are generally considered acceptable</li>
            </ul>

            <p>
              Some gentler detergents like sodium lauryl sulfoacetate and sodium cocoyl sarcosinate are marked as &quot;caution&quot; in CurlsBot. Their suitability depends on your hair&apos;s needs:
            </p>

            <ul>
              <li>Low porosity hair might tolerate these cleansers well</li>
              <li>High porosity hair might find them too drying</li>
              <li>The concentration and other ingredients in the formula matter</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Common Detergents and Their Categories</h2>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>
                      <button
                        onClick={() => requestSort('name')}
                        className="flex items-center gap-2"
                      >
                        Ingredient {getSortIcon('name')}
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => requestSort('category')}
                        className="flex items-center gap-2"
                      >
                        Category {getSortIcon('category')}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDetergents.map((ingredient) => (
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
                          {ingredient.categories
                            .filter(cat => ['sulfates', 'harsh_detergents', 'mild_detergents', 'other_detergents'].includes(cat))
                            .map((category) => (
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

            <p className="mt-8">
              CurlsBot&apos;s recommendations are based on:
            </p>
            <ul>
              <li>Common practices in curly hair communities</li>
              <li>Scientific studies comparing detergent effects</li>
              <li>Real-world feedback from users</li>
            </ul>

            <p>
              For more detailed discussions and personal experiences, check out the communities on our{' '}
              <Link href="/resources" className="link link-primary">
                resources page
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
