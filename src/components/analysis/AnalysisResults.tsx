'use client';

import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChatBubbleRobot, ChatHeader, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import { AnalysisFindings } from './findings/AnalysisFindings';
import { AnalysisSummary } from './findings/AnalysisSummary';

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
              name: randomProduct.name,
              brand: randomProduct.brand,
              buyUrl: randomProduct.buy_url,
            }
          : null;
      })()
    : null;

  return (
    <div className="space-y-8">
      <div className="md:flex md:gap-8">
        {/* Overall Assessment with Ingredients Analysis */}
        <div className="md:flex-1">
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
            <ChatBubble status={result.status}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p>{description}</p>
                  {productRecommendation && (
                    <p>
                      Here&apos;s a product I think you might like:{' '}
                      <a
                        href={productRecommendation.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary"
                      >
                        {productRecommendation.name} by {productRecommendation.brand}
                      </a>
                    </p>
                  )}
                </div>

                <button
                  onClick={onTryAnother}
                  className="btn bg-secondary text-secondary-content w-full hover:bg-primary"
                >
                  Try another ingredients list
                </button>
              </div>
            </ChatBubble>
          </ChatBubbleRobot>
        </div>

        {/* Analysis Summary */}
        {hasIngredients && (
          <div className="md:w-[400px]">
            <AnalysisSummary ingredients={result.ingredients} />
          </div>
        )}
      </div>

      {/* Highlights and Ingredients List */}
      {hasIngredients && (
        <div className="space-y-8">
          <AnalysisFindings ingredients={result.ingredients} />
          <IngredientsList ingredients={result.ingredients} />
        </div>
      )}
    </div>
  );
}
