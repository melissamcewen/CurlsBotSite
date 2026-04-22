import {
  buildHairProfileBullets,
  computeQuizState,
  createEmptyRawAnswers,
  parseQuizSearchParams,
  selectProducts,
  serializeQuizSearchParams,
} from '@/lib/abbey-yung-quiz';

describe('abbey-yung-quiz', () => {
  it('serialize and parse round-trip answers', () => {
    const raw = createEmptyRawAnswers();
    raw.damageTypes = ['none'];
    raw.damageSigns = ['none'];
    raw.hairLength = 'short';
    raw.heatStyling = ['none'];
    raw.tanglyDuringShampoo = false;
    raw.tanglyGeneral = 'rare';
    raw.scalpType = 'normal';
    raw.hardWater = 'unknown';
    raw.cleansingNeeds = 'normal';
    raw.washFrequency = 'multi-weekly';
    raw.productWeight = 'medium';
    raw.drugstore = 'either';
    raw.betweenWash = ['none'];
    raw.boosts = ['none'];

    const qs = serializeQuizSearchParams(raw, true).toString();
    const parsed = parseQuizSearchParams(new URLSearchParams(qs));
    expect(parsed).not.toBeNull();
    expect(parsed!.showResults).toBe(true);
    expect(parsed!.answers.hairLength).toBe('short');
    expect(parsed!.answers.drugstore).toBe('either');
  });

  it('computeQuizState and selectProducts run without throwing', () => {
    const raw = createEmptyRawAnswers();
    raw.damageTypes = ['none'];
    raw.damageSigns = ['none'];
    raw.hairLength = 'short';
    raw.heatStyling = ['none'];
    raw.tanglyDuringShampoo = false;
    raw.tanglyGeneral = 'rare';
    raw.scalpType = 'normal';
    raw.hardWater = 'unknown';
    raw.cleansingNeeds = 'normal';
    raw.washFrequency = 'multi-weekly';
    raw.productWeight = 'medium';
    raw.drugstore = 'either';
    raw.betweenWash = ['none'];
    raw.boosts = ['none'];

    const state = computeQuizState(raw);
    const result = selectProducts(state);

    expect(state.damageLevel).toBeGreaterThanOrEqual(1);
    expect(result).toHaveProperty('clarifyingShampoo');
    expect(buildHairProfileBullets(state, raw).length).toBeGreaterThan(0);
  });
});
