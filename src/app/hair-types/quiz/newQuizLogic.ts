/**
 * New Quiz Logic Engine
 *
 * This file contains the decision logic for the new pattern-based hair type quiz.
 * It handles pattern adjacency mapping and result determination based on user answers.
 */

import { HairPatternType } from './newTypes';

/**
 * Base pattern types that can be selected in Q1
 */
export type PrimaryPattern = 'waves' | 'curls' | 'coils' | 'zig-zags';

/**
 * Additional patterns that can appear in Q2 (includes 'straight' for waves)
 */
export type AdditionalPattern =
  | 'straight'
  | 'waves'
  | 'curls'
  | 'coils'
  | 'zig-zags';

/**
 * Shrinkage level options for Q4
 */
export type ShrinkageLevel =
  | 'little-none'
  | 'little-25'
  | '25-50'
  | '50-75'
  | '75-plus';

/**
 * Pattern adjacency mapping - defines which additional patterns can appear for each primary pattern
 */
export const patternAdjacency: Record<PrimaryPattern, AdditionalPattern[]> = {
  waves: ['straight', 'curls'],
  curls: ['waves', 'coils', 'zig-zags'],
  coils: ['curls', 'zig-zags'],
  'zig-zags': ['curls', 'coils'],
};

/**
 * Get adjacent patterns for a primary pattern
 */
export function getAdjacentPatterns(
  primaryPattern: PrimaryPattern,
): AdditionalPattern[] {
  return patternAdjacency[primaryPattern] || [];
}

/**
 * Quiz answers collected throughout the flow
 */
export interface QuizAnswers {
  /** Q0: Is hair straight? */
  isStraight?: boolean;
  /** Q1: Primary pattern selection */
  primaryPattern?: PrimaryPattern;
  /** Q2: Additional patterns selected (multi-select) */
  additionalPatterns?: AdditionalPattern[];
  /** Q3: Does hair elongate when wet? */
  elongatesWhenWet?: boolean;
  /** Q5: Shrinkage level (for curls paths) */
  shrinkage?: ShrinkageLevel;
}

/**
 * Determine if Q4 (elongation question) should be shown
 */
export function shouldAskElongation(
  primaryPattern: PrimaryPattern,
  additionalPatterns: AdditionalPattern[],
): boolean {
  // Always ask for coils or zig-zags
  if (primaryPattern === 'coils' || primaryPattern === 'zig-zags') {
    return true;
  }

  // Ask if curls + coils is selected
  if (primaryPattern === 'curls' && additionalPatterns.includes('coils')) {
    return true;
  }

  // Ask if coils is in additional patterns
  if (additionalPatterns.includes('coils')) {
    return true;
  }

  return false;
}

/**
 * Determine if Q5 (shrinkage question) should be shown
 */
export function shouldAskShrinkage(
  primaryPattern: PrimaryPattern,
  additionalPatterns: AdditionalPattern[],
): boolean {
  // Ask for curls-only paths
  if (primaryPattern === 'curls' && additionalPatterns.length === 0) {
    return true;
  }

  // Ask for curls + waves path
  if (primaryPattern === 'curls' && additionalPatterns.includes('waves')) {
    return true;
  }

  return false;
}

/**
 * Determine the final hair type result based on quiz answers
 */
export function determineHairType(
  answers: QuizAnswers,
): HairPatternType | 'straight' {
  // Q0: Straight gate
  if (answers.isStraight === true) {
    return 'straight';
  }

  // Validate required answers
  if (!answers.primaryPattern) {
    throw new Error('Primary pattern is required');
  }

  const {
    primaryPattern,
    additionalPatterns = [],
    elongatesWhenWet,
    shrinkage,
  } = answers;

  // Waves paths
  if (primaryPattern === 'waves') {
    const hasStraight = additionalPatterns.includes('straight');
    const hasCurls = additionalPatterns.includes('curls');

    // Waves + Straight only (no Curls) → Swavy
    if (hasStraight && !hasCurls) {
      return 'swavy';
    }

    // Waves + Curls (with or without Straight) → Wavy / Loose Curls
    if (hasCurls) {
      return 'wavy';
    }

    // Waves only (no additional patterns) → Swavy (waves that never curl)
    // If they had curls, they would have selected "Curls" in Q2
    return 'swavy';
  }

  // Curls paths
  if (primaryPattern === 'curls') {
    const hasWaves = additionalPatterns.includes('waves');
    const hasCoils = additionalPatterns.includes('coils');
    const hasZigZags = additionalPatterns.includes('zig-zags');

    // Curls + Waves → Loose Curls
    if (hasWaves) {
      return 'loose-curls';
    }

    // Curls + Coils → check elongation
    if (hasCoils) {
      if (elongatesWhenWet === true) {
        return 'coily';
      }
      return 'tight-curls';
    }

    // Curls + Zig-zags → Tight Curls
    if (hasZigZags) {
      return 'tight-curls';
    }

    // Curls only - check shrinkage
    if (shrinkage === 'little-25' || shrinkage === 'little-none') {
      return 'loose-curls';
    }

    if (shrinkage === '25-50') {
      return 'tight-curls';
    }

    // Default to loose curls for little shrinkage
    return 'loose-curls';
  }

  // Coils paths
  if (primaryPattern === 'coils') {
    const hasZigZags = additionalPatterns.includes('zig-zags');

    // Coils + Zig-zags → Tight Coils/Zig-zags
    if (hasZigZags) {
      return 'tight-coils-zigzags';
    }

    // Coils only or Coils + Curls → check elongation
    if (elongatesWhenWet === true) {
      return 'coily';
    }

    return 'tight-coils-zigzags';
  }

  // Zig-zags paths
  if (primaryPattern === 'zig-zags') {
    // Zig-zags always leads to Tight Coils/Zig-zags unless elongates (edge case)
    if (elongatesWhenWet === true) {
      return 'coily'; // Edge case
    }

    return 'tight-coils-zigzags';
  }

  throw new Error(
    `Unable to determine hair type for pattern: ${primaryPattern}`,
  );
}

/**
 * Validate quiz answers are complete enough to determine result
 */
export function validateQuizAnswers(answers: QuizAnswers): {
  valid: boolean;
  missingFields: string[];
} {
  const missingFields: string[] = [];

  // Check for straight gate answer
  if (answers.isStraight === undefined) {
    missingFields.push('isStraight');
    return { valid: false, missingFields };
  }

  // If straight, no other fields needed
  if (answers.isStraight === true) {
    return { valid: true, missingFields: [] };
  }

  // Primary pattern is always required
  if (!answers.primaryPattern) {
    missingFields.push('primaryPattern');
  }

  // Check if we need elongation answer
  if (
    answers.primaryPattern &&
    shouldAskElongation(
      answers.primaryPattern,
      answers.additionalPatterns || [],
    )
  ) {
    if (answers.elongatesWhenWet === undefined) {
      missingFields.push('elongatesWhenWet');
    }
  }

  // Check if we need shrinkage answer
  if (
    answers.primaryPattern &&
    shouldAskShrinkage(answers.primaryPattern, answers.additionalPatterns || [])
  ) {
    if (!answers.shrinkage) {
      missingFields.push('shrinkage');
    }
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
