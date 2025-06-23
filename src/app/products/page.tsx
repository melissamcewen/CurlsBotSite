'use client';

import { useState, useEffect } from 'react';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import {
  ShoppingBag,
  Filter,
  ArrowUpDown,
  CheckCircle,
  FlaskConical,
  ShoppingCart,
  XCircle,
  Cloud,
  Droplets,
  Dam,
  Droplet,
  Search,
  Sparkles,
} from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';
import Link from 'next/link';
import type { PorosityType } from '@/lib/routineBuilder';
import { filterProducts } from '@/lib/productFiltering';
import { POROSITY_THRESHOLDS } from '@/lib/porosity';

type CountryCode = 'US' | 'UK' | 'AU' | 'EU';
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
  const { country, setCountry } = useLocalization();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'all'>(
    'all',
  );

  // Ensure that the LocalizationContext country is updated whenever selectedCountry changes
  useEffect(() => {
    if (selectedCountry !== 'all') {
      setCountry(selectedCountry);
    }
  }, [selectedCountry, setCountry]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>('brand');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Analysis filter states
  const [cgmApproved, setCgmApproved] = useState(false);
  const [frizzResistant, setFrizzResistant] = useState(false);
  const [lightweight, setLightweight] = useState(false);
  const [highPorosity, setHighPorosity] = useState(false);
  const [lowPorosity, setLowPorosity] = useState(false);

  const products = getBundledProducts();

  // Convert products to array and apply filters
  const filteredProducts = filterProducts(Object.values(products.products), {
    country: selectedCountry,
    category: selectedCategory,
    requireFeatured: showFeaturedOnly,
    searchQuery,
    analysisFilters: {
      cgmApproved,
      frizzResistant,
      lightweight,
      highPorosity,
      lowPorosity,
    },
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // First prioritize products with the "samples" tag
    const aSample = a.tags?.includes('samples') || false;
    const bSample = b.tags?.includes('samples') || false;

    // If one has samples tag and the other doesn't, prioritize the one with samples
    if (aSample && !bSample) return -1;
    if (!aSample && bSample) return 1;

    // Otherwise sort normally
    let aValue = a[sortField as keyof typeof a] || '';
    let bValue = b[sortField as keyof typeof b] || '';

    // Handle special cases
    if (sortField === 'category') {
      aValue = a.product_categories?.[0] || '';
      bValue = b.product_categories?.[0] || '';
    }
    if (sortField === 'country') {
      // Get all unique countries from buy links, defaulting to US if none specified
      const aCountries = [
        ...new Set(
          a.buy_links?.flatMap((link) => link.countries || ['US']) || ['US'],
        ),
      ]
        .sort()
        .join(',');
      const bCountries = [
        ...new Set(
          b.buy_links?.flatMap((link) => link.countries || ['US']) || ['US'],
        ),
      ]
        .sort()
        .join(',');
      aValue = aCountries;
      bValue = bCountries;
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
        .filter((c) => c !== 'featured'),
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
    <div className="max-w-7xl mx-auto p-2 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Product Database</h1>
        <p className="text-base-content/70 text-lg mb-2">
          Browse our curated collection of curly and wavy hair products. I look
          at each product individually and analyze it before adding it to our
          database. See our{' '}
          <Link href="/routine-builder" className="link link-primary">
            Routine Builder
          </Link>{' '}
          if you want to learn how these products work together. I add new
          products weekly. If there is a product you&apos;d like to see, please
          email me at <a href="mailto:info@curlsbot.com">info@curlsbot.com</a>
        </p>
        <p className="text-base-content/70 text-sm flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 flex-shrink-0" />
          Product links are affiliate links that help support the site
        </p>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 mb-8">
        <div className="card-body">
          <h2 className="card-title flex gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h2>
          <div className="flex flex-col gap-4">
            {/* Search Box */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Search Products</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by product name or brand..."
                  className="input input-bordered w-full pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-base-content/50" />
              </div>
            </div>

            {/* Country Filters */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCountry('all')}
                  className={`btn btn-sm gap-2 ${
                    selectedCountry === 'all' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  All Countries
                  {selectedCountry === 'all' && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedCountry('US')}
                  className={`btn btn-sm gap-2 ${
                    selectedCountry === 'US' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  United States
                  {selectedCountry === 'US' && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedCountry('UK')}
                  className={`btn btn-sm gap-2 ${
                    selectedCountry === 'UK' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  United Kingdom
                  {selectedCountry === 'UK' && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedCountry('AU')}
                  className={`btn btn-sm gap-2 ${
                    selectedCountry === 'AU' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  Australia
                  {selectedCountry === 'AU' && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedCountry('EU')}
                  className={`btn btn-sm gap-2 ${
                    selectedCountry === 'EU' ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  European Union
                  {selectedCountry === 'EU' && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`btn btn-sm gap-2 ${
                    selectedCategory === 'all' ? 'btn-secondary' : 'btn-outline'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn btn-sm gap-2 ${
                      selectedCategory === category
                        ? 'btn-secondary'
                        : 'btn-outline'
                    }`}
                  >
                    {category.replace(/_/g, ' ')}
                    {selectedCategory === category && (
                      <span className="badge badge-sm">
                        <XCircle className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Filters */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Features</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCgmApproved(!cgmApproved)}
                  className={`btn btn-sm gap-2 ${
                    cgmApproved ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  CGM Approved
                  {cgmApproved && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setFrizzResistant(!frizzResistant)}
                  className={`btn btn-sm gap-2 ${
                    frizzResistant ? 'btn-secondary' : 'btn-outline'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  Humidity Resistant
                  {frizzResistant && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setLightweight(!lightweight)}
                  className={`btn btn-sm gap-2 ${
                    lightweight ? 'btn-accent' : 'btn-outline'
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  Lightweight
                  {lightweight && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setHighPorosity(!highPorosity)}
                  className={`btn btn-sm gap-2 ${
                    highPorosity ? 'btn-primary bg-primary/80' : 'btn-outline'
                  }`}
                >
                  <Dam className="w-4 h-4" />
                  High Porosity
                  {highPorosity && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setLowPorosity(!lowPorosity)}
                  className={`btn btn-sm gap-2 ${
                    lowPorosity
                      ? 'btn-secondary bg-secondary/80'
                      : 'btn-outline'
                  }`}
                >
                  <Droplet className="w-4 h-4" />
                  Low Porosity
                  {lowPorosity && (
                    <span className="badge badge-sm">
                      <XCircle className="w-3 h-3" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table bg-base-100 table-zebra">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('brand')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  Brand
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th onClick={() => handleSort('name')} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  Product
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                onClick={() => handleSort('category')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  Category
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id || product.name}>
                <td>{product.brand}</td>
                <td>
                  <div>
                    <span>{product.name}</span>
                    {product.description && (
                      <p className="text-xs text-base-content/70 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="capitalize">
                  {product.product_categories?.[0]?.replace(/_/g, ' ')}
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {product.status === 'ok' && (
                      <div className="badge badge-primary gap-1 whitespace-nowrap text-xs">
                        <CheckCircle className="w-3 h-3" />
                        <Link href="/curly-girl-method" className="link">
                          CGM
                        </Link>
                      </div>
                    )}
                    {product.extensions?.frizzbot &&
                      product.extensions.frizzbot.score <= -50 && (
                        <div className="badge badge-secondary whitespace-nowrap text-xs">
                          Humidity Resistant
                        </div>
                      )}
                    {product.extensions?.porosity &&
                      product.extensions.porosity.low >=
                        POROSITY_THRESHOLDS.LIGHTWEIGHT && (
                        <div className="badge badge-accent whitespace-nowrap text-xs">
                          Lightweight
                        </div>
                      )}
                    {product.extensions?.porosity &&
                      product.extensions.porosity.high >=
                        POROSITY_THRESHOLDS.HIGH_POROSITY && (
                        <div className="badge badge-primary bg-primary/80 whitespace-nowrap text-xs">
                          High Porosity
                        </div>
                      )}
                    {product.extensions?.porosity &&
                      product.extensions.porosity.low >=
                        POROSITY_THRESHOLDS.LOW_POROSITY && (
                        <div className="badge badge-secondary bg-secondary/80 whitespace-nowrap text-xs">
                          Low Porosity
                        </div>
                      )}
                  </div>
                </td>
                <td className="flex flex-col gap-2">
                  {product.ingredients_raw && (
                    <Link
                      href={`/analyzer?ingredients=${encodeURIComponent(
                        product.ingredients_raw,
                      )}`}
                      className="btn btn-xs btn-secondary gap-2 whitespace-nowrap flex items-center min-w-24 text-secondary-content"
                    >
                      <FlaskConical className="w-4 h-4" />
                      Analyze
                    </Link>
                  )}
                  <div className="flex flex-col gap-1">
                    {product.buy_links
                      ?.filter(
                        (link) =>
                          selectedCountry === 'all' ||
                          link.countries?.includes(selectedCountry) ||
                          (selectedCountry === 'US' &&
                            (!link.countries || link.countries.length === 0)),
                      )
                      .slice(0, 2) // Limit to 2 buy links
                      .map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-xs btn-outline flex items-center gap-2 flex-nowrap min-w-48"
                        >
                          <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-nowrap">
                            Buy on{' '}
                            {link.retailer ||
                              (selectedCountry === 'US' ||
                              selectedCountry === 'all'
                                ? 'Amazon'
                                : `Amazon ${selectedCountry}`)}
                          </span>
                        </a>
                      ))}
                  </div>

                  {/* "Try a sample" button for products with the "samples" tag */}
                  {product.tags?.includes('samples') && (
                    <a
                      href="https://curlsmonthly.com/?ref=curlsbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs btn-secondary gap-2 whitespace-nowrap flex items-center  text-secondary-content"
                    >
                      <Sparkles className="w-4 h-4 flex-shrink-0" />
                      Try a sample
                    </a>
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
