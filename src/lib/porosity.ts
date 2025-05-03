import type { ProductCategory } from './routineBuilder';

export type PorosityType =
  | 'high_porosity'
  | 'low_porosity'
  | 'normal_porosity'
  | 'mixed_porosity';

// Score thresholds for porosity
export const POROSITY_THRESHOLDS = {
  HIGH_POROSITY: 70, // Score needed to be considered good for high porosity
  LOW_POROSITY: 80, // Score needed to be considered good for low porosity
} as const;

// Categories that should not use porosity filtering or display porosity badges
export const POROSITY_EXEMPT_CATEGORIES: ProductCategory[] = [
  'deep_conditioners',
  'pre-poo',
  'clarifying_shampoos',
  'accessories',
  'oils',
];

// Categories appropriate for each porosity type
export const POROSITY_CATEGORIES: Record<PorosityType, ProductCategory[]> = {
  high_porosity: [
    'pre-poo',
    'clarifying_shampoos',
    'cowashes',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'oils',
    'sprays',
    'accessories',
  ],
  low_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'custards',
    'gels',
    'foams',
    'sprays',
    'accessories',
  ],
  normal_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'gels',
    'custards',
    'oils',
    'foams',
    'sprays',
    'accessories',
  ],
  mixed_porosity: [
    'pre-poo',
    'clarifying_shampoos',
    'shampoos',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'foams',
    'oils',
    'sprays',
    'accessories',
  ],
};
