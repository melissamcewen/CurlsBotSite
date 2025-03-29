import { Question } from './types';

export const type3Questions: Question[] = [
  // Section: Type 2/3 vs Type 3/4 determination
  {
    section: '23vs34',
    question: 'Do heavy products make your hair limp?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2avs2bc',
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
    section: '23vs34',
    question: 'Do you have areas of your hair that sometimes look straight?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2avs2bc',
      },
      {
        content: 'No',
      },
    ],
  },
  {
    section: '23vs34',
    question:
      'Does your hair pattern loosen from wavy to straight or from curly to wavy overnight or during the day?',
    answers: [
      {
        content:
          'Yes, my hair pattern often loosens from curly to wavy/straight',
        nextSection: '2avs2bc',
      },
      {
        content: 'Yes, my hair pattern often loosens from wavy to straight',
        nextSection: '2avs2bc',
      },
      {
        content: 'No',
        nextSection: '3avs3b',
      },
    ],
  },
  {
    section: '23vs34',
    question: 'Is your hair much longer if you stretch it out?',
    answers: [
      {
        content: 'Yes, much longer',
        nextSection: '3a3cvs3c4',
      },
      {
        content: 'A little longer',
        nextSection: '2avs2bc',
      },
      {
        content: 'No',
        nextSection: '3a3cvs3c4',
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
      'Is your hair possible to straighten with just heat (straightening iron, blow dryer, etc.)?',
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
    question: "Is your hair over 50% longer when it's wet vs. when it's dry?",
    answers: [
      {
        content: 'Yes',
        result: '3c',
      },
      {
        content: 'No',
        nextSection: '3avs3b',
      },
    ],
  },

  // Section: Type 3A vs 3B final determination
  {
    section: '3avs3b',
    question: "Is your hair curlier when it's longer vs. when it's shorter?",
    answers: [
      {
        content: "Yes, it's curlier when it's longer",
        result: '3a',
      },
      {
        content: "No, it's curlier when it's shorter or the same",
        result: '3b',
      },
    ],
  },
];
