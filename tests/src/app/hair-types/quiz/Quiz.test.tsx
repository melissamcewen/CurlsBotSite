import {
  quizQuestions,
  resultMapping,
  type Answer,
} from '../../../../../src/app/hair-types/quiz/quizData';

describe('Quiz Data Structure', () => {
  it('has valid section references', () => {
    const validSections = new Set(quizQuestions.map((q) => q.section));

    // Check that all nextSection references are valid
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.nextSection) {
          expect(validSections).toContain(answer.nextSection);
        }
      });
    });
  });

  it('has valid result references', () => {
    const validResults = Object.keys(resultMapping);
    const validPointTypes = new Set([...validResults, '4']); // Include '4' as valid point type

    // Check direct results
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.result) {
          expect(validResults).toContain(answer.result);
        }
      });
    });

    // Check points-based results
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.points) {
          Object.keys(answer.points).forEach((type) => {
            expect(validPointTypes).toContain(type);
          });
        }
      });
    });
  });

  it('has valid initial section', () => {
    const initialSection = '1vs234';
    expect(quizQuestions.some((q) => q.section === initialSection)).toBe(true);
  });

  it('has no orphaned sections', () => {
    const reachableSections = new Set(['1vs234']); // Start with initial section
    let prevSize = 0;

    // Keep adding reachable sections until no new ones are found
    while (prevSize !== reachableSections.size) {
      prevSize = reachableSections.size;
      quizQuestions.forEach((question) => {
        if (reachableSections.has(question.section)) {
          question.answers.forEach((answer) => {
            if (answer.nextSection) {
              reachableSections.add(answer.nextSection);
            }
          });
        }
      });
    }

    // Check that all sections in the quiz are reachable
    const allSections = new Set(quizQuestions.map((q) => q.section));
    allSections.forEach((section) => {
      expect(reachableSections).toContain(section);
    });
  });

  it('has valid point values', () => {
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.points) {
          Object.values(answer.points).forEach((points) => {
            expect(typeof points).toBe('number');
            expect(points).toBeGreaterThanOrEqual(0);
          });
        }
      });
    });
  });

  it('has no duplicate questions in the same section', () => {
    const sections = new Map<string, Set<string>>();

    quizQuestions.forEach((question) => {
      if (!sections.has(question.section)) {
        sections.set(question.section, new Set());
      }
      const sectionQuestions = sections.get(question.section)!;
      expect(sectionQuestions.has(question.question)).toBe(false);
      sectionQuestions.add(question.question);
    });
  });

  it('has valid paths to all result types', () => {
    const reachableResults = new Set<string>();

    // Add direct results
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.result) {
          reachableResults.add(answer.result);
        }
      });
    });

    // Add points-based results
    quizQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.points) {
          Object.keys(answer.points).forEach((type) => {
            reachableResults.add(type);
          });
        }
      });
    });

    // Check that all results in resultMapping are reachable
    Object.keys(resultMapping).forEach((result) => {
      expect(reachableResults).toContain(result);
    });
  });
});
