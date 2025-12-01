/**
 * New Pattern-Based Hair Type System
 *
 * This file defines the 6 new hair pattern types based on pattern recognition
 * and shrinkage/elongation, replacing the old Walker-based 12-type system.
 */

export type HairPatternType =
  | 'tight-coils-zigzags'
  | 'coily'
  | 'tight-curls'
  | 'loose-curls'
  | 'wavy-loose-curls'
  | 'swavy';

export interface HairPatternParameters {
  /** Unique identifier/slug for the type */
  patternType: HairPatternType;
  /** Display name shown to users */
  displayName: string;
  /** Shrinkage range description */
  shrinkage: string;
  /** Walker system mapping (e.g., "4B-4C") */
  walkerMapping: string;
  /** Common/social system mapping (e.g., "4B-4C") */
  commonMapping: string;
  /** Short description of the pattern */
  description: string;
  /** Typical behaviors and characteristics */
  typicalBehaviors: string;
  /** Care priorities (will be populated with content later) */
  carePriorities: string[];
}

/**
 * Metadata for all 6 new hair pattern types
 */
export const hairPatternTypes: Record<HairPatternType, HairPatternParameters> = {
  'tight-coils-zigzags': {
    patternType: 'tight-coils-zigzags',
    displayName: 'Tight Coils / Zig-zags',
    shrinkage: '75%+',
    walkerMapping: '4B–4C',
    commonMapping: '4B–4C',
    description:
      'Tight coils and zig-zag patterns with extreme shrinkage and minimal elongation.',
    typicalBehaviors:
      'Minimal elongation even when wet; dense and fragile structure',
    carePriorities: [],
  },
  coily: {
    patternType: 'coily',
    displayName: 'Coily',
    shrinkage: '50–75%',
    walkerMapping: '4A',
    commonMapping: '4A',
    description: 'Tight coils with heavy shrinkage that elongate somewhat when wet.',
    typicalBehaviors:
      'Shrinks heavily; coils elongate somewhat when wet',
    carePriorities: [],
  },
  'tight-curls': {
    patternType: 'tight-curls',
    displayName: 'Tight Curls',
    shrinkage: '25–50%',
    walkerMapping: '3B',
    commonMapping: '3C',
    description:
      'Springy, well-defined curls with noticeable shrinkage when dry.',
    typicalBehaviors:
      'Springy curls; well-defined but shrink noticeably when dry',
    carePriorities: [],
  },
  'loose-curls': {
    patternType: 'loose-curls',
    displayName: 'Loose Curls',
    shrinkage: 'Little–25%',
    walkerMapping: '3A',
    commonMapping: '3A',
    description:
      'Loose curls that elongate easily and may stretch into waves.',
    typicalBehaviors: 'Elongates easily; curls may stretch into waves',
    carePriorities: [],
  },
  'wavy-loose-curls': {
    patternType: 'wavy-loose-curls',
    displayName: 'Wavy / Loose Curls',
    shrinkage: 'Little',
    walkerMapping: '2A–3A',
    commonMapping: '2A–3A',
    description:
      'A mix of waves and occasional curls that elongate readily.',
    typicalBehaviors: 'Mix of waves and occasional curls',
    carePriorities: [],
  },
  swavy: {
    patternType: 'swavy',
    displayName: 'Swavy',
    shrinkage: 'Little to none',
    walkerMapping: '2A–2C',
    commonMapping: '1B–2A',
    description:
      'Barely wavy hair that may dry mostly straight with minimal pattern.',
    typicalBehaviors: 'Barely wavy; may dry mostly straight',
    carePriorities: [],
  },
};

/**
 * Get pattern type parameters by type slug
 */
export function getPatternType(
  type: HairPatternType,
): HairPatternParameters {
  const patternType = hairPatternTypes[type];
  if (!patternType) {
    throw new Error(`Invalid hair pattern type: ${type}`);
  }
  return patternType;
}

/**
 * Get all valid pattern type slugs
 */
export function getAllPatternTypes(): HairPatternType[] {
  return Object.keys(hairPatternTypes) as HairPatternType[];
}

/**
 * Check if a string is a valid pattern type
 */
export function isValidPatternType(type: string): type is HairPatternType {
  return type in hairPatternTypes;
}

