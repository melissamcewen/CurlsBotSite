'use client';

import React from 'react';
import { AnalysisResult } from 'haircare-ingredients-analyzer';
import { IngredientsList } from './ingredients/IngredientsList';
import { getStatusConfig } from './utils/statusConfig';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import { AnalysisFindings } from './findings/AnalysisFindings';
import { AnalysisSummary } from './findings/AnalysisSummary';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';

interface Props {
  result: AnalysisResult;
  onTryAnother: () => void;
}

export default function AnalysisResults({ result, onTryAnother }: Props) {
  const { country } = useLocalization();

  if (!result) return null;

  const { description } = getStatusConfig(result.status);
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
                    {description}
                  </p>

                  <p>
                    If you&apos;re looking for a product, try the{' '}
                    {isUS ? (
                      <>
                        <a
                          href="https://click.linksynergy.com/fs-bin/click?id=9QcV0uNyab0&offerid=929395.807&type=3&subid=0"
                          className="link link-primary"
                        >
                          Ouidad Advanced Climate Control collection (30% off
                          with code: CELEBRATE8)
                        </a>
                        <img
                          width="1"
                          alt=""
                          height="1"
                          src="https://ad.linksynergy.com/fs-bin/show?id=9QcV0uNyab0&bids=929395.807&type=3&subid=0"
                          className="hidden"
                        />
                      </>
                    ) : (
                      <a
                        href="https://collabs.shop/ea393f"
                        className="link link-primary"
                      >
                        Tootilab Curly Hair Starter Bundle
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
