import type { RawAnswers } from './types';
import { createEmptyRawAnswers } from './types';

/**
 * Query params for shareable quiz URLs (comma-separated lists where noted).
 * `r=1` — open routine results. Omit to stay in the wizard.
 *
 * | Param | Field |
 * |-------|--------|
 * | dt | damage types |
 * | ds | damage signs |
 * | hl | hair length |
 * | hs | heat styling |
 * | tds | tangly during shampoo: y / n |
 * | tg | tangly general |
 * | st | scalp type |
 * | hw | hard water: yes / no / unknown |
 * | cn | cleansing needs |
 * | wf | wash frequency |
 * | pw | product weight |
 * | dr | drugstore: y / n / e |
 * | bw | between-wash |
 * | bo | boosts |
 */
/** `r=1` — show routine results */
export const PARAM_RESULTS = 'r';

function splitList(raw: string | null): string[] {
  if (!raw || !raw.trim()) return [];
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

/**
 * Parse quiz answers from the page query string.
 * Returns null if there is nothing to apply (no recognized params).
 */
export function parseQuizSearchParams(
  searchParams: URLSearchParams,
): { answers: RawAnswers; showResults: boolean } | null {
  const hasAny =
    searchParams.has('dt') ||
    searchParams.has('ds') ||
    searchParams.has('hl') ||
    searchParams.has('hs') ||
    searchParams.has('tds') ||
    searchParams.has('tg') ||
    searchParams.has('st') ||
    searchParams.has('hw') ||
    searchParams.has('cn') ||
    searchParams.has('wf') ||
    searchParams.has('pw') ||
    searchParams.has('dr') ||
    searchParams.has('bw') ||
    searchParams.has('bo') ||
    searchParams.get(PARAM_RESULTS) === '1';

  if (!hasAny) return null;

  const base = createEmptyRawAnswers();
  const showResults = searchParams.get(PARAM_RESULTS) === '1';

  base.damageTypes = splitList(searchParams.get('dt'));
  base.damageSigns = splitList(searchParams.get('ds'));
  base.hairLength = searchParams.get('hl')?.trim() ?? '';
  base.heatStyling = splitList(searchParams.get('hs'));

  const tds = searchParams.get('tds');
  if (tds === 'y') base.tanglyDuringShampoo = true;
  else if (tds === 'n') base.tanglyDuringShampoo = false;

  base.tanglyGeneral = searchParams.get('tg')?.trim() ?? '';
  base.scalpType = searchParams.get('st')?.trim() ?? '';

  const hw = searchParams.get('hw')?.trim();
  if (hw === 'yes' || hw === 'no' || hw === 'unknown') {
    base.hardWater = hw;
  }

  base.cleansingNeeds = searchParams.get('cn')?.trim() ?? '';
  base.washFrequency = searchParams.get('wf')?.trim() ?? '';
  base.productWeight = searchParams.get('pw')?.trim() ?? '';

  const dr = searchParams.get('dr')?.trim();
  if (dr === 'y' || dr === 'n' || dr === 'e') {
    base.drugstore = dr === 'y' ? 'yes' : dr === 'n' ? 'no' : 'either';
  }

  base.betweenWash = splitList(searchParams.get('bw'));
  base.boosts = splitList(searchParams.get('bo'));

  return { answers: base, showResults };
}

function drugstoreParam(d: RawAnswers['drugstore']): string | null {
  if (d === 'yes') return 'y';
  if (d === 'no') return 'n';
  if (d === 'either') return 'e';
  return null;
}

/**
 * Build query string for the current quiz state (omit empty defaults to keep links short).
 */
export function serializeQuizSearchParams(
  answers: RawAnswers,
  showResults: boolean,
): URLSearchParams {
  const p = new URLSearchParams();
  const empty = createEmptyRawAnswers();

  if (showResults) p.set(PARAM_RESULTS, '1');

  if (answers.damageTypes.length)
    p.set('dt', answers.damageTypes.join(','));
  if (answers.damageSigns.length)
    p.set('ds', answers.damageSigns.join(','));
  if (answers.hairLength && answers.hairLength !== empty.hairLength)
    p.set('hl', answers.hairLength);
  if (answers.heatStyling.length)
    p.set('hs', answers.heatStyling.join(','));

  if (answers.tanglyDuringShampoo === true) p.set('tds', 'y');
  else if (answers.tanglyDuringShampoo === false) p.set('tds', 'n');

  if (answers.tanglyGeneral && answers.tanglyGeneral !== empty.tanglyGeneral)
    p.set('tg', answers.tanglyGeneral);
  if (answers.scalpType && answers.scalpType !== empty.scalpType)
    p.set('st', answers.scalpType);

  if (answers.hardWater !== empty.hardWater) p.set('hw', answers.hardWater);

  if (answers.cleansingNeeds && answers.cleansingNeeds !== empty.cleansingNeeds)
    p.set('cn', answers.cleansingNeeds);
  if (answers.washFrequency && answers.washFrequency !== empty.washFrequency)
    p.set('wf', answers.washFrequency);
  if (answers.productWeight && answers.productWeight !== empty.productWeight)
    p.set('pw', answers.productWeight);

  const dr = drugstoreParam(answers.drugstore);
  if (dr) p.set('dr', dr);

  if (answers.betweenWash.length)
    p.set('bw', answers.betweenWash.join(','));
  if (answers.boosts.length) p.set('bo', answers.boosts.join(','));

  return p;
}
