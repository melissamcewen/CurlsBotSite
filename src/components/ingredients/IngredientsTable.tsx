'use client';

import React from 'react';
import { useState } from 'react';
import { getBundledDatabase } from 'haircare-ingredients-analyzer';
import Link from 'next/link';
import { idToSlug } from '@/utils/slugs';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

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

export function IngredientsTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'status' | 'group' | 'category';
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

    if (sortConfig.key === 'group') {
      const aGroup = a.categories?.[0]
        ? database.categories[a.categories[0]]?.group || ''
        : '';
      const bGroup = b.categories?.[0]
        ? database.categories[b.categories[0]]?.group || ''
        : '';
      const aGroupName = aGroup ? database.groups[aGroup]?.name || '' : '';
      const bGroupName = bGroup ? database.groups[bGroup]?.name || '' : '';
      return sortConfig.direction === 'asc'
        ? aGroupName.localeCompare(bGroupName)
        : bGroupName.localeCompare(aGroupName);
    }

    if (sortConfig.key === 'category') {
      const aCategory = a.categories?.[0]
        ? database.categories[a.categories[0]]?.name || ''
        : '';
      const bCategory = b.categories?.[0]
        ? database.categories[b.categories[0]]?.name || ''
        : '';
      return sortConfig.direction === 'asc'
        ? aCategory.localeCompare(bCategory)
        : bCategory.localeCompare(aCategory);
    }

    const aValue = a[sortConfig.key]?.toString() || '';
    const bValue = b[sortConfig.key]?.toString() || '';
    return sortConfig.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const requestSort = (key: 'name' | 'status' | 'group' | 'category') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: 'name' | 'status' | 'group' | 'category') => {
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
          <th>
            <button
              onClick={() => requestSort('group')}
              className="flex items-center gap-2"
            >
              Group {getSortIcon('group')}
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
        {sortedIngredients.map((ingredient) => {
          const firstCategory = ingredient.categories?.[0];
          const category = firstCategory
            ? database.categories[firstCategory]
            : null;
          const group = category?.group
            ? database.groups[category.group]
            : null;

          return (
            <tr key={ingredient.id}>
              <td className="whitespace-normal">
                <div className="space-y-1">
                  <Link
                    href={`/ingredients/${idToSlug(ingredient.id)}`}
                    className="font-medium link hover:text-primary"
                  >
                    {ingredient.name}
                    {(ingredient.references?.length ?? 0) > 0 && (
                      <InformationCircleIcon className="w-4 h-4 inline-block ml-1 text-info" />
                    )}
                  </Link>
                  {ingredient.synonyms && ingredient.synonyms.length > 0 && (
                    <div className="text-sm text-base-content/70 break-words">
                      Also: {ingredient.synonyms.join(', ')}
                    </div>
                  )}
                </div>
              </td>
              <td className="whitespace-normal">
                {group && (
                  <Link
                    href={`/groups/${idToSlug(category!.group)}`}
                    className="link"
                  >
                    {group.name}
                  </Link>
                )}
              </td>
              <td className="whitespace-normal">
                <div className="flex flex-wrap gap-2">
                  {ingredient.categories?.map((categoryId) => {
                    const category = database.categories[categoryId];
                    return (
                      <Link
                        key={categoryId}
                        href={`/categories/${idToSlug(categoryId)}`}
                        className="link"
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
                    className={`badge ${getStatusBadgeClass(
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
          );
        })}
      </tbody>
    </table>
  );
}
