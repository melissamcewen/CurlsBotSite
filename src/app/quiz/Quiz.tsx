'use client';

import { useState } from 'react';
import { quizQuestions, Question, Answer } from './quizData';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

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
        description:
          'Your hair easily absorbs moisture but may also lose it quickly. Focus on moisturizing and sealing products. Deep conditioning treatments will be beneficial.',
      };
    } else if (score < -2) {
      return {
        type: 'Low Porosity',
        description:
          'Your hair has difficulty absorbing moisture and products. Focus on clarifying treatments and lightweight products. Use heat or steam to help products penetrate.',
      };
    } else {
      return {
        type: "Normal Porosity",
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
        <div className="card bg-base-100 shadow-xl text-base-content">
          <div className="card-body">
            <h2 className="card-title">Your Results</h2>
            <p className="text-xl font-bold mb-2">{result.type}</p>
            <p className="mb-4">{result.description}</p>
            <button
              className="btn btn-primary"
              onClick={restartQuiz}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card bg-base-100 shadow-xl text-base-content">
        <div className="card-body">
          <h2 className="card-title mb-4">Question {currentQuestion + 1} of {quizQuestions.length}</h2>
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
        </div>
      </div>
    </div>
  );
}
