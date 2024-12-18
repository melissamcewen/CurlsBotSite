'use client';

import { useState } from 'react';
import { quizQuestions } from './quizData';
import { Card, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { ProductRecommendations } from '@/components/ui/product/ProductRecommendations';
import Link from 'next/link';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(process.env.NODE_ENV === 'development' ? 4 : 0);
  const [showResults, setShowResults] = useState(process.env.NODE_ENV === 'development');

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
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardTitle>Your Results</CardTitle>
          <CardContent>
            <p className="text-xl font-bold mb-2">{result.type}</p>
            <CardDescription>{result.description}</CardDescription>

            <div className="mt-6 mb-6">
              <Link
                href={`/products/${result.tag}`}
                className="text-primary hover:text-primary/80 font-medium"
              >
                View all recommended products for {result.type} hair →
              </Link>
            </div>

            <ProductRecommendations porosityType={result.type} className="mt-6" />

            <button
              className="btn btn-primary mt-6"
              onClick={restartQuiz}
            >
              Take Quiz Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
        <CardContent>
          <p className="text-lg mb-4">{question.question}</p>
          <div className="space-y-2">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                className="btn btn-outline w-full text-left justify-start normal-case"
                onClick={() => handleAnswerClick(answer.points)}
              >
                {answer.content}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
