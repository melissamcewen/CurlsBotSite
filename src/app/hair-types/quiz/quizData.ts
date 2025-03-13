export interface Answer {
  content: string;
  nextSection?: string;
  points?: {
    [key: string]: number;
  };
  result?: string; // Direct result without points calculation
}

export interface Question {
  question: string;
  answers: Answer[];
  section: string;
}

// Define all possible sections
export type QuizSection =
  | '1vs234'
  | '1vs2'
  | '2vs3'
  | '1cvs1ab'
  | '1avs1b'
  | '23vs34'
  | '2vs3'
  | '2avs2c'
  | '3a3cvs3c4'
  | '3a3bvs3c'
  | '3avs3b'
  | '3cvs4'
  | '4avs4c'
  | '4avs4b';

export const quizQuestions: Question[] = [
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
  // Type 1C is the very straight hair type that doesn't easily get frizzy and can't hold styles well
  {
    section: '1cvs1ab',
    question: 'Do heatless curls work well in your hair?',
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
        content: "I've never tried heatless curls",
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
  /* Don't need this question for now
  {
    section: '1avs1bc',
    question: 'Is your hair easy to detangle?',
    answers: [
      {
        content: 'No',
        nextSection: '1bvs1c',
      },
      {
        content: 'Yes',
        result: '1a',
      },
    ],
  },
*/
  // Section: Type 1A vs 1B final determination
  // Type 1B is hair that can get proofy and frizzy but never forms waves
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
  /* Don't need this question for now
  {
    section: '23vs34',
    question:
      'When you run your fingers through your dry hair, does it glide through smoothly without getting caught in your hair?',
    answers: [
      {
        content: 'Yes',
        nextSection: '2vs3',
      },
      {
        content: 'No',
      },
      {
        content: "I'm not sure",
      },
    ],
  }
*/
  // Section: Type 2 vs Type 3 determination
  // Type 2 is hair that doesn't form curls
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
  //2a is a very weak wave pattern
  //2c is a very strong wave pattern
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
  /* Don't need this question for now
  {
    section: '2avs2c',
    question: 'Do you struggle to get volume at your roots?',
    answers: [
      {
        content: 'Yes',
      },
      {
        content: 'No',
        result: '2c',
      },
    ],
  },
*/

  // Section: Type 2A vs 2B final determination
  //2a is a very weak wave pattern
  //2b is a medium wave pattern
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
  //Section 3a/3c vs 3c/4
  //the 3c/4 group has a lot of shrinkage
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
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '3a3cvs3c4',
    question:
      'Does your hair shrink significantly (50% or more) when it dries?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3cvs4',
      },
      {
        content: 'No',
        nextSection: '3a3bvs3c',
      },
      {
        content: "I'm not sure",
      },
    ],
  },
  {
    section: '3a3cvs3c4',
    question:
      'Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3a3bvs3c',
      },
      {
        content: 'No',
        nextSection: '3cvs4',
      },
      {
        content: 'N/A',
      },
    ],
  },
  {
    section: '3a3cvs3c4',
    question: 'Do your curls ever become limp and stretched out overnight?',
    answers: [
      {
        content: 'Yes',
        nextSection: '3a3bvs3c',
      },
      {
        content: 'No',
        nextSection: '3cvs4',
      },
    ],
  },

  // Section: Type 3A/3b vs 3C determination
  // 3C is a very strong curl pattern
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
  //3a is very weak and can become wavy
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
  // Section: Type 3C vs Type 4 determination
  // 4 defined by high shrinkage
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

  // Section: Type 4A vs 4C final determination
  // 4a is coils
  // 4c is kinks
  // kinks can do a lot of styles like twists but has a less defined curl pattern
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
  /* Don't need this question for now
  {
    section: '4avs4c',
    question:
      'Does your hair clump into small, defined curls when wet without needing much manipulation?',
    answers: [
      {
        content: 'Yes',
        points: { '4a': 1 },
      },
      {
        content: 'No',
        points: { '4c': 1 },
      },
    ],
  },
  {
    section: '4avs4c',
    question:
      'Does your hair experience extreme shrinkage, often more than 75% of its length?',
    answers: [
      {
        content: 'Yes',
        points: { '4c': 1 },
      },
      {
        content: 'No',
        points: { '4a': 1 },
      },
    ],
  },
  {
    section: '4avs4c',
    question:
      'Does your hair often feel dry again shortly after applying products?',
    answers: [
      {
        content: 'Yes',
        points: { '4c': 1 },
      },
      {
        content: 'No',
        points: { '4a': 1 },
      },
      {
        content: 'N/A',
      },
    ],
  },
  {
    section: '4avs4c',
    question:
      'When styling, does your hair easily form twists or braids without unraveling?',
    answers: [
      {
        content: 'Yes',
        points: { '4c': 1 },
      },
      {
        content: 'No',
        points: { '4a': 1 },
      },
      {
        content: 'N/A',
      },
    ],
  },
  {
    section: '4avs4c',
    question:
      'Does your hair respond well to just gel or lighter creams for definition?',
    answers: [
      {
        content: 'Yes',
        points: { '4a': 1 },
      },
      {
        content: 'No',
        points: { '4c': 1 },
      },
      {
        content: 'N/A',
      },
    ],
  },
  */
  // 4a vs. 4b
  // 4a is more bouncy and 4b has zig zags
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

// This maps the final scores to the result pages
export const resultMapping: { [key: string]: string } = {
  '1a': '/hair-types/type-1a',
  '1b': '/hair-types/type-1b',
  '1c': '/hair-types/type-1c',
  '2a': '/hair-types/type-2a',
  '2b': '/hair-types/type-2b',
  '2c': '/hair-types/type-2c',
  '3a': '/hair-types/type-3a',
  '3b': '/hair-types/type-3b',
  '3c': '/hair-types/type-3c',
  '4a': '/hair-types/type-4a',
  '4b': '/hair-types/type-4b',
  '4c': '/hair-types/type-4c',
};
