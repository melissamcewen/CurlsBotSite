import type { QuizState, RawAnswers } from './types';

function mapTanglyGeneral(
  v: string,
): 'rare' | 'sometimes' | 'constant' | null {
  if (v === 'rare' || v === 'sometimes' || v === 'constant') return v;
  return null;
}

export function computeQuizState(answers: RawAnswers): QuizState {
  const chemicalDamage = answers.damageTypes.some((t) =>
    ['colored', 'highlighted', 'bleached', 'permed', 'relaxed'].includes(t),
  );
  const heatDamage = answers.damageTypes.includes('heat-damaged');

  let damageLevel: 1 | 2 | 3 | 4 = 1;
  let fragile = false;

  if (answers.damageSigns.includes('breakage')) fragile = true;
  if (answers.damageSigns.includes('brittleness')) fragile = true;

  if (answers.damageSigns.includes('feels-fried')) {
    damageLevel = 4;
  } else {
    let score = 0;
    if (answers.damageSigns.includes('breakage')) score += 1;
    if (answers.damageSigns.includes('split-ends')) score += 1;
    if (answers.damageSigns.includes('brittleness')) score += 1;
    if (answers.damageSigns.includes('feels-dry')) score += 1;

    if (answers.hairLength === 'long' || answers.hairLength === 'very-long') {
      score += 1;
    }

    if (score <= 0) damageLevel = 1;
    else if (score === 1) damageLevel = 2;
    else if (score <= 3) damageLevel = 3;
    else damageLevel = 4;
  }

  let heatStyling: QuizState['heatStyling'] = 'none';
  const heatNoNone = answers.heatStyling.filter((h) => h !== 'none');
  if (heatNoNone.length === 0) {
    heatStyling = 'none';
  } else if (
    heatNoNone.includes('blowdry-high') ||
    heatNoNone.includes('heat-tools')
  ) {
    heatStyling = 'high';
  } else {
    heatStyling = 'low';
  }

  const tangly = mapTanglyGeneral(answers.tanglyGeneral) ?? 'sometimes';

  const scalpMap: Record<string, QuizState['scalpType']> = {
    dry: 'dry',
    normal: 'normal',
    oily: 'oily',
    'extra-oily': 'extra oily',
    unknown: 'unknown',
  };
  const scalpType = scalpMap[answers.scalpType] ?? 'unknown';

  let hardWater: boolean | null = null;
  if (answers.hardWater === 'yes') hardWater = true;
  else if (answers.hardWater === 'no') hardWater = false;

  const cleansingNeeds =
    answers.cleansingNeeds === 'strong' ||
    answers.cleansingNeeds === 'normal' ||
    answers.cleansingNeeds === 'gentle'
      ? answers.cleansingNeeds
      : 'normal';

  const washFrequency =
    answers.washFrequency === 'daily' ||
    answers.washFrequency === 'multi-weekly' ||
    answers.washFrequency === 'weekly-or-less'
      ? answers.washFrequency
      : 'multi-weekly';

  let weight: QuizState['weight'] = 'medium';
  switch (answers.productWeight) {
    case 'heavy':
      weight = 'heavy';
      break;
    case 'medium':
      weight = 'medium';
      break;
    case 'light':
      weight = 'light';
      break;
    case 'very-light':
      weight = 'very light';
      break;
    case 'unknown':
      weight = 'medium';
      break;
    default:
      weight = 'medium';
  }

  let drugstoreOnly = false;
  let noPreference = false;
  const ds = answers.drugstore === '' ? 'either' : answers.drugstore;
  if (ds === 'yes') {
    drugstoreOnly = true;
    noPreference = false;
  } else if (ds === 'no') {
    drugstoreOnly = false;
    noPreference = false;
  } else {
    drugstoreOnly = false;
    noPreference = true;
  }

  const boostMap: Record<string, 'smoothing' | 'volume' | 'texture' | 'hold'> =
    {
      smoothing: 'smoothing',
      volume: 'volume',
      texture: 'texture',
      hold: 'hold',
    };
  const boosts = answers.boosts
    .map((b) => boostMap[b])
    .filter(Boolean) as QuizState['boosts'];

  return {
    chemicalDamage,
    heatDamage,
    damageLevel,
    heatStyling,
    fragile,
    tanglyDuringShampoo: answers.tanglyDuringShampoo ?? false,
    tanglyGeneral: tangly,
    scalpType,
    hardWater,
    cleansingNeeds,
    washFrequency,
    weight,
    drugstoreOnly,
    noPreference,
    betweenWashHeat: answers.betweenWash.includes('heat'),
    betweenWashDryness: answers.betweenWash.includes('dryness'),
    betweenWashOiliness: answers.betweenWash.includes('oiliness'),
    boosts,
  };
}
