'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from 'haircare-ingredients-analyzer';
import {
  CountryCode,
  PorosityType,
  getRoutineSteps,
  ProductCategory,
} from '@/lib/routineBuilder';
import { getCountryFromHostname } from '@/lib/countryDetection';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/product/ProductCard';
import { useLocalization } from '@/contexts/LocalizationContext';

import { Sparkles, ShoppingBag, CheckCircle } from 'lucide-react';

export default function RoutineBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { country, setCountry } = useLocalization();
  const [porosity, setPorosity] = useState<PorosityType>(() => {
    const urlPorosity = searchParams?.get('porosity') ?? null;
    return (urlPorosity as PorosityType) || 'normal_porosity';
  });
  const [selectedProducts, setSelectedProducts] = useState<
    Partial<Record<ProductCategory, Product>>
  >({});
  const [productOffsets, setProductOffsets] = useState<Record<string, number>>(
    {},
  );

  // Update URL when selections change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('porosity', porosity);

    // Add selected products to URL
    Object.entries(selectedProducts).forEach(([category, product]) => {
      params.set(`product_${category}`, product.id);
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [porosity, selectedProducts, router]);

  // Load initial product selections from URL
  useEffect(() => {
    const steps = getRoutineSteps(
      porosity,
      country,
      undefined,
      productOffsets,
      {
        cgmApproved: false,
        frizzResistant: false,
        lightweight: false,
        highPorosity:
          porosity === 'high_porosity' || porosity === 'mixed_porosity',
        lowPorosity:
          porosity === 'low_porosity' || porosity === 'mixed_porosity',
      },
    );
    const initialSelections: Partial<Record<ProductCategory, Product>> = {};

    // Check each category parameter in URL
    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (key.startsWith('product_')) {
          const category = key.replace('product_', '') as ProductCategory;

          // Find the product in our available products
          steps.forEach((step) => {
            step.categories.forEach((cat) => {
              if (cat.category === category) {
                const foundProduct = cat.products.find((p) => p.id === value);
                if (foundProduct) {
                  initialSelections[category] = foundProduct;
                }
              }
            });
          });
        }
      });
    }

    if (Object.keys(initialSelections).length > 0) {
      setSelectedProducts(initialSelections);
    }
  }, [searchParams, porosity, country, productOffsets]);

  const handleSeeMore = (category: string, totalProducts: number) => {
    setProductOffsets((prev) => ({
      ...prev,
      [category]: ((prev[category] || 0) + 3) % totalProducts,
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-2">
        Build Your Perfect Curly/Wavy Hair Routine
      </h1>
      <p className="text-center text-lg mb-2">
        Customize your hair care routine based on your unique needs
      </p>
      <p className="text-base-content/70 text-sm mb-8 flex items-center gap-2 justify-center">
        <ShoppingBag className="w-4 h-4 flex-shrink-0" />
        Product links are affiliate links that help support the site
      </p>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Hair Properties</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Porosity</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={porosity}
                onChange={(e) => setPorosity(e.target.value as PorosityType)}
              >
                <option value="normal_porosity">Normal Porosity</option>
                <option value="high_porosity">High Porosity</option>
                <option value="low_porosity">Low Porosity</option>
                <option value="mixed_porosity">Mixed Porosity</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
              >
                <option value="US">United States</option>
                <option value="AU">Australia</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <RoutineSteps
          porosity={porosity}
          country={country}
          selectedProducts={selectedProducts}
          onProductSelect={(category, product) => {
            setSelectedProducts((prev) => ({
              ...prev,
              [category]: product,
            }));
          }}
          productOffsets={productOffsets}
          onSeeMore={handleSeeMore}
        />

        {Object.keys(selectedProducts).length > 0 && (
          <div className="card bg-primary text-primary-content mt-8">
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold">Save Your Routine</h3>
              <p>
                View your selected products on a single page that you can
                bookmark or share!
              </p>
              <Link
                href={`/routine/saved?${new URLSearchParams({
                  porosity,
                  ...Object.entries(selectedProducts).reduce(
                    (acc, [category, product]) => ({
                      ...acc,
                      [`product_${category}`]: product.id,
                    }),
                    {},
                  ),
                }).toString()}`}
                className="btn btn-secondary mt-2 w-full max-w-md mx-auto"
              >
                View Saved Routine
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RoutineStepsProps {
  porosity: PorosityType;
  country: CountryCode;
  selectedProducts: Partial<Record<ProductCategory, Product>>;
  onProductSelect: (category: ProductCategory, product: Product) => void;
  productOffsets: Record<string, number>;
  onSeeMore: (category: string, totalProducts: number) => void;
}

function RoutineSteps({
  porosity,
  country,
  selectedProducts,
  onProductSelect,
  productOffsets,
  onSeeMore,
}: RoutineStepsProps) {
  const steps = getRoutineSteps(porosity, country, undefined, productOffsets, {
    cgmApproved: false,
    frizzResistant: false,
    lightweight: false,
    highPorosity: porosity === 'high_porosity' || porosity === 'mixed_porosity',
    lowPorosity: porosity === 'low_porosity' || porosity === 'mixed_porosity',
  });

  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <div key={step.id} className="card bg-base-200">
          <div className="card-body">
            <h3 className="text-2xl font-semibold">{step.title}</h3>
            <p className="text-base-content/70">{step.description}</p>

            <div className="space-y-8">
              {step.categories.map((category) => (
                <div key={category.category} className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium capitalize">
                      {category.category.replace(/_/g, ' ')} -{' '}
                      {category.frequency}
                    </h4>
                    <p className="text-base-content/70 mt-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.products.length > 0 ? (
                      category.products.map((product) => (
                        <ProductCard
                          key={`${product.brand}-${product.name}`}
                          product={{
                            title: product.name,
                            description: product.brand,
                            product: product,
                          }}
                          category={category.category}
                          onSelect={() =>
                            onProductSelect(category.category, product)
                          }
                          isSelected={
                            selectedProducts[category.category]?.id ===
                            product.id
                          }
                          selectedCountry={country}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 card bg-base-100 p-6 text-center">
                        <p className="text-base-content/70">
                          We don&apos;t have any items in this category yet,
                          please{' '}
                          <Link href="/contact" className="link link-primary">
                            contact us
                          </Link>{' '}
                          if you have suggestions
                        </p>
                      </div>
                    )}
                  </div>

                  {category.totalProducts > 3 &&
                    category.products.length > 0 && (
                      <button
                        onClick={() =>
                          onSeeMore(category.category, category.totalProducts)
                        }
                        className="btn btn-primary gap-2 w-full"
                      >
                        <Sparkles className="w-5 h-5" />
                        See Different Products
                      </button>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
