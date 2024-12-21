'use client';

import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { BeakerIcon, ExclamationTriangleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChatBubbleRobot, ChatHeader, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import { AnalysisFindings } from './findings/AnalysisFindings';
import { AnalysisSummary } from './findings/AnalysisSummary';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  result: AnalysisResult;
  onTryAnother: () => void;
}

interface ProductRecommendation {
  name: string;
  brand: string;
  buyUrl: string;
}

export default function AnalysisResults({ result, onTryAnother }: Props) {
  const [productRecommendation, setProductRecommendation] = useState<ProductRecommendation | null>(null);
  const { description } = getStatusConfig(result.status);
  const shouldShowRecommendation = result.status === 'warning' || result.status === 'caution';
  const hasIngredients = result.ingredients && result.ingredients.length > 0;

  const StatusIcon = {
    warning: ExclamationCircleIcon,
    caution: ExclamationTriangleIcon,
    ok: CheckCircleIcon,
    error: ExclamationCircleIcon,
  }[result.status];

  // Fetch product recommendation from server
  useEffect(() => {
    if (shouldShowRecommendation) {
      fetch('/api/product-recommendation')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setProductRecommendation(data);
          }
        })
        .catch(console.error);
    }
  }, [shouldShowRecommendation]);

  if (!result) return null;

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
            <ChatFooter>
              Got a question or concern? <Link href="/contact" className="link link-primary">Contact Us</Link>
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
