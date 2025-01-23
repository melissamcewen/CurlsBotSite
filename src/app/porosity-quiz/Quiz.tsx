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

interface Scores {
  high: number;
  low: number;
  normal: number;
  mixed: number;
}

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({
    high: DEV_MODE ? 4 : 0,
    low: 0,
    normal: 0,
    mixed: 0,
  });

  const handleAnswerClick = (answer: Answer) => {
    const newScores = { ...scores };
    if (answer.high) newScores.high += answer.high;
    if (answer.low) newScores.low += answer.low;
    if (answer.normal) newScores.normal += answer.normal;
    if (answer.mixed) newScores.mixed += answer.mixed;
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Find the highest score
      const entries = Object.entries(newScores) as [keyof Scores, number][];
      const [highestType] = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

      // Redirect based on highest score
      switch (highestType) {
        case 'high':
          router.push('/porosity/high-porosity');
          break;
        case 'low':
          router.push('/porosity/low-porosity');
          break;
        case 'mixed':
          router.push('/porosity/mixed-porosity');
          break;
        default:
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
          porosity hair is picky, normal porosity is just right, and mixed
          porosity is a combination. Most water tests aren&apos;t accurate. This
          quiz will help us figure out your hair&apos;s personality and porosity
          level. Let&apos;s get started!
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
