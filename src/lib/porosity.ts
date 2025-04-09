import type { ProductCategory } from './routineBuilder';

export type PorosityType =
  | 'high_porosity'
  | 'low_porosity'
  | 'normal_porosity'
  | 'mixed_porosity';

// Score thresholds for porosity
export const POROSITY_THRESHOLDS = {
  HIGH_POROSITY: 80, // Score needed to be considered good for high porosity
  LOW_POROSITY: 70, // Score needed to be considered good for low porosity
} as const;

// Categories that should not use porosity filtering or display porosity badges
export const POROSITY_EXEMPT_CATEGORIES: ProductCategory[] = [
  'deep_conditioners',
  'pre_poo',
  'clarifying_shampoos',
  'accessories',
];

// Categories appropriate for each porosity type
export const POROSITY_CATEGORIES: Record<PorosityType, ProductCategory[]> = {
  high_porosity: [
    'pre_poo',
    'clarifying_shampoos',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'oils',
    'accessories',
  ],
  low_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'custards',
    'gels',
    'foams',
    'accessories',
  ],
  normal_porosity: [
    'clarifying_shampoos',
    'shampoos',
    'cowashes',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'gels',
    'accessories',
  ],
  mixed_porosity: [
    'pre_poo',
    'clarifying_shampoos',
    'shampoos',
    'conditioners',
    'deep_conditioners',
    'leave_ins',
    'creams',
    'custards',
    'gels',
    'foams',
    'oils',
    'accessories',
  ],
};
