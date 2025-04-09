'use client';

import { useSearchParams } from 'next/navigation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCard } from '@/components/ui/product/ProductCard';
import type { Product } from 'haircare-ingredients-analyzer';
import { PorosityType, ProductCategory } from '@/lib/routineBuilder';

export default function SavedRoutine() {
  const searchParams = useSearchParams();
  const porosity = (searchParams?.get('porosity') ??
    'normal_porosity') as PorosityType;
  const products = getBundledProducts();

  // Get selected products from URL parameters
  const selectedProducts = Array.from(searchParams?.entries() ?? []).reduce(
    (acc, [key, value]) => {
      if (key.startsWith('product_')) {
        const category = key.replace('product_', '') as ProductCategory;
        const product = products.products[value];
        if (product) {
          acc[category] = product;
        }
      }
      return acc;
    },
    {} as Record<ProductCategory, Product>,
  );

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-4">
        Your{' '}
        {porosity.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
        Hair Routine
      </h1>
      <p className="text-center text-lg mb-8">
        Bookmark this page to save your personalized routine
      </p>

      <div className="space-y-8">
        {Object.entries(selectedProducts).map(([category, product]) => (
          <div key={category} className="card bg-base-200">
            <div className="card-body">
              <h3 className="text-xl font-semibold capitalize">
                {category.replace(/_/g, ' ')}
              </h3>
              <div className="mt-4">
                <ProductCard
                  product={{
                    title: product.brand,
                    description: product.name,
                    product: product,
                  }}
                  category={category as ProductCategory}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
