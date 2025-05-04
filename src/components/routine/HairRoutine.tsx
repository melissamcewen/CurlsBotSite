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
import type { CountryCode } from '@/lib/countryDetection';
import { POROSITY_THRESHOLDS } from '@/lib/porosity';

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
  | 'treatments'
  | 'accessories';

// Categories that should not use porosity filtering (copied from porosity.ts)
const POROSITY_EXEMPT_CATEGORIES: ProductCategory[] = [
  'deep_conditioners',
  'pre-poo',
  'clarifying_shampoos',
  'accessories',
  'oils',
];

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

// Wavy hair types that should use wavy-tagged products
const WAVY_HAIR_TYPES = ['Wavy fine hair', 'Wavy hair', 'Loose curls'];

// Keywords to exclude for straight hair types
const CURL_WAVE_KEYWORDS = ['curl', 'curls', 'curly', 'wave', 'waves', 'wavy'];

// IMPORTANT: ALL product categories can be appropriate for ANY porosity type when used correctly
// Do not restrict categories by porosity - this creates unnecessary limitations
// Products that might traditionally be "too heavy" can work for low porosity hair when applied in the right amount
// Products that might traditionally be "too light" can work for high porosity hair as a base layer

// Filter products function implemented directly in the component
function filterProductsInComponent(
  products: Product[],
  options: {
    country: string;
    category: string;
    requireFeatured: boolean;
    analysisFilters: {
      cgmApproved: boolean;
      frizzResistant: boolean;
      lightweight: boolean;
      highPorosity: boolean;
      lowPorosity: boolean;
    };
  },
): Product[] {
  return products.filter((product) => {
    // Country filter
    if (options.country !== 'all') {
      const hasCountry = product.buy_links?.some(
        (link) =>
          link.countries?.includes(options.country) ||
          (options.country === 'US' &&
            (!link.countries || link.countries.length === 0)),
      );
      if (!hasCountry) return false;
    }

    // Category filter
    if (options.category !== 'all') {
      if (!product.product_categories?.includes(options.category)) return false;
    }

    // Analysis-based filters - using AND logic
    if (options.analysisFilters.cgmApproved && product.status !== 'ok') {
      return false;
    }

    // Skip porosity filters for exempt categories
    if (
      options.category !== 'all' &&
      POROSITY_EXEMPT_CATEGORIES.includes(options.category as ProductCategory)
    ) {
      return true;
    }

    // Porosity filters from analysis
    const porosityScores = product.extensions?.porosity;
    if (porosityScores) {
      // High porosity products have high score >= threshold
      if (
        options.analysisFilters.highPorosity &&
        porosityScores.high < POROSITY_THRESHOLDS.HIGH_POROSITY
      ) {
        return false;
      }
      // Low porosity products have low score >= threshold
      if (
        options.analysisFilters.lowPorosity &&
        porosityScores.low < POROSITY_THRESHOLDS.LOW_POROSITY
      ) {
        return false;
      }
      // Lightweight products are a little bit different from low porosity set right now to low porosity - 20
      if (
        options.analysisFilters.lightweight &&
        porosityScores.low < POROSITY_THRESHOLDS.LIGHTWEIGHT
      ) {
        return false;
      }
    } else if (
      options.analysisFilters.highPorosity ||
      options.analysisFilters.lowPorosity ||
      options.analysisFilters.lightweight
    ) {
      // If any porosity filter is active but product has no porosity scores, exclude it
      return false;
    }

    // Frizz resistance filter
    const frizzScore = product.extensions?.frizzbot?.score;
    if (options.analysisFilters.frizzResistant) {
      if (!frizzScore || frizzScore > -50) {
        return false;
      }
    }

    return true;
  });
}

export default function HairRoutine({
  hairType,
  initialPorosity = 'normal_porosity',
  curlsBotType,
}: HairRoutineProps) {
  const { country, countryName } = useLocalization();
  const [isCGM, setIsCGM] = useState(true);
  const [isMinimal, setIsMinimal] = useState(true);
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

          filteredProducts = filterProductsInComponent(
            Object.values(bundledProducts.products),
            {
              country,
              category: selectedCategory,
              requireFeatured: false,
              analysisFilters: {
                cgmApproved: isCGM,
                frizzResistant: false,
                lightweight: false,
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
        filteredProducts = filterProductsInComponent(
          Object.values(bundledProducts.products),
          {
            country,
            category,
            requireFeatured: false,
            analysisFilters: {
              cgmApproved: isCGM,
              frizzResistant: false,
              lightweight: false,
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

      // Additional filtering based on curlsBotType and product tags
      if (curlsBotType) {
        let requiredTag: string | null = null;

        if (
          STRAIGHT_HAIR_TYPES.includes(curlsBotType) ||
          WAVY_HAIR_TYPES.includes(curlsBotType)
        ) {
          requiredTag = 'wavy';
        } else if (curlsBotType === 'Curly hair') {
          requiredTag = 'curly';
        } else if (curlsBotType === 'Very curly hair') {
          requiredTag = 'coily';
        }

        if (requiredTag) {
          const tagFilteredProducts = filteredProducts.filter((product) =>
            product.tags?.includes(requiredTag as string),
          );

          // Only apply tag filtering if we have products with the required tag
          // Otherwise, fall back to all filtered products to avoid empty results
          if (tagFilteredProducts.length > 0) {
            filteredProducts = tagFilteredProducts;
          }
        }
      }

      if (filteredProducts.length === 0) {
        return null;
      }

      // First try to find products with the samples tag
      const productsWithSamples = filteredProducts.filter((product) =>
        product.tags?.includes('samples'),
      );

      // If we have products with samples, use one of those
      if (productsWithSamples.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * productsWithSamples.length,
        );
        return productsWithSamples[randomIndex];
      }

      // If no products with samples, try to find products with descriptions
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

      // Create base category mapping
      const effectCategoryMapping: Record<
        string,
        ProductCategory | ProductCategory[]
      > = {
        shampoo: 'shampoos',
        conditioner: 'conditioners',
        ...(isStraightHair ? {} : { leaveIn: 'leave_ins' }),
        styler: isStraightHair
          ? ['oils', 'sprays'] // For straight hair types, use oils and sprays as stylers
          : ['creams', 'foams', 'custards', 'gels', 'oils', 'sprays'],
        ...(isMinimal
          ? {}
          : {
              // Add additional categories for non-minimal routine
              deepConditioner: isStraightHair
                ? 'treatments'
                : 'deep_conditioners',
              clarifyingShampoo: 'clarifying_shampoos',
              prePoo: 'pre-poo',
            }),
      };

      // Fetch a product for each initial category (excluding styler2, which will be handled separately)
      for (const [key, category] of Object.entries(effectCategoryMapping)) {
        newProducts[key] = getRandomProductForCategory(category);
      }

      // Add second styler for non-minimal routine and non-straight hair
      // Make sure it's a different category than the first styler
      if (!isMinimal && !isStraightHair) {
        const firstStylerProduct = newProducts.styler;
        if (firstStylerProduct) {
          // Get the category of the first styler
          const firstStylerCategory =
            firstStylerProduct.product_categories.find((cat) =>
              [
                'creams',
                'foams',
                'custards',
                'gels',
                'oils',
                'sprays',
              ].includes(cat),
            ) as ProductCategory | undefined;

          // Create a list of categories excluding the one used for the first styler
          const remainingCategories: ProductCategory[] = [
            'creams',
            'foams',
            'custards',
            'gels',
            'oils',
            'sprays',
          ].filter((cat) => cat !== firstStylerCategory) as ProductCategory[];

          // Get a product from a different category
          if (remainingCategories.length > 0) {
            newProducts.styler2 =
              getRandomProductForCategory(remainingCategories);
          }
        }
      }

      // Convert to ordered products to control the display order
      const orderedProducts: Record<string, Product | null> = {};

      // Define the order: pre-poo, clarifying, shampoo, conditioner, deep conditioner, leave-in, styler, styler2
      const orderedKeys = [
        'prePoo',
        'clarifyingShampoo',
        'shampoo',
        'conditioner',
        'deepConditioner',
        'leaveIn',
        'styler',
        'styler2',
      ];

      // Add products in the defined order if they exist
      for (const key of orderedKeys) {
        if (key in newProducts) {
          orderedProducts[key] = newProducts[key];
        }
      }

      setRoutineProducts(orderedProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, [isCGM, isMinimal, porosity, country, isStraightHair, curlsBotType]);

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
    prePoo: <Droplets className="w-4 h-4 text-info" />,
    shampoo: <Droplets className="w-4 h-4 text-primary" />,
    clarifyingShampoo: <Droplets className="w-4 h-4 text-error" />,
    conditioner: <Sparkles className="w-4 h-4 text-secondary" />,
    deepConditioner: <Sparkles className="w-4 h-4 text-accent" />,
    leaveIn: <Layers className="w-4 h-4 text-accent" />,
    styler: <ShoppingBag className="w-4 h-4 text-info" />,
    styler2: <ShoppingBag className="w-4 h-4 text-success" />,
  };

  // Product display names
  const productDisplayNames: Record<string, string> = {
    prePoo: 'Pre-Poo Treatment',
    shampoo: 'Shampoo',
    clarifyingShampoo: 'Clarifying Shampoo',
    conditioner: 'Conditioner',
    deepConditioner: isStraightHair ? 'Treatment' : 'Deep Conditioner',
    leaveIn: 'Leave-in Conditioner',
    styler: 'Styling Product',
    styler2: 'Additional Styler',
  };

  return (
    <div className="mt-2">
      <div className="bg-base-100 rounded-lg p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Routine Generator</h3>
        </div>

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
            <Shuffle className="w-4 h-4 flex-shrink-0" />
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
              <div key={key} className="bg-base-100 rounded-lg p-4 flex gap-3">
                <div className="flex-shrink-0 bg-base-100 rounded-full w-10 h-10 flex items-center justify-center">
                  {productIcons[key as keyof typeof productIcons]}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm">
                    <div className="flex justify-between items-start">
                      <div>{productDisplayNames[key] || key}</div>
                    </div>
                    {product.buy_links && product.buy_links.length > 0 ? (
                      <a
                        href={
                          product.buy_links.find(
                            (link) =>
                              link.countries?.includes(country) ||
                              (country === 'US' &&
                                (!link.countries ||
                                  link.countries.length === 0)),
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
      <a
        href="https://curlsmonthly.com/?ref=curlsbot"
        className="btn btn-secondary w-full col-span-4 h-11 flex gap-2 mt-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        Try sample sizes of these products at Curls Monthly
      </a>
    </div>
  );
}
