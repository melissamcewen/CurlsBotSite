import { Question } from './types';

export const type4Questions: Question[] = [
  // Section: Type 3C vs Type 4 determination
  {
    section: '3cvs4',
    question: 'Does your hair grow upwards?',
    answers: [
      {
        content: 'Yes',
        nextSection: '4avs4bvs4c',
      },
      {
        content: 'No',
        result: '3c',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '3cvs4',
    question: 'Does your hair shrink more than 50% of its length when it dries?',
    answers: [
      {
        content: 'Yes',
        nextSection: '4avs4bvs4c',
      },
      {
        content: 'No',
        result: '3c',
      },
    ],
  },

  // Section: Type 4A vs 4C determination
  {
    section: '4avs4bvs4c',
    question: 'Does your hair have easily defined kinks and/or coils?',
    answers: [
      {
        content: 'No',
        result: '4c',
      },
      {
        content: 'Yes, it has defined kinks',
        result: '4b',
      },
      {
        content: 'Yes, it has defined coils',
        result: '4a',
      },
    ],
  },
];
