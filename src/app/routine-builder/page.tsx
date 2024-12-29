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
import Link from 'next/link';
import { ProductCard } from '@/components/ui/product/ProductCard';

export default function RoutineBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [porosity, setPorosity] = useState<PorosityType>(() => {
    const urlPorosity = searchParams.get('porosity');
    return (urlPorosity as PorosityType) || 'normal_porosity';
  });
  const [country, setCountry] = useState<CountryCode>('US');
  const [selectedProducts, setSelectedProducts] = useState<
    Partial<Record<ProductCategory, Product>>
  >({});

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
    const steps = getRoutineSteps(porosity, country);
    const initialSelections: Partial<Record<ProductCategory, Product>> = {};

    // Check each category parameter in URL
    searchParams.forEach((value, key) => {
      if (key.startsWith('product_')) {
        const category = key.replace('product_', '') as ProductCategory;

        // Find the product in our available products
        steps.forEach((step) => {
          step.categories.forEach((cat) => {
            if (cat.category === category) {
              const product = cat.products.find((p) => p.product.id === value);
              if (product) {
                initialSelections[category] = product.product;
              }
            }
          });
        });
      }
    });

    if (Object.keys(initialSelections).length > 0) {
      setSelectedProducts(initialSelections);
    }
  }, [searchParams, porosity, country]);

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-4">
        Build Your Perfect Hair Routine
      </h1>
      <p className="text-center text-lg mb-8">
        Customize your hair care routine based on your unique needs
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
}

function RoutineSteps({
  porosity,
  country,
  selectedProducts,
  onProductSelect,
}: RoutineStepsProps) {
  const steps = getRoutineSteps(porosity, country);

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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.products.map((product) => (
                      <ProductCard
                        key={product.type}
                        product={product}
                        category={category.category}
                        onSelect={() =>
                          onProductSelect(category.category, product.product)
                        }
                        isSelected={
                          selectedProducts[category.category]?.id ===
                          product.product.id
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}