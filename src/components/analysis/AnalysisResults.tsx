'use client';

import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
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
        <ChatHeader>
          <div
            className={`badge badge-outline ${
              result.status === 'warning'
                ? 'badge-error'
                : result.status === 'caution'
                ? 'badge-warning'
                : 'badge-info'
            } gap-2 py-3`}
          >
            <StatusIcon className="w-5 h-5" />
            <span className="font-medium capitalize">{result.status}</span>
          </div>
        </ChatHeader>

        {/* Ensure ChatBubble is wrapping the message content */}
        <ChatBubble status={result.status}>
          <div className="space-y-4">
            <p>{description}</p>
            {hasIngredients && <AnalysisFindings ingredients={result.ingredients} />}
            <button
              onClick={onTryAnother}
              className="btn  bg-secondary text-secondary-content w-full hover:bg-primary"
            >
              Try another ingredients list
            </button>

            {hasIngredients && (
              <div className="collapse collapse-arrow bg-base-100 text-base-content border-t-2 border-primary">
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
        </ChatBubble>
      </ChatBubbleRobot>

      {/* Product Recommendation */}
      {productRecommendation && (
        <ChatBubbleRobot imageUrl="/normal.png" status="ok">
          <ChatBubble status="ok">
            <div className="space-y-4">
              <p>
                Hey here&apos;s a product I think you might like:
              </p>
              <ProductRecommendation
                category={productRecommendation.category}
                brand={productRecommendation.brand}
                name={productRecommendation.name}
                buyUrl={productRecommendation.buyUrl}
              />
            </div>
          </ChatBubble>
        </ChatBubbleRobot>
      )}
    </div>
  );
}
