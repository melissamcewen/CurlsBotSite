import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';
import { abbeyYungProducts } from '@/data/abbeyYungProducts';
import { bucketBondRepairProduct } from './bondBuckets';
import type {
  QuizState,
  RoutineResult,
  ScalpNeed,
  ShampooPick,
  ShampooRole,
} from './types';
import { weightIsEligible } from './weightFilter';

const LIVING_PROOF_TRIPLE = 'Living Proof Triple Bond Complex';
const MAX_SHAMPOOS = 2;

const SCALP_NEED_TAG: Record<ScalpNeed, string> = {
  buildup: 'scalp-buildup-removal',
  exfoliation: 'scalp-exfoliation',
  density: 'scalp-density-support',
  'skin-health': 'scalp-skin-health',
  growth: 'scalp-growth-stimulating',
};

const ROLE_LABEL: Record<ShampooRole, string> = {
  'deep-cleaning': 'deep cleaning',
  chelating: 'chelating',
  strengthening: 'strengthening',
  'scalp-health': 'scalp health',
  medicated: 'medicated',
};

export function applyDrugstoreFilter(
  candidates: AbbeyYungProduct[],
  state: QuizState,
): { products: AbbeyYungProduct[]; fallback: boolean } {
  if (!state.drugstoreOnly) {
    return { products: candidates, fallback: false };
  }
  const filtered = candidates.filter((p) => p.drugstore === true);
  if (filtered.length === 0) {
    return { products: candidates, fallback: true };
  }
  return { products: filtered, fallback: false };
}

function pickPreferred(candidates: AbbeyYungProduct[]): AbbeyYungProduct | null {
  if (candidates.length === 0) return null;
  const withImg = candidates.find((p) => p.img);
  return withImg ?? candidates[0];
}

function pushFallback(result: RoutineResult, stepName: string) {
  if (!result.fallbacksUsed.includes(stepName)) {
    result.fallbacksUsed.push(stepName);
  }
}

function pickWithFilters(
  candidates: AbbeyYungProduct[],
  state: QuizState,
  stepName: string,
  result: RoutineResult,
  useWeight: boolean,
): AbbeyYungProduct | null {
  if (candidates.length === 0) return null;

  const weightFiltered = useWeight
    ? candidates.filter((p) => weightIsEligible(p.weight, state.weight))
    : candidates;

  let { products, fallback } = applyDrugstoreFilter(weightFiltered, state);
  if (fallback) pushFallback(result, stepName);
  let picked = pickPreferred(products);
  if (picked) return picked;

  if (state.drugstoreOnly && weightFiltered.length > 0) {
    pushFallback(result, stepName);
    return pickPreferred(weightFiltered);
  }

  if (useWeight) {
    ({ products, fallback } = applyDrugstoreFilter(candidates, state));
    if (fallback) pushFallback(result, stepName);
    picked = pickPreferred(products);
    if (picked) return picked;
  }

  pushFallback(result, stepName);
  return pickPreferred(candidates);
}

function hasTag(p: AbbeyYungProduct, tag: string): boolean {
  return Boolean(p.tags?.includes(tag));
}

function rolesFromTags(p: AbbeyYungProduct): ShampooRole[] {
  const roles: ShampooRole[] = [];
  if (hasTag(p, 'deep-cleaning-shampoo')) roles.push('deep-cleaning');
  if (hasTag(p, 'benefit-chelating')) roles.push('chelating');
  if (hasTag(p, 'benefit-strengthening')) roles.push('strengthening');
  if (hasTag(p, 'benefit-scalp-health')) roles.push('scalp-health');
  if (hasTag(p, 'benefit-medicated')) roles.push('medicated');
  return roles;
}

function scalpFitScore(p: AbbeyYungProduct, state: QuizState): number {
  if (state.scalpType === 'unknown' || !p.scalpType?.length) return 1;
  if (p.scalpType.includes(state.scalpType)) return 0;
  if (
    (state.scalpType === 'extra oily' && p.scalpType.includes('oily')) ||
    (state.scalpType === 'oily' && p.scalpType.includes('extra oily'))
  ) {
    return 0;
  }
  return 2;
}

function cleaningFitScore(p: AbbeyYungProduct, state: QuizState): number {
  const cp = p.cleaningPower ?? [];
  if (state.cleansingNeeds === 'strong') return cp.includes('strong') ? 0 : 1;
  if (state.cleansingNeeds === 'gentle') return cp.includes('light') ? 0 : 1;
  return cp.includes('moderate') ? 0 : 1;
}

function needOverlap(p: AbbeyYungProduct, needs: ScalpNeed[]): number {
  if (needs.length === 0) return 0;
  return needs.reduce((sum, need) => {
    return sum + (hasTag(p, SCALP_NEED_TAG[need]) ? 1 : 0);
  }, 0);
}

function coversRole(p: AbbeyYungProduct, role: ShampooRole): boolean {
  switch (role) {
    case 'deep-cleaning':
      return hasTag(p, 'deep-cleaning-shampoo');
    case 'chelating':
      return hasTag(p, 'benefit-chelating');
    case 'strengthening':
      return hasTag(p, 'benefit-strengthening');
    case 'scalp-health':
      return hasTag(p, 'benefit-scalp-health');
    case 'medicated':
      return hasTag(p, 'benefit-medicated');
    default:
      return false;
  }
}

function wantsStrengthening(state: QuizState): boolean {
  return (
    state.scalpNeeds.length === 0 &&
    state.washFrequency !== 'weekly-or-less' &&
    (state.cleansingNeeds === 'gentle' ||
      state.fragile ||
      state.tanglyDuringShampoo ||
      state.tanglyGeneral === 'constant' ||
      state.weight === 'medium' ||
      state.weight === 'heavy')
  );
}

/** Higher is better — scalp/cleansing fit + drugstore/image nudges. */
function productFitScore(p: AbbeyYungProduct, state: QuizState): number {
  let score = 0;
  score += (2 - scalpFitScore(p, state)) * 5;
  score += (2 - cleaningFitScore(p, state)) * 5;
  if (state.fragile && hasTag(p, 'fragile')) score += 4;
  if (state.drugstoreOnly && p.drugstore) score += 8;
  else if (!state.drugstoreOnly && !state.noPreference && !p.drugstore)
    score += 3;
  if (p.img) score += 1;
  return score;
}

function multiRoleNote(roles: ShampooRole[]): string | null {
  if (roles.length < 2) return null;
  const labels = roles.map((r) => ROLE_LABEL[r]);
  return `Covers: ${labels.join(', ')}.`;
}

function noteForProduct(p: AbbeyYungProduct, state: QuizState): string | null {
  const roles = rolesFromTags(p);
  const parts: string[] = [];
  if (roles.includes('medicated')) {
    parts.push(
      'OTC medicated shampoo — this is not medical advice; please see a doctor for a diagnosis.',
    );
  }
  if (roles.includes('chelating') && state.hardWater === true) {
    parts.push('For hard-water mineral buildup (about once a week or more).');
  }
  if (roles.includes('strengthening') && !roles.includes('deep-cleaning')) {
    parts.push(
      'For non-deep-cleaning wash days — softening and manageability.',
    );
  }
  const cover = multiRoleNote(roles);
  if (cover) parts.push(cover);
  return parts.length > 0 ? parts.join(' ') : null;
}

function toShampooPick(product: AbbeyYungProduct, state: QuizState): ShampooPick {
  return {
    product,
    roles: rolesFromTags(product),
    note: noteForProduct(product, state),
  };
}

/**
 * Score a deep-cleaning candidate: prefer ones that also match dandruff /
 * hard-water prefs (and scalp needs as a lighter bonus).
 */
function scoreDeepPrimary(p: AbbeyYungProduct, state: QuizState): number {
  let score = productFitScore(p, state);
  if (state.hasDandruff && coversRole(p, 'medicated')) score += 1000;
  if (state.hardWater === true && coversRole(p, 'chelating')) score += 1000;
  if (state.scalpNeeds.length > 0 && coversRole(p, 'scalp-health')) {
    score += 50 + needOverlap(p, state.scalpNeeds) * 12;
  }
  return score;
}

/**
 * Score a second shampoo for prefs the deep cleaner didn't cover.
 * Hard leftovers (medicated / chelating) outweigh soft ones.
 */
function scoreSecondary(
  p: AbbeyYungProduct,
  state: QuizState,
  remaining: ShampooRole[],
): number {
  let score = productFitScore(p, state);
  let coversAny = false;
  for (const role of remaining) {
    if (!coversRole(p, role)) continue;
    coversAny = true;
    if (role === 'medicated' || role === 'chelating') score += 1000;
    else if (role === 'scalp-health') {
      score += 80 + needOverlap(p, state.scalpNeeds) * 12;
    } else if (role === 'strengthening') score += 40;
  }
  return coversAny ? score : Number.NEGATIVE_INFINITY;
}

function pickBest(
  candidates: AbbeyYungProduct[],
  state: QuizState,
  stepName: string,
  result: RoutineResult,
  scoreFn: (p: AbbeyYungProduct) => number,
): AbbeyYungProduct | null {
  if (candidates.length === 0) return null;

  const ranked = [...candidates].sort((a, b) => scoreFn(b) - scoreFn(a));
  const bestScore = scoreFn(ranked[0]);
  if (bestScore === Number.NEGATIVE_INFINITY) return null;

  const topTied = ranked.filter((p) => scoreFn(p) === bestScore);
  return pickWithFilters(topTied, state, stepName, result, false);
}

function remainingPrefs(
  state: QuizState,
  primary: AbbeyYungProduct,
): ShampooRole[] {
  const remaining: ShampooRole[] = [];
  if (state.hasDandruff && !coversRole(primary, 'medicated')) {
    remaining.push('medicated');
  }
  if (state.hardWater === true && !coversRole(primary, 'chelating')) {
    remaining.push('chelating');
  }
  if (
    state.scalpNeeds.length > 0 &&
    !coversRole(primary, 'scalp-health')
  ) {
    remaining.push('scalp-health');
  }
  if (
    wantsStrengthening(state) &&
    !coversRole(primary, 'strengthening') &&
    !coversRole(primary, 'scalp-health')
  ) {
    remaining.push('strengthening');
  }
  return remaining;
}

/**
 * 1. Pick deep cleaning first — prefer products that also match dandruff /
 *    hard-water (and scalp) prefs.
 * 2. If prefs remain uncovered, pick a second shampoo for those leftovers.
 */
function selectShampoos(state: QuizState, result: RoutineResult): ShampooPick[] {
  const deepCandidates = abbeyYungProducts.filter((p) =>
    coversRole(p, 'deep-cleaning'),
  );

  const primary = pickBest(
    deepCandidates,
    state,
    'Deep cleaning shampoo',
    result,
    (p) => scoreDeepPrimary(p, state),
  );

  if (!primary) return [];

  const picks: ShampooPick[] = [toShampooPick(primary, state)];
  const remaining = remainingPrefs(state, primary);
  if (remaining.length === 0) return picks;

  const secondaryCandidates = abbeyYungProducts.filter(
    (p) =>
      p.product !== primary.product &&
      remaining.some((role) => coversRole(p, role)),
  );

  const secondary = pickBest(
    secondaryCandidates,
    state,
    'Benefit shampoo',
    result,
    (p) => scoreSecondary(p, state, remaining),
  );

  if (secondary) picks.push(toShampooPick(secondary, state));
  return picks;
}

function sortConditioner(candidates: AbbeyYungProduct[], state: QuizState) {
  const copy = [...candidates];

  function glossScore(p: AbbeyYungProduct): number {
    const h = p.heaviness?.toLowerCase() ?? '';
    const lightHeaviness = h.includes('light');
    const glossComment = p.comments.includes('Gloss');
    return lightHeaviness || glossComment ? 0 : 1;
  }

  function maskScore(p: AbbeyYungProduct): number {
    return p.comments.includes('Mask') ? 0 : 1;
  }

  function condScore(p: AbbeyYungProduct): number {
    return p.comments.includes('Conditioner') ? 0 : 1;
  }

  copy.sort((a, b) => {
    if (state.weight === 'very light') {
      return glossScore(a) - glossScore(b);
    }
    if (state.weight === 'heavy' || state.tanglyGeneral === 'constant') {
      return maskScore(a) - maskScore(b);
    }
    return condScore(a) - condScore(b);
  });

  return copy;
}

function strongBondEligible(
  p: AbbeyYungProduct,
  state: QuizState,
): boolean {
  if (!p.tags?.includes('strong-bond-repair')) return false;
  if (p.product === LIVING_PROOF_TRIPLE && state.heatStyling === 'none') {
    return false;
  }
  return true;
}

function orderedStrongBondCandidates(state: QuizState): AbbeyYungProduct[] {
  const strong = abbeyYungProducts.filter((p) => strongBondEligible(p, state));
  const step1 = strong.filter((p) => p.steps.includes(1));
  const step5 = strong.filter(
    (p) => p.steps.includes(5) && !p.steps.includes(1),
  );
  const step7 = strong.filter(
    (p) => p.steps.includes(7) && !p.steps.includes(5) && !p.steps.includes(1),
  );
  return [...step1, ...step5, ...step7];
}

function orderedWeakBondCandidates(): AbbeyYungProduct[] {
  const weak = abbeyYungProducts.filter((p) =>
    p.tags?.includes('weak-bond-repair'),
  );
  const step5 = weak.filter((p) => p.steps.includes(5));
  const step7 = weak.filter((p) => p.steps.includes(7) && !p.steps.includes(5));
  return [...step5, ...step7];
}

/** Bond repair picks by damage level: 1→0, 2→1, 3→2, 4→3 */
function bondRepairCount(damageLevel: number): number {
  if (damageLevel === 1) return 0;
  if (damageLevel === 2) return 1;
  if (damageLevel === 3) return 2;
  return 3;
}

export function selectProducts(state: QuizState): RoutineResult {
  const result: RoutineResult = {
    preShampooOil: null,
    preShampooOilNote: null,
    shampoos: [],
    bondRepair: [],
    bondRepairStrongFallbackNote: null,
    conditioner: null,
    leaveIn: null,
    betweenWashHeatProtection: null,
    betweenWashDryness: null,
    betweenWashOilControl: null,
    smoothingBoost: null,
    volumeBoost: null,
    textureBoost: null,
    holdBoost: null,
    fallbacksUsed: [],
  };

  /* Pre-shampoo oil */
  if (state.tanglyDuringShampoo) {
    const cands = abbeyYungProducts.filter(
      (p) =>
        p.steps.includes(2) && weightIsEligible(p.weight, state.weight),
    );
    result.preShampooOil = pickPreferred(cands);
    if (
      result.preShampooOil &&
      !state.drugstoreOnly &&
      !state.noPreference &&
      result.preShampooOil.drugstore
    ) {
      result.preShampooOilNote =
        'Pre-shampoo options in our data are drugstore products right now — this pick is still a solid match for Abbey’s method.';
    }
  }

  result.shampoos = selectShampoos(state, result);

  /* Bond repair */
  const skipBond =
    !state.chemicalDamage &&
    !state.heatDamage &&
    state.heatStyling === 'none' &&
    state.damageLevel === 1;

  if (!skipBond) {
    const slots = bondRepairCount(state.damageLevel);
    const needsStrongBond =
      state.chemicalDamage ||
      state.heatDamage ||
      state.heatStyling === 'high';

    const selected: AbbeyYungProduct[] = [];
    const names = new Set<string>();

    if (slots > 0) {
      let remaining = slots;

      if (needsStrongBond) {
        const strongOrdered = orderedStrongBondCandidates(state);
        const strongApplied = applyDrugstoreFilter(strongOrdered, state);
        let strongPool = strongApplied.products;
        const strongFb = strongApplied.fallback;
        if (strongFb) {
          result.bondRepairStrongFallbackNote =
            'No drugstore option exists for strong bond repair.';
          pushFallback(result, 'Bond repair (strong)');
          strongPool = strongOrdered;
        }
        const strongPick = pickPreferred(strongPool);
        if (strongPick && !names.has(strongPick.product) && remaining > 0) {
          selected.push(strongPick);
          names.add(strongPick.product);
          remaining -= 1;
        }
      }

      const weakOrdered = orderedWeakBondCandidates();

      while (remaining > 0) {
        const available = weakOrdered.filter((p) => !names.has(p.product));
        if (available.length === 0) break;

        const usedBondSteps = new Set(
          selected
            .map((p) => bucketBondRepairProduct(p))
            .filter((s): s is 1 | 5 | 7 => s != null),
        );

        let tierPreferred: AbbeyYungProduct[];
        if (!usedBondSteps.has(5)) {
          tierPreferred = available.filter(
            (p) => bucketBondRepairProduct(p) === 5,
          );
        } else if (!usedBondSteps.has(7)) {
          tierPreferred = available.filter(
            (p) => bucketBondRepairProduct(p) === 7,
          );
        } else {
          tierPreferred = available;
        }

        const pool =
          tierPreferred.length > 0 ? tierPreferred : available;

        const picked = pickWithFilters(
          pool,
          state,
          'Bond repair (weak)',
          result,
          true,
        );
        if (!picked) break;
        selected.push(picked);
        names.add(picked.product);
        remaining -= 1;
      }
    }

    result.bondRepair = selected;
  }

  /* Conditioner */
  let cond = abbeyYungProducts.filter((p) => p.steps.includes(6));
  cond = sortConditioner(cond, state);
  result.conditioner = pickWithFilters(
    cond,
    state,
    'Conditioner',
    result,
    true,
  );

  /* Leave-in */
  const leave = abbeyYungProducts.filter((p) => p.steps.includes(8));
  result.leaveIn = pickWithFilters(
    leave,
    state,
    'Leave-in',
    result,
    true,
  );

  /* Between-wash */
  if (state.betweenWashHeat) {
    const bw = abbeyYungProducts.filter(
      (p) =>
        p.steps.includes(11) &&
        p.tags?.includes('between-wash-heat-protection'),
    );
    result.betweenWashHeatProtection = pickWithFilters(
      bw,
      state,
      'Between-wash heat',
      result,
      false,
    );
  }

  if (state.betweenWashDryness) {
    const bw = abbeyYungProducts.filter(
      (p) =>
        p.steps.some((s) => s === 11 || s === 10) &&
        p.tags?.includes('between-wash-dryness-relief'),
    );
    result.betweenWashDryness = pickWithFilters(
      bw,
      state,
      'Between-wash dryness',
      result,
      true,
    );
  }

  if (state.betweenWashOiliness) {
    const bw = abbeyYungProducts.filter(
      (p) =>
        p.steps.includes(11) &&
        p.tags?.includes('between-wash-oil-control-relief'),
    );
    result.betweenWashOilControl = pickWithFilters(
      bw,
      state,
      'Between-wash oil',
      result,
      false,
    );
  }

  /* Boosts */
  for (const boost of state.boosts) {
    if (boost === 'smoothing') {
      const c = abbeyYungProducts.filter(
        (p) =>
          p.steps.includes(10) && p.tags?.includes('style-smoothing'),
      );
      result.smoothingBoost = pickWithFilters(
        c,
        state,
        'Smoothing boost',
        result,
        true,
      );
    } else if (boost === 'volume') {
      const c = abbeyYungProducts.filter(
        (p) => p.steps.includes(9) && p.tags?.includes('style-volume'),
      );
      result.volumeBoost = pickWithFilters(
        c,
        state,
        'Volume boost',
        result,
        true,
      );
    } else if (boost === 'texture') {
      const c = abbeyYungProducts.filter(
        (p) => p.steps.includes(9) && p.tags?.includes('style-texture'),
      );
      result.textureBoost = pickWithFilters(
        c,
        state,
        'Texture boost',
        result,
        true,
      );
    } else if (boost === 'hold') {
      const c = abbeyYungProducts.filter(
        (p) => p.steps.includes(9) && p.tags?.includes('style-hold'),
      );
      result.holdBoost = pickWithFilters(
        c,
        state,
        'Hold boost',
        result,
        true,
      );
    }
  }

  return result;
}
