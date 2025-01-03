'use client';

import { useState } from 'react';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import {
  ShoppingBagIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  BeakerIcon,
} from '@heroicons/react/24/solid';
import { getCountryFromHostname } from '@/lib/countryDetection';
import Link from 'next/link';
import type { PorosityType } from '@/lib/routineBuilder';

type CountryCode = 'US' | 'UK' | 'AU';
type PriceRange = '$' | '$$' | '$$$';
type SortField =
  | 'brand'
  | 'name'
  | 'category'
  | 'cost_rating'
  | 'country'
  | 'status';
type SortDirection = 'asc' | 'desc';

export default function ProductsPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'all'>(
    () => {
      const detectedCountry = getCountryFromHostname();
      console.log('Detected country:', detectedCountry);
      return detectedCountry === 'US' ||
        detectedCountry === 'UK' ||
        detectedCountry === 'AU'
        ? detectedCountry
        : 'all';
    },
  );
  const [selectedPrice, setSelectedPrice] = useState<PriceRange | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPorosity, setSelectedPorosity] = useState<
    PorosityType | 'all'
  >('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>('brand');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const products = getBundledProducts();
  console.log('Total products loaded:', Object.keys(products.products).length);

  // Convert products to array and apply filters
  const filteredProducts = Object.values(products.products).filter(
    (product) => {
      if (
        !product.product_categories ||
        product.product_categories.length === 0
      )
        return false;
      if (product.product_categories.includes('accessories')) return false;
      if (
        selectedCountry !== 'all' &&
        (product.country || 'US') !== selectedCountry
      )
        return false;
      if (selectedPrice !== 'all') {
        const costRating = parseInt(product.cost_rating || '0');
        switch (selectedPrice) {
          case '$':
            if (costRating !== 1) return false;
            break;
          case '$$':
            if (costRating !== 2) return false;
            break;
          case '$$$':
            if (costRating < 3) return false;
            break;
        }
      }
      if (showFeaturedOnly && !product.tags?.includes('featured')) return false;
      if (
        selectedCategory !== 'all' &&
        !product.product_categories.includes(selectedCategory)
      )
        return false;
      if (
        selectedPorosity !== 'all' &&
        !product.tags?.includes(selectedPorosity)
      )
        return false;
      return true;
    },
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField as keyof typeof a] || '';
    let bValue = b[sortField as keyof typeof b] || '';

    // Handle special cases
    if (sortField === 'category') {
      aValue = a.product_categories?.[0] || '';
      bValue = b.product_categories?.[0] || '';
    }
    if (sortField === 'country') {
      aValue = a.country || 'US';
      bValue = b.country || 'US';
    }
    if (sortField === 'cost_rating') {
      aValue = a.cost_rating || '0';
      bValue = b.cost_rating || '0';
    }

    const comparison = aValue.toString().localeCompare(bValue.toString());
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Get unique categories for filter
  const categories = [
    ...new Set(
      Object.values(products.products)
        .flatMap((p) => p.product_categories || [])
        .filter((c) => c !== 'accessories'),
    ),
  ].sort();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getPriceDisplay = (costRating: string | undefined) => {
    const rating = parseInt(costRating || '0');
    switch (rating) {
      case 1:
        return '$';
      case 2:
        return '$$';
      case 3:
      case 4:
      case 5:
        return '$$$';
      default:
        return '-';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Product Database</h1>
        <p className="text-base-content/70 text-lg mb-2">
          Browse our curated collection of curly and wavy hair products. I look at each product individually and analyze it before adding it to our database. See our{' '}
          <Link href="/routine-builder" className="link link-primary">
            Routine Builder
          </Link>{' '}
          if you want to learn how these products work together. I add new
          products weekly. If there is a product you&apos;d like to see, please
          email me at <a href="mailto:hello@curlsbot.com">hello@curlsbot.com</a>
        </p>
        <p className="text-base-content/70 text-sm flex items-center gap-2">
          <ShoppingBagIcon className="w-4 h-4 flex-shrink-0" />
          Product links are affiliate links that help support the site
        </p>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 mb-8">
        <div className="card-body">
          <h2 className="card-title flex gap-2">
            <FunnelIcon className="w-5 h-5" />
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedCountry}
                onChange={(e) =>
                  setSelectedCountry(e.target.value as CountryCode | 'all')
                }
              >
                <option value="all">All Countries</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price Range</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedPrice}
                onChange={(e) =>
                  setSelectedPrice(e.target.value as PriceRange | 'all')
                }
              >
                <option value="all">All Prices</option>
                <option value="$">$</option>
                <option value="$$">$$</option>
                <option value="$$$">$$$</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Porosity</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedPorosity}
                onChange={(e) =>
                  setSelectedPorosity(e.target.value as PorosityType | 'all')
                }
              >
                <option value="all">All Types</option>
                <option value="low_porosity">Low Porosity</option>
                <option value="normal_porosity">Normal Porosity</option>
                <option value="high_porosity">High Porosity</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('brand')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  Brand
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th onClick={() => handleSort('name')} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  Product
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                onClick={() => handleSort('category')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  Category
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>
              <th
                onClick={() => handleSort('cost_rating')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  Price Rating
                  <ChevronUpDownIcon className="w-4 h-4" />
                </div>
              </th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id || product.name}>
                <td>{product.brand}</td>
                <td className="flex flex-col gap-2">
                  <a
                    href={product.buy_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    {product.name}
                  </a>
                  {product.status === 'ok' && (
                    <div className="badge badge-outline badge-info badge-sm gap-1 whitespace-nowrap">
                      <CheckCircleIcon className="w-4 h-4" />
                      CurlsBot Approved
                    </div>
                  )}
                  {product.description && (
                    <p className="text-xs text-base-content/70">
                      {product.description}
                    </p>
                  )}
                </td>
                <td className="capitalize">
                  {product.product_categories?.[0]?.replace(/_/g, ' ')}
                </td>
                <td>{getPriceDisplay(product.cost_rating)}</td>

                <td className="">
                  {product.ingredients_raw && (
                    <Link
                      href={`/?ingredients=${encodeURIComponent(
                        product.ingredients_raw,
                      )}`}
                      className="btn btn-xs btn-secondary gap-2 whitespace-nowrap flex items-center min-w-24 text-secondary-content"
                    >
                      <BeakerIcon className="w-4 h-4" />
                      Analyze
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
