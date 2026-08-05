import {
  buildHairProfileBullets,
  computeQuizState,
  createEmptyRawAnswers,
  parseQuizSearchParams,
  selectProducts,
  serializeQuizSearchParams,
} from '@/lib/abbey-yung-quiz';
import { partitionBondRepairByStep } from '@/lib/abbey-yung-quiz/bondBuckets';
import type { RawAnswers } from '@/lib/abbey-yung-quiz/types';

function baseAnswers(overrides: Partial<RawAnswers> = {}): RawAnswers {
  const raw = createEmptyRawAnswers();
  raw.damageTypes = ['none'];
  raw.damageSigns = ['none'];
  raw.hairLength = 'short';
  raw.heatStyling = ['none'];
  raw.tanglyDuringShampoo = false;
  raw.tanglyGeneral = 'rare';
  raw.scalpType = 'normal';
  raw.hasDandruff = false;
  raw.scalpNeeds = ['none'];
  raw.hardWater = 'unknown';
  raw.cleansingNeeds = 'normal';
  raw.washFrequency = 'multi-weekly';
  raw.productWeight = 'medium';
  raw.drugstore = 'either';
  raw.betweenWash = ['none'];
  raw.boosts = ['none'];
  return { ...raw, ...overrides };
}

describe('abbey-yung-quiz', () => {
  it('serialize and parse round-trip answers', () => {
    const raw = baseAnswers({
      hasDandruff: true,
      scalpNeeds: ['buildup', 'density'],
    });

    const qs = serializeQuizSearchParams(raw, true).toString();
    const parsed = parseQuizSearchParams(new URLSearchParams(qs));
    expect(parsed).not.toBeNull();
    expect(parsed!.showResults).toBe(true);
    expect(parsed!.answers.hairLength).toBe('short');
    expect(parsed!.answers.drugstore).toBe('either');
    expect(parsed!.answers.hasDandruff).toBe(true);
    expect(parsed!.answers.scalpNeeds).toEqual(['buildup', 'density']);
  });

  it('computeQuizState and selectProducts run without throwing', () => {
    const raw = baseAnswers();
    const state = computeQuizState(raw);
    const result = selectProducts(state);

    expect(state.damageLevel).toBeGreaterThanOrEqual(1);
    expect(result).toHaveProperty('shampoos');
    expect(result.shampoos.length).toBeGreaterThan(0);
    expect(result.shampoos.length).toBeLessThanOrEqual(2);
    expect(buildHairProfileBullets(state, raw).length).toBeGreaterThan(0);
  });

  it('max damage + strong bond need spreads bond repair across steps 1, 5, and 7', () => {
    const raw = baseAnswers({
      damageTypes: ['colored'],
      damageSigns: ['feels-fried'],
    });

    const state = computeQuizState(raw);
    expect(state.damageLevel).toBe(4);

    const result = selectProducts(state);
    const bond = partitionBondRepairByStep(result.bondRepair);

    expect(result.bondRepair).toHaveLength(3);
    expect(bond.step1.length).toBe(1);
    expect(bond.step5.length).toBe(1);
    expect(bond.step7.length).toBe(1);
  });

  it('dandruff assigns medicated shampoo that can cover deep cleaning', () => {
    const raw = baseAnswers({
      hasDandruff: true,
      drugstore: 'yes',
    });
    const state = computeQuizState(raw);
    const result = selectProducts(state);

    expect(result.shampoos.length).toBeGreaterThan(0);
    expect(result.shampoos.length).toBeLessThanOrEqual(2);
    const medicated = result.shampoos.find((s) =>
      s.roles.includes('medicated'),
    );
    expect(medicated).toBeDefined();
    expect(
      result.shampoos.some(
        (s) =>
          s.roles.includes('deep-cleaning') ||
          s.product.tags?.includes('deep-cleaning-shampoo'),
      ),
    ).toBe(true);
  });

  it('hard water prefers chelating coverage without exceeding 2 shampoos', () => {
    const raw = baseAnswers({
      hardWater: 'yes',
      drugstore: 'yes',
    });
    const state = computeQuizState(raw);
    const result = selectProducts(state);

    expect(result.shampoos.length).toBeLessThanOrEqual(2);
    expect(
      result.shampoos.some(
        (s) =>
          s.roles.includes('chelating') ||
          s.product.tags?.includes('benefit-chelating'),
      ),
    ).toBe(true);
  });

  it('scalp needs match scalp-health shampoos', () => {
    const raw = baseAnswers({
      scalpNeeds: ['exfoliation', 'buildup'],
      scalpType: 'oily',
      drugstore: 'yes',
    });
    const state = computeQuizState(raw);
    const result = selectProducts(state);

    expect(result.shampoos.length).toBeLessThanOrEqual(2);
    expect(
      result.shampoos.some((s) => s.roles.includes('scalp-health')),
    ).toBe(true);
  });

  it('strengthening can be assigned when washing often without scalp shampoo', () => {
    const raw = baseAnswers({
      scalpNeeds: ['none'],
      washFrequency: 'multi-weekly',
      cleansingNeeds: 'gentle',
      tanglyDuringShampoo: true,
      productWeight: 'medium',
      drugstore: 'yes',
    });
    const state = computeQuizState(raw);
    const result = selectProducts(state);

    expect(result.shampoos.length).toBeLessThanOrEqual(2);
    expect(
      result.shampoos.some((s) => s.roles.includes('strengthening')),
    ).toBe(true);
    expect(
      result.shampoos.some((s) => s.roles.includes('deep-cleaning')),
    ).toBe(true);
  });
});
