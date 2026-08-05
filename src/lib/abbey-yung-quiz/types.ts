import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';

export type ScalpNeed =
  | 'buildup'
  | 'exfoliation'
  | 'density'
  | 'skin-health'
  | 'growth';

export type ShampooRole =
  | 'deep-cleaning'
  | 'chelating'
  | 'strengthening'
  | 'scalp-health'
  | 'medicated';

export interface ShampooPick {
  product: AbbeyYungProduct;
  roles: ShampooRole[];
  note: string | null;
}

/** Raw answers from the quiz wizard — stored as the user progresses */
export interface RawAnswers {
  damageTypes: string[];
  damageSigns: string[];
  hairLength: string;
  heatStyling: string[];
  /** Set after Q5; omitted means unanswered in the wizard */
  tanglyDuringShampoo?: boolean;
  tanglyGeneral: string;
  scalpType: string;
  /** Set after dandruff Q; omitted means unanswered */
  hasDandruff?: boolean;
  /** Scalp-care needs; empty until answered; includes `none` when none selected */
  scalpNeeds: string[];
  hardWater: 'yes' | 'no' | 'unknown';
  cleansingNeeds: string;
  washFrequency: string;
  productWeight: string;
  drugstore: 'yes' | 'no' | 'either' | '';
  betweenWash: string[];
  boosts: string[];
}

/** Derived state — computed by computeQuizState() */
export interface QuizState {
  chemicalDamage: boolean;
  heatDamage: boolean;
  damageLevel: 1 | 2 | 3 | 4;
  heatStyling: 'none' | 'low' | 'high';
  fragile: boolean;
  tanglyDuringShampoo: boolean;
  tanglyGeneral: 'rare' | 'sometimes' | 'constant';
  scalpType: 'dry' | 'normal' | 'oily' | 'extra oily' | 'unknown';
  hasDandruff: boolean;
  scalpNeeds: ScalpNeed[];
  hardWater: boolean | null;
  cleansingNeeds: 'gentle' | 'normal' | 'strong';
  washFrequency: 'daily' | 'multi-weekly' | 'weekly-or-less';
  weight: 'very light' | 'light' | 'medium' | 'heavy';
  drugstoreOnly: boolean;
  noPreference: boolean;
  betweenWashHeat: boolean;
  betweenWashDryness: boolean;
  betweenWashOiliness: boolean;
  boosts: Array<'smoothing' | 'volume' | 'texture' | 'hold'>;
}

/** Shape returned by selectProducts() */
export interface RoutineResult {
  preShampooOil: AbbeyYungProduct | null;
  preShampooOilNote: string | null;
  /** Up to 2 shampoo picks with roles they cover */
  shampoos: ShampooPick[];
  bondRepair: AbbeyYungProduct[];
  bondRepairStrongFallbackNote: string | null;
  conditioner: AbbeyYungProduct | null;
  leaveIn: AbbeyYungProduct | null;
  betweenWashHeatProtection: AbbeyYungProduct | null;
  betweenWashDryness: AbbeyYungProduct | null;
  betweenWashOilControl: AbbeyYungProduct | null;
  smoothingBoost: AbbeyYungProduct | null;
  volumeBoost: AbbeyYungProduct | null;
  textureBoost: AbbeyYungProduct | null;
  holdBoost: AbbeyYungProduct | null;
  fallbacksUsed: string[];
}

export function createEmptyRawAnswers(): RawAnswers {
  return {
    damageTypes: [],
    damageSigns: [],
    hairLength: '',
    heatStyling: [],
    tanglyDuringShampoo: undefined,
    tanglyGeneral: '',
    scalpType: '',
    hasDandruff: undefined,
    scalpNeeds: [],
    hardWater: 'unknown',
    cleansingNeeds: '',
    washFrequency: '',
    productWeight: '',
    drugstore: '',
    betweenWash: [],
    boosts: [],
  };
}
