'use client';

import { AnalysisResult } from '../../types/analysis';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { StatusIndicator } from './status/StatusIndicator';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
  if (!result) return null;

  const { description, alertClass, alertContentClass } = getStatusConfig(result.overallStatus);
  const shouldShowRecommendation =
    result.overallStatus === 'warning' || result.overallStatus === 'caution';
  const hasIngredients = result.ingredients && result.ingredients.length > 0;

  // Only get product recommendation if needed
  const productRecommendation = shouldShowRecommendation
    ? (() => {
        const products = getBundledProducts();
        const allProducts = Object.values(products.products);
        const randomProduct =
          allProducts[Math.floor(Math.random() * allProducts.length)];
        return randomProduct
          ? {
              category: randomProduct.product_categories[0] as ProductCategory,
              name: randomProduct.name,
              brand: randomProduct.brand,
              buyUrl: randomProduct.buy_url,
            }
          : null;
      })()
    : null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />;
      case 'warning':
        return <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />;
      case 'caution':
        return <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <div className={`alert ${alertClass}`}>
        {getStatusIcon(result.overallStatus)}
        <div>
          <h2 className={`font-bold text-lg ${alertContentClass}`}>Overall Assessment</h2>
          <p className={`text-sm ${alertContentClass} opacity-90`}>{description}</p>
        </div>
      </div>

      {/* Product Recommendation */}
      {productRecommendation && (
        <div className="bg-base-100 rounded-lg p-6 border border-base-200 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBagIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Try This Alternative</h2>
          </div>
          <p className="text-sm text-base-content/70 mb-4">
            Since we found some ingredients that might be problematic, here's a
            product that might work better for your hair.
          </p>
          <ProductRecommendation
            category={productRecommendation.category}
            brand={productRecommendation.brand}
            name={productRecommendation.name}
            buyUrl={productRecommendation.buyUrl}
          />
        </div>
      )}

      {/* Ingredients List */}
      {hasIngredients && (
        <div className="bg-base-100 rounded-lg p-6 border border-base-200 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BeakerIcon className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Ingredients Analysis</h2>
          </div>
          <IngredientsList ingredients={result.ingredients} />
        </div>
      )}
    </div>
  );
}
