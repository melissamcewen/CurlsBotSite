export interface Answer {
  content: string;
  low?: number;
  high?: number;
  normal?: number;
  mixed?: number;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export const quizQuestions: Question[] = [
  {
    question: 'Which sounds more like your experience with products:',
    answers: [
      {
        content:
          'Products sit on my hair and end up looking like grease or buildup',
        low: 4,
      },
      {
        content:
          'My hair absorbs products like a sponge, so I have to use a lot of product',
        high: 4,
      },
      {
        content:
          'My scalp tends to be oily but the ends of my hair absorb products like a sponge',
        mixed: 4,
      },
      {
        content: "I don't really have either of these issues",
        normal: 4,
      },
    ],
  },
  {
    question: 'I do not absorb hair color or treatments easily',
    answers: [
      {
        content: 'Yes',
        low: 2,
      },
      {
        content: 'No, they absorb just fine',
        normal: 2,
      },
      {
        content: "I don't color so this doesn't apply to me",
      },
      {
        content: "The ends of my hair absorb well but the scalp doesn't",
        mixed: 2,
      },
    ],
  },
  {
    question:
      'My hair takes a long time to dry compared to other people with similar hair density',
    answers: [
      {
        content: 'Yes, ugh it takes forever to dry',
        low: 2,
      },
      {
        content: 'No, it seems to take a pretty normal amount of time to dry',
        normal: 2,
      },
      {
        content: 'My hair dries quickly',
        high: 2,
      },
      {
        content:
          'The ends of my hair dry quickly but the scalp takes a long time to dry',
        mixed: 2,
      },
    ],
  },
  {
    question: 'Which describes your hair better?',
    answers: [
      {
        content: 'My hair looks dull and dry',
        high: 2,
      },
      {
        content: 'My hair appears healthy and shiny, but has little volume',
        low: 2,
      },
      {
        content: 'My hair has a good amount of volume and looks pretty healthy',
        normal: 0,
      },
      {
        content:
          'My hair appears healthy and shiny at the roots, but the ends are dry and dull',
        mixed: 2,
      },
    ],
  },
  {
    question:
      'My hair was previously bleached, colored, or permed or otherwise heavily processed/heat damaged within the past year',
    answers: [
      {
        content: 'Yes',
        high: 2,
        mixed: 2,
      },
      {
        content: 'Nope',
        normal: 0,
      },
    ],
  },
  {
    question: 'Have you tried oils in your hair?',
    answers: [
      {
        content: 'Yes, and they made my hair look limp and greasy',
        low: 2,
      },
      {
        content: 'Oils make my hair look healthy and shiny',
        high: 2,
      },
      {
        content:
          'Some oils work well in my hair but I have to be careful and use only some types and/or in small amounts',
        normal: 1,
      },
      {
        content: "Hmm I've never tried oil on my hair before",
      },
      {
        content:
          'I can oil the ends of my hair but if I use oil near my scalp it makes it look greasy',
        mixed: 2,
      },
    ],
  },
  {
    question: 'Which do you need more of?',
    answers: [
      {
        content: 'Clarifying treatments',
        low: 2,
      },
      {
        content: 'Deep conditioning',
        high: 2,
      },
      {
        content: "I don't use either",
        normal: 2,
      },
      {
        content: 'I need both',
        mixed: 2,
        normal: 2,
      },
    ],
  },
  {
    question: 'How often do you need to wash your hair?',
    answers: [
      {
        content: 'I seem to need to wash my hair often or it looks greasy',
        low: 2,
      },
      {
        content:
          'I can go a few days (3-4) without washing and my hair looks great',
        normal: 2,
      },
      {
        content: 'I can go over 4 days without washing and my hair looks great',
        high: 2,
      },
    ],
  },
  {
    question: 'How does your hair respond to sulfate-containing shampoo?',
    answers: [
      {
        content: 'It looks fine or great!',
        low: 2,
      },
      {
        content: 'It seems a little dry',
        normal: 1,
      },
      {
        content:
          'Sulfate-containg shampoos make my hair look very dry and unhealthy',
        high: 2,
      },
      {
        content:
          'I can use sulfate-containing shampoo but I need to protect my ends',
        mixed: 2,
      },
    ],
  },
  {
    question: 'What cleanser works best for your hair?',
    answers: [
      {
        content: 'Low-poo (a very gentle sulfate-free shampoo)',
        low: 1,
      },
      {
        content: 'Regular shampoo',
        low: 2,
      },
      {
        content: "I don't know about this or I haven't tried both",
        normal: 0,
      },
      {
        content: 'I alternate multiple (such as cowash and low poo)',
        normal: 1,
        mixed: 1,
      },
      {
        content: 'Co-wash',
        high: 1,
      },
    ],
  },
  {
    question: 'How long is your hair?',
    answers: [
      {
        content: 'Short',
      },
      {
        content: 'Medium',
      },
      {
        content: 'Long',
        mixed: 2,
      },
      {
        content: 'Super long',
        mixed: 4,
      },
    ],
  },
];
