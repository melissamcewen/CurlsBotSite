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

function uniqueRoles(roles: ShampooRole[]): ShampooRole[] {
  return [...new Set(roles)];
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

function sortByScalpAndClean(
  candidates: AbbeyYungProduct[],
  state: QuizState,
): AbbeyYungProduct[] {
  return [...candidates].sort((a, b) => {
    return (
      scalpFitScore(a, state) - scalpFitScore(b, state) ||
      cleaningFitScore(a, state) - cleaningFitScore(b, state) ||
      (state.fragile
        ? (hasTag(a, 'fragile') ? 0 : 1) - (hasTag(b, 'fragile') ? 0 : 1)
        : 0)
    );
  });
}

function needOverlap(p: AbbeyYungProduct, needs: ScalpNeed[]): number {
  if (needs.length === 0) return 0;
  return needs.reduce((sum, need) => {
    return sum + (hasTag(p, SCALP_NEED_TAG[need]) ? 1 : 0);
  }, 0);
}

function picksCoverDeep(picks: ShampooPick[]): boolean {
  return picks.some(
    (pick) =>
      pick.roles.includes('deep-cleaning') ||
      hasTag(pick.product, 'deep-cleaning-shampoo'),
  );
}

function picksCoverChelating(picks: ShampooPick[]): boolean {
  return picks.some(
    (pick) =>
      pick.roles.includes('chelating') ||
      hasTag(pick.product, 'benefit-chelating'),
  );
}

function picksCoverScalp(picks: ShampooPick[]): boolean {
  return picks.some((pick) => pick.roles.includes('scalp-health'));
}

function multiRoleNote(roles: ShampooRole[]): string | null {
  if (roles.length < 2) return null;
  const labels = roles.map((r) => ROLE_LABEL[r]);
  return `Covers: ${labels.join(', ')}.`;
}

function mergeOrAddShampoo(
  picks: ShampooPick[],
  product: AbbeyYungProduct,
  roles: ShampooRole[],
  note: string | null,
): boolean {
  const mergedRoles = uniqueRoles([...roles, ...rolesFromTags(product)]);
  const existing = picks.find((p) => p.product.product === product.product);
  if (existing) {
    existing.roles = uniqueRoles([...existing.roles, ...mergedRoles]);
    if (note && !existing.note) existing.note = note;
    const cover = multiRoleNote(existing.roles);
    if (cover && (!existing.note || existing.note.startsWith('Covers:'))) {
      existing.note = existing.note?.startsWith('Covers:')
        ? cover
        : [existing.note, cover].filter(Boolean).join(' ');
    }
    return true;
  }
  if (picks.length >= MAX_SHAMPOOS) return false;
  const cover = multiRoleNote(mergedRoles);
  picks.push({
    product,
    roles: mergedRoles,
    note: note ?? cover,
  });
  return true;
}

function selectShampoos(state: QuizState, result: RoutineResult): ShampooPick[] {
  const picks: ShampooPick[] = [];

  /* 1. Medicated (priority when dandruff) */
  if (state.hasDandruff) {
    let meds = abbeyYungProducts.filter((p) =>
      hasTag(p, 'benefit-medicated'),
    );
    meds = sortByScalpAndClean(meds, state);
    meds.sort((a, b) => {
      const da = hasTag(a, 'deep-cleaning-shampoo') ? 0 : 1;
      const db = hasTag(b, 'deep-cleaning-shampoo') ? 0 : 1;
      return da - db;
    });
    const pick = pickWithFilters(
      meds,
      state,
      'Medicated shampoo',
      result,
      false,
    );
    if (pick) {
      mergeOrAddShampoo(
        picks,
        pick,
        ['medicated'],
        'OTC medicated shampoo — this is not medical advice; please see a doctor for a diagnosis.',
      );
    }
  }

  /* 2. Scalp-health match */
  if (state.scalpNeeds.length > 0) {
    let scalp = abbeyYungProducts.filter((p) =>
      hasTag(p, 'benefit-scalp-health'),
    );
    scalp = [...scalp].sort((a, b) => {
      const needDelta =
        needOverlap(b, state.scalpNeeds) - needOverlap(a, state.scalpNeeds);
      if (needDelta !== 0) return needDelta;
      if (!picksCoverDeep(picks)) {
        const da = hasTag(a, 'deep-cleaning-shampoo') ? 0 : 1;
        const db = hasTag(b, 'deep-cleaning-shampoo') ? 0 : 1;
        if (da !== db) return da - db;
      }
      return (
        scalpFitScore(a, state) - scalpFitScore(b, state) ||
        cleaningFitScore(a, state) - cleaningFitScore(b, state)
      );
    });
    if (
      state.cleansingNeeds === 'strong' ||
      state.scalpType === 'oily' ||
      state.scalpType === 'extra oily'
    ) {
      scalp.sort((a, b) => {
        const ra = hasTag(a, 'residue-free') ? 0 : 1;
        const rb = hasTag(b, 'residue-free') ? 0 : 1;
        return ra - rb;
      });
    }
    const pick = pickWithFilters(
      scalp,
      state,
      'Scalp health shampoo',
      result,
      false,
    );
    if (pick) {
      mergeOrAddShampoo(picks, pick, ['scalp-health'], null);
    }
  }

  /* 3. Deep cleaning if not already covered */
  if (!picksCoverDeep(picks)) {
    let deep = abbeyYungProducts.filter((p) =>
      hasTag(p, 'deep-cleaning-shampoo'),
    );
    if (state.hardWater === true) {
      const hw = deep.filter((p) => hasTag(p, 'benefit-chelating'));
      if (hw.length > 0) deep = hw;
    }
    deep = sortByScalpAndClean(deep, state);
    const pick = pickWithFilters(
      deep,
      state,
      'Deep cleaning shampoo',
      result,
      false,
    );
    if (pick) {
      const note =
        state.hardWater === true && hasTag(pick, 'benefit-chelating')
          ? 'Also covers hard-water / chelating needs.'
          : null;
      mergeOrAddShampoo(picks, pick, ['deep-cleaning'], note);
    }
  }

  /* 4. Extra chelating if hard water and not covered (and slot free) */
  if (
    state.hardWater === true &&
    !picksCoverChelating(picks) &&
    picks.length < MAX_SHAMPOOS
  ) {
    let chelates = abbeyYungProducts.filter(
      (p) =>
        hasTag(p, 'benefit-chelating') &&
        !picks.some((pick) => pick.product.product === p.product),
    );
    chelates = sortByScalpAndClean(chelates, state);
    const pick = pickWithFilters(
      chelates,
      state,
      'Chelating shampoo',
      result,
      false,
    );
    if (pick) {
      mergeOrAddShampoo(
        picks,
        pick,
        ['chelating'],
        'For hard-water mineral buildup (about once a week or more).',
      );
    }
  }

  /* 5. Strengthening on remaining wash days */
  const hasScalpShampoo = picksCoverScalp(picks);
  const wantsStrengthening =
    !hasScalpShampoo &&
    state.washFrequency !== 'weekly-or-less' &&
    (state.cleansingNeeds === 'gentle' ||
      state.fragile ||
      state.tanglyDuringShampoo ||
      state.tanglyGeneral === 'constant' ||
      state.weight === 'medium' ||
      state.weight === 'heavy');

  if (wantsStrengthening && picks.length < MAX_SHAMPOOS) {
    let strength = abbeyYungProducts.filter((p) =>
      hasTag(p, 'benefit-strengthening'),
    );
    if (state.fragile) {
      strength = [...strength].sort(
        (a, b) =>
          (hasTag(a, 'fragile') ? 0 : 1) - (hasTag(b, 'fragile') ? 0 : 1),
      );
    }
    const pick = pickWithFilters(
      strength,
      state,
      'Strengthening shampoo',
      result,
      true,
    );
    if (pick) {
      mergeOrAddShampoo(
        picks,
        pick,
        ['strengthening'],
        'For non-deep-cleaning wash days — softening and manageability.',
      );
    }
  }

  for (const pick of picks) {
    const cover = multiRoleNote(pick.roles);
    if (cover && !pick.note) pick.note = cover;
  }

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
