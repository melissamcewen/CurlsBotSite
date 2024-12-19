'use client';

import { AnalysisResult } from '../../types/analysis';
import { ProductRecommendation } from '@/components/ui/product/ProductRecommendation';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { ProductCategory } from '@/components/ui/product/ProductRecommendations';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import ChatBubbleRobot from './ChatBubbleRobot';
import { ContentCard } from '@/components/ui/ContentCard';

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
  if (!result) return null;

  const { description, alertClass } = getStatusConfig(result.overallStatus);
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

  const getAssessmentConfig = (status: string) => {
    switch (status) {
      case 'ok':
        return {
          imageUrl: '/normal.png',
          bubbleClass: 'chat-bubble bg-success text-success-content'
        };
      case 'warning':
      case 'error':
        return {
          imageUrl: '/exclaim.svg',
          bubbleClass: 'chat-bubble bg-error text-error-content'
        };
      case 'caution':
        return {
          imageUrl: '/surprised.svg',
          bubbleClass: 'chat-bubble bg-warning text-warning-content'
        };
      default:
        return {
          imageUrl: '/normal.png',
          bubbleClass: 'chat-bubble bg-primary text-primary-content'
        };
    }
  };

  const assessmentConfig = getAssessmentConfig(result.overallStatus);

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <ChatBubbleRobot
        message={description}
        imageUrl={assessmentConfig.imageUrl}
        bubbleClass={assessmentConfig.bubbleClass}
      />

      {/* Product Recommendation */}
      {productRecommendation && (
        <ContentCard>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBagIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Try This Alternative</h2>
          </div>
          <p className="text-sm text-base-content/70 mb-4">
            Since we found some ingredients that might be problematic, here&apos;s a
            product that might work better for your hair.
          </p>
          <ProductRecommendation
            category={productRecommendation.category}
            brand={productRecommendation.brand}
            name={productRecommendation.name}
            buyUrl={productRecommendation.buyUrl}
          />
        </ContentCard>
      )}

      {/* Ingredients List */}
      {hasIngredients && (
        <ContentCard>
          <div className="flex items-center gap-2 mb-4">
            <BeakerIcon className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Ingredients Analysis</h2>
          </div>
          <IngredientsList ingredients={result.ingredients} />
        </ContentCard>
      )}
    </div>
  );
}
