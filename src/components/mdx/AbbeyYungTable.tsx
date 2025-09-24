'use client';

import { useState, useMemo } from 'react';
import {
  abbeyYungProducts,
  type AbbeyYungProduct,
} from '@/data/abbeyYungProducts';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

type SortField = 'product' | 'step';
type SortDirection = 'asc' | 'desc';

interface AbbeyYungTableProps {
  className?: string;
}

export default function AbbeyYungTable({
  className = '',
}: AbbeyYungTableProps) {
  const [sortField, setSortField] = useState<SortField>('step');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [drugstoreOnly, setDrugstoreOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    // First filter by drugstore if needed
    const filtered = drugstoreOnly
      ? abbeyYungProducts.filter((product) => product.drugstore)
      : abbeyYungProducts;

    // Then sort
    return [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'product':
          aValue = a.product.toLowerCase();
          bValue = b.product.toLowerCase();
          break;
        case 'step':
          // Sort by the lowest step number for products with multiple steps
          aValue = Math.min(...a.steps);
          bValue = Math.min(...b.steps);
          break;
        default:
          aValue = Math.min(...a.steps);
          bValue = Math.min(...b.steps);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? result : -result;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [sortField, sortDirection, drugstoreOnly]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const getHeavinessBadges = (heaviness: string) => {
    if (!heaviness) return null;

    // Split by comma and handle individual heaviness levels
    const heavinessLevels = heaviness.split(',').map((level) => level.trim());

    const heavinessMap: Record<string, string> = {
      Light: 'badge-info',
      Medium: 'badge-warning',
      Heavy: 'badge-error',
    };

    return (
      <div className="flex flex-wrap gap-0.5 max-w-full">
        {heavinessLevels.map((level, index) => {
          const badgeClass = heavinessMap[level] || 'badge-neutral';
          return (
            <span
              key={index}
              className={`badge badge-xs text-xs ${badgeClass}`}
            >
              {level}
            </span>
          );
        })}
      </div>
    );
  };

  const getStepBadges = (steps: number[]) => {
    if (steps.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-0.5 max-w-full">
        {steps.map((step, index) => (
          <span key={index} className="badge badge-xs text-xs badge-primary">
            {step}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={drugstoreOnly}
            onChange={(e) => setDrugstoreOnly(e.target.checked)}
          />
          <label className="text-xs font-medium">
            Show drugstore products only
          </label>
        </div>
        <div className="text-xs text-base-content/70">
          {filteredAndSortedProducts.length} product
          {filteredAndSortedProducts.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-xs w-full text-xs">
          <thead>
            <tr>
              <th
                className="cursor-pointer hover:bg-base-200"
                onClick={() => handleSort('product')}
              >
                <div className="flex items-center gap-2">
                  Product
                  {getSortIcon('product')}
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-base-200"
                onClick={() => handleSort('step')}
              >
                <div className="flex items-center gap-2">
                  Step
                  {getSortIcon('step')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.map((product, index) => (
              <tr key={index}>
                <td className="font-medium text-xs align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      {product.amazon ? (
                        <a
                          href={product.amazon}
                          target="_blank"
                          className="link link-primary hover:link-hover text-xs leading-tight"
                          ref={(el) => {
                            if (el) {
                              // Create a mock product object for tracking
                              const mockProduct = {
                                id: product.product
                                  .toLowerCase()
                                  .replace(/\s+/g, '-'),
                                name: product.product,
                                brand: '',
                                product_categories: [],
                                buy_links: [
                                  { url: product.amazon, retailer: 'Amazon' },
                                ],
                              };
                              addProductTrackingAttributes(
                                el,
                                mockProduct,
                                'buy',
                                'Amazon',
                              );
                            }
                          }}
                          onClick={() => {
                            // Create a mock product object for tracking
                            const mockProduct = {
                              id: product.product
                                .toLowerCase()
                                .replace(/\s+/g, '-'),
                              name: product.product,
                              brand: '',
                              product_categories: [],
                              buy_links: [
                                { url: product.amazon, retailer: 'Amazon' },
                              ],
                            };
                            trackProductInteraction(
                              mockProduct,
                              'buy',
                              'Amazon',
                            );
                          }}
                        >
                          {product.product}
                          <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      ) : (
                        <span className="text-xs leading-tight">
                          {product.product}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-0.5 max-w-full">
                      {product.drugstore && (
                        <span className="badge badge-xs text-xs badge-success">
                          Drugstore
                        </span>
                      )}
                      {getHeavinessBadges(product.heaviness)}
                    </div>
                    {product.comments && (
                      <p className="text-xs text-base-content/70 mt-1 leading-tight">
                        {product.comments}
                      </p>
                    )}
                  </div>
                </td>
                <td>{getStepBadges(product.steps)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
