import { Question } from './types';

export const type1Questions: Question[] = [
  // Initial branching: Straight vs. Wavy/Curly/Coily
  {
    section: '1vs234',
    question:
      'Does your hair dry straight without needing products, heat, or tools?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1vs2',
      },
      {
        content: 'No',
        nextSection: '23vs34',
      },
    ],
  },

  // Section: Type 1 vs Type 2
  {
    section: '1vs2',
    question: 'Is your hair perfectly straight with no bends when wet?',
    answers: [
      {
        content: 'Yes',
      },
      {
        content: 'No',
        nextSection: '2avs2c',
      },
    ],
  },
  {
    section: '1vs2',
    question:
      'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
    answers: [
      {
        content: 'Yes, waves formed',
        nextSection: '2avs2c',
      },
      {
        content: 'I tried these techniques but no waves formed',
        nextSection: '1cvs1ab',
      },
      {
        content: "I haven't tried these techniques",
      },
    ],
  },
  {
    section: '1vs2',
    question:
      'Does your hair form any waves/bends overnight or in high humidity?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2avs2c',
      },
      {
        content: 'No',
        nextSection: '1cvs1ab',
      },
    ],
  },

  // Section: Type 1C vs 1A/1B determination

  {
    section: '1cvs1ab',
    question: 'Is it easy to curl your hair with a curling iron?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1cvs1ab',
      },
      {
        content: 'No',
        result: '1c',
      },
      {
        content: "I've never tried a curling iron",
      },
    ],
  },
  {
    section: '1cvs1ab',
    question:
      'Do you get more volume in your hair from using a stronger/clarifying shampoo?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1avs1b',
      },
      {
        content: 'No',
      },
      {
        content: "I've never used a clarifying shampoo",
      },
    ],
  },
  {
    section: '1cvs1ab',
    question: 'Do you often struggle with frizzy hair?',
    answers: [
      {
        content: 'No',
      },
      {
        content: 'Yes',
        nextSection: '1avs1b',
      },
    ],
  },
  {
    section: '1cvs1ab',
    question: 'Is your hair very thick?',
    answers: [
      {
        content: 'No',
        nextSection: '1avs1b',
      },
      {
        content: 'Yes',
      },
    ],
  },
  {
    section: '1cvs1ab',
    question: 'Do you have trouble with static flyaways?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1avs1b',
      },
      {
        content: 'No',
        result: '1c',
      },
    ],
  },
  /*
  {
    section: '1cvs1ab',
    question: 'Can you easily curl your hair with a curling iron?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1avs1b',
      },
      {
        content: 'No',
        result: '1c',
      },
    ],
  },
  {
    section: '1cvs1ab',
    question:
      "Do you think your hair grows faster than other people's hair on average",
    answers: [
      {
        content: 'No',
        nextSection: '1avs1b',
      },
      {
        content: 'Yes',
        result: '1c',
      },
    ],
  },
*/
  // Section: Type 1A vs 1B final determination
  {
    section: '1avs1b',
    question: 'Does your hair ever curl up at the ends?',
    answers: [
      {
        content: 'Yes',
        result: '1b',
      },
      {
        content: 'No',
        result: '1a',
      },
    ],
  }
  /*
  {
    section: '1avs1b',
    question: 'Do heatless curls work well in your hair?',
    answers: [
      {
        content: 'Yes',
        result: '1b',
      },
      {
        content: 'No',
        result: '1a',
      },
      {
        content: "I've never tried heatless curls",
      },
    ],
  },
  {
    section: '1avs1b',
    question:
      'Do you get "triangle hair" (where hair is flat on top and wide at the bottom)?',
    answers: [
      {
        content: 'Yes',
        result: '1b',
      },
      {
        content: 'No',
        result: '1a',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '1avs1b',
    question: 'Is frizz a major problem for you?',
    answers: [
      {
        content: 'Yes',
        result: '1b',
      },
      {
        content: 'No',
        result: '1a',
      },
    ],
  },
  */
];
