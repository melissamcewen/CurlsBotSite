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
import { useLocalization } from '@/contexts/LocalizationContext';
import { filterProducts } from '@/lib/productFiltering';
import type { CountryCode } from '@/lib/countryDetection';

// Define internal types rather than importing from routineBuilder
export type PorosityType =
  | 'high_porosity'
  | 'low_porosity'
  | 'normal_porosity'
  | 'mixed_porosity';

export type ProductCategory =
  | 'pre-poo'
  | 'clarifying_shampoos'
  | 'shampoos'
  | 'cowashes'
  | 'conditioners'
  | 'deep_conditioners'
  | 'leave_ins'
  | 'creams'
  | 'foams'
  | 'custards'
  | 'gels'
  | 'oils'
  | 'sprays'
  | 'accessories';

interface HairRoutineProps {
  hairType?: string;
  initialPorosity?: PorosityType;
  curlsBotType?: string;
}

// Straight hair types that shouldn't use leave-in conditioners
const STRAIGHT_HAIR_TYPES = [
  'Straight fine hair',
  'Straight hair',
  'Straight thick hair',
];

// Keywords to exclude for straight hair types
const CURL_WAVE_KEYWORDS = ['curl', 'curls', 'curly', 'wave', 'waves', 'wavy'];

// IMPORTANT: ALL product categories can be appropriate for ANY porosity type when used correctly
// Do not restrict categories by porosity - this creates unnecessary limitations
// Products that might traditionally be "too heavy" can work for low porosity hair when applied in the right amount
// Products that might traditionally be "too light" can work for high porosity hair as a base layer

export default function HairRoutine({
  hairType,
  initialPorosity = 'normal_porosity',
  curlsBotType,
}: HairRoutineProps) {
  const { country, countryName } = useLocalization();
  const [isCGM, setIsCGM] = useState(true);
  const [isMinimal, setIsMinimal] = useState(false);
  const [porosity, setPorosity] = useState<PorosityType>(initialPorosity);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if we should include leave-in based on hair type
  const isStraightHair =
    curlsBotType && STRAIGHT_HAIR_TYPES.includes(curlsBotType);

  // Initialize product categories based on hair type
  const initialProducts: Record<string, Product | null> = {
    shampoo: null,
    conditioner: null,
    styler: null,
  };

  // Only add leave-in for non-straight hair types
  if (!isStraightHair) {
    initialProducts.leaveIn = null;
  }

  const [routineProducts, setRoutineProducts] =
    useState<Record<string, Product | null>>(initialProducts);

  // Map our UI categories to product categories from the API
  const categoryMapping: Record<string, ProductCategory | ProductCategory[]> = {
    shampoo: 'shampoos',
    conditioner: 'conditioners',
    ...(isStraightHair ? {} : { leaveIn: 'leave_ins' }),
    styler: isStraightHair
      ? 'oils' // For straight hair types, only use oils as stylers
      : ['creams', 'foams', 'custards', 'gels', 'oils', 'sprays'],
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
        // Try a random category first
        const randomCategoryIndex = Math.floor(Math.random() * category.length);
        let categoryIndex = randomCategoryIndex;
        let attempts = 0;

        // Try each category in the array until we find products or run out of categories
        while (filteredProducts.length === 0 && attempts < category.length) {
          const selectedCategory = category[categoryIndex];

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
                // Pass porosity information to filter, but allow fallbacks
                // if products aren't found with strict filtering
                highPorosity:
                  porosity === 'high_porosity' || porosity === 'mixed_porosity',
                lowPorosity:
                  porosity === 'low_porosity' || porosity === 'mixed_porosity',
              },
            },
          );

          // If no products found with this category, try the next one
          if (filteredProducts.length === 0) {
            categoryIndex = (categoryIndex + 1) % category.length;
            attempts++;
          }
        }
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

      // Additional filtering for straight hair types to exclude curl/wave products
      if (isStraightHair) {
        filteredProducts = filteredProducts.filter((product) => {
          const nameAndBrand = `${product.name} ${product.brand}`.toLowerCase();
          return !CURL_WAVE_KEYWORDS.some((keyword) =>
            nameAndBrand.includes(keyword.toLowerCase()),
          );
        });
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

      // Create category mapping inside the effect to avoid dependency issues
      const effectCategoryMapping: Record<
        string,
        ProductCategory | ProductCategory[]
      > = {
        shampoo: 'shampoos',
        conditioner: 'conditioners',
        ...(isStraightHair ? {} : { leaveIn: 'leave_ins' }),
        styler: isStraightHair
          ? 'oils' // For straight hair types, only use oils as stylers
          : ['creams', 'foams', 'custards', 'gels', 'oils', 'sprays'],
      };

      // Fetch a product for each category
      Object.entries(effectCategoryMapping).forEach(([key, category]) => {
        newProducts[key] = getRandomProductForCategory(category);
      });

      setRoutineProducts(newProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, [isCGM, isMinimal, porosity, country, isStraightHair]);

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
        {isStraightHair && (
          <span className="block mt-2 text-xs italic">
            Note: Leave-in conditioners are typically not recommended for
            straight hair types. We&apos;ve also excluded products specifically
            marketed for curly or wavy hair.
          </span>
        )}
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
