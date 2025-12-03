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
  | 'wavy'
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
  /** Common System mapping (e.g., "4B-4C") */
  commonMapping: string;
  /** Short description of the pattern */
  description: string;
  /** Typical behaviors and characteristics */
  typicalBehaviors: string;
  /** Care priorities (will be populated with content later) */
  carePriorities: string[];
  /** guide url optional */
  guideUrl?: string;
  /** elongation range description */
  elongation: string;
}

/**
 * Metadata for all 6 new hair pattern types
 */
export const hairPatternTypes: Record<HairPatternType, HairPatternParameters> =
  {
    'tight-coils-zigzags': {
      patternType: 'tight-coils-zigzags',
      displayName: 'Tight Coils / Zig-zags',
      shrinkage: '75%+',
      walkerMapping: '4B–4B',
      commonMapping: '4B–4C',
      description:
        'Tight coils and zig-zag patterns with very high shrinkage and minimal elongation.',
      typicalBehaviors:
        'Minimal elongation even when wet, dense and water-resistant, the tightest curl pattern you can have',
      carePriorities: ["Reducing friction between strands", "Protecting from breakage"],
      elongation: 'Little to none',
    },
    coily: {
      patternType: 'coily',
      displayName: 'Coily',
      shrinkage: '50–75%',
      walkerMapping: '4A',
      commonMapping: '3C-4A',
      description:
        'Tight coils with high shrinkage that elongate slightly when wet.',
      typicalBehaviors: 'Very tight curls with a strong defined pattern.',
      carePriorities: [],
      elongation: 'A little when wet',
    },
    'tight-curls': {
      patternType: 'tight-curls',
      displayName: 'Tight Curls',
      shrinkage: '25–50%',
      walkerMapping: '3B',
      commonMapping: '3B-3C',
      description:
        'Springy, well-defined curls with noticeable shrinkage when dry.',
      typicalBehaviors:
        "A strong, defined curl pattern that doesn't easily elongate when dry",
      carePriorities: [],
      elongation: 'Some when wet',
    },
    'loose-curls': {
      patternType: 'loose-curls',
      displayName: 'Loose Curls',
      shrinkage: 'Little–25%',
      walkerMapping: '3A',
      commonMapping: '3A',
      description:
        'Loose curls that elongate easily and may stretch into waves.',
      typicalBehaviors:
        'A loose curl pattern that can easily elongate into waves due to weight and gravity',
      carePriorities: [],
      elongation: 'Medium',
    },
    wavy: {
      patternType: 'wavy',
      displayName: 'Wavy',
      shrinkage: 'Little',
      walkerMapping: '2A–3A',
      commonMapping: '2A–3A',
      description: 'A mix of waves and occasional curls that elongate readily.',
      typicalBehaviors:
        "Many people think wavy hair is a totally seperate hair type, but its just elongated curls, that's why this hair type may occasionally form curls when the conditions are right",
      carePriorities: [],
      elongation: 'High',
    },
    swavy: {
      patternType: 'swavy',
      displayName: 'Swavy',
      shrinkage: 'Little to none',
      walkerMapping: '2A–2C',
      commonMapping: '1B–2A',
      description:
        'Barely wavy hair that may dry mostly straight with minimal pattern.',
      typicalBehaviors:
        'This is loose waves, sometimes called "beach wavees" that do not form curls',
      carePriorities: ["Reducing frizz without adding weight", "Protecting from static cling"],
      elongation: 'Very high',
    },
  };

/**
 * Get pattern type parameters by type slug
 */
export function getPatternType(type: HairPatternType): HairPatternParameters {
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
