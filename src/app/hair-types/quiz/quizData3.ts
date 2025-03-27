import { Question } from './types';

export const type3Questions: Question[] = [
  // Section: Type 2/3 vs Type 3/4 determination
  {
    section: '23vs34',
    question: 'Do heavy products make your hair limp?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2vs3',
      },
      {
        content: 'No',
        nextSection: '3a3cvs3c4',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '23vs34',
    question: 'Do you have trouble getting volume at your roots?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2vs3',
      },
      {
        content: 'No',
        nextSection: '3a3cvs3c4',
      },
      {
        content: 'N/A',
      },
    ],
  },
  {
    section: '23vs34',
    question: 'Is your hair much longer if you stretch it out?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3a3cvs3c4',
      },
      {
        content: 'No',
        nextSection: '2vs3',
      },
    ],
  },

  // Section: Type 3A/3C vs 3C/4 determination
  {
    section: '3a3cvs3c4',
    question: 'Do you have trouble growing your hair long/gaining length?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3cvs4',
      },
      {
        content: 'No',
        nextSection: '3a3bvs3c',
      },
    ],
  },

  // Section: Type 3A/3B vs 3C determination
  {
    section: '3a3bvs3c',
    question:
      'Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3avs3b',
      },
      {
        content: 'No',
        result: '3c',
      },
      {
        content: 'N/A',
      },
    ],
  },

  {
    section: '3a3bvs3c',
    question: 'Does your hair seem like it grows out horizontally?',
    answers: [
      {
        content: 'Yes, it seems to grow out horizontally',
        result: '3c',
      },
      {
        content: 'No',
        nextSection: '3avs3b',
      },
    ],
  },

  // Section: Type 3A vs 3B final determination
  
];
