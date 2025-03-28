import { Question } from './types';

export const type2Questions: Question[] = [
  // Section: Type 2 vs Type 3 determination
  {
    section: '2avs3',
    question: 'Do you have areas of your hair that sometimes look straight?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2avs2bc',
      },
      {
        content: 'No',
        nextSection: '3avs3b',
      },
      {
        content: "I'm not sure",
      },
    ],
  },

  {
    section: '2avs3',
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

  // Section: Type 2A vs 2C determination
  // fine vs. coarse
  {
    section: '2avs2bc',
    question: 'Does your hair need to be washed often or it gets greasy?',
    answers: [
      {
        content: 'Yes',
        result: '2a',
      },
      {
        content: 'No',
        nextSection: '2cvs2b',
      },
    ],
  },

  {
    section: '2avs2bc',
    question: 'Is your hair easy to brush straight?',
    answers: [
      {
        content: 'Yes',
        result: '2a',
      },
      {
        content: 'No',
        nextSection: '2cvs2b',
      },
    ],
  },

  // Section: Type 2B vs 2C final determination
  {
    section: '2cvs2b',
    question:
      'If you brush your hair when dry, does it smooth it out or get puffy/frizzy?',
    answers: [
      {
        content: 'Smooth out',
        result: '2b',
      },
      {
        content: 'Get puffy/frizzy',
        result: '2c',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '2cvs2b',
    question: 'Does your hair often lack softness/suppleness?',
    answers: [
      {
        content: 'Yes',
        result: '2c',
      },
      {
        content: 'No',
        result: '2b',
      },
    ],
  },
];
