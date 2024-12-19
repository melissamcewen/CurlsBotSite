'use client';

import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon } from '@heroicons/react/24/outline';
import ChatBubbleRobot from './ChatBubbleRobot';

interface Props {
  result: AnalysisResult;
  onTryAnother: () => void;
}

export default function AnalysisResults({ result, onTryAnother }: Props) {
  if (!result) return null;

  const { description } = getStatusConfig(result.status);
  const shouldShowRecommendation =
    result.status === 'warning' || result.status === 'caution';
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

  return (
    <div className="space-y-8">
      {/* Overall Assessment with Ingredients Analysis */}
      <ChatBubbleRobot
        message={
          <div className="space-y-4">
            <h2 className="pt-2 text-lg font-bold">
              Overall result: {result.status}
            </h2>
            <p>{description}</p>
            <button
              onClick={onTryAnother}
              className="btn btn-sm btn-ghost bg-base-100 bg-opacity-20 w-full"
            >
              Try another ingredients list
            </button>
            {hasIngredients && (
              <div className="collapse collapse-arrow bg-base-100 bg-opacity-20">
                <input type="checkbox" />
                <div className="collapse-title font-medium flex items-center gap-2">
                  <BeakerIcon className="w-5 h-5" />
                  View detailed ingredients analysis
                </div>
                <div className="collapse-content">
                  <IngredientsList ingredients={result.ingredients} />
                </div>
              </div>
            )}
          </div>
        }
        imageUrl={
          result.status === 'warning' || result.status === 'error'
            ? '/exclaim.svg'
            : result.status === 'caution'
            ? '/surprised.svg'
            : '/normal.png'
        }
        status={result.status}
      />

      {/* Product Recommendation */}
      {productRecommendation && (
        <ChatBubbleRobot
          message={
            <div className="space-y-4">
              <p>
                Since we found some ingredients that might be problematic,
                here&apos;s a product that might work better for your hair.
              </p>
              <ProductRecommendation
                category={productRecommendation.category}
                brand={productRecommendation.brand}
                name={productRecommendation.name}
                buyUrl={productRecommendation.buyUrl}
              />
            </div>
          }
          imageUrl="/normal.png"
          status="ok"
        />
      )}
    </div>
  );
}
