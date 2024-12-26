'use client';

import { useState } from 'react';
import { Product } from 'haircare-ingredients-analyzer';
import {
  CountryCode,
  PorosityType,
  getRoutineSteps,
  ProductCategory,
} from '@/lib/routineBuilder';

export default function RoutineBuilder() {
  const [porosity, setPorosity] = useState<PorosityType>('normal_porosity');
  const [country, setCountry] = useState<CountryCode>('US');
  const [selectedProducts, setSelectedProducts] = useState<
    Partial<Record<ProductCategory, Product>>
  >({});

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
        <div key={step.id} className="card bg-base-100">
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
                      <div
                        key={product.type}
                        className="card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors"
                      >
                        <div className="card-body p-4">
                          <div>
                            <h5 className="font-medium">{product.title}</h5>
                            <p className="text-sm text-base-content/70">
                              {product.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <button
                              className={`btn btn-block ${
                                selectedProducts[category.category]?.id ===
                                product.product.id
                                  ? 'btn-primary'
                                  : 'btn-outline'
                              }`}
                              onClick={() =>
                                onProductSelect(
                                  category.category,
                                  product.product,
                                )
                              }
                            >
                              {selectedProducts[category.category]?.id ===
                              product.product.id
                                ? 'Selected'
                                : 'Select'}
                            </button>
                          </div>
                        </div>
                      </div>
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
