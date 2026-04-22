import type { AbbeyYungWeight } from '@/data/abbeyYungProducts';
import type { QuizState } from './types';

const RANK: Record<'heavy' | 'medium' | 'light' | 'very light', number> = {
  heavy: 4,
  medium: 3,
  light: 2,
  'very light': 1,
};

/** Max conditioning tier the user tolerates (same scale as RANK). */
function userMaxRank(weight: QuizState['weight']): number {
  return RANK[weight];
}

function productMinRank(w: AbbeyYungWeight): number | null {
  if (w === 'unknown') return null;
  return RANK[w];
}

function normalizeWeights(
  productWeight: AbbeyYungWeight | AbbeyYungWeight[] | undefined,
): AbbeyYungWeight[] {
  if (productWeight === undefined) return [];
  return Array.isArray(productWeight) ? productWeight : [productWeight];
}

/**
 * A product is eligible if any of its weights are ≤ the user's selected weight
 * on the hierarchy heavy > medium > light > very light.
 * unknown / undefined → always eligible.
 */
export function weightIsEligible(
  productWeight: AbbeyYungWeight | AbbeyYungWeight[] | undefined,
  userWeight: QuizState['weight'],
): boolean {
  if (productWeight === undefined) return true;
  const parts = normalizeWeights(productWeight);
  if (parts.includes('unknown')) return true;
  const maxUser = userMaxRank(userWeight);
  return parts.some((w) => {
    const pr = productMinRank(w);
    if (pr === null) return true;
    return pr <= maxUser;
  });
}
