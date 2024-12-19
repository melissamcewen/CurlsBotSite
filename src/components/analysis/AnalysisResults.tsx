'use client';

import { AnalysisResult } from '../../types/analysis';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { StatusIndicator } from './status/StatusIndicator';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
  if (!result) return null;

  // Get a random product recommendation
  const products = getBundledProducts();
  const allProducts = Object.values(products.products);
  const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
  const productRecommendation = randomProduct ? {
    category: randomProduct.product_categories[0] as ProductCategory,
    name: randomProduct.name,
    brand: randomProduct.brand,
    buyUrl: randomProduct.buy_url
  } : null;

  const { description, alertClass } = getStatusConfig(result.overallStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircleIcon className="w-6 h-6" />;
      case 'warning':
        return <ExclamationCircleIcon className="w-6 h-6" />;
      case 'caution':
        return <ExclamationTriangleIcon className="w-6 h-6" />;
      default:
        return <InformationCircleIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <div className={`alert ${alertClass}`}>
        <div>
          {getStatusIcon(result.overallStatus)}
          <div>
            <h2 className="text-lg font-bold">Overall Assessment</h2>
            <p className="opacity-90">{description}</p>
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BeakerIcon className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Ingredients Analysis</h2>
        </div>
        <IngredientsList ingredients={result.ingredients} />
      </div>

      {/* Product Recommendation */}
      {productRecommendation && (
        <div className="bg-base-100 rounded-lg p-6 border border-base-200">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBagIcon className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Try This Product</h2>
          </div>
          <ProductRecommendation
            category={productRecommendation.category}
            brand={productRecommendation.brand}
            name={productRecommendation.name}
            buyUrl={productRecommendation.buyUrl}
          />
        </div>
      )}
    </div>
  );
}
