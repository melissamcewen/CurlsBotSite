'use client';

import { useMemo, useState } from 'react';
import { abbeyYungProducts, type AbbeyYungProduct } from '@/data/abbeyYungProducts';

type ExtraFieldKey =
  | 'weight'
  | 'cleaningPower'
  | 'scalpType'
  | 'frequency'
  | 'texture'
  | 'fragrance';

const EXTRA_FIELD_LABEL: Record<ExtraFieldKey, string> = {
  weight: 'Weight',
  cleaningPower: 'Cleaning Power',
  scalpType: 'Scalp Type',
  frequency: 'Frequency',
  texture: 'Texture',
  fragrance: 'Fragrance',
};

type AbbeyYungProductListProps = {
  steps: number | number[];
  extraFields?: ExtraFieldKey[];
  title?: string;
  className?: string;
};

type SortBy = 'featured' | 'name' | 'drugstore';

function toListValue(value?: string | string[]): string | null {
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.join(', ');
  }
  if (!value) return null;
  return value.trim() || null;
}

function productLinks(product: AbbeyYungProduct): Array<{ url: string; text: string }> {
  const links =
    product.links
      ?.filter((link) => Boolean(link.url?.trim()))
      .map((link) => ({
        url: link.url,
        text: link.text?.trim() || 'Product link',
      })) ?? [];

  if (links.length > 0) return links;

  if (product.amazon?.trim()) {
    return [{ url: product.amazon, text: 'Buy on Amazon' }];
  }

  return [];
}

export default function AbbeyYungProductList({
  steps,
  extraFields = [],
  title,
  className = '',
}: AbbeyYungProductListProps) {
  const [sortBy, setSortBy] = useState<SortBy>('featured');
  const stepFilter = Array.isArray(steps) ? steps : [steps];

  const filtered = useMemo(() => {
    const base = abbeyYungProducts.filter((product) =>
      product.steps.some((step) => stepFilter.includes(step)),
    );

    return [...base].sort((a, b) => {
      if (sortBy === 'name') {
        return a.product.localeCompare(b.product);
      }

      if (sortBy === 'drugstore') {
        if (a.drugstore !== b.drugstore) return a.drugstore ? -1 : 1;
        return a.product.localeCompare(b.product);
      }

      // featured: image first, then drugstore, then product name
      if (Boolean(a.img) !== Boolean(b.img)) return a.img ? -1 : 1;
      if (a.drugstore !== b.drugstore) return a.drugstore ? -1 : 1;
      return a.product.localeCompare(b.product);
    });
  }, [stepFilter, sortBy]);

  const visibleExtraFields = extraFields.filter((field) =>
    filtered.some((product) => {
      switch (field) {
        case 'weight':
          return toListValue(product.weight) !== null;
        case 'cleaningPower':
          return toListValue(product.cleaningPower) !== null;
        case 'scalpType':
          return toListValue(product.scalpType) !== null;
        case 'frequency':
          return toListValue(product.frequency) !== null;
        case 'texture':
          return toListValue(product.texture) !== null;
        case 'fragrance':
          return toListValue(product.fragrance) !== null;
        default:
          return false;
      }
    }),
  );

  if (filtered.length === 0) {
    return (
      <div className={`not-prose my-6 rounded-2xl border border-base-300 bg-base-100 p-4 ${className}`}>
        <p className="text-sm text-base-content">No products found for this step.</p>
      </div>
    );
  }

  return (
    <div className={`not-prose my-8 space-y-3 ${className}`}>
      {title ? <h4 className="text-base font-semibold text-base-content">{title}</h4> : null}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-3">
        <label className="flex items-center gap-2 text-sm text-base-content">
          <span className="font-medium">Sort</span>
          <select
            className="select select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="featured">Featured</option>
            <option value="name">Product name</option>
            <option value="drugstore">Drugstore first</option>
          </select>
        </label>
        <span className="text-xs text-base-content">{filtered.length} products</span>
      </div>
      <div className="max-h-[34rem] overflow-x-auto overflow-y-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table table-zebra table-sm w-max min-w-full">
          <thead>
            <tr>
              <th className="min-w-[9rem] align-bottom sm:min-w-[11rem]">Product</th>
              <th className="min-w-[12rem] align-bottom sm:min-w-[16rem]">Details</th>
              {visibleExtraFields.map((field) => (
                <th key={field} className="min-w-[4.5rem] whitespace-nowrap align-bottom sm:min-w-[5.5rem]">
                  {EXTRA_FIELD_LABEL[field]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const links = productLinks(product);
              return (
                <tr key={product.product}>
                  <td className="min-w-[9rem] align-top sm:min-w-[11rem]">
                    <div
                      className={
                        product.img
                          ? 'flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:gap-3'
                          : 'block space-y-2'
                      }
                    >
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.product}
                          className="h-20 w-20 shrink-0 rounded-lg border border-base-300 object-cover"
                        />
                      ) : null}
                      <div className="min-w-0 w-full space-y-2">
                        <p className="text-sm leading-snug text-base-content">{product.product}</p>
                        {links.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {links.map((link) => (
                              <a key={link.url} href={link.url} className="link link-primary">
                                {link.text}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="min-w-[12rem] align-top sm:min-w-[16rem]">
                    <div className="space-y-2 text-sm text-base-content">
                      {product.comments?.trim() ? (
                        <div className="break-words">{product.comments}</div>
                      ) : null}
                      {product.bestFor?.trim() ? (
                        <div className="break-words">
                          <span className="font-medium">Best for: </span>
                          {product.bestFor}
                        </div>
                      ) : null}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`badge shrink-0 whitespace-nowrap ${product.drugstore ? 'badge-success' : 'badge-neutral'}`}
                        >
                          {product.drugstore ? 'Drugstore' : 'Non-drugstore'}
                        </span>
                        {product.tags && product.tags.length > 0
                          ? product.tags.map((tag) => (
                              <span key={tag} className="badge badge-outline shrink-0 whitespace-nowrap">
                                {tag}
                              </span>
                            ))
                          : <span>-</span>}
                      </div>
                    </div>
                  </td>
                  {visibleExtraFields.map((field) => {
                    let value: string | null = null;
                    if (field === 'weight') value = toListValue(product.weight);
                    if (field === 'cleaningPower') value = toListValue(product.cleaningPower);
                    if (field === 'scalpType') value = toListValue(product.scalpType);
                    if (field === 'frequency') value = toListValue(product.frequency);
                    if (field === 'texture') value = toListValue(product.texture);
                    if (field === 'fragrance') value = toListValue(product.fragrance);
                    return (
                      <td
                        key={field}
                        className="min-w-[4.5rem] align-top text-sm text-base-content sm:min-w-[5.5rem]"
                      >
                        <span className="whitespace-nowrap">{value ?? '-'}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
