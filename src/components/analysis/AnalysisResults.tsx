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

interface Props {
  result: AnalysisResult;
  onTryAnother: () => void;
}

// Get a product recommendation based on the current hour
function getProductRecommendation() {
  const products = getBundledProducts();
  const allProducts = Object.values(products.products).filter(
    filterProductByCountry,
  ); // Filter products by country

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
    buyUrl: recommendedProduct.buy_url,
  };
}

export default function AnalysisResults({ result, onTryAnother }: Props) {
  if (!result) return null;

  const { description } = getStatusConfig(result.status);
  const hasIngredients = result.ingredients && result.ingredients.length > 0;
  const shouldShowRecommendation =
    result?.status === 'warning' || result?.status === 'caution';
  const productRecommendation = shouldShowRecommendation
    ? getProductRecommendation()
    : null;

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
                  <p>{description}</p>
                  {productRecommendation && (
                    <p>
                      If you&apos;re looking for a product, I recommend:{' '}
                      <a
                        href={productRecommendation.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary"
                      >
                        {productRecommendation.name} by{' '}
                        {productRecommendation.brand}
                      </a>
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
