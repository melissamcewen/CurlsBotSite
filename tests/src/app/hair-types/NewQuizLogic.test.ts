import { describe, expect, test } from '@jest/globals';
import {
  determineHairType,
  getAdjacentPatterns,
  shouldAskElongation,
  shouldAskShrinkage,
  validateQuizAnswers,
  patternAdjacency,
  type QuizAnswers,
  type PrimaryPattern,
  type AdditionalPattern,
} from '@/app/hair-types/quiz/newQuizLogic';
import { HairPatternType } from '@/app/hair-types/quiz/newTypes';

describe('NewQuizLogic', () => {
  describe('getAdjacentPatterns', () => {
    test('returns correct adjacent patterns for waves', () => {
      const adjacent = getAdjacentPatterns('waves');
      expect(adjacent).toEqual(['straight', 'curls']);
    });

    test('returns correct adjacent patterns for curls', () => {
      const adjacent = getAdjacentPatterns('curls');
      expect(adjacent).toEqual(['waves', 'coils', 'zig-zags']);
    });

    test('returns correct adjacent patterns for coils', () => {
      const adjacent = getAdjacentPatterns('coils');
      expect(adjacent).toEqual(['curls', 'zig-zags']);
    });

    test('returns correct adjacent patterns for zig-zags', () => {
      const adjacent = getAdjacentPatterns('zig-zags');
      expect(adjacent).toEqual(['curls', 'coils']);
    });
  });

  describe('shouldAskElongation', () => {
    test('returns true for coils primary pattern', () => {
      expect(shouldAskElongation('coils', [])).toBe(true);
    });

    test('returns true for zig-zags primary pattern', () => {
      expect(shouldAskElongation('zig-zags', [])).toBe(true);
    });

    test('returns true for curls + coils combination', () => {
      expect(shouldAskElongation('curls', ['coils'])).toBe(true);
    });

    test('returns true when coils is in additional patterns', () => {
      expect(shouldAskElongation('waves', ['coils'])).toBe(true);
    });

    test('returns false for waves only', () => {
      expect(shouldAskElongation('waves', [])).toBe(false);
    });

    test('returns false for curls only', () => {
      expect(shouldAskElongation('curls', [])).toBe(false);
    });

    test('returns false for curls + waves', () => {
      expect(shouldAskElongation('curls', ['waves'])).toBe(false);
    });
  });

  describe('shouldAskShrinkage', () => {
    test('returns true for curls only (no additional patterns)', () => {
      expect(shouldAskShrinkage('curls', [])).toBe(true);
    });

    test('returns true for curls + waves', () => {
      expect(shouldAskShrinkage('curls', ['waves'])).toBe(true);
    });

    test('returns false for curls + coils', () => {
      expect(shouldAskShrinkage('curls', ['coils'])).toBe(false);
    });

    test('returns false for waves primary pattern', () => {
      expect(shouldAskShrinkage('waves', [])).toBe(false);
    });

    test('returns false for coils primary pattern', () => {
      expect(shouldAskShrinkage('coils', [])).toBe(false);
    });
  });

  describe('determineHairType', () => {
    describe('Straight gate', () => {
      test('returns straight when isStraight is true', () => {
        const answers: QuizAnswers = { isStraight: true };
        expect(determineHairType(answers)).toBe('straight');
      });
    });

    describe('Waves paths', () => {
      test('Waves only → Swavy', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'waves',
          additionalPatterns: [],
        };
        expect(determineHairType(answers)).toBe('swavy');
      });

      test('Waves + Straight only → Swavy', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'waves',
          additionalPatterns: ['straight'],
        };
        expect(determineHairType(answers)).toBe('swavy');
      });

      test('Waves + Curls → Wavy', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'waves',
          additionalPatterns: ['curls'],
        };
        expect(determineHairType(answers)).toBe('wavy');
      });

      test('Waves + Straight + Curls → Wavy (curls take precedence)', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'waves',
          additionalPatterns: ['straight', 'curls'],
        };
        expect(determineHairType(answers)).toBe('wavy');
      });
    });

    describe('Curls paths', () => {
      test('Curls only + little shrinkage → Loose Curls', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: [],
          shrinkage: 'little-25',
        };
        expect(determineHairType(answers)).toBe('loose-curls');
      });

      test('Curls only + little-none shrinkage → Loose Curls', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: [],
          shrinkage: 'little-none',
        };
        expect(determineHairType(answers)).toBe('loose-curls');
      });

      test('Curls only + 25-50% shrinkage → Tight Curls', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: [],
          shrinkage: '25-50',
        };
        expect(determineHairType(answers)).toBe('tight-curls');
      });

      test('Curls + Waves → Loose Curls', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: ['waves'],
        };
        expect(determineHairType(answers)).toBe('loose-curls');
      });

      test('Curls + Coils + elongates → Coily', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: ['coils'],
          elongatesWhenWet: true,
        };
        expect(determineHairType(answers)).toBe('coily');
      });

      test('Curls + Coils + no elongation → Tight Curls', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: ['coils'],
          elongatesWhenWet: false,
        };
        expect(determineHairType(answers)).toBe('tight-curls');
      });

      test('Curls + Zig-zags → Tight Curls', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'curls',
          additionalPatterns: ['zig-zags'],
        };
        expect(determineHairType(answers)).toBe('tight-curls');
      });
    });

    describe('Coils paths', () => {
      test('Coils only + elongates → Coily', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'coils',
          additionalPatterns: [],
          elongatesWhenWet: true,
        };
        expect(determineHairType(answers)).toBe('coily');
      });

      test('Coils only + no elongation → Tight Coils', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'coils',
          additionalPatterns: [],
          elongatesWhenWet: false,
        };
        expect(determineHairType(answers)).toBe('tight-coils');
      });

      test('Coils + Zig-zags + no elongation → Tight Coils', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'coils',
          additionalPatterns: ['zig-zags'],
          elongatesWhenWet: false,
        };
        expect(determineHairType(answers)).toBe('tight-coils');
      });

      test('Coils + Zig-zags + elongates → Coily', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'coils',
          additionalPatterns: ['zig-zags'],
          elongatesWhenWet: true,
        };
        expect(determineHairType(answers)).toBe('coily');
      });
    });

    describe('Zig-zags paths', () => {
      test('Zig-zags only + no elongation → Tight Coils', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'zig-zags',
          additionalPatterns: [],
          elongatesWhenWet: false,
        };
        expect(determineHairType(answers)).toBe('tight-coils');
      });

      test('Zig-zags only + elongates → Coily (edge case)', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'zig-zags',
          additionalPatterns: [],
          elongatesWhenWet: true,
        };
        expect(determineHairType(answers)).toBe('coily');
      });

      test('Zig-zags + Curls → Tight Coils', () => {
        const answers: QuizAnswers = {
          isStraight: false,
          primaryPattern: 'zig-zags',
          additionalPatterns: ['curls'],
        };
        expect(determineHairType(answers)).toBe('tight-coils');
      });
    });

    describe('Error cases', () => {
      test('throws error when primary pattern is missing', () => {
        const answers: QuizAnswers = {
          isStraight: false,
        };
        expect(() => determineHairType(answers)).toThrow(
          'Primary pattern is required',
        );
      });
    });
  });

  describe('validateQuizAnswers', () => {
    test('validates straight answer correctly', () => {
      const answers: QuizAnswers = { isStraight: true };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });

    test('requires isStraight answer', () => {
      const answers: QuizAnswers = {};
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('isStraight');
    });

    test('requires primary pattern for non-straight', () => {
      const answers: QuizAnswers = { isStraight: false };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('primaryPattern');
    });

    test('requires elongation when needed for coils', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'coils',
        additionalPatterns: [],
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('elongatesWhenWet');
    });

    test('requires elongation when needed for curls + coils', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'curls',
        additionalPatterns: ['coils'],
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('elongatesWhenWet');
    });

    test('requires shrinkage when needed for curls only', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'curls',
        additionalPatterns: [],
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('shrinkage');
    });

    test('requires shrinkage when needed for curls + waves', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'curls',
        additionalPatterns: ['waves'],
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(false);
      expect(result.missingFields).toContain('shrinkage');
    });

    test('validates complete curls-only flow', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'curls',
        additionalPatterns: [],
        shrinkage: '25-50',
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });

    test('validates complete coils flow', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'coils',
        additionalPatterns: [],
        elongatesWhenWet: true,
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });

    test('validates waves-only flow (no additional questions needed)', () => {
      const answers: QuizAnswers = {
        isStraight: false,
        primaryPattern: 'waves',
        additionalPatterns: [],
      };
      const result = validateQuizAnswers(answers);
      expect(result.valid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });
  });

  describe('patternAdjacency', () => {
    test('has correct adjacency mapping structure', () => {
      expect(patternAdjacency.waves).toContain('straight');
      expect(patternAdjacency.waves).toContain('curls');
      expect(patternAdjacency.curls).toContain('waves');
      expect(patternAdjacency.curls).toContain('coils');
      expect(patternAdjacency.curls).toContain('zig-zags');
      expect(patternAdjacency.coils).toContain('curls');
      expect(patternAdjacency.coils).toContain('zig-zags');
      expect(patternAdjacency['zig-zags']).toContain('curls');
      expect(patternAdjacency['zig-zags']).toContain('coils');
    });
  });
});

