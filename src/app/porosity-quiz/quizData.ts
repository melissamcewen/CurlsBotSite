export interface Answer {
  content: string;
  result?: 'high' | 'low' | 'normal' | 'mixed';
  nextQuestion?: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export const quizQuestions: Question[] = [
  {
    question:
      'Is your hair dyed, bleached, highlighted, permed, relaxed, or otherwise chemically treated?',
    answers: [
      {
        content: 'Yes',
        result: 'high',
      },
      {
        content: 'No',
        nextQuestion: true,
      },
      {
        content: 'Yes, but only on the ends (growing out natural hair)',
        result: 'mixed',
      },
    ],
  },
  {
    question:
      'Does your hair have signs of damage? (e.g., UV from the sun, heat styling, friction, or tight hairstyles)',
    answers: [
      {
        content: 'Yes',
        result: 'high',
      },
      {
        content: 'No',
        nextQuestion: true,
      },
      {
        content: 'Yes, but only on the ends (growing out natural hair)',
        result: 'mixed',
      },
    ],
  },
  {
    question: 'Is your hair long (past shoulders)?',
    answers: [
      {
        content: 'Yes',
        result: 'mixed',
      },
      {
        content: 'Unsure / in between',
        result: 'mixed',
      },
      {
        content: 'No',
        result: 'low',
      },
    ],
  },
];
