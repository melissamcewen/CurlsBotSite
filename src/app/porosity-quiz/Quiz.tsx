'use client';

import { useState } from 'react';
import { quizQuestions } from './quizData';
import { ProductRecommendations } from '@/components/ui/product/ProductRecommendations';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';
import Link from 'next/link';

// Easy to toggle development mode testing
const DEV_MODE = process.env.NODE_ENV === 'development' && false;

export default function Quiz() {
  // Initialize state with DEV_MODE values
  const initialScore = DEV_MODE ? 4 : 0;
  const initialShowResults = DEV_MODE;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [showResults, setShowResults] = useState<boolean>(initialShowResults);

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
        link: '/porosity/high-porosity',
        description:
          'Your hair easily absorbs moisture but may also lose it quickly. Focus on moisturizing and sealing products. Deep conditioning treatments will be beneficial.',
      };
    } else if (score < -2) {
      return {
        type: 'Low Porosity',
        tag: 'low_porosity',
        link: '/porosity/low-porosity',
        description:
          'Your hair has difficulty absorbing moisture and products. Focus on clarifying treatments and lightweight products. Use heat or steam to help products penetrate.',
      };
    } else {
      return {
        type: 'Normal Porosity',
        tag: 'normal_porosity',
        link: '/porosity/normal-porosity',
        description:
          'Your hair has a good balance of moisture absorption and retention. Continue with your current routine while monitoring any changes.',
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
      <div className="space-y-6 max-w-4xl mx-auto ">
        <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
          <ChatBubble status="ok">
            <div className="space-y-4">
              <p>Based on your answers, your hair porosity is:</p>
              <div className="text-2xl font-bold">{result.type}</div>
              <p>
                {result.type === 'High Porosity'
                  ? 'Beep boop! Your hair is a thirsty sponge! 💧 It absorbs moisture quickly but also loses it quickly. Focus on protein treatments and moisturizing products that can help seal in moisture.'
                  : result.type === 'Low Porosity'
                  ? "Beep boop! Your hair is a little picky drinker! 💧 It doesn't like to drink up moisture easily, but once it does, it holds on tight. 🔒 Use lightweight products and try applying them to damp hair to help it drink up better. 🚰."
                  : 'Beep boop! Your hair is just right! 💧 It absorbs moisture well but doesn&apos;t hold on too tight. Continue with a balanced routine of moisturizing and protein treatments as needed. 🚰.'}
              </p>
              <div className="space-y-4">
                <div>
                  <Link
                    href={result.link}
                    className="text-inherit  underline font-medium"
                  >
                    Explore my products and tips for {result.type} hair →
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

        <div className="space-y-4">
          <ProductRecommendations porosityType={result.tag} />
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
        <ChatBubble status="ok">
          Beep boop! Confused about hair porosity? 🤖 It&apos;s like your
          hair&apos;s drinkability! 🥤 High porosity hair is thirsty, low
          porosity hair is picky, and normal porosity is just right. Most water
          tests aren&apos;t accurate. This quiz will help us figure out your
          hair&apos;s personality and porosity level. Let&apos;s get started!
        </ChatBubble>
      </ChatBubbleRobot>
      <div className="max-w-2xl ml-auto">
        <ChatBubbleUser>
          <div>
            <div className="space-y-4">
              {currentQuestion < quizQuestions.length ? (
                <>
                  <div className="space-y-2">
                    <p className="font-semibold">
                      {quizQuestions[currentQuestion].question}
                    </p>
                    <div className="space-y-2">
                      {quizQuestions[currentQuestion].answers.map(
                        (answer, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerClick(answer.points)}
                            className="card card-compact bg-primary/20 text-primary-content w-full text-left normal-case hover:bg-primary"
                          >
                            <div className="card-body">
                              <p>{answer.content}</p>
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold">Your Result:</p>
                    <p>{getResult(score).type}</p>
                  </div>
                  <button
                    onClick={restartQuiz}
                    className="btn btn-secondary w-full"
                  >
                    Restart Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </ChatBubbleUser>
      </div>
    </div>
  );
}
