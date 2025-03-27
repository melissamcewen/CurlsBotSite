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

describe('Type 4 Hair Quiz Logic', () => {
  test('Type 4A pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'Yes',
      },
      {
        section: '3cvs4',
        question:
          'Does your hair shrink more than 50% of its length when it dries?',
        answer: 'Yes',
      },
      {
        section: '4avs4bvs4c',
        question: 'Does your hair have easily defined kinks and/or coils?',
        answer: 'Yes, it has defined coils',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('4a');
    expect(resultMapping['4a']).toBe('/hair-types/type-4a');
  });

  test('Type 4B pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'Yes',
      },
      {
        section: '3cvs4',
        question:
          'Does your hair shrink more than 50% of its length when it dries?',
        answer: 'Yes',
      },
      {
        section: '4avs4bvs4c',
        question: 'Does your hair have easily defined kinks and/or coils?',
        answer: 'Yes, it has defined kinks',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('4b');
    expect(resultMapping['4b']).toBe('/hair-types/type-4b');
  });

  test('Type 4C pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'Yes',
      },
      {
        section: '3cvs4',
        question:
          'Does your hair shrink more than 50% of its length when it dries?',
        answer: 'Yes',
      },
      {
        section: '4avs4bvs4c',
        question: 'Does your hair have easily defined kinks and/or coils?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('4c');
    expect(resultMapping['4c']).toBe('/hair-types/type-4c');
  });
});
