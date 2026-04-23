import {
  buildHairProfileBullets,
  computeQuizState,
  createEmptyRawAnswers,
  parseQuizSearchParams,
  selectProducts,
  serializeQuizSearchParams,
} from '@/lib/abbey-yung-quiz';
import { partitionBondRepairByStep } from '@/lib/abbey-yung-quiz/bondBuckets';

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

  it('max damage + strong bond need spreads bond repair across steps 1, 5, and 7', () => {
    const raw = createEmptyRawAnswers();
    raw.damageTypes = ['colored'];
    raw.damageSigns = ['feels-fried'];
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
    expect(state.damageLevel).toBe(4);

    const result = selectProducts(state);
    const bond = partitionBondRepairByStep(result.bondRepair);

    expect(result.bondRepair).toHaveLength(3);
    expect(bond.step1.length).toBe(1);
    expect(bond.step5.length).toBe(1);
    expect(bond.step7.length).toBe(1);
  });
});
