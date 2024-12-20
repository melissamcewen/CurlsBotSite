'use client';

import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleRobot, ChatHeader, ChatBubble, ChatFooter } from './ChatBubbleRobot';

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
          <div className={`badge badge-outline ${
            result.status === 'warning' ? 'badge-error' :
            result.status === 'caution' ? 'badge-warning' :
            'badge-info'
          } gap-2 py-3`}>
            <StatusIcon className="w-5 h-5" />
            <span className="font-medium capitalize">{result.status}</span>
          </div>
        </ChatHeader>

        {/* Ensure ChatBubble is wrapping the message content */}
        <ChatBubble status={result.status}>
          <div className="space-y-4">
            <p>{description}</p>
            {hasIngredients && result.ingredients.some(i => i.status === 'caution' || i.status === 'warning') && (
              <div className="space-y-2">
                <p className="font-medium">Ingredients to note:</p>
                <ul className="list-disc list-inside space-y-2">
                  {result.ingredients
                    .filter(i => i.status === 'caution' || i.status === 'warning')
                    .map((ingredient, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ingredient.name}</span>
                            <span className={`badge badge-sm ${
                              ingredient.status === 'warning' ? 'badge-error' : 'badge-warning'
                            }`}>
                              {ingredient.status}
                            </span>
                          </div>
                          {ingredient.reasons && ingredient.reasons[0] && (
                            <p className="opacity-80 mt-0.5">{ingredient.reasons[0].reason}</p>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <button
              onClick={onTryAnother}
              className="btn btn-sm bg-secondary text-secondary-content w-full hover:bg-primary"
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
          </ChatBubble>
        </ChatBubbleRobot>
      )}
    </div>
  );
}
