'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';
import { quizQuestions, Answer, resultMapping } from './quizData';

export default function Quiz() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('1vs234');
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Get all questions for the current section
  const currentSectionQuestions = quizQuestions.filter(
    (q) => q.section === currentSection,
  );
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  const handleAnswerClick = (answer: Answer) => {
    // If the answer has a direct result, go to that result page immediately
    if (answer.result) {
      router.push(resultMapping[answer.result]);
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

        const resultPage = resultMapping[highestScore[0]];
        if (resultPage) {
          router.push(resultPage);
          return;
        }
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

  if (!currentQuestion) {
    return <div>Error: Question not found</div>;
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
