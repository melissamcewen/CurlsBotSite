'use client';

import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';
import { abbeyYungMethodSteps } from '@/lib/abbey-yung-quiz/methodSteps';
import { partitionBondRepairByStep } from '@/lib/abbey-yung-quiz/bondBuckets';
import type {
  QuizState,
  RawAnswers,
  RoutineResult,
  ShampooRole,
} from '@/lib/abbey-yung-quiz/types';
import { AbbeyYungEmailSignup } from '@/components/EmailSignupVariants';
import { HairProfileSummary } from './HairProfileSummary';
import { ProductCard } from './ProductCard';
import { StepSection } from './StepSection';

const BENEFIT_SHAMPOO_ROLES: ReadonlySet<ShampooRole> = new Set([
  'medicated',
  'scalp-health',
  'chelating',
  'strengthening',
]);

export function RoutineResults({
  state,
  answers,
  result,
}: {
  state: QuizState;
  answers: RawAnswers;
  result: RoutineResult;
}) {
  const bond = partitionBondRepairByStep(result.bondRepair);
  const firstBondStepWithProducts =
    bond.step1.length > 0
      ? 1
      : bond.step5.length > 0
        ? 5
        : bond.step7.length > 0
          ? 7
          : null;

  const betweenAny =
    result.betweenWashHeatProtection ||
    result.betweenWashDryness ||
    result.betweenWashOilControl;

  const meta = abbeyYungMethodSteps;

  return (
    <div className="flex flex-col gap-6">
      <HairProfileSummary state={state} answers={answers} />

      <AbbeyYungEmailSignup />

      <RoutineStepBlock
        stepNumber={1}
        products={bond.step1}
        showBondIntro={firstBondStepWithProducts === 1}
      />

      {result.preShampooOil ? (
        <StepSection
          title={meta[2].title}
          description={meta[2].description}
          note={result.preShampooOilNote ?? undefined}
        >
          <ProductCard product={result.preShampooOil} />
        </StepSection>
      ) : null}

      {result.shampoos.map((pick) => {
        const isDeep = pick.roles.includes('deep-cleaning');
        const isBenefit = pick.roles.some((role) =>
          BENEFIT_SHAMPOO_ROLES.has(role),
        );
        const title =
          isDeep && isBenefit
            ? 'Benefit + Deep Cleaning shampoo'
            : isDeep
              ? meta[3].title
              : meta[4].title;
        const description =
          isDeep && isBenefit
            ? 'This pick covers a Benefit shampoo need and also counts as your deep cleaning shampoo.'
            : isDeep
              ? meta[3].description
              : meta[4].description;
        const weeklyDeepNote = isDeep
          ? 'Abbey Yung recommends using a deep cleaning shampoo at least once a week to remove buildup.'
          : null;
        const note = [pick.note, weeklyDeepNote].filter(Boolean).join(' ');
        return (
          <StepSection
            key={pick.product.product}
            title={title}
            description={description}
            note={note || undefined}
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {pick.roles.map((role) => (
                <span
                  key={role}
                  className="badge badge-outline badge-sm shrink-0 whitespace-nowrap"
                >
                  {role === 'deep-cleaning'
                    ? 'Deep Cleaning'
                    : role === 'chelating'
                      ? 'Chelating'
                      : role === 'strengthening'
                        ? 'Strengthening'
                        : role === 'scalp-health'
                          ? 'Scalp Health'
                          : 'Medicated'}
                </span>
              ))}
            </div>
            <ProductCard product={pick.product} />
          </StepSection>
        );
      })}

      <RoutineStepBlock
        stepNumber={5}
        products={bond.step5}
        showBondIntro={firstBondStepWithProducts === 5}
      />

      {result.conditioner ? (
        <StepSection title={meta[6].title} description={meta[6].description}>
          <ProductCard product={result.conditioner} />
        </StepSection>
      ) : null}

      <RoutineStepBlock
        stepNumber={7}
        products={bond.step7}
        showBondIntro={firstBondStepWithProducts === 7}
      />

      {result.leaveIn ? (
        <StepSection title={meta[8].title} description={meta[8].description}>
          <ProductCard product={result.leaveIn} />
        </StepSection>
      ) : null}

      {result.volumeBoost || result.textureBoost || result.holdBoost ? (
        <section className="rounded-2xl bg-base-200 p-4 md:p-6">
          <h3 className="text-lg font-bold text-base-content">
            {meta[9].title}
          </h3>
          <p className="mt-2 text-sm text-base-content">
            {meta[9].description}
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {result.volumeBoost ? (
              <div>
                <p className="mb-2 text-sm font-medium text-base-content">
                  Volume
                </p>
                <ProductCard product={result.volumeBoost} />
              </div>
            ) : null}
            {result.textureBoost ? (
              <div>
                <p className="mb-2 text-sm font-medium text-base-content">
                  Texture
                </p>
                <ProductCard product={result.textureBoost} />
              </div>
            ) : null}
            {result.holdBoost ? (
              <div>
                <p className="mb-2 text-sm font-medium text-base-content">
                  Hold
                </p>
                <ProductCard product={result.holdBoost} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {result.smoothingBoost ? (
        <StepSection title={meta[10].title} description={meta[10].description}>
          <ProductCard product={result.smoothingBoost} />
        </StepSection>
      ) : null}

      {result.scalpSerum ? (
        <StepSection title={meta[12].title} description={meta[12].description}>
          <ProductCard product={result.scalpSerum} />
        </StepSection>
      ) : null}

      {betweenAny ? (
        <section className="rounded-2xl bg-base-200 p-4 md:p-6">
          <h3 className="text-lg font-bold text-base-content">
            {meta[11].title}
          </h3>
          <p className="mt-2 text-sm text-base-content">
            {meta[11].description}
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {result.betweenWashHeatProtection ? (
              <div>
                <p className="mb-2 text-sm font-medium text-base-content">
                  Heat protection between washes
                </p>
                <ProductCard product={result.betweenWashHeatProtection} />
              </div>
            ) : null}
            {result.betweenWashDryness ? (
              <div>
                <p className="mb-2 text-sm font-medium text-base-content">
                  Dryness relief
                </p>
                <ProductCard product={result.betweenWashDryness} />
              </div>
            ) : null}
            {result.betweenWashOilControl ? (
              <div>
                <p className="mb-2 text-sm font-medium text-base-content">
                  Oil control
                </p>
                <ProductCard product={result.betweenWashOilControl} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function RoutineStepBlock({
  stepNumber,
  products,
  showBondIntro,
}: {
  stepNumber: 1 | 5 | 7;
  products: AbbeyYungProduct[];
  showBondIntro: boolean;
}) {
  if (products.length === 0) return null;

  const meta = abbeyYungMethodSteps[stepNumber];

  return (
    <section className="rounded-2xl bg-base-200 p-4 md:p-6">
      <h3 className="text-lg font-bold text-base-content">{meta.title}</h3>
      <p className="mt-2 text-sm text-base-content">{meta.description}</p>
      {showBondIntro ? (
        <p className="mt-3 text-sm text-base-content">
          Bond repair products work during washing to reinforce the internal
          structure of damaged hair. Use them in the order listed below on that
          wash day.
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">
        {products.map((p) => (
          <ProductCard key={p.product} product={p} />
        ))}
      </div>
    </section>
  );
}
