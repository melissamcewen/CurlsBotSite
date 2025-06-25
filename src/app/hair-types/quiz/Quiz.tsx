'use client';

import { useState } from 'react';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';
import { useRouter } from 'next/navigation';
import { quizQuestions, getQuizResult, type QuizResult } from './quizData';
import QuizResultComponent from './QuizResult';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function Quiz() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const resetQuiz = () => {
    setCurrentSection(null);
    setScores({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  const startQuiz = () => {
    setCurrentSection('1vs234');
  };

  // Get all questions for the current section
  const currentSectionQuestions = currentSection
    ? quizQuestions.filter((q) => q.section === currentSection)
    : [];
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  // Add debug logging
  if (currentSection && !currentQuestion) {
    console.log('Debug info for missing question:');
    console.log('Current section:', currentSection);
    console.log('Current question index:', currentQuestionIndex);
    console.log('Questions in section:', currentSectionQuestions);
    console.log('All questions:', quizQuestions);
  }

  const handleAnswerClick = (answer: {
    content: string;
    nextSection?: string;
    result?: string;
    points?: { [key: string]: number };
  }) => {
    // If the answer has a direct result, show that result
    if (answer.result) {
      const quizResult = getQuizResult(answer.result);
      setResult(quizResult);
      // Navigate to result page
      router.push(`/hair-types/quiz/${answer.result}`);
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

        const quizResult = getQuizResult(highestScore[0]);
        setResult(quizResult);
        // Navigate to result page
        router.push(`/hair-types/quiz/${highestScore[0]}`);
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

  const handleFeedback = (isAccurate: boolean) => {
    if (result) {
      // Send to Google Analytics
      window.gtag?.('event', 'quiz_feedback', {
        event_category: 'Hair Type Quiz',
        event_label: isAccurate ? 'Accurate' : 'Inaccurate',
        value: result.type,
      });
      setFeedbackGiven(true);
    }
  };

  if (!currentSection && !result) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
          <ChatBubble status="ok">
            This is an experiment to see whether it&apos;s possible to
            &quot;type&quot; hair based on how hair acts rather than how it
            looks. This is an experiment, so please help us by clicking the
            feedback buttons at the end. Answer based on your hair&apos;s
            natural state - that means how it looks when you don&apos;t use any
            styling products or heat tools. Ready? Let&apos;s begin!
          </ChatBubble>
        </ChatBubbleRobot>
        <div className="max-w-2xl ml-auto">
          <ChatBubbleUser>
            <button onClick={startQuiz} className="btn btn-primary w-full">
              Start Quiz
            </button>
          </ChatBubbleUser>
        </div>
      </div>
    );
  }

  if (result) {
    return <QuizResultComponent result={result} showFeedback />;
  }

  if (!currentQuestion) {
    return <div>Error: Question not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
        <ChatBubble status="ok">
          <p className="font-semibold">{currentQuestion.question}</p>
        </ChatBubble>
      </ChatBubbleRobot>
      <div className="max-w-2xl ml-auto">
        <ChatBubbleUser>
          <div className="space-y-2">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className="card card-sm bg-primary/20 text-primary-content w-full text-left normal-case hover:bg-primary"
              >
                <div className="card-body">
                  <p>{answer.content}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={resetQuiz}
              className="btn btn-secondary btn-sm bg-secondary/20 border-secondary/20 hover:bg-secondary/40 hover:border-secondary/40"
            >
              Restart Quiz
            </button>
          </div>
        </ChatBubbleUser>
      </div>
    </div>
  );
}
