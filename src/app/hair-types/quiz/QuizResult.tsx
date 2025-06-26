'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpenText, CheckCircle, XCircle } from 'lucide-react';
import {
  parameterDescriptions,
  parameterDisplayNames,
  capitalizeValue,
  type QuizResult,
  type WalkerType,
  type CommonType,
  CurlsBotType,
} from './quizData';
import { useState } from 'react';
import HairRoutine from '@/components/routine/HairRoutine';
import EmailSignup from '@/components/EmailSignup';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface Props {
  result: QuizResult;
  showFeedback?: boolean;
}

export default function QuizResultComponent({
  result,
  showFeedback = false,
}: Props) {
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (isAccurate: boolean) => {
    // Send to Google Analytics
    window.gtag?.('event', 'quiz_feedback', {
      event_category: 'Hair Type Quiz',
      event_label: isAccurate ? 'Accurate' : 'Inaccurate',
      value: result.type,
    });
    setFeedbackGiven(true);
  };

  return (
    <div className=" w-full">
      <div className="max-w-4xl mx-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/hair-types/quiz" className="btn btn-ghost btn-sm">
              ← Retake Quiz
            </Link>
          </div>

          <article className=" max-w-none">
            <div className="flex items-center gap-2 mb-6">
              <BookOpenText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold m-0">
                Basics of Hair Type {result.type.toUpperCase()}
              </h1>
            </div>
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                {/* Summary Section */}
                <div className="bg-base-100 cb-card-lite md:col-span-2">
                  <h2 className="font-bold text-xl">
                    CurlsBot thinks you may have{' '}
                    <span className="font-bold text-primary">
                      {result.parameters.curlsBotType}
                    </span>
                  </h2>
                  <p className="mb-4">
                    {
                      parameterDescriptions.curlsBotType[
                        result.parameters
                          .curlsBotType as keyof typeof parameterDescriptions.curlsBotType
                      ]
                    }
                  </p>
                </div>

                {/* Email Signup */}
                <EmailSignup hairType={result.parameters.curlsBotType} />

                {/* cards for other type systems */}
                <div className="bg-base-100 cb-card-lite">
                  {/* Andre Walker Type Section */}
                  {/* Andre Walker Type Section */}
                  <section>
                    <div className="">
                      <div className="">
                        <h3 className="text-xl font-bold mb-4">
                          {result.parameters.WalkerType.toUpperCase()} in the
                          Andre Walker system
                        </h3>
                        <p className="mb-4">
                          Our quiz is loosely based on the original Andre Walker
                          system created in the 1990s. It has a lot of flaws but
                          it is still the most popular hair typing system. It is
                          based on characteristics of hair. The Walker system
                          defines {result.parameters.WalkerType.toUpperCase()}{' '}
                          as{' '}
                          {
                            parameterDescriptions.WalkerType[
                              result.parameters.WalkerType as WalkerType
                            ]
                          }
                          .
                        </p>
                      </div>
                      <div className="">
                        <Image
                          src="/images/hair-types/andre-chart.jpg"
                          alt="Andre Walker Hair Type Chart"
                          width={800}
                          height={600}
                          className="rounded-lg mb-4 w-full"
                        />
                      </div>
                    </div>
                  </section>
                </div>
                {/* cards for other type systems */}
                <div className="bg-base-100 cb-card-lite">
                  {/* Common Type Section */}
                  <section>
                    <div className="">
                      <div className="">
                        <h3 className="text-xl font-bold mb-4">
                          {result.parameters.commonType} in the Common system
                        </h3>
                        <p className="mb-4">
                          The common hair typing system is one you might see on
                          social media. It involves comparing your hair&apos;s
                          appearance to a chart. We&apos;d don&apos;t use this
                          system because people usually have multiple curl
                          patterns.{' '}
                          {result.parameters.commonType &&
                            parameterDescriptions.commonType[
                              result.parameters.commonType as CommonType
                            ]}
                        </p>
                      </div>
                      <div className="">
                        <Image
                          src="/images/hair-types/common-chart.png"
                          alt="Common Hair Type Chart"
                          width={800}
                          height={600}
                          className="rounded-lg mb-4 w-full"
                        />
                      </div>
                    </div>
                  </section>
                </div>
                {/* Parameter Cards */}
                {Object.entries(result.parameters)
                  .filter(
                    ([key]) =>
                      key !== 'commonType' &&
                      key !== 'WalkerType' &&
                      key !== 'sisterTypes' &&
                      key !== 'curlsBotType' &&
                      key !== 'productType' &&
                      key in parameterDescriptions,
                  )
                  .map(([parameter, value]) => (
                    <div key={parameter} className="bg-base-100 cb-card-lite">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {
                            parameterDisplayNames[
                              parameter as keyof typeof parameterDisplayNames
                            ]
                          }
                        </h3>
                        <div className="badge badge-primary">
                          {capitalizeValue(value)}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">
                        {
                          parameterDescriptions[
                            parameter as keyof typeof parameterDescriptions
                          ][
                            value as keyof (typeof parameterDescriptions)[keyof typeof parameterDescriptions]
                          ]
                        }
                      </p>
                    </div>
                  ))}

                {/* Sister Types Card */}
                {result.parameters.sisterTypes &&
                  result.parameters.sisterTypes.length > 0 && (
                    <div className="bg-base-100 cb-card-lite md:col-span-2">
                      <h3 className="font-bold mb-4">Similar Hair Types</h3>
                      <p className="mb-4 text-sm">
                        Hair typing isn&apos;t an exact science. Your hair might
                        share characteristics with these types:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.parameters.sisterTypes.map((type) => (
                          <Link
                            key={type}
                            href={`/hair-types/quiz/${type.toLowerCase()}`}
                            className="btn btn-primary btn-sm"
                          >
                            Type {type.toUpperCase()}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Feedback Card */}
                {showFeedback && (
                  <div className="bg-base-100 cb-card-lite md:col-span-2">
                    <h3 className="font-bold mb-4">Help Us Improve</h3>
                    {!feedbackGiven ? (
                      <div className="space-y-4">
                        <p>Does this match your hair type?</p>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleFeedback(true)}
                            className="btn btn-primary flex-1 gap-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Yes
                          </button>
                          <button
                            onClick={() => handleFeedback(false)}
                            className="btn btn-primary flex-1 gap-2"
                          >
                            <XCircle className="w-5 h-5" />
                            No
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <p>Thanks for your feedback!</p>
                      </div>
                    )}
                  </div>
                )}
                {/* Routine Card */}
                <div className="md:col-span-2">
                  <HairRoutine
                    hairType={`${result.parameters.curlsBotType.toLowerCase()}`}
                    initialPorosity="normal_porosity"
                    curlsBotType={result.parameters.curlsBotType}
                    productTypeDescription={
                      parameterDescriptions.productType[
                        result.parameters.productType
                      ]
                    }
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
