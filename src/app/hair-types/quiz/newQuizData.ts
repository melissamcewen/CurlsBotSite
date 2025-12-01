/**
 * New Quiz Data Structure
 *
 * Defines the questions and answer options for the new pattern-based quiz.
 */

export type QuestionType = 'straight-gate' | 'primary-pattern' | 'additional-patterns' | 'elongation' | 'shrinkage';

export interface QuestionOption {
  /** Display text for the option */
  label: string;
  /** Value stored when selected */
  value: string;
}

export interface QuizQuestion {
  /** Unique identifier for the question */
  id: QuestionType;
  /** Question text */
  question: string;
  /** Instructions/subtext */
  instruction?: string;
  /** Question type determines how it's rendered */
  type: 'single-select' | 'multi-select' | 'yes-no';
  /** Available answer options */
  options?: QuestionOption[];
  /** Whether this question has image/icon support */
  hasImages?: boolean;
}

/**
 * All quiz questions in order
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'straight-gate',
    question:
      'Does your hair dry perfectly straight — with no bends or curves — naturally, without products, tools, or heat?',
    type: 'yes-no',
  },
  {
    id: 'primary-pattern',
    question: "What's your most common hair pattern when it dries naturally (no products, tools, or heat)?",
    type: 'single-select',
    hasImages: true,
    options: [
      { label: 'Waves', value: 'waves' },
      { label: 'Curls', value: 'curls' },
      { label: 'Coils', value: 'coils' },
      { label: 'Zig-zags', value: 'zig-zags' },
    ],
  },
  {
    id: 'additional-patterns',
    question: 'Do you have any other curl pattern types that appear in your hair naturally?',
    instruction: 'Select all that apply',
    type: 'multi-select',
    hasImages: true,
    // Options will be dynamically filtered based on primary pattern
  },
  {
    id: 'elongation',
    question: 'When you wet your hair, does it loosen/elongate noticeably?',
    type: 'yes-no',
  },
  {
    id: 'shrinkage',
    question:
      'How much does your hair shrink when it dries? (If you stretched out a curl, how much shorter would it be?)',
    type: 'single-select',
    options: [
      { label: 'Little to no shrinkage', value: 'little-none' },
      { label: 'Some shrinkage (little–25%)', value: 'little-25' },
      { label: 'Moderate shrinkage (25–50%)', value: '25-50' },
      { label: 'Lots of shrinkage (50–75%)', value: '50-75' },
      { label: 'Extreme shrinkage (75%+)', value: '75-plus' },
    ],
  },
];

/**
 * Get question by ID
 */
export function getQuestion(id: QuestionType): QuizQuestion | undefined {
  return quizQuestions.find((q) => q.id === id);
}

/**
 * Get next question ID based on current answers
 * Note: This function should be called from the component where logic functions are imported
 */
export type NextQuestionResolver = (
  currentQuestionId: QuestionType,
  answers: any,
) => QuestionType | null;

