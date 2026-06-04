'use client';

import React from 'react';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { StatusDescription } from './utils/StatusDescription';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import { AnalysisFindings } from './findings/AnalysisFindings';
import { AnalysisSummary } from './findings/AnalysisSummary';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';
import {
  addProductTrackingAttributes,
  CURLS_MONTHLY_AFFILIATE_URL,
  curlsMonthlySampleProduct,
  TOOTILAB_STARTER_URL,
  tootilabStarterProduct,
  trackProductInteraction,
} from '@/utils/productTracking';

interface Props {
  result: AnalysisResult;
  onTryAnother: () => void;
}

export default function AnalysisResults({ result, onTryAnother }: Props) {
  const { country } = useLocalization();

  if (!result) return null;

  const hasIngredients = result.ingredients && result.ingredients.length > 0;
  const isUS = country === 'US';

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
                    <StatusDescription status={result.status} />
                  </p>

                  <p>
                    Looking for your next favorite product?{' '}
                    {isUS ? (
                      <>
                        <a
                          href={CURLS_MONTHLY_AFFILIATE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary"
                          ref={(el) => {
                            if (el) {
                              addProductTrackingAttributes(
                                el,
                                curlsMonthlySampleProduct,
                                'sample',
                                'Curls Monthly',
                              );
                            }
                          }}
                          onClick={() =>
                            trackProductInteraction(
                              curlsMonthlySampleProduct,
                              'sample',
                              'Curls Monthly',
                            )
                          }
                        >
                          Get $5 off your first month of Curls Monthly—a
                          subscription box packed with top-rated samples for
                          curly and wavy hair.
                        </a>
                      </>
                    ) : (
                      <a
                        href={TOOTILAB_STARTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                        ref={(el) => {
                          if (el) {
                            addProductTrackingAttributes(
                              el,
                              tootilabStarterProduct,
                              'buy',
                              'Tootilab',
                            );
                          }
                        }}
                        onClick={() =>
                          trackProductInteraction(
                            tootilabStarterProduct,
                            'buy',
                            'Tootilab',
                          )
                        }
                      >
                        Try the Tootilab Curly Hair Starter Bundle
                      </a>
                    )}{' '}
                    or try our{' '}
                    <Link href="/porosity-quiz" className="link link-primary">
                      Porosity Quiz
                    </Link>{' '}
                    for personalized recommendations.
                  </p>
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
