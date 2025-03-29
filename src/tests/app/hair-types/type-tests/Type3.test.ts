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

describe('Type 3 Hair Quiz Logic', () => {
  test('Type 3A pathway', () => {
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
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes, much longer',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question:
          'Is your hair possible to straighten with just heat (straightening iron, blow dryer, etc.)?',
        answer: 'Yes',
      },
      {
        section: '3avs3b',
        question:
          "Is your hair curlier when it's longer vs. when it's shorter?",
        answer: "Yes, it's curlier when it's longer",
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('3a');
    expect(resultMapping['3a']).toBe('/hair-types/type-3a');
  });

  test('Type 3B pathway', () => {
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
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes, much longer',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question:
          'Is your hair possible to straighten with just heat (straightening iron, blow dryer, etc.)?',
        answer: 'Yes',
      },
      {
        section: '3avs3b',
        question:
          "Is your hair curlier when it's longer vs. when it's shorter?",
        answer: "No, it's curlier when it's shorter or the same",
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('3b');
    expect(resultMapping['3b']).toBe('/hair-types/type-3b');
  });

  test('Type 3C pathway', () => {
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
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes, much longer',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question:
          'Is your hair possible to straighten with just heat (straightening iron, blow dryer, etc.)?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('3c');
    expect(resultMapping['3c']).toBe('/hair-types/type-3c');
  });
});
