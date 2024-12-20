'use client';

import { useState } from 'react';
import { quizQuestions } from './quizData';
import { ProductRecommendations } from '@/components/ui/product/ProductRecommendations';
import { ChatBubbleRobot, ChatBubble } from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';
import Link from 'next/link';

// Easy to toggle development mode testing
const DEV_MODE = false;

export default function Quiz() {
  // Initialize state with DEV_MODE values
  const initialScore = DEV_MODE ? 4 : 0;
  const initialShowResults = DEV_MODE;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [showResults, setShowResults] = useState(initialShowResults);

  const handleAnswerClick = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getResult = (score: number) => {
    if (score > 2) {
      return {
        type: 'High Porosity',
        tag: 'high_porosity',
        description:
          'Your hair easily absorbs moisture but may also lose it quickly. Focus on moisturizing and sealing products. Deep conditioning treatments will be beneficial.'
      };
    } else if (score < -2) {
      return {
        type: 'Low Porosity',
        tag: 'low_porosity',
        description:
          'Your hair has difficulty absorbing moisture and products. Focus on clarifying treatments and lightweight products. Use heat or steam to help products penetrate.'
      };
    } else {
      return {
        type: "Normal Porosity",
        tag: 'normal_porosity',
        description: "Your hair has a good balance of moisture absorption and retention. Continue with your current routine while monitoring any changes."
      };
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const result = getResult(score);

    return (
      <div className="space-y-4">
        <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
          <ChatBubble status="ok">
            <div className="space-y-4">
              <p>Based on your answers, your hair porosity is:</p>
              <div className="text-2xl font-bold">{result.type}</div>
              <p>
                {result.type === 'High Porosity'
                  ? 'High porosity hair absorbs moisture quickly but also loses it quickly. Focus on protein treatments and moisturizing products that can help seal in moisture.'
                  : result.type === 'Low Porosity'
                  ? 'Low porosity hair is resistant to moisture but retains it well once absorbed. Use lightweight products and consider applying products to damp hair to improve absorption.'
                  : 'Normal porosity hair maintains a good moisture balance. Continue with a balanced routine of moisturizing and protein treatments as needed.'}
              </p>
              <div className="space-y-4">
                <div>
                  <Link
                    href={`/products/${result.tag}`}
                    className="text-inherit  underline font-medium"
                  >
                    View all recommended products for {result.type} hair →
                  </Link>
                </div>

                <button
                  className="btn btn-sm btn-ghost bg-base-100 w-full"
                  onClick={restartQuiz}
                >
                  Take Quiz Again
                </button>
              </div>
            </div>
          </ChatBubble>
        </ChatBubbleRobot>

        <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
          <ChatBubble status="ok">
            <div className="space-y-4">
              <p className="font-bold text-lg mb-1">
                Recommended Products for Your Hair Type
              </p>
              <ProductRecommendations porosityType={result.type} />
            </div>
          </ChatBubble>
        </ChatBubbleRobot>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <ChatBubbleRobot
        imageUrl="/normal.svg"
        status="ok"
      >
        <ChatBubble status="ok">
          Take this quiz to determine your hair porosity level. Hair porosity refers to your hair&apos;s ability to absorb and retain moisture. Understanding your hair porosity can help you choose the right products and treatments for your hair.
        </ChatBubble>
      </ChatBubbleRobot>
      <ChatBubbleUser
        message={
          <div>
            <p className="font-medium mb-2">Question {currentQuestion + 1} of {quizQuestions.length}</p>
            <p className="text-lg">{question.question}</p>
            <div className="space-y-2 mt-4">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  className="btn btn-ghost bg-secondary  w-full text-left justify-start normal-case"
                  onClick={() => handleAnswerClick(answer.points)}
                >
                  {answer.content}
                </button>
              ))}
            </div>
          </div>
        }
        secondary
      />
    </div>
  );
}
