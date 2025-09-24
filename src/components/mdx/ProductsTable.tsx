'use client';

import React, { useState } from 'react';
import { ArrowUpDown, Info } from 'lucide-react';
import Link from 'next/link';
import {
  addProductTrackingAttributes,
  trackProductInteraction,
} from '@/utils/productTracking';

interface Product {
  name: string;
  url: string;
  amazonUrl?: string;
  buyText: string;
  country: string;
  cgmApproved: boolean;
  pH: string;
  sample?: boolean;
}

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [sortField, setSortField] = useState<keyof Product>('pH');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Helper function to truncate long button text on mobile
  const truncateText = (text: string, maxLength: number = 8) => {
    // Only truncate on small screens
    if (
      typeof window !== 'undefined' &&
      window.innerWidth <= 640 &&
      text.length > maxLength
    ) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'pH') {
      // Extract the first number from the pH range for sorting purposes
      const getFirstNumber = (ph: string) => {
        const match = ph.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
      };

      const phA = getFirstNumber(a[sortField]);
      const phB = getFirstNumber(b[sortField]);
      comparison = phA - phB;
    } else if (typeof a[sortField] === 'boolean') {
      comparison = a[sortField] === b[sortField] ? 0 : a[sortField] ? -1 : 1;
    } else {
      comparison = String(a[sortField]).localeCompare(String(b[sortField]));
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="overflow-x-auto rounded-xl my-6">
      <table className="table table-zebra w-full bg-base-100 text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="text-xs sm:text-sm md:text-base">
            <th onClick={() => handleSort('name')} className="cursor-pointer">
              <div className="flex items-center">
                Name
                {sortField === 'name' && (
                  <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                )}
              </div>
            </th>
            <th>Buy Links</th>
            <th
              onClick={() => handleSort('country')}
              className="cursor-pointer"
            >
              <div className="flex items-center">
                Country
                {sortField === 'country' && (
                  <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                )}
              </div>
            </th>
            <th
              onClick={() => handleSort('cgmApproved')}
              className="cursor-pointer"
            >
              <div className="flex items-center">
                CGM
                <Link
                  href="/curly-girl-method"
                  target="_blank"
                  className="ml-2 text-primary hover:text-primary-focus"
                  title="Learn about the Curly Girl Method"
                  tabIndex={-1}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="w-4 h-4 inline" aria-label="About CGM" />
                </Link>
                {sortField === 'cgmApproved' && (
                  <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                )}
              </div>
            </th>
            <th onClick={() => handleSort('pH')} className="cursor-pointer">
              <div className="flex items-center">
                pH
                {sortField === 'pH' && (
                  <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm md:text-base">
          {sortedProducts.map((product, index) => (
            <tr key={index}>
              <td className="font-medium">
                <span className="text-xs sm:text-sm md:text-base">
                  {product.name}
                </span>
                {product.sample && (
                  <div className="mt-1">
                    <a
                      href="https://curlsmonthly.com/?ref=curlsbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-info hover:underline flex items-center"
                    >
                      Try a sample →
                    </a>
                  </div>
                )}
              </td>
              <td>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs sm:btn-sm btn-primary text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap h-auto min-h-[24px] sm:min-h-[32px] py-1 px-2"
                      title={product.buyText}
                      ref={(el) => {
                        if (el) {
                          // Create a mock product object for tracking
                          const mockProduct = {
                            id: product.name.toLowerCase().replace(/\s+/g, '-'),
                            name: product.name,
                            brand: '',
                            product_categories: [],
                            buy_links: [
                              { url: product.url, retailer: undefined },
                            ],
                          };
                          addProductTrackingAttributes(
                            el,
                            mockProduct,
                            'buy',
                            undefined,
                          );
                        }
                      }}
                      onClick={() => {
                        // Create a mock product object for tracking
                        const mockProduct = {
                          id: product.name.toLowerCase().replace(/\s+/g, '-'),
                          name: product.name,
                          brand: '',
                          product_categories: [],
                          buy_links: [
                            { url: product.url, retailer: undefined },
                          ],
                        };
                        trackProductInteraction(mockProduct, 'buy', undefined);
                      }}
                    >
                      <span className="line-clamp-1">{product.buyText}</span>
                    </a>
                  )}
                  {product.amazonUrl && (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs sm:btn-sm btn-accent text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap h-auto min-h-[24px] sm:min-h-[32px] py-1 px-2"
                      ref={(el) => {
                        if (el) {
                          // Create a mock product object for tracking
                          const mockProduct = {
                            id: product.name.toLowerCase().replace(/\s+/g, '-'),
                            name: product.name,
                            brand: '',
                            product_categories: [],
                            buy_links: [
                              { url: product.amazonUrl!, retailer: 'Amazon' },
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
                          id: product.name.toLowerCase().replace(/\s+/g, '-'),
                          name: product.name,
                          brand: '',
                          product_categories: [],
                          buy_links: [
                            { url: product.amazonUrl!, retailer: 'Amazon' },
                          ],
                        };
                        trackProductInteraction(mockProduct, 'buy', 'Amazon');
                      }}
                    >
                      Amazon
                    </a>
                  )}
                </div>
              </td>
              <td>{product.country}</td>
              <td>{product.cgmApproved ? '✅' : '❌'}</td>
              <td>{product.pH}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
