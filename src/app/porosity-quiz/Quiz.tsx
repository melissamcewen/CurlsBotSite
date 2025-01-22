'use client';

import { useState } from 'react';
import { quizQuestions } from './quizData';
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
  const [score, setScore] = useState(DEV_MODE ? 4 : 0);

  const handleAnswerClick = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Redirect based on final score
      if (newScore > 2) {
        router.push('/porosity/high-porosity');
      } else if (newScore < -2) {
        router.push('/porosity/low-porosity');
      } else {
        router.push('/porosity/normal-porosity');
      }
    }
  };

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
              <div className="space-y-2">
                <p className="font-semibold">{question.question}</p>
                <div className="space-y-2">
                  {question.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answer.points)}
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
