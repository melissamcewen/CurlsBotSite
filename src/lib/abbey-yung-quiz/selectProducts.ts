import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';
import { abbeyYungProducts } from '@/data/abbeyYungProducts';
import { bucketBondRepairProduct } from './bondBuckets';
import type { QuizState, RoutineResult } from './types';
import { weightIsEligible } from './weightFilter';

const LIVING_PROOF_TRIPLE = 'Living Proof Triple Bond Complex';

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

function sortClarifying(
  candidates: AbbeyYungProduct[],
  state: QuizState,
): AbbeyYungProduct[] {
  const copy = [...candidates];

  function scalpScore(p: AbbeyYungProduct): number {
    if (state.scalpType === 'unknown') return 0;
    return p.scalpType?.includes('normal') ? 0 : 1;
  }

  function cleaningScore(p: AbbeyYungProduct): number {
    const cp = p.cleaningPower ?? [];
    if (state.cleansingNeeds === 'strong')
      return cp.includes('strong') ? 0 : 1;
    if (state.cleansingNeeds === 'gentle')
      return cp.includes('light') ? 0 : 1;
    return cp.includes('moderate') ? 0 : 1;
  }

  function fragileScore(p: AbbeyYungProduct): number {
    if (!state.fragile) return 0;
    return p.tags?.includes('fragile') ? 0 : 1;
  }

  copy.sort((a, b) => {
    const d =
      scalpScore(a) - scalpScore(b) ||
      cleaningScore(a) - cleaningScore(b) ||
      fragileScore(a) - fragileScore(b);
    return d;
  });

  return copy;
}

function sortEveryday(candidates: AbbeyYungProduct[], state: QuizState) {
  const copy = [...candidates];
  if (state.fragile) {
    copy.sort((a, b) => {
      const fa = a.tags?.includes('fragile') ? 0 : 1;
      const fb = b.tags?.includes('fragile') ? 0 : 1;
      return fa - fb;
    });
  }
  return copy;
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
    clarifyingShampoo: null,
    everydayShampoo: null,
    everydayShampooNote: null,
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

  /* Clarifying shampoo */
  let clarifying = abbeyYungProducts.filter(
    (p) =>
      p.steps.includes(3) && p.tags?.includes('clarifying-shampoo'),
  );

  if (state.hardWater === true) {
    const hw = clarifying.filter((p) =>
      p.tags?.includes('hard-water-deposit-removal'),
    );
    if (hw.length > 0) clarifying = hw;
  }

  clarifying = sortClarifying(clarifying, state);
  result.clarifyingShampoo = pickWithFilters(
    clarifying,
    state,
    'Clarifying shampoo',
    result,
    false,
  );

  let showEverydayShampoo = true;
  let everydayShampooNote: string | null = null;

  if (state.washFrequency === 'weekly-or-less') {
    showEverydayShampoo = false;
  } else if (
    (state.scalpType === 'oily' || state.scalpType === 'extra oily') &&
    state.cleansingNeeds === 'strong' &&
    result.clarifyingShampoo?.tags?.includes('daily-shampoo')
  ) {
    showEverydayShampoo = false;
    everydayShampooNote =
      'This shampoo is gentle enough to use daily — it can double as your everyday shampoo too.';
  }

  result.everydayShampooNote = everydayShampooNote;

  /* Everyday / strengthening shampoo */
  if (showEverydayShampoo) {
    let everyday = abbeyYungProducts.filter(
      (p) =>
        p.steps.includes(4) &&
        (p.tags?.includes('conditioning-shampoo') ||
          p.tags?.includes('strength-repair-shampoo')),
    );
    everyday = sortEveryday(everyday, state);
    result.everydayShampoo = pickWithFilters(
      everyday,
      state,
      'Everyday shampoo',
      result,
      true,
    );
  }

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
