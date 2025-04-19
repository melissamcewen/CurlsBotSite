import { useState, useEffect } from 'react';
import {
  Shuffle,
  Droplets,
  Sparkles,
  ShoppingBag,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import type { Product } from 'haircare-ingredients-analyzer';
import {
  type PorosityType,
  type ProductCategory,
  type CountryCode,
} from '@/lib/routineBuilder';
import { useLocalization } from '@/contexts/LocalizationContext';
import { filterProducts } from '@/lib/productFiltering';

interface HairRoutineProps {
  hairType?: string;
  initialPorosity?: PorosityType;
}

export default function HairRoutine({
  hairType,
  initialPorosity = 'normal_porosity',
}: HairRoutineProps) {
  const { country, countryName } = useLocalization();
  const [isCGM, setIsCGM] = useState(true);
  const [isMinimal, setIsMinimal] = useState(false);
  const [porosity, setPorosity] = useState<PorosityType>(initialPorosity);
  const [isLoading, setIsLoading] = useState(true);
  const [routineProducts, setRoutineProducts] = useState<
    Record<string, Product | null>
  >({
    shampoo: null,
    conditioner: null,
    leaveIn: null,
    styler: null,
  });

  // Map our UI categories to product categories from the API
  const categoryMapping: Record<string, ProductCategory | ProductCategory[]> = {
    shampoo: 'shampoos',
    conditioner: 'conditioners',
    leaveIn: 'leave_ins',
    styler: ['creams', 'foams', 'custards', 'gels', 'oils', 'sprays'],
  };

  useEffect(() => {
    // Function to get a single random product for a category with a description
    const getRandomProductForCategory = (
      category: ProductCategory | ProductCategory[],
    ): Product | null => {
      const bundledProducts = getBundledProducts();
      let filteredProducts: Product[] = [];

      // Handle case where we want to select from multiple categories
      if (Array.isArray(category)) {
        // Randomly select one of the categories
        const randomCategoryIndex = Math.floor(Math.random() * category.length);
        const selectedCategory = category[randomCategoryIndex];

        filteredProducts = filterProducts(
          Object.values(bundledProducts.products),
          {
            country,
            category: selectedCategory,
            requireFeatured: false,
            analysisFilters: {
              cgmApproved: isCGM,
              frizzResistant: false,
              lightweight: isMinimal,
              highPorosity:
                porosity === 'high_porosity' || porosity === 'mixed_porosity',
              lowPorosity:
                porosity === 'low_porosity' || porosity === 'mixed_porosity',
            },
          },
        );
      } else {
        // Single category case
        filteredProducts = filterProducts(
          Object.values(bundledProducts.products),
          {
            country,
            category,
            requireFeatured: false,
            analysisFilters: {
              cgmApproved: isCGM,
              frizzResistant: false,
              lightweight: isMinimal,
              highPorosity:
                porosity === 'high_porosity' || porosity === 'mixed_porosity',
              lowPorosity:
                porosity === 'low_porosity' || porosity === 'mixed_porosity',
            },
          },
        );
      }

      if (filteredProducts.length === 0) {
        return null;
      }

      // First try to find products with descriptions
      const productsWithDescription = filteredProducts.filter(
        (product) => product.description && product.description.trim() !== '',
      );

      // If we have products with descriptions, use one of those
      if (productsWithDescription.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * productsWithDescription.length,
        );
        return productsWithDescription[randomIndex];
      }

      // Otherwise, use any product
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      return filteredProducts[randomIndex];
    };

    const loadProducts = async () => {
      setIsLoading(true);
      const newProducts: Record<string, Product | null> = {};

      // Fetch a product for each category
      Object.entries(categoryMapping).forEach(([key, category]) => {
        newProducts[key] = getRandomProductForCategory(category);
      });

      setRoutineProducts(newProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, [isCGM, isMinimal, porosity, country]);

  const handleShuffle = () => {
    // Trigger re-render by changing a dependency of the useEffect
    const timestamp = new Date().getTime();
    setIsCGM((prevState) => {
      // Toggle and immediately toggle back to trigger effect without changing value
      setTimeout(() => setIsCGM(prevState), 0);
      return !prevState;
    });
  };

  // Add country selector
  const { setCountry } = useLocalization();

  // Icons for each product type
  const productIcons = {
    shampoo: <Droplets className="w-4 h-4 text-primary" />,
    conditioner: <Sparkles className="w-4 h-4 text-secondary" />,
    leaveIn: <Layers className="w-4 h-4 text-accent" />,
    styler: <ShoppingBag className="w-4 h-4 text-info" />,
  };

  return (
    <div className="bg-base-100 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Routine</h3>
      </div>

      <p className="text-sm mb-4">
        We&apos;ve put together a routine for you{' '}
        {hairType
          ? `based on your ${hairType} hair`
          : 'based on your hair type'}
        . Showing products available in {countryName}.
      </p>

      <div className="bg-base-200 rounded-lg p-4 mb-5">
        <h4 className="font-bold mb-3 text-sm">Routine Settings</h4>

        {/* Settings in a more compact grid layout */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1 flex items-center justify-between bg-base-100 rounded-lg p-3">
            <span className="text-sm font-medium">CGM</span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={isCGM}
              onChange={(e) => setIsCGM(e.target.checked)}
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-between bg-base-100 rounded-lg p-3">
            <span className="text-sm font-medium">Minimal Routine</span>
            <input
              type="checkbox"
              className="toggle toggle-secondary toggle-sm"
              checked={isMinimal}
              onChange={(e) => setIsMinimal(e.target.checked)}
            />
          </div>

          <div className="col-span-1">
            <select
              className="select select-bordered w-full text-sm h-11 bg-base-100"
              value={porosity}
              onChange={(e) => setPorosity(e.target.value as PorosityType)}
            >
              <option value="low_porosity">Low Porosity</option>
              <option value="normal_porosity">Normal Porosity</option>
              <option value="high_porosity">High Porosity</option>
              <option value="mixed_porosity">Mixed Porosity</option>
            </select>
          </div>

          <div className="col-span-1">
            <select
              className="select select-bordered w-full text-sm h-11 bg-base-100"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
            >
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="EU">European Union</option>
            </select>
          </div>

          <button
            className="btn btn-primary col-span-2 h-11 flex gap-2"
            onClick={handleShuffle}
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
        </div>
      </div>

      {/* Products as cards with icons */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        data-testid="product-grid"
      >
        {isLoading ? (
          <div className="col-span-2 text-center py-8">
            <div className="loading loading-spinner loading-md text-primary"></div>
            <p className="mt-2 text-sm">Loading recommendations...</p>
          </div>
        ) : Object.values(routineProducts).every(
            (product) => product === null,
          ) ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-sm">
              No products found matching your criteria in {countryName}. Try
              changing your filters or country.
            </p>
            <button
              className="btn btn-primary btn-sm mt-4"
              onClick={handleShuffle}
            >
              <Shuffle className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : (
          Object.entries(routineProducts).map(([key, product]) => {
            if (!product) return null;

            return (
              <div key={key} className="bg-base-200 rounded-lg p-4 flex gap-3">
                <div className="flex-shrink-0 bg-base-100 rounded-full w-10 h-10 flex items-center justify-center">
                  {productIcons[key as keyof typeof productIcons]}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm">
                    {product.buy_links && product.buy_links.length > 0 ? (
                      <a
                        href={
                          product.buy_links.find(
                            (link) => (link.country || 'US') === country,
                          )?.url || product.buy_links[0].url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {product.brand} {product.name}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    ) : (
                      <span>
                        {product.brand} {product.name}
                      </span>
                    )}
                    {/* I do not want the badges please do not add back */}
                  </h5>
                  <p className="text-sm my-1 text-base-content/80">
                    {product.description || ''}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
