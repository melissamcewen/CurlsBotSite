'use client';

import { useState, useMemo } from 'react';
import {
  bondProducts,
  type BondProduct,
} from '@/data/bondProducts';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

type SortField = 'name' | 'activeType' | 'bondRepairResearchGrade';
type SortDirection = 'asc' | 'desc';

interface BondProductsTableProps {
  className?: string;
}

export default function BondProductsTable({
  className = '',
}: BondProductsTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [curlFocusedOnly, setCurlFocusedOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    // First filter by curl focused if needed
    const filtered = curlFocusedOnly
      ? bondProducts.filter((product) => product.curlFocused)
      : bondProducts;

    // Then sort
    return [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'activeType':
          aValue = a.activeType.toLowerCase();
          bValue = b.activeType.toLowerCase();
          break;
        case 'bondRepairResearchGrade':
          aValue = a.bondRepairResearchGrade.toLowerCase();
          bValue = b.bondRepairResearchGrade.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
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
  }, [sortField, sortDirection, curlFocusedOnly]);

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

  const getResearchGradeBadge = (grade: string) => {
    if (!grade) return null;

    const gradeMap: Record<string, string> = {
      A: 'badge-success',
      B: 'badge-info',
      C: 'badge-warning',
      D: 'badge-warning',
      F: 'badge-error',
    };

    const badgeClass = gradeMap[grade] || 'badge-neutral';

    return (
      <span className={`badge badge-xs text-xs ${badgeClass}`}>
        {grade}
      </span>
    );
  };

  const getRetailerFromLink = (link: string): string => {
    if (link.includes('amzn.to') || link.includes('amazon.com')) {
      return 'Amazon';
    }
    if (link.includes('ulta.com')) {
      return 'Ulta';
    }
    return 'Retailer';
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={curlFocusedOnly}
            onChange={(e) => setCurlFocusedOnly(e.target.checked)}
          />
          <label className="text-xs font-medium">
            Show curl focused products only
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
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Product
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-base-200"
                onClick={() => handleSort('activeType')}
              >
                <div className="flex items-center gap-2">
                  Active Type
                  {getSortIcon('activeType')}
                </div>
              </th>
              <th
                className="cursor-pointer hover:bg-base-200"
                onClick={() => handleSort('bondRepairResearchGrade')}
              >
                <div className="flex items-center gap-2">
                  Research Grade
                  {getSortIcon('bondRepairResearchGrade')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.map((product, index) => {
              const retailer = getRetailerFromLink(product.link);
              return (
                <tr key={index}>
                  <td className="font-medium text-xs align-top">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start gap-2">
                        {product.link ? (
                          <a
                            href={product.link}
                            target="_blank"
                            className="link link-primary hover:link-hover text-xs leading-tight"
                            ref={(el) => {
                              if (el) {
                                // Create a mock product object for tracking
                                const mockProduct = {
                                  id: product.name
                                    .toLowerCase()
                                    .replace(/\s+/g, '-'),
                                  name: product.name,
                                  brand: '',
                                  product_categories: [],
                                  buy_links: [
                                    { url: product.link, retailer },
                                  ],
                                };
                                addProductTrackingAttributes(
                                  el,
                                  mockProduct,
                                  'buy',
                                  retailer,
                                );
                              }
                            }}
                            onClick={() => {
                              // Create a mock product object for tracking
                              const mockProduct = {
                                id: product.name
                                  .toLowerCase()
                                  .replace(/\s+/g, '-'),
                                name: product.name,
                                brand: '',
                                product_categories: [],
                                buy_links: [
                                  { url: product.link, retailer },
                                ],
                              };
                              trackProductInteraction(
                                mockProduct,
                                'buy',
                                retailer,
                              );
                            }}
                          >
                            {product.name}
                            <ExternalLink className="w-3 h-3 inline ml-1" />
                          </a>
                        ) : (
                          <span className="text-xs leading-tight">
                            {product.name}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-0.5 max-w-full">
                        {product.curlFocused && (
                          <span className="badge badge-xs text-xs badge-success">
                            Curl Focused
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-xs align-top">
                    {product.activeType || '-'}
                  </td>
                  <td className="align-top">
                    {getResearchGradeBadge(product.bondRepairResearchGrade)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}






