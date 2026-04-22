import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';

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
  clarifyingShampoo: AbbeyYungProduct | null;
  everydayShampoo: AbbeyYungProduct | null;
  everydayShampooNote: string | null;
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
    hardWater: 'unknown',
    cleansingNeeds: '',
    washFrequency: '',
    productWeight: '',
    drugstore: '',
    betweenWash: [],
    boosts: [],
  };
}
