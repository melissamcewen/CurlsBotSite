'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ChatBubbleRobot,
  ChatBubble,
} from '@/components/analysis/ChatBubbleRobot';
import ChatBubbleUser from '@/components/analysis/ChatBubbleUser';
import {
  QuizAnswers,
  PrimaryPattern,
  AdditionalPattern,
  determineHairType,
  getAdjacentPatterns,
  shouldAskElongation,
  shouldAskShrinkage,
} from './newQuizLogic';
import { getQuestion, QuestionType } from './newQuizData';
import { ShrinkageLevel } from './newQuizLogic';

// Pattern image mapping
const patternImages: Record<string, string> = {
  waves: '/images/hair-types/Waves.png',
  curls: '/images/hair-types/Curls.png',
  coils: '/images/hair-types/Coils.png',
  'zig-zags': '/images/hair-types/zig-zags.png',
  straight: '/images/hair-types/Waves.png', // Placeholder - use waves image or create straight image
};

export default function NewQuiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentQuestionId, setCurrentQuestionId] =
    useState<QuestionType | null>('straight-gate');
  const [selectedAdditionalPatterns, setSelectedAdditionalPatterns] = useState<
    Set<AdditionalPattern>
  >(new Set());

  const handleStartQuiz = () => {
    setCurrentQuestionId('straight-gate');
    setAnswers({});
  };

  const handleAnswer = (value: string | boolean) => {
    const newAnswers = { ...answers };

    if (currentQuestionId === 'straight-gate') {
      newAnswers.isStraight = value as boolean;
      setAnswers(newAnswers);
      return;
    }

    if (currentQuestionId === 'primary-pattern') {
      newAnswers.primaryPattern = value as PrimaryPattern;
      setAnswers(newAnswers);
      setSelectedAdditionalPatterns(new Set()); // Reset additional patterns
      return;
    }

    if (currentQuestionId === 'additional-patterns') {
      // Handle multi-select - toggle the pattern
      const pattern = value as AdditionalPattern;
      const newSet = new Set(selectedAdditionalPatterns);

      if (newSet.has(pattern)) {
        newSet.delete(pattern);
      } else {
        newSet.add(pattern);
      }

      setSelectedAdditionalPatterns(newSet);
      newAnswers.additionalPatterns = Array.from(newSet);
      setAnswers(newAnswers);
      return;
    }

    if (currentQuestionId === 'elongation') {
      newAnswers.elongatesWhenWet = value as boolean;
      setAnswers(newAnswers);
      return;
    }

    if (currentQuestionId === 'shrinkage') {
      newAnswers.shrinkage = value as ShrinkageLevel;
      setAnswers(newAnswers);
      return;
    }
  };

  const handleNext = () => {
    if (!currentQuestionId) return;

    // Special case: if straight is selected, go directly to result
    if (currentQuestionId === 'straight-gate' && answers.isStraight === true) {
      router.push('/hair-types/quiz/straight');
      return;
    }

    // Determine next question or finalize result
    const nextQuestionId = getNextQuestionIdInternal(
      currentQuestionId,
      answers,
    );

    if (nextQuestionId === null) {
      // No more questions - determine result
      try {
        const resultType = determineHairType(answers);
        if (resultType === 'straight') {
          router.push('/hair-types/quiz/straight');
        } else {
          router.push(`/hair-types/quiz/${resultType}`);
        }
      } catch (error) {
        console.error('Error determining hair type:', error);
      }
    } else {
      setCurrentQuestionId(nextQuestionId);
    }
  };

  const canProceed = () => {
    if (!currentQuestionId) return false;

    if (currentQuestionId === 'straight-gate') {
      return answers.isStraight !== undefined;
    }

    if (currentQuestionId === 'primary-pattern') {
      return !!answers.primaryPattern;
    }

    if (currentQuestionId === 'additional-patterns') {
      // Can always proceed (even with no selections)
      return true;
    }

    if (currentQuestionId === 'elongation') {
      return answers.elongatesWhenWet !== undefined;
    }

    if (currentQuestionId === 'shrinkage') {
      return !!answers.shrinkage;
    }

    return false;
  };

  const getNextQuestionIdInternal = (
    currentId: QuestionType,
    currentAnswers: QuizAnswers,
  ): QuestionType | null => {
    if (currentId === 'straight-gate') {
      if (currentAnswers.isStraight === true) {
        return null; // Result: straight
      }
      return 'primary-pattern';
    }

    if (currentId === 'primary-pattern') {
      return 'additional-patterns';
    }

    if (currentId === 'additional-patterns') {
      const primaryPattern = currentAnswers.primaryPattern;
      const additionalPatterns = currentAnswers.additionalPatterns || [];

      if (!primaryPattern) return null;

      // Check if we need elongation question
      if (shouldAskElongation(primaryPattern, additionalPatterns)) {
        return 'elongation';
      }

      // Check if we need shrinkage question
      if (shouldAskShrinkage(primaryPattern, additionalPatterns)) {
        return 'shrinkage';
      }

      // No more questions needed, ready for result
      return null;
    }

    if (currentId === 'elongation') {
      const primaryPattern = currentAnswers.primaryPattern;
      const additionalPatterns = currentAnswers.additionalPatterns || [];

      if (!primaryPattern) return null;

      // Check if we still need shrinkage
      if (shouldAskShrinkage(primaryPattern, additionalPatterns)) {
        return 'shrinkage';
      }

      return null; // Ready for result
    }

    if (currentId === 'shrinkage') {
      return null; // Last question, ready for result
    }

    return null;
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionId('straight-gate');
    setSelectedAdditionalPatterns(new Set());
  };

  // Start screen
  if (!currentQuestionId) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <ChatBubbleRobot imageUrl="/normal.svg" status="ok">
          <ChatBubble status="ok">
            This quiz helps you discover your hair pattern based on how your
            hair naturally behaves, not just how it looks. Answer based on your
            hair&apos;s natural state — how it looks when you don&apos;t use any
            styling products or heat tools. Ready? Let&apos;s begin!
          </ChatBubble>
        </ChatBubbleRobot>
        <div className="max-w-2xl ml-auto">
          <ChatBubbleUser>
            <button
              onClick={handleStartQuiz}
              className="btn btn-primary w-full"
            >
              Start Quiz
            </button>
          </ChatBubbleUser>
        </div>
      </div>
    );
  }

  const question = getQuestion(currentQuestionId);
  if (!question) {
    return <div>Error: Question not found</div>;
  }

  // Debug logging for additional-patterns question
  if (currentQuestionId === 'additional-patterns') {
    console.log('Additional patterns question:', {
      questionType: question.type,
      currentQuestionId,
      hasPrimaryPattern: !!answers.primaryPattern,
      shouldRenderMultiSelect:
        currentQuestionId === 'additional-patterns' &&
        question.type === 'multi-select' &&
        answers.primaryPattern,
    });
  }

  // Calculate progress for indicator
  const getProgressSteps = () => {
    const steps: {
      id: QuestionType;
      label: string;
      completed: boolean;
      current: boolean;
    }[] = [];

    // Q0: Straight gate
    steps.push({
      id: 'straight-gate',
      label: '1',
      completed: answers.isStraight !== undefined,
      current: currentQuestionId === 'straight-gate',
    });

    // Q1: Primary pattern
    steps.push({
      id: 'primary-pattern',
      label: '2',
      completed: !!answers.primaryPattern,
      current: currentQuestionId === 'primary-pattern',
    });

    // Q2: Additional patterns
    steps.push({
      id: 'additional-patterns',
      label: '3',
      completed:
        answers.primaryPattern !== undefined &&
        currentQuestionId !== 'additional-patterns',
      current: currentQuestionId === 'additional-patterns',
    });

    // Conditional questions (only show if they might appear)
    if (answers.primaryPattern) {
      const needsElongation = shouldAskElongation(
        answers.primaryPattern,
        answers.additionalPatterns || [],
      );
      const needsShrinkage = shouldAskShrinkage(
        answers.primaryPattern,
        answers.additionalPatterns || [],
      );

      if (needsElongation) {
        steps.push({
          id: 'elongation',
          label: '4',
          completed: answers.elongatesWhenWet !== undefined,
          current: currentQuestionId === 'elongation',
        });
      }

      if (needsShrinkage) {
        steps.push({
          id: 'shrinkage',
          label: needsElongation ? '5' : '4',
          completed: !!answers.shrinkage,
          current: currentQuestionId === 'shrinkage',
        });
      }
    }

    return steps;
  };

  const progressSteps = getProgressSteps();

  // Render current question
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {progressSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                step.completed
                  ? 'bg-primary'
                  : step.current
                  ? 'bg-primary ring-2 ring-primary ring-offset-2'
                  : 'bg-base-300'
              }`}
              title={`Step ${step.label}`}
            />
            {index < progressSteps.length - 1 && (
              <div
                className={`h-0.5 w-4 ${
                  step.completed ? 'bg-primary' : 'bg-base-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="bg-base-100 cb-card-lite">
        <h2 className="text-2xl font-bold mb-2">{question.question}</h2>
        {question.instruction && (
          <p className="text-base-content/70 mb-6">{question.instruction}</p>
        )}

        <form className="space-y-4">
          {/* Multi-select questions (additional patterns) - MUST come before single-select */}
          {currentQuestionId === 'additional-patterns' &&
          question.type === 'multi-select' &&
          answers.primaryPattern ? (
            <div className="space-y-3">
              {getAdjacentPatterns(answers.primaryPattern).map((pattern) => {
                const isSelected = selectedAdditionalPatterns.has(pattern);
                const displayName =
                  pattern.charAt(0).toUpperCase() +
                  pattern.slice(1).replace('-', ' ');
                const hasImage = question.hasImages && patternImages[pattern];

                return (
                  <label
                    key={pattern}
                    className={`flex items-center gap-4 p-4 rounded-box cursor-pointer transition-colors border-2 ${
                      isSelected
                        ? 'bg-primary text-primary-content border-primary'
                        : 'bg-base-200 hover:bg-base-300 border-base-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAnswer(pattern)}
                      className={`checkbox checkbox-primary flex-shrink-0 w-6 h-6 ${
                        isSelected
                          ? 'border-2 border-primary-content'
                          : 'border-2 border-primary'
                      }`}
                      name={`additional-pattern-${pattern}`}
                      id={`checkbox-${pattern}`}
                    />
                    {hasImage && (
                      <div className="flex-shrink-0">
                        <Image
                          src={patternImages[pattern]}
                          alt={`${displayName} pattern`}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                    <span className="text-lg flex-1">{displayName}</span>
                  </label>
                );
              })}
              {selectedAdditionalPatterns.size === 0 && (
                <p className="text-sm text-base-content/70 mt-2">
                  Select all that apply, or skip if none apply
                </p>
              )}
            </div>
          ) : null}

          {/* Yes/No questions */}
          {question.type === 'yes-no' &&
            currentQuestionId !== 'additional-patterns' && (
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-base-200 rounded-box cursor-pointer hover:bg-base-300 transition-colors">
                  <input
                    type="radio"
                    name={currentQuestionId || 'yes-no'}
                    value="yes"
                    checked={
                      (currentQuestionId === 'straight-gate' &&
                        answers.isStraight === true) ||
                      (currentQuestionId === 'elongation' &&
                        answers.elongatesWhenWet === true)
                    }
                    onChange={() => handleAnswer(true)}
                    className="radio radio-primary"
                  />
                  <span className="text-lg">Yes</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-base-200 rounded-box cursor-pointer hover:bg-base-300 transition-colors">
                  <input
                    type="radio"
                    name={currentQuestionId || 'yes-no'}
                    value="no"
                    checked={
                      (currentQuestionId === 'straight-gate' &&
                        answers.isStraight === false) ||
                      (currentQuestionId === 'elongation' &&
                        answers.elongatesWhenWet === false)
                    }
                    onChange={() => handleAnswer(false)}
                    className="radio radio-primary"
                  />
                  <span className="text-lg">No</span>
                </label>
              </div>
            )}

          {/* Single-select questions */}
          {question.type === 'single-select' &&
            question.options &&
            currentQuestionId !== 'additional-patterns' && (
              <div className="space-y-3">
                {question.options.map((option) => {
                  const hasImage =
                    question.hasImages && patternImages[option.value];
                  const isSelected =
                    (currentQuestionId === 'primary-pattern' &&
                      answers.primaryPattern === option.value) ||
                    (currentQuestionId === 'shrinkage' &&
                      answers.shrinkage === option.value);
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-4 p-4 bg-base-200 rounded-box cursor-pointer hover:bg-base-300 transition-colors"
                    >
                      <input
                        type="radio"
                        name={currentQuestionId}
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleAnswer(option.value)}
                        className="radio radio-primary flex-shrink-0"
                      />
                      {hasImage && (
                        <div className="flex-shrink-0">
                          <Image
                            src={patternImages[option.value]}
                            alt={`${option.label} pattern`}
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <span className="text-lg flex-1">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
        </form>

        {/* Next Button */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-base-300">
          <button onClick={resetQuiz} className="btn btn-ghost btn-sm">
            Restart Quiz
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn btn-primary"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
}
