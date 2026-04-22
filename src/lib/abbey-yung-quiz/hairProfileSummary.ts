import type { QuizState, RawAnswers } from './types';

const HAIR_LENGTH: Record<string, string> = {
  'very-short': 'very short',
  short: 'short (around chin or less)',
  long: 'long (past chin to shoulder)',
  'very-long': 'very long (past shoulders)',
};

const DAMAGE_TYPE: Record<string, string> = {
  colored: 'color',
  highlighted: 'highlights',
  bleached: 'bleach',
  permed: 'a perm',
  relaxed: 'relaxer',
  'heat-damaged': 'heat damage',
};

const DAMAGE_SIGN: Record<string, string> = {
  breakage: 'breakage',
  'split-ends': 'split ends',
  brittleness: 'brittleness',
  'feels-dry': 'dryness',
  'feels-fried': 'very damaged or “fried” feel',
};

const HEAT_USE: Record<string, string> = {
  none: 'no heat styling',
  diffuse: 'diffusing',
  'blowdry-low': 'blow-drying on low heat',
  'blowdry-high': 'blow-drying on medium/high heat',
  'heat-tools': 'hot tools (curling/flat iron, etc.)',
};

function oxfordJoin(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function damageLevelWord(level: QuizState['damageLevel']): string {
  switch (level) {
    case 1:
      return 'minimal';
    case 2:
      return 'mild';
    case 3:
      return 'moderate';
    case 4:
      return 'strong';
    default:
      return 'mixed';
  }
}

function formatHeatDetail(answers: RawAnswers): string {
  const parts = answers.heatStyling.filter((h) => h !== 'none');
  if (parts.length === 0) return 'You do not use heat styling.';
  const labels = parts.map((p) => HEAT_USE[p] ?? p);
  return `Heat styling includes ${oxfordJoin(labels)}.`;
}

function formatScalpWash(state: QuizState): string {
  const scalp =
    state.scalpType === 'extra oily'
      ? 'very oily'
      : state.scalpType === 'unknown'
        ? 'uncertain'
        : state.scalpType;

  let wash = '';
  switch (state.washFrequency) {
    case 'daily':
      wash = 'You wash most days.';
      break;
    case 'multi-weekly':
      wash = 'You wash a few times a week.';
      break;
    case 'weekly-or-less':
      wash = 'You wash about once a week or less.';
      break;
  }

  let clean = '';
  switch (state.cleansingNeeds) {
    case 'strong':
      clean = 'You need a stronger shampoo to feel clean.';
      break;
    case 'gentle':
      clean = 'You need gentler shampoos that do not leave hair rough or stripped.';
      break;
    case 'normal':
      clean = 'Most shampoos work fine for your cleansing needs.';
      break;
  }

  return `Scalp: ${scalp}. ${wash} ${clean}`.trim();
}

function formatWater(state: QuizState): string {
  if (state.hardWater === true) {
    return 'You indicated you wash your hair with hard water, your ideal clarifying shampoo should be able to remove hard water deposits.';
  }
  if (state.hardWater === false) {
    return 'You indicated soft water, you can use any clarifying shampoo.';
  }
  return 'Hard water: not sure, if you notice a lot of buildup or films on your hair it might be worth testing a clarifying shampoo that can remove hard water deposits.';
}

function formatWeightBudget(state: QuizState): string {
  let w = '';
  switch (state.weight) {
    case 'very light':
      w = 'Hair is easily weighed down, choose the lightest products.';
      break;
    case 'light':
      w = 'Hair is easily weighed down, lighter products usually work best.';
      break;
    case 'medium':
      w = 'Hair tolerates a moderate amount of product.';
      break;
    case 'heavy':
      w = 'Hair can take richer products without feeling heavy.';
      break;
  }

  let b = '';
  if (state.drugstoreOnly) {
    b = 'You prefer drugstore-only picks where possible.';
  } else if (!state.noPreference) {
    b = 'You prefer salon or prestige options where possible.';
  } else {
    b = 'No strong budget preference (drugstore or salon).';
  }

  return `${w} ${b}`.trim();
}

function formatTangles(state: QuizState): string {
  const during = state.tanglyDuringShampoo
    ? 'Shampooing tends to roughen or tangle your hair.'
    : 'Shampooing is not a big tangling trigger for you.';

  let tg = '';
  switch (state.tanglyGeneral) {
    case 'rare':
      tg = 'Day to day, tangles are rare.';
      break;
    case 'sometimes':
      tg = 'You sometimes deal with tangles.';
      break;
    case 'constant':
      tg = 'Tangles are a frequent issue.';
      break;
  }

  return `${during} ${tg}`.trim();
}

function formatBetweenBoosts(state: QuizState): string | null {
  const parts: string[] = [];
  if (state.betweenWashHeat) {
    parts.push('heat protection between washes');
  }
  if (state.betweenWashDryness) {
    parts.push('dryness relief between washes');
  }
  if (state.betweenWashOiliness) {
    parts.push('oil control between washes');
  }

  const boostLabels: Record<string, string> = {
    smoothing: 'smoothness/shine',
    volume: 'volume',
    texture: 'texture',
    hold: 'hold',
  };
  const boostPart =
    state.boosts.length > 0
      ? `Optional styling extras you wanted: ${oxfordJoin(
          state.boosts.map((b) => boostLabels[b] ?? b),
        )}.`
      : '';

  const betweenPart =
    parts.length > 0
      ? `Between wash days you care about: ${oxfordJoin(parts)}.`
      : '';

  const combined = `${betweenPart} ${boostPart}`.trim();
  return combined || null;
}

export type HairProfileSectionId =
  | 'basics'
  | 'heatScalp'
  | 'waterRoutine'
  | 'between';

export type HairProfileSection = {
  id: HairProfileSectionId;
  title: string;
  lines: string[];
};

/**
 * Grouped lines for the results “hair snapshot” card UI.
 */
export function buildHairProfileSections(
  state: QuizState,
  answers: RawAnswers,
): HairProfileSection[] {
  const basics: string[] = [];

  const hl = answers.hairLength ? HAIR_LENGTH[answers.hairLength] : null;
  if (hl) {
    basics.push(`Length: ${hl}.`);
  }

  const types = answers.damageTypes.filter((t) => t !== 'none');
  if (types.length > 0) {
    basics.push(
      `History: ${oxfordJoin(types.map((t) => DAMAGE_TYPE[t] ?? t))}.`,
    );
  } else if (answers.damageTypes.includes('none')) {
    basics.push('History: none of the listed chemical or heat-damage types.');
  }

  const signs = answers.damageSigns.filter((s) => s !== 'none');
  if (signs.length > 0) {
    basics.push(
      `What you notice: ${oxfordJoin(signs.map((s) => DAMAGE_SIGN[s] ?? s))}.`,
    );
  }

  basics.push(
    `Overall damage signal from your answers: ${damageLevelWord(state.damageLevel)} (level ${state.damageLevel} of 4).`,
  );

  if (state.fragile) {
    basics.push('Hair acts fragile (breakage-prone or brittle).');
  }

  const heatScalp = [formatHeatDetail(answers), formatScalpWash(state)];

  const waterRoutine = [
    formatWater(state),
    formatWeightBudget(state),
    formatTangles(state),
  ];

  const betweenLine = formatBetweenBoosts(state);
  const between = betweenLine ? [betweenLine] : [];

  const sections: HairProfileSection[] = [
    { id: 'basics', title: 'Hair & damage history', lines: basics },
    { id: 'heatScalp', title: 'Heat & scalp', lines: heatScalp },
    {
      id: 'waterRoutine',
      title: 'Water, weight & tangles',
      lines: waterRoutine,
    },
  ];

  if (between.length > 0) {
    sections.push({
      id: 'between',
      title: 'Between wash days',
      lines: between,
    });
  }

  return sections;
}

/**
 * Short bullet lines for the results “hair snapshot” card (flat list).
 */
export function buildHairProfileBullets(
  state: QuizState,
  answers: RawAnswers,
): string[] {
  return buildHairProfileSections(state, answers).flatMap((s) => s.lines);
}
