import { Question } from './types';

export const type4Questions: Question[] = [
  // Section: Type 3C vs Type 4 determination
  {
    section: '3cvs4',
    question:
      'Does your hair shrink more than 50% of its length when it dries?',
    answers: [
      {
        content: 'Yes',
        nextSection: '4avs4c',
      },
      {
        content: 'No',
        result: '3c',
      },
    ],
  },

  // Section: Type 4A vs 4C determination
  {
    section: '4avs4c',
    question:
      'Do you see a consistent spiral curl pattern without needing to define it with product or styling?',
    answers: [
      {
        content: 'Yes',
        nextSection: '4avs4b',
      },
      {
        content: 'No',
        result: '4c',
      },
    ],
  },

  // Section: Type 4A vs 4B determination
  {
    section: '4avs4b',
    question:
      'Do you have any pieces of your hair that have a zig zag/kink pattern rather than coils/spirals?',
    answers: [
      {
        content: 'Yes',
        result: '4b',
      },
      {
        content: 'No',
        result: '4a',
      },
    ],
  },
];
