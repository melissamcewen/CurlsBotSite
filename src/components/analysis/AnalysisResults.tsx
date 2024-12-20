'use client';

import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChatBubbleRobot, ChatHeader, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import { AnalysisFindings } from './findings/AnalysisFindings';

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

  const StatusIcon = {
    warning: ExclamationCircleIcon,
    caution: ExclamationTriangleIcon,
    ok: CheckCircleIcon,
    error: ExclamationCircleIcon,
  }[result.status];

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
        imageUrl={
          result.status === 'warning' || result.status === 'error'
            ? '/exclaim.svg'
            : result.status === 'caution'
            ? '/surprised.svg'
            : '/normal.png'
        }
        status={result.status}
      >
        {/* Ensure ChatBubble is wrapping the message content */}
        <ChatBubble status={result.status}>
          <div className="space-y-4">
            <p>{description}</p>

            <button
              onClick={onTryAnother}
              className="btn  bg-secondary text-secondary-content w-full hover:bg-primary"
            >
              Try another ingredients list
            </button>
          </div>
        </ChatBubble>
      </ChatBubbleRobot>
      {hasIngredients && (
        <div className="space-y-4">
          {hasIngredients && (
            <AnalysisFindings ingredients={result.ingredients} />
          )}
          <div>
           
            <IngredientsList ingredients={result.ingredients} />
          </div>
        </div>
      )}
    </div>
  );
}
