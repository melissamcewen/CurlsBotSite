'use client';

import { useState } from 'react';
import { quizQuestions, Answer } from './quizData';
import { useRouter } from 'next/navigation';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';

// Easy to toggle development mode testing
const DEV_MODE = process.env.NODE_ENV === 'development' && false;

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerClick = (answer: Answer) => {
    // If answer has a direct result, redirect immediately
    if (answer.result) {
      switch (answer.result) {
        case 'high':
          router.push('/porosity/high-porosity');
          break;
        case 'low':
          router.push('/porosity/low-porosity');
          break;
        case 'mixed':
          router.push('/porosity/mixed-porosity');
          break;
        case 'normal':
          router.push('/porosity/normal-porosity');
          break;
      }
      return;
    }

    // If answer indicates to continue to next question
    if (answer.nextQuestion && currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
        <ChatBubble status="ok">
          Porosity is a measure of how easily your hair absorbs water. It is very much related to damage, with healthy normal hair having smooth unbroken cuticles that resist water, and damaged hair having porous cuticles that absorb water easily. The &quot;cup test&quot; is inaccurate and should not be used to determine your porosity. Luckily on a scientific level, porosity can be roughly determined by a few simple questions
        </ChatBubble>
      </ChatBubbleRobot>
      <div className="max-w-2xl ml-auto">
        <ChatBubbleUser>
          <div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">{question.question}</p>
                <div className="space-y-2">
                  {question.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answer)}
                      className="card card-sm bg-primary/20 text-base-content w-full text-left normal-case hover:bg-primary hover:text-primary-content transition-all duration-200 ease-in-out"
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
