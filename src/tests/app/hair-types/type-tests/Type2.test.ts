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
    // If no nextSection and no result, stay in current section
  }

  return result;
};

describe('Type 2 Hair Quiz Logic', () => {
  test('Type 2A pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'Yes',
      },
      {
        section: '2avs2bc',
        question: 'Does your hair need to be washed often or it gets greasy?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('2a');
    expect(resultMapping['2a']).toBe('/hair-types/type-2a');
  });

  test('Type 2B pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'Yes',
      },
      {
        section: '2avs2bc',
        question: 'Does your hair need to be washed often or it gets greasy?',
        answer: 'No',
      },
      {
        section: '2cvs2b',
        question:
          'If you brush your hair when dry, does it smooth it out or get puffy/frizzy?',
        answer: 'Smooth out',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('2b');
    expect(resultMapping['2b']).toBe('/hair-types/type-2b');
  });

  test('Type 2C pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'Yes',
      },
      {
        section: '2avs2bc',
        question: 'Does your hair need to be washed often or it gets greasy?',
        answer: 'No',
      },
      {
        section: '2cvs2b',
        question:
          'If you brush your hair when dry, does it smooth it out or get puffy/frizzy?',
        answer: 'Get puffy/frizzy',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('2c');
    expect(resultMapping['2c']).toBe('/hair-types/type-2c');
  });
});
