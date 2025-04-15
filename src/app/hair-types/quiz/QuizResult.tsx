'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpenText, CheckCircle, XCircle } from 'lucide-react';
import {
  parameterDescriptions,
  parameterDisplayNames,
  capitalizeValue,
  type QuizResult,
} from './quizData';
import { useState } from 'react';

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
                The CurlsBot Guide to Type {result.type.toUpperCase()}
              </h1>
            </div>
            <div className="flex gap-8">
              <div className="lg:w-[400px]">
                {/* Summary Section */}
                <div className="bg-base-100 cb-card-lite">
                  <h2 className="cb-header">
                    CurlsBot thinks you may have{' '}
                    {result.parameters.curlsBotType} hair
                  </h2>
                  <div className="flex flex-col gap-2">
                    {Object.entries(result.parameters)
                      .filter(([key]) => key !== 'commonType') // Skip commonType as it's shown above
                      .map(([parameter, value]) => (
                        <div
                          key={parameter}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <div className="font-semibold">
                            {
                              parameterDisplayNames[
                                parameter as keyof typeof parameterDisplayNames
                              ]
                            }
                          </div>
                          <div className="text-right">
                            {capitalizeValue(value)}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Feedback Section */}
                  {showFeedback && (
                    <div className="mt-6 pt-6 border-t border-base-300">
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
                </div>
              </div>
              <div className="lg:flex-1">
                <div className="space-y-8 md:flex-1">
                  {/* Andre Walker Type Section */}
                  <section>
                    <div className="md:flex md:gap-8 md:items-start">
                      <div className="md:w-1/2 lg:w-2/5">
                        <Image
                          src="/images/hair-types/andre-chart.jpg"
                          alt="Andre Walker Hair Type Chart"
                          width={800}
                          height={600}
                          className="rounded-lg mb-4 w-full"
                        />
                      </div>
                      <div className="md:flex-1">
                        <h2 className="text-xl font-bold mb-4">
                          Andre Walker Hair Type: {result.type.toUpperCase()}
                        </h2>
                        <p className="mb-4">
                          This is based on Andre Walker&apos;s original hair
                          typing system and not the &quot;Common&quot; system
                          used on most websites these days. You can read a
                          comparison{' '}
                          <a
                            href="https://www.reddit.com/r/hairtype/comments/1jpq7x2/i_read_the_og_book_about_curl_typing_and_it_was/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                          >
                            here
                          </a>
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Common Type Section */}
                  <section>
                    <div className="md:flex md:gap-8 md:items-start">
                      <div className="md:w-1/2 lg:w-2/5">
                        <Image
                          src="/images/hair-types/common-chart.png"
                          alt="Common Hair Type Chart"
                          width={800}
                          height={600}
                          className="rounded-lg mb-4 w-full"
                        />
                      </div>
                      <div className="md:flex-1">
                        <h2 className="text-xl font-bold mb-4">
                          Common Type: {result.parameters.commonType}
                        </h2>
                        <p className="mb-4">
                          This is the more commonly used hair typing system you
                          might see on social media and product packaging.
                        </p>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </div>
            <div>
              {/* Parameter Descriptions */}
              <section>
                <h2 className="text-xl font-bold mb-4">
                  Understanding Your Hair
                </h2>
                <div className="space-y-4">
                  {Object.entries(result.parameters)
                    .filter(([key]) => key !== 'commonType') // Skip commonType as it's shown above
                    .map(([parameter, value]) => (
                      <div key={parameter} className="space-y-2">
                        <h3 className="font-semibold">
                          {
                            parameterDisplayNames[
                              parameter as keyof typeof parameterDisplayNames
                            ]
                          }
                          : {capitalizeValue(value)}
                        </h3>
                        <p>
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
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
