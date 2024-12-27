'use client';

import React from 'react';
import { useState } from 'react';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import { Suspense } from 'react';
import Loading from './loading';
import Link from 'next/link';
import { idToSlug } from '@/utils/slugs';

function getStatusBadgeClass(status?: string): string {
  switch (status) {
    case 'warning':
      return 'badge-error';
    case 'caution':
      return 'badge-warning';
    case 'ok':
      return 'badge-info';
    default:
      return 'badge-ghost';
  }
}

function IngredientsTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'status';
    direction: 'asc' | 'desc';
  }>({
    key: 'name',
    direction: 'asc',
  });

  // Get ingredients from the library
  const ingredients = Object.values(getBundledDatabase().ingredients);
  const database = getBundledDatabase();

  const sortedIngredients = [...ingredients].sort((a, b) => {
    if (sortConfig.key === 'status') {
      const aStatus = a.status || '';
      const bStatus = b.status || '';
      return sortConfig.direction === 'asc'
        ? aStatus.localeCompare(bStatus)
        : bStatus.localeCompare(aStatus);
    }

    const aValue = a[sortConfig.key]?.toString() || '';
    const bValue = b[sortConfig.key]?.toString() || '';
    return sortConfig.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const requestSort = (key: 'name' | 'status') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: 'name' | 'status') => {
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
          <th className="hidden sm:table-cell">Categories</th>
          <th>
            <button
              onClick={() => requestSort('status')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              Status {getSortIcon('status')}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedIngredients.map((ingredient) => (
          <tr key={ingredient.id}>
            <td className="whitespace-normal">
              <div className="space-y-1">
                <Link
                  href={`/ingredients/${idToSlug(ingredient.id)}`}
                  className="font-medium link-primary hover:text-primary"
                >
                  {ingredient.name}
                </Link>
                {ingredient.synonyms && ingredient.synonyms.length > 0 && (
                  <div className="text-sm text-base-content/70 break-words">
                    Also: {ingredient.synonyms.join(', ')}
                  </div>
                )}
                <div className="sm:hidden text-sm flex flex-wrap gap-2">
                  {ingredient.categories.map((categoryId) => {
                    const category = database.categories[categoryId];
                    return (
                      <Link
                        key={categoryId}
                        href={`/categories/${idToSlug(categoryId)}`}
                        className="link-hover text-secondary"
                      >
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </td>
            <td className="hidden sm:table-cell whitespace-normal">
              <div className="flex flex-wrap gap-2">
                {ingredient.categories.map((categoryId) => {
                  const category = database.categories[categoryId];
                  return (
                    <Link
                      key={categoryId}
                      href={`/categories/${idToSlug(categoryId)}`}
                      className="link-hover text-primary"
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            </td>
            <td>
              {ingredient.status ? (
                <span
                  className={`cb-badge ${getStatusBadgeClass(
                    ingredient.status,
                  )}`}
                >
                  {ingredient.status}
                </span>
              ) : (
                <span className="cb-badge badge-ghost">unknown</span>
              )}
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
