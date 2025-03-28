'use client';

import { useState } from 'react';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';
import {
  quizQuestions,
  getQuizResult,
  parameterDescriptions,
  parameterDisplayNames,
  capitalizeValue,
  type QuizResult,
} from './quizData';

export default function Quiz() {
  const [currentSection, setCurrentSection] = useState('1vs234');
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const resetQuiz = () => {
    setCurrentSection('1vs234');
    setScores({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  // Get all questions for the current section
  const currentSectionQuestions = quizQuestions.filter(
    (q) => q.section === currentSection,
  );
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  const handleAnswerClick = (answer: { content: string; nextSection?: string; result?: string; points?: { [key: string]: number } }) => {
    // If the answer has a direct result, show that result
    if (answer.result) {
      setResult(getQuizResult(answer.result));
      return;
    }

    // If the answer has points, add them to the scores
    if (answer.points) {
      const newScores = { ...scores };
      Object.entries(answer.points).forEach(([type, points]) => {
        newScores[type] = (newScores[type] || 0) + points;
      });
      setScores(newScores);

      // If this is the last question in a points-based section, determine the result
      if (!answer.nextSection) {
        const highestScore = Object.entries(newScores).reduce((a, b) =>
          b[1] > a[1] ? b : a,
        );

        setResult(getQuizResult(highestScore[0]));
        return;
      }
    }

    // If there's a next section, go to it
    if (answer.nextSection) {
      setCurrentSection(answer.nextSection);
      setCurrentQuestionIndex(0);
      return;
    }

    // If we get here, move to the next question in the current section
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!currentQuestion && !result) {
    return <div>Error: Question not found</div>;
  }

  if (result) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
          <ChatBubble status="ok">
            <h2 className="text-xl font-bold mb-4">Your Hair Type: {result.type.toUpperCase()}</h2>
            <div className="space-y-4">
              {Object.entries(result.parameters).map(([parameter, value]) => (
                <div key={parameter} className="space-y-2">
                  <h3 className="font-semibold">{parameterDisplayNames[parameter as keyof typeof parameterDisplayNames]}: {capitalizeValue(value)}</h3>
                  <p>{parameterDescriptions[parameter as keyof typeof parameterDescriptions][value]}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={resetQuiz}
                className="btn btn-primary"
              >
                Retake Quiz
              </button>
            </div>
          </ChatBubble>
        </ChatBubbleRobot>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
        <ChatBubble status="ok">
          Beep boop! 🤖 Let&apos;s figure out your hair type! I&apos;ll ask you
          some questions about your hair&apos;s natural texture and behavior.
          Answer based on your hair&apos;s natural state - that means how it
          looks when you don&apos;t use any styling products or heat tools.
          Ready? Let&apos;s begin!
        </ChatBubble>
      </ChatBubbleRobot>
      <div className="max-w-2xl ml-auto">
        <ChatBubbleUser>
          <div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">{currentQuestion.question}</p>
                <div className="space-y-2">
                  {currentQuestion.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answer)}
                      className="card card-compact bg-primary/20 text-primary-content w-full text-left normal-case hover:bg-primary"
                    >
                      <div className="card-body">
                        <p>{answer.content}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ChatBubbleUser>
      </div>
    </div>
  );
}
