import { describe, expect, test } from '@jest/globals';
import {
  quizQuestions,
  resultMapping,
} from '../../../../app/hair-types/quiz/quizData';

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
    const matchingAnswer = question!.answers.find((a) => a.content === answer);
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

    // Update current section or get result
    if (matchingAnswer!.result) {
      result = matchingAnswer!.result;
      break;
    }
    if (matchingAnswer!.nextSection) {
      currentSection = matchingAnswer!.nextSection;
    }
  }

  return result;
};

describe('Type 1 Hair Quiz Logic', () => {
  test('Type 1A pathway', () => {
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
        section: '1bvs1ac',
        question: 'Do heatless curls work well in your hair?',
        answer: 'No',
      },
      {
        section: '1avs1c',
        question: 'Do you often have static flyaways?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1a');
    expect(resultMapping['1a']).toBe('/hair-types/type-1a');
  });

  test('Type 1B pathway', () => {
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
        section: '1bvs1ac',
        question: 'Do heatless curls work well in your hair?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1b');
    expect(resultMapping['1b']).toBe('/hair-types/type-1b');
  });

  test('Type 1C pathway through static flyaways', () => {
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
        section: '1bvs1ac',
        question: 'Do heatless curls work well in your hair?',
        answer: 'No',
      },
      {
        section: '1avs1c',
        question: 'Do you often have static flyaways?',
        answer: 'No',
      },
      {
        section: '1avs1c',
        question: 'Is your hair easy to chemically lighten?',
        answer: 'No, it is difficult to lighten my hair',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1c');
    expect(resultMapping['1c']).toBe('/hair-types/type-1c');
  });
});
