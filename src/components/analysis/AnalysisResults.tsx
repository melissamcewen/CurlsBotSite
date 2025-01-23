'use client';

import React from 'react';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import { AnalysisFindings } from './findings/AnalysisFindings';
import { AnalysisSummary } from './findings/AnalysisSummary';
import Link from 'next/link';
import { getBundledProducts } from 'haircare-ingredients-analyzer';
import { filterProductByCountry } from '@/lib/countryDetection';
import { getCountryFromHostname } from '@/lib/countryDetection';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onTryAnother: () => void;
}

// Get a product recommendation based on the current hour
function getProductRecommendation() {
  const products = getBundledProducts();
  const userCountry = getCountryFromHostname();

  const allProducts = Object.values(products.products).filter(
    (product) =>
      // Filter products by country and featured tag
      product.tags?.includes('featured') &&
      // Product should have at least one buy link for user's country
      product.buy_links?.some((link) => (link.country || 'US') === userCountry),
  );

  // If no products available for this country, return null
  if (allProducts.length === 0) return null;

  // Get current hour in UTC for stable rotation
  const hourOfYear = Math.floor(Date.now() / (1000 * 60 * 60));

  // Use the hour to select a product
  const index = hourOfYear % allProducts.length;
  const recommendedProduct = allProducts[index];

  if (!recommendedProduct) return null;

  return {
    name: recommendedProduct.name,
    brand: recommendedProduct.brand,
    buyLinks: recommendedProduct.buy_links,
  };
}

export default function AnalysisResults({ result, onTryAnother }: Props) {
  if (!result) return null;

  const { description } = getStatusConfig(result.status);
  const hasIngredients = result.ingredients && result.ingredients.length > 0;
  const shouldShowRecommendation =
    result?.status === 'warning' ||
    result?.status === 'caution' ||
    result?.status === 'error' ||
    result?.status === 'ok';
  const productRecommendation = shouldShowRecommendation
    ? getProductRecommendation()
    : null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-6 h-6 text-info" />;
      case 'caution':
        return <AlertTriangle className="w-6 h-6 text-warning" />;
      case 'warning':
      case 'error':
        return <XCircle className="w-6 h-6 text-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-8 lg:space-y-0 lg:flex lg:gap-8">
        {/* Overall Assessment with Ingredients Analysis */}
        <div className="lg:flex-1">
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
                  <p>
                    <span className="inline-block align-text-bottom mr-1">
                      {getStatusIcon(result.status)}
                    </span>
                    {description}
                  </p>

                  {productRecommendation &&
                    productRecommendation.buyLinks?.[0]?.url && (
                      <p>
                        If you&apos;re looking for a product, I recommend:{' '}
                        <a
                          href={productRecommendation.buyLinks[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-primary"
                        >
                          {productRecommendation.name} by{' '}
                          {productRecommendation.brand}
                        </a>{' '}
                        or try our{' '}
                        <Link
                          href="/porosity-quiz"
                          className="link link-primary"
                        >
                          Porosity Quiz
                        </Link>{' '}
                        for personalized recommendations.
                      </p>
                    )}
                </div>

                <button
                  onClick={onTryAnother}
                  className="btn bg-secondary text-secondary-content w-full hover:bg-primary animate-none"
                  style={{ animation: 'none', transition: 'none' }}
                >
                  Try another ingredients list
                </button>
              </div>
            </ChatBubble>
            <ChatFooter>
              Got a question or concern?{' '}
              <Link href="/contact" className="link link-primary">
                Contact Us
              </Link>
            </ChatFooter>
          </ChatBubbleRobot>
        </div>

        {/* Analysis Summary */}
        {hasIngredients && (
          <div className="lg:w-[400px]">
            <AnalysisSummary result={result} />
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
