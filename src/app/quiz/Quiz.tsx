'use client';

import { useState } from 'react';
import { quizQuestions } from './quizData';
import { ProductRecommendations } from '@/components/ui/product/ProductRecommendations';
import ChatBubbleRobot from '@/components/analysis/ChatBubbleRobot';
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

  const renderContent = () => {
    if (showResults) {
      const result = getResult(score);

      return (
        <div className="space-y-4">
          <ChatBubbleRobot
            message={
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg mb-1">Based on your answers, you have {result.type} Hair</p>
                  <p>{result.description}</p>
                </div>

                <div>
                  <Link
                    href={`/products/${result.tag}`}
                    className="text-inherit hover:opacity-80 underline font-medium"
                  >
                    View all recommended products for {result.type} hair →
                  </Link>
                </div>

                <button
                  className="btn btn-sm btn-ghost bg-base-100 bg-opacity-20 w-full"
                  onClick={restartQuiz}
                >
                  Take Quiz Again
                </button>
              </div>
            }
            imageUrl="/normal.svg"
            bubbleClass="chat-bubble bg-primary text-primary-content"
          />

          <ChatBubbleRobot
            message={
              <div className="space-y-4">
                <p className="font-bold text-lg mb-1">Recommended Products for Your Hair Type</p>
                <ProductRecommendations porosityType={result.type} />
              </div>
            }
            imageUrl="/normal.svg"
            bubbleClass="chat-bubble bg-primary text-primary-content"
          />
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];

    return (
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary w-full max-w-none">
          <div className="mb-4">
            <p className="font-medium mb-2">Question {currentQuestion + 1} of {quizQuestions.length}</p>
            <p className="text-lg">{question.question}</p>
          </div>
          <div className="space-y-2">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                className="btn btn-ghost bg-base-100 bg-opacity-20 w-full text-left justify-start normal-case"
                onClick={() => handleAnswerClick(answer.points)}
              >
                {answer.content}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ChatBubbleRobot
        message="Take this quiz to determine your hair porosity level. Hair porosity refers to your hair's ability to absorb and retain moisture. Understanding your hair porosity can help you choose the right products and treatments for your hair."
        imageUrl="/normal.svg"
        bubbleClass="chat-bubble bg-primary text-primary-content"
      />
      {renderContent()}
    </div>
  );
}
