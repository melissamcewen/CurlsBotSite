export type PatternStrengthLevel = 'none' | 'low' | 'medium' | 'high';
export type ShrinkageLevel = 'none' | 'low' | 'medium' | 'high' | 'very high';
export type StrandThickness = 'any' | 'small' | 'medium' | 'large' | 'varies';
export type CurvatureType =
  | 'none'
  | 'varies'
  | 'large'
  | 'medium'
  | 'small'
  | 'extra small';
export type ShapeType = 'none' | 'curved' | 'angled' | 'varies';
export type VolumeLevel = 'low' | 'medium' | 'high' | 'very high';
export type CommonType =
  | '1a'
  | '1b to 1c'
  | '2a to 3a'
  | '3a to 3c'
  | '4a to 4c'
  | '3a';
export type TanglingLevel = 'low' | 'medium' | 'high' | 'very high';
export type CurlsBotType =
  | 'Straight fine hair'
  | 'Straight hair'
  | 'Straight thick hair'
  | 'Wavy fine hair'
  | 'Wavy hair'
  | 'Loose curls'
  | 'Curly hair'
  | 'Very curly hair'
  | 'Coily hair'
  | 'Kinky hair';
export type WalkerType =
  | '1a'
  | '1b'
  | '1c'
  | '2a'
  | '2b'
  | '2c'
  | '3a'
  | '3b'
  | '4a'
  | '4b';
export type SisterTypes =
  | '1a'
  | '1b'
  | '1c'
  | '2a'
  | '2b'
  | '2c'
  | '3a'
  | '3b'
  | '3c'
  | '4a'
  | '4b'
  | '4c';
export type ProductType = 'A' | 'B' | 'C' | 'D';
export interface HairParameters {
  curlsBotType: CurlsBotType;
  patternStrength: PatternStrengthLevel;
  shrinkage: ShrinkageLevel;
  strandThickness: StrandThickness;
  curvature: CurvatureType;
  shapes: ShapeType;
  volume: VolumeLevel;
  commonType: CommonType;
  tangling: TanglingLevel;
  WalkerType: WalkerType;
  sisterTypes: SisterTypes[];
  productType: ProductType;
}

export const parameterDescriptions = {
  curlsBotType: {
    'Straight fine hair':
      'Your hair is very straight and very fine, it can be prone to static frizz and breakage.',
    'Straight hair':
      'You have straight hair that may have a very slight wave towards the ends',
    'Straight thick hair':
      'Your hair has thicker than average strands, that resist being styled as curls or waves.',
    'Wavy fine hair':
      'You have wavy hair, which is a type of highly variable curl pattern, combined with fine strands. This type of hair is especially prone to being weighed down by heavy products.',
    'Wavy hair':
      'You have wavy hair, which is a type of highly variable curl pattern characterized by a mixture of curls and waves. It is prone to being weighed down by heavy products. It may be one of several subtypes based on hair diameter, density, and porosity.',
    'Loose curls':
      'You have loose curls, which can be prone to being weighed down by heavy products. It may be one of several subtypes based on hair diameter, density, and porosity.',
    'Curly hair':
      'Your hair is definitely curly and there is no question about it. It may be one of several subtypes based on hair diameter, density, and porosity.',
    'Very curly hair':
      'Your hair has very tight strong curl pattern and moderate-high shrinkage. It may be one of several subtypes based on hair diameter, density, and porosity.',
    'Coily hair':
      'Your hair has tight coils and high shrinkage. It may be one of several subtypes based on hair diameter, density, and porosity.',
    'Kinky hair':
      'Your hair has coils and kinks, and high shrinkage. It may be one of several subtypes based on hair diameter, density, and porosity.',
  },
  patternStrength: {
    'none': 'Your hair does not have any curls or waves',
    low: "Your pattern is highly variable, and any curls or waves may loosen out easily.",
    medium:
      'Your pattern strength is moderate, and stays pretty consistent but may loosen out a little.',
    high: 'Your hair pattern is strong and not easily loosened out or elongated.',
  },
  shrinkage: {
    none: 'Your hair is the same length wet or dry.',
    low: 'Your hair is slightly longer wet vs. dry.',
    medium: 'Your hair is about 30-49% longer wet vs. dry.',
    high: 'Your hair is between 50-75% longer wet vs. dry.',
    'very high':
      'Your shrinkage is very high to the point where even water cannot fully stretch it out.',
  },
  strandThickness: {
    any: 'Your hair type is not associated with a strand thickness, you may have fine, medium, or thick strands',
    small:
      'You have fine hair, so you will want to use products that protect from static, wash with a cleansing shampoo, and avoid heavy products.',
    medium:
      'Your hair is about average in thickness, neither fine nor thick(coarse)',
    large:
      'You have thicker hair strands, sometimes referred to as coarse hair. You may want to use products with humectants like panthenol that increase softness and manageability.',
    varies: 'Each individual strand of your hair has thicker and thinner parts',
  },
  curvature: {
    none: 'Your hair is straight or almost straight',
    varies:
      'Your hair can be straight, wavy, and curly, sometimes all three at once!',
    large: 'Your curls are loose and large',
    medium: 'Your curls are medium-sized',
    small:
      'You likely have tight curls, which need to be carefully protected from breakage',
    'extra small': 'You likely have tight curls/coils/kinks',
  },
  shapes: {
    none: "Your hair is straight and doesn't have much or any wave",
    curved: 'Your hair has waves and/or curls',
    angled: 'Your hair may have an angled zig-zag pattern',
    varies:
      'Your hair is likely a mixture of angles and curves, can naturally form interlocking styles like locs/twists',
  },
  volume: {
    low: 'Your hair has little volume, but this can be enhanced slightly with volumizing products and avoiding heavy products',
    medium:
      'Your hair has some volume, especially towards the ends. Volume can be enhanced with root clipping, pixie diffusing, and avoiding heavy products',
    high: 'Your hair has a lot of volume, especially horizontally, but you still may have some lower volume sections at your roots',
    'very high':
      'Your hair has a lot of volume, both vertically and horizontally',
  },
  commonType: {
    '1a': 'In the case of your hair, straight hair in the common system is just 1a',
    '1b to 1c':
      'For example you may have patterns ranging from 1b to 1c depending on if there is a slight wave',
    '2a to 3a':
      'For example you may have patterns ranging from 2a to 3a depending how tight the waves are, with 2a being the loosest',
    '3a to 3c':
      'For example you may have patterns ranging from 3a to 3c depending how tight the curls are, with 3c being the tightest',
    '4a to 4c':
      'For example you may have patterns ranging from 4a to 4c depending how tight the coils and kinks are, with 4c being the tightest',
    '3a': 'However, 3a is one of the hair types where the Common type is generally the same as the Walker type',
  },
  tangling: {
    low: "Your hair is isn't prone to tangles and is relatively easy to detangle",
    medium: 'Your hair tangles moderately especially in finer sections',
    high: 'Your hair tangles easily',
    'very high':
      'Your hair tangles easily and can form single-strand knots that cause breakage',
  },
  WalkerType: {
    '1a': 'Straight fine hair',
    '1b': 'Straight medium-diameter hair',
    '1c': 'Straight thick hair',
    '2a': 'Wavy fine hair',
    '2b': 'Wavy medium-diameter hair',
    '2c': 'Wavy coarse hair',
    '3a': 'Loose curls',
    '3b': 'Corkscrew curls',
    '4a': 'Kinky hair',
    '4b': 'Tight Coils to Z-Angled Coils',
  },
  productType: {
    A:
      'we recommend these lightweight, curl-defining products that won’t weigh your hair down',
    B:
      'we recommend these products that are formulated to give you shine and definition while protecting your hair from breakage',
    C:
      'we recommend these products that add volume and reduce frizz',
    D:
      'we recommend these products that are formulated to reduce frizz, protect from breakage, and add shine',
  },
} as const;

export const parameterDisplayNames = {
  commonType: 'Common Type',
  patternStrength: 'Pattern Strength',
  shrinkage: 'Shrinkage',
  strandThickness: 'Strand Thickness',
  curvature: 'Curvature',
  shapes: 'Shapes',
  volume: 'Volume',
  tangling: 'Tangling',
  curlsBotType: 'CurlsBot Type',
} as const;

export const hairTypeParameters: Record<string, HairParameters> = {
  '1a': {
    curlsBotType: 'Straight fine hair',
    WalkerType: '1a',
    commonType: '1b to 1c',
    patternStrength: 'none',
    shrinkage: 'none',
    strandThickness: 'small',
    curvature: 'none',
    volume: 'low',
    shapes: 'none',
    tangling: 'medium',
    sisterTypes: ['1b', '2a'],
    productType: 'C',
  },
  '1b': {
    curlsBotType: 'Straight hair',
    WalkerType: '1b',
    commonType: '1b to 1c',
    patternStrength: 'none',
    shrinkage: 'none',
    strandThickness: 'medium',
    curvature: 'none',
    volume: 'medium',
    shapes: 'none',
    tangling: 'low',
    sisterTypes: ['2b'],
    productType: 'C',
  },
  '1c': {
    curlsBotType: 'Straight thick hair',
    WalkerType: '1c',
    commonType: '1a',
    patternStrength: 'none',
    shrinkage: 'none',
    strandThickness: 'large',
    curvature: 'none',
    volume: 'low',
    shapes: 'none',
    tangling: 'low',
    sisterTypes: [],
    productType: 'C',
  },
  '2a': {
    curlsBotType: 'Wavy fine hair',
    WalkerType: '2a',
    commonType: '2a to 3a',
    patternStrength: 'low',
    shrinkage: 'low',
    strandThickness: 'small',
    curvature: 'varies',
    volume: 'low',
    shapes: 'curved',
    tangling: 'medium',
    sisterTypes: ['1b', '2b', '3a'],
    productType: 'A',
  },
  '2b': {
    curlsBotType: 'Wavy hair',
    WalkerType: '2b',
    commonType: '2a to 3a',
    patternStrength: 'low',
    shrinkage: 'low',
    strandThickness: 'medium',
    curvature: 'varies',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'medium',
    sisterTypes: ['1b', '2a', '2c', '3a'],
    productType: 'A',
  },
  '2c': {
    curlsBotType: 'Wavy hair',
    WalkerType: '2c',
    commonType: '2a to 3a',
    patternStrength: 'low',
    shrinkage: 'low',
    strandThickness: 'large',
    curvature: 'varies',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'medium',
    sisterTypes: ['1b', '2b', '3a'],
    productType: 'A',
  },
  '3a': {
    curlsBotType: 'Loose curls',
    WalkerType: '3a',
    commonType: '3a',
    patternStrength: 'medium',
    shrinkage: 'medium',
    strandThickness: 'any',
    curvature: 'large',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'high',
    sisterTypes: ['2a', '2b', '2c', '3b'],
    productType: 'A',
  },
  '3b': {
    curlsBotType: 'Curly hair',
    WalkerType: '3b',
    commonType: '3a to 3c',
    patternStrength: 'medium',
    shrinkage: 'medium',
    strandThickness: 'any',
    curvature: 'medium',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'high',
    sisterTypes: ['3a', '3c'],
    productType: 'D',
  },
  '3c': {
    curlsBotType: 'Very curly hair',
    WalkerType: '3b',
    commonType: '3a to 3c',
    patternStrength: 'high',
    shrinkage: 'high',
    strandThickness: 'any',
    curvature: 'small',
    volume: 'high',
    shapes: 'curved',
    tangling: 'very high',
    sisterTypes: ['3b', '4a'],
    productType: 'B',
  },
  '4a': {
    curlsBotType: 'Coily hair',
    WalkerType: '4a',
    commonType: '4a to 4c',
    patternStrength: 'high',
    shrinkage: 'high',
    strandThickness: 'any',
    curvature: 'extra small',
    volume: 'high',
    shapes: 'curved',
    tangling: 'very high',
    sisterTypes: ['3c', '4b'],
    productType: 'B',
  },
  '4b': {
    curlsBotType: 'Kinky hair',
    commonType: '4a to 4c',
    WalkerType: '4b',
    patternStrength: 'high',
    shrinkage: 'high',
    strandThickness: 'any',
    curvature: 'extra small',
    volume: 'very high',
    shapes: 'angled',
    tangling: 'very high',
    sisterTypes: ['3c', '4a', '4c'],
    productType: 'B',
  },
  '4c': {
    curlsBotType: 'Kinky hair',
    commonType: '4a to 4c',
    WalkerType: '4b',
    patternStrength: 'high',
    shrinkage: 'high',
    strandThickness: 'varies',
    curvature: 'extra small',
    shapes: 'varies',
    volume: 'very high',
    tangling: 'very high',
    sisterTypes: ['4a', '4b'],
    productType: 'B',
  },
};

export const capitalizeValue = (value: unknown): string => {
  if (typeof value !== 'string') {
    return String(value);
  }

  if (value.includes(' ')) {
    // Handle multi-word values like "very high" or "extra small"
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};
