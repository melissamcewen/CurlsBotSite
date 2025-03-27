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
        nextSection: '2avs2bc',
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
        nextSection: '1bvs1ac',
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
        nextSection: '1bvs1ac',
      },
    ],
  },

  // Section: Type 1B vs 1A/1C determination

  {
    section: '1bvs1ac',
    question: 'Do heatless curls work well in your hair?',
    answers: [
      {
        content: 'Yes',
        result: '1b',
      },
      {
        content: 'No',
        nextSection: '1avs1c',
      },
      {
        content: "I've never tried heatless curls",
      },
    ],
  },
  {
    section: '1bvs1ac',
    question:
      'Do you have trouble with your hair slipping out of clips and other accessories?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1avs1c',
      },
      {
        content: 'No',
        result: '1b',
      },
      {
        content: "I've never used clips or accessories/I'm not sure",
      },
    ],
  },
  {
    section: '1bvs1ac',
    question: 'Do you struggle with volume in your hair?',
    answers: [
      {
        content: 'Yes',
        nextSection: '1avs1c',
      },
      {
        content: 'No',
        result: '1b',
      },
      {
        content: "I'm not sure",
      },
    ],
  },

  {
    section: '1bvs1ac',
    question: 'Do you often struggle with frizzy hair?',
    answers: [
      {
        content: 'No',
        nextSection: '1avs1c',
      },
      {
        content: 'Yes',
        result: '1b',
      },
    ],
  },

  /*
  {
    section: '1bvs1ac',
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
    section: '1bvs1ac',
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
  // Section: Type 1A vs 1C final determination
  {
    section: '1avs1c',
    question: 'Do you often have static flyaways?',
    answers: [
      {
        content: 'Yes',
        result: '1a',
      },
      {
        content: 'No',
      },
    ],
  },
  {
    section: '1avs1c',
    question: 'Is your hair easy to chemically lighten?',
    answers: [
      {
        content: "Yes, it's easy to lighten my hair",
        result: '1a',
      },
      {
        content: 'No, it is difficult to lighten my hair',
        result: '1c',
      },
      {
        content: "I've never tried to lighten my hair",
      },
      {
        content: 'My hair is already light',
        result: '1a',
      },
    ],
  },
  {
    section: '1avs1c',
    question:
      'Do you have to be careful with bobby pins and similar hair accessories because they sometimes cause breakage?',
    answers: [
      {
        content: 'Yes',
        result: '1a',
      },
      {
        content: 'No',
      },
    ],
  },

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
