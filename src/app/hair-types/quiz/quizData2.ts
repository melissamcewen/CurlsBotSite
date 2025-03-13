import { Question } from './types';

export const type2Questions: Question[] = [
  // Section: Type 2 vs Type 3 determination
  {
    section: '2vs3',
    question:
      'If you scrunch your hair with gel or mousse/foam and let it air dry, does it form ringlets or just enhanced waves?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3a3cvs3c4',
      },
      {
        content: 'No',
        nextSection: '2avs2c',
      },
      {
        content: "I'm not sure/I've never tried this",
      },
    ],
  },
  {
    section: '2vs3',
    question: 'When your hair is wet, do you see curls forming?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3a3cvs3c4',
      },
      {
        content: 'No',
      },
    ],
  },
  {
    section: '2vs3',
    question:
      'Have you ever noticed your hair forming curls when you used no heat and let it dry naturally?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3a3cvs3c4',
      },
      {
        content: 'No',
        nextSection: '2avs2c',
      },
    ],
  },

  // Section: Type 2A vs 2C determination
  {
    section: '2avs2c',
    question: 'Is your hair wavy when wet?',
    answers: [
      {
        content: 'Yes',
        result: '2c',
      },
      {
        content: 'No',
        nextSection: '2avs2b',
      },
    ],
  },

  // Section: Type 2A vs 2B final determination
  {
    section: '2avs2c',
    question:
      'Does your hair ever get straight closer to the roots when you use no heat/product and let it dry naturally?',
    answers: [
      {
        content: 'Yes',
        result: '2a',
      },
      {
        content: 'No',
      },
    ],
  },
  {
    section: '2avs2b',
    question: 'Does brushing your hair when dry make it straight at the roots?',
    answers: [
      {
        content: 'Yes',
        result: '2a',
      },
      {
        content: 'No',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '2avs2b',
    question:
      'Does your hair ever get completely straight closer to the roots 1-2 days after washing it?',
    answers: [
      {
        content: 'Yes',
        result: '2a',
      },
      {
        content: 'No',
        result: '2b',
      },
      {
        content: "I'm not sure",
        result: '2b',
      },
    ],
  },
];
