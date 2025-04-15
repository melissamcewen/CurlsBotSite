export type VersatilityLevel = 'low' | 'medium' | 'high';
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
  | '1b To 1c'
  | '2a To 2c'
  | '3a To 3c'
  | '4a To 4c'
  | '3a';
export type TanglingLevel = 'low' | 'medium' | 'high' | 'very high';
export type CurlsBotType = 'Straight fine' | 'Straight' | 'Straight coarse' | 'Wavy fine' | 'Wavy' | 'Loose curls' | 'Curly' | 'Very curly';
export interface HairParameters {
  curlsBotType: CurlsBotType;
  versatility: VersatilityLevel;
  shrinkage: ShrinkageLevel;
  strandThickness: StrandThickness;
  curvature: CurvatureType;
  shapes: ShapeType;
  volume: VolumeLevel;
  commonType: CommonType;
  tangling: TanglingLevel;
}

export const parameterDescriptions = {
  curlsBotType: {
    Straight: 'Straight hair',
    'Straight coarse': 'Straight hair that behaves slightly differently due to the thickness of the strands',
    'Wavy fine': 'Wavy hair, which is a type of highly variable curl pattern, combined with fine strands',
    Wavy: 'Wavy hair, which is a type of highly variable curl pattern',
    'Loose curls': 'Loose curls, which is a type of highly variable curl pattern',
    Curly: 'Curly hair',
    'Very curly': 'Very curly hair, may be a mixture of tight curls, coils, and kinks',
  },
  versatility: {
    low: "Your hair is a defined type and making it into another type would take chemical treatment. You don't have to worry about heavy products changing your hair type but they can still cause build up.",
    medium:
      'Your hair is easily styled into other types with heat, though make sure you use a heat protectant.',
    high: 'Your hair might have many different types naturally but holding on to just one type is hard, curls/waves tend to loosen up during the day and straightened hair can get puffy. Avoid heavy products (with lots of oils and butters) that will weigh your hair down.',
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
    any: 'This type is not associated with a strand thickness',
    small:
      'Fine hair, you will want to use products that protect from static, wash with a cleansing shampoo, and avoid heavy products.',
    medium: 'Medium diameter hair',
    large:
      'Coarse hair. You may want to use products with humectants like panthenol that increase softness and manageability.',
    varies: 'Each individual strand has thicker and thinner parts',
  },
  curvature: {
    none: 'Straight hair',
    varies: 'Can be straight, wavy, and curly, sometimes all three at once!',
    large: 'Large curves or curls',
    medium: 'Medium-sized curves or curls',
    small:
      'Small curves or curls, need to be carefully protected from breakage',
    'extra small':
      'Very tight curves or curls, need to be carefully protected from breakage and likely to be mixed porosity',
  },
  shapes: {
    none: 'No defined shape pattern',
    curved: 'Any variation of a curve',
    angled: 'Defined by zig-zag angles',
    varies:
      'Likely a mixture of angles and curves, can naturally form interlocking styles like locs/twists',
  },
  volume: {
    low: 'Very little volume, can be enhanced slightly with volumizing products and avoiding heavy products',
    medium:
      'Some volume, especially towards the ends, can be volumized with root clipping, pixie diffusing, and avoiding heavy products',
    high: 'A lot of volume, especially horizontally',
    'very high': 'Volume both vertical and horizontal',
  },
  commonType: {
    '1a': 'In the common system pin this is usually 1a, the straightest hair',
    '1b To 1c': 'Anywhere from 1b to 1c depending on if there is a slight wave',
    '2a To 2c':
      'Anywhere from 2a to 2c depending how tight the waves are, with 2a being the loosest',
    '3a To 3c':
      'Anywhere from 3a to 3c depending how tight the curls are, with 3c being the tightest',
    '4a To 4c':
      'Anywhere from 4a to 4c depending how tight the coils and kinks are, with 4c being the tightest',
    '3a': 'This is one of the hair types where the Common type is the same as the Walker type',
  },
  tangling: {
    low: "Your hair is isn't prone to tangles and is relatively easy to detangle",
    medium: 'Your hair tangles moderately especially in finer sections',
    high: 'Your hair tangles easily',
    'very high':
      'Your hair tangles easily and can form single-strand knots that cause breakage',
  },
} as const;

export const parameterDisplayNames = {
  commonType: 'Common Type',
  versatility: 'Versatility',
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
    curlsBotType: 'Straight',
    commonType: '1b To 1c',
    versatility: 'low',
    shrinkage: 'none',
    strandThickness: 'small',
    curvature: 'none',
    volume: 'low',
    shapes: 'none',
    tangling: 'medium',
  },
  '1b': {
    curlsBotType: 'Straight',
    commonType: '1b To 1c',
    versatility: 'medium',
    shrinkage: 'none',
    strandThickness: 'medium',
    curvature: 'none',
    volume: 'medium',
    shapes: 'none',
    tangling: 'low',
  },
  '1c': {
    curlsBotType: 'Straight coarse',
    commonType: '1a',
    versatility: 'low',
    shrinkage: 'none',
    strandThickness: 'large',
    curvature: 'none',
    volume: 'low',
    shapes: 'none',
    tangling: 'low',
  },
  '2a': {
    curlsBotType: 'Wavy fine',
    commonType: '2a To 2c',
    versatility: 'high',
    shrinkage: 'low',
    strandThickness: 'small',
    curvature: 'varies',
    volume: 'low',
    shapes: 'curved',
    tangling: 'medium',
  },
  '2b': {
    curlsBotType: 'Wavy',
    commonType: '2a To 2c',
    versatility: 'high',
    shrinkage: 'low',
    strandThickness: 'medium',
    curvature: 'varies',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'medium',
  },
  '2c': {
    curlsBotType: 'Wavy',
    commonType: '2a To 2c',
    versatility: 'high',
    shrinkage: 'low',
    strandThickness: 'large',
    curvature: 'varies',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'medium',
  },
  '3a': {
    curlsBotType: 'Loose curls',
    commonType: '3a',
    versatility: 'medium',
    shrinkage: 'medium',
    strandThickness: 'any',
    curvature: 'large',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'high',
  },
  '3b': {
    curlsBotType: 'Curly',
    commonType: '3a To 3c',
    versatility: 'medium',
    shrinkage: 'medium',
    strandThickness: 'any',
    curvature: 'medium',
    volume: 'medium',
    shapes: 'curved',
    tangling: 'high',
  },
  '3c': {
    curlsBotType: 'Very curly',
    commonType: '3a To 3c',
    versatility: 'low',
    shrinkage: 'high',
    strandThickness: 'any',
    curvature: 'small',
    volume: 'high',
    shapes: 'curved',
    tangling: 'very high',
  },
  '4a': {
    curlsBotType: 'Very curly',
    commonType: '4a To 4c',
    versatility: 'low',
    shrinkage: 'high',
    strandThickness: 'any',
    curvature: 'extra small',
    volume: 'high',
    shapes: 'curved',
    tangling: 'very high',
  },
  '4b': {
    curlsBotType: 'Very curly',
    commonType: '4a To 4c',
    versatility: 'low',
    shrinkage: 'high',
    strandThickness: 'any',
    curvature: 'extra small',
    volume: 'very high',
    shapes: 'angled',
    tangling: 'very high',
  },
  '4c': {
    curlsBotType: 'Very curly',
    commonType: '4a To 4c',
    versatility: 'low',
    shrinkage: 'high',
    strandThickness: 'varies',
    curvature: 'extra small',
    shapes: 'varies',
    volume: 'very high',
    tangling: 'very high',
  },
};

export const capitalizeValue = (value: string) => {
  if (value.includes(' ')) {
    // Handle multi-word values like "very high" or "extra small"
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};
