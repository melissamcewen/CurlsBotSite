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
    question:
      'Do you have a lot of variation in your curl pattern between different parts of your hair?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3avs3b',
      },
      {
        content: 'No',
        result: '3c',
      },
    ],
  },
  {
    section: '3a3bvs3c',
    question: 'Do you have a lot of trouble getting volume at your roots?',
    answers: [
      {
        content: 'No my roots have plenty of volume',
        result: '3c',
      },
      {
        content: 'Yes',
        nextSection: '3avs3b',
      },
    ],
  },

  // Section: Type 3A vs 3B final determination
  {
    section: '3avs3b',
    question: 'Does gel sometimes make your hair stringy?',
    answers: [
      {
        content: 'Yes',
        result: '3a',
      },
      {
        content: 'No',
        result: '3b',
      },
      {
        content: "I'm not sure/I haven't used gel",
      },
    ],
  },
  {
    section: '3avs3b',
    question: 'Do you have many types of waves and curls in your hair?',
    answers: [
      {
        content: 'Yes',
        result: '3a',
      },
      {
        content: 'No',
        result: '3b',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '3avs3b',
    question:
      'Do you ever get areas of your hair that are much straighter than others? This is sometimes called "Irish curls"',
    answers: [
      {
        content: 'Yes',
        result: '3a',
      },
      {
        content: 'No',
        result: '3b',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '3avs3b',
    question: 'Do you tend to lose your curl pattern overnight?',
    answers: [
      {
        content: 'Yes',
        result: '3a',
      },
      {
        content: 'No',
        result: '3b',
      },
    ],
  },
];
