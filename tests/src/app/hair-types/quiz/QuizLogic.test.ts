import {
  quizQuestions,
  resultMapping,
} from '../../../../../src/app/hair-types/quiz/quizData';

describe('Quiz Logic - Type 1A Pathway', () => {
  // Helper function to simulate answering questions
  const simulateQuizPath = (
    answers: { section: string; question: string; answer: string }[],
  ) => {
    let currentSection = '1vs234';
    let result: string | undefined;

    for (const { section, question: expectedQuestion, answer } of answers) {
      // Verify we're in the expected section
      expect(currentSection).toBe(section);

      // Find the questions for current section
      const sectionQuestions = quizQuestions.filter(
        (q) => q.section === currentSection,
      );
      expect(sectionQuestions.length).toBeGreaterThan(0);

      // Find the specific question we want to answer
      const question = sectionQuestions.find(
        (q) => q.question === expectedQuestion,
      );
      if (!question) {
        console.error(
          `Could not find question "${expectedQuestion}" in section "${section}"`,
        );
        console.error(
          'Available questions:',
          sectionQuestions.map((q) => q.question),
        );
      }
      expect(question).toBeDefined();

      // Find the matching answer
      const matchingAnswer = question!.answers.find(
        (a) => a.content === answer,
      );
      if (!matchingAnswer) {
        console.error(
          `Could not find answer "${answer}" for question: "${expectedQuestion}"`,
        );
        console.error(
          'Available answers:',
          question!.answers.map((a) => a.content),
        );
      }
      expect(matchingAnswer).toBeDefined();

      if (matchingAnswer?.result) {
        result = matchingAnswer.result;
        break;
      }

      if (matchingAnswer?.nextSection) {
        currentSection = matchingAnswer.nextSection;
      }
    }

    return result;
  };

  test('Type 1A pathway from documentation', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question: 'Is your hair perfectly straight with no bends when wet?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question:
          'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
        answer: "I haven't tried these techniques",
      },
      {
        section: '1vs2',
        question:
          'Does your hair form any waves/bends overnight or in high humidity?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Do heatless curls work well in your hair?',
        answer: "I've never tried heatless curls",
      },
      {
        section: '1cvs1ab',
        question:
          'Do you get more volume in your hair from using a stronger/clarifying shampoo?',
        answer: "I've never used a clarifying shampoo",
      },
      {
        section: '1cvs1ab',
        question: 'Do you often struggle with frizzy hair?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is your hair very thick?',
        answer: 'Yes',
      },
      {
        section: '1cvs1ab',
        question:
          "Do you think your hair grows faster than other people's hair on average",
        answer: 'No',
      },
      {
        section: '1avs1b',
        question:
          'Do you get "triangle hair" (where hair is flat on top and wide at the bottom)?',
        answer: "I'm not sure",
      },
      {
        section: '1avs1b',
        question: 'Is frizz a major problem for you?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1a');
    expect(resultMapping['1a']).toBe('/hair-types/type-1a');
  });
});
