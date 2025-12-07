/**
 * New Pattern-Based Hair Type System
 *
 * This file defines the 6 new hair pattern types based on pattern recognition
 * and shrinkage/elongation, replacing the old Walker-based 12-type system.
 */

export type HairPatternType =
  | 'tight-coils'
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
  /** Other type systems */
  otherTypeSystems: string;
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
  /** Avoid products */
  avoid?: string[];
}

/**
 * Metadata for all 6 new hair pattern types
 */
export const hairPatternTypes: Record<HairPatternType, HairPatternParameters> =
  {
    'tight-coils': {
      patternType: 'tight-coils',
      displayName: 'Tightly Coiled',
      shrinkage: '75%+',
      otherTypeSystems: '4B-4C',
      description:
        'Tight coils and sometimes zig-zag patterns with very high shrinkage and minimal elongation.',
      typicalBehaviors:
        'Minimal elongation even when wet, dense and water-resistant, the tightest curl pattern you can have',
      carePriorities: [
        'Reducing friction between strands',
        'Protecting from breakage',
        'Protecting against tangles/knots',
        'Excessively heavy products unless they are the last product in your routine used to "seal" the hair',
        'Using a clarifying shampoo every 1-2 weeks to remove buildup',
      ],
      elongation: 'Little to none',
      avoid: ['Products that make hair brittle like hairspray', 'Sleeping without a bonnet', 'Dry detangling', 'Harsh shampoos without any protective conditioning ingredients'],

    },
    coily: {
      patternType: 'coily',
      displayName: 'Coily',
      shrinkage: '50–75%',
      otherTypeSystems: '4A',
      description:
        'Tight coils  and sometimes zig-zag patterns with high shrinkage that elongate slightly when wet.',
      typicalBehaviors: 'Very tight curls with a strong defined pattern.',
      carePriorities: [
        'Soft-moderate hold products to protect from frizz',
        'Moderate to high conditioning to protect from friction and breakage',
        'Protecting against tangles/knots',
        'Using a clarifying shampoo every 1-2 weeks to remove buildup',
      ],
      elongation: 'A little when wet',
      avoid: ['Products that make hair brittle like hairspray', 'Sleeping without a bonnet', 'Dry detangling', 'Harsh shampoos without any protective conditioning ingredients'],
    },
    'tight-curls': {
      patternType: 'tight-curls',
      displayName: 'Tight Curls',
      shrinkage: '25–50%',
      otherTypeSystems: '3B-3C',
      description:
        'Springy, well-defined curls with noticeable shrinkage when dry.',
      typicalBehaviors:
        "A strong, defined curl pattern that doesn't easily elongate when dry",
      carePriorities: [
        'Soft-moderate hold products to protect from frizz',
        'Moderate to high conditioning to protect from friction and breakage',
        'Protecting against tangles/knots',
        'Using a clarifying shampoo every 1-2 weeks to remove buildup',
      ],
      elongation: 'Some when wet',
      avoid: ['Products that make hair brittle like hairspray', 'Sleeping without a bonnet', 'Dry detangling'],
    },
    'loose-curls': {
      patternType: 'loose-curls',
      displayName: 'Loose Curls',
      shrinkage: 'Little–25%',
      otherTypeSystems: '2C-3A',
      description:
        'Loose curls that elongate easily and may stretch into waves.',
      typicalBehaviors:
        'A loose curl pattern that can easily elongate into waves due to weight and gravity',
      carePriorities: [
        'High hold products to reduce frizz and elongation',
        'Lightweight conditioning that doesn\'t weigh down curls',
        'Protecting against tangles/knots',
        'Using a clarifying shampoo every 1-2 weeks to remove buildup',
      ],
      elongation: 'Medium',
      avoid: ['Heavy products that weigh down curls', 'Cowashes and other cleansers that don\'t cleanse very well'],
    },
    wavy: {
      patternType: 'wavy',
      displayName: 'Wavy',
      shrinkage: 'Little',
      otherTypeSystems: '2A–3A',
      description: 'A mix of waves and occasional curls that elongate readily.',
      typicalBehaviors:
        "Many people think wavy hair is a totally seperate hair type, but its just elongated curls, that's why this hair type may occasionally form curls when the conditions are right",
      carePriorities: [
        'May benefit from dry detangling',
        'Protecting against tangles/knots',
        'High hold light products to reduce frizz and elongation',
        'Using a clarifying shampoo every 1-2 weeks to remove buildup',
      ],
      elongation: 'High',
      avoid: ['Heavy products that weigh down waves', 'Cowashes and other cleansers that don\'t cleanse very well'],
    },
    swavy: {
      patternType: 'swavy',
      displayName: 'Swavy',
      shrinkage: 'Little to none',
      otherTypeSystems: '1B-2A',
      description:
        'Loose waves that easily elongate into straighter sections.',
      typicalBehaviors:
        'This is very loose waves, sometimes called "beach waves" that do not form curls',
      carePriorities: [
        'Reducing frizz without adding weight',
        'Using a clarifying shampoo every 1-2 weeks to remove buildup',
        'Protecting from static flyaways',
        'May benefit from dry detangling/brushing unlike other curl types',
      ],
      elongation: 'Very high',
      avoid: ['Heavy products that weigh down waves', 'Cowashes and other cleansers that don\'t cleanse very well'],
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
