'use client';

import { Info } from 'lucide-react';
import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';
import { abbeyYungMethodSteps } from '@/lib/abbey-yung-quiz/methodSteps';
import { partitionBondRepairByStep } from '@/lib/abbey-yung-quiz/bondBuckets';
import type { QuizState, RawAnswers, RoutineResult } from '@/lib/abbey-yung-quiz/types';
import { HairProfileSummary } from './HairProfileSummary';
import { ProductCard } from './ProductCard';
import { StepSection } from './StepSection';

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
    bond.step1.length > 0 ? 1 : bond.step5.length > 0 ? 5 : bond.step7.length > 0 ? 7 : null;

  const betweenAny =
    result.betweenWashHeatProtection ||
    result.betweenWashDryness ||
    result.betweenWashOilControl;

  const meta = abbeyYungMethodSteps;

  return (
    <div className="flex flex-col gap-6">

      <HairProfileSummary state={state} answers={answers} />

      <RoutineStepBlock
        stepNumber={1}
        products={bond.step1}
        fallbackNote={result.bondRepairStrongFallbackNote}
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

      {result.clarifyingShampoo ? (
        <StepSection
          title={meta[3].title}
          description={meta[3].description}
        >
          <ProductCard product={result.clarifyingShampoo} />
        </StepSection>
      ) : null}

      {result.everydayShampoo ? (
        <StepSection
          title={meta[4].title}
          description={meta[4].description}
          note={result.everydayShampooNote ?? undefined}
        >
          <ProductCard product={result.everydayShampoo} />
        </StepSection>
      ) : null}

      <RoutineStepBlock
        stepNumber={5}
        products={bond.step5}
        fallbackNote={result.bondRepairStrongFallbackNote}
        showBondIntro={firstBondStepWithProducts === 5}
      />

      {result.conditioner ? (
        <StepSection
          title={meta[6].title}
          description={meta[6].description}
        >
          <ProductCard product={result.conditioner} />
        </StepSection>
      ) : null}

      <RoutineStepBlock
        stepNumber={7}
        products={bond.step7}
        fallbackNote={result.bondRepairStrongFallbackNote}
        showBondIntro={firstBondStepWithProducts === 7}
      />

      {result.leaveIn ? (
        <StepSection
          title={meta[8].title}
          description={meta[8].description}
        >
          <ProductCard product={result.leaveIn} />
        </StepSection>
      ) : null}

      {result.volumeBoost ||
      result.textureBoost ||
      result.holdBoost ? (
        <section className="rounded-2xl bg-base-200 p-4 md:p-6">
          <h3 className="text-lg font-bold text-base-content">{meta[9].title}</h3>
          <p className="mt-2 text-sm text-base-content">{meta[9].description}</p>
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
        <StepSection
          title={meta[10].title}
          description={meta[10].description}
        >
          <ProductCard product={result.smoothingBoost} />
        </StepSection>
      ) : null}

      {betweenAny ? (
        <section className="rounded-2xl bg-base-200 p-4 md:p-6">
          <h3 className="text-lg font-bold text-base-content">{meta[11].title}</h3>
          <p className="mt-2 text-sm text-base-content">{meta[11].description}</p>
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
  fallbackNote,
  showBondIntro,
}: {
  stepNumber: 1 | 5 | 7;
  products: AbbeyYungProduct[];
  fallbackNote: string | null;
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
      {showBondIntro && fallbackNote ? (
        <div
          role="note"
          className="mt-4 flex gap-3 rounded-2xl border-2 border-info bg-base-100 p-3 sm:gap-4 sm:p-4"
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info text-info-content sm:h-10 sm:w-10"
            aria-hidden
          >
            <Info className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} />
          </div>
          <p className="min-w-0 flex-1 text-sm leading-snug text-base-content sm:leading-relaxed">
            {fallbackNote}
          </p>
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">
        {products.map((p) => (
          <ProductCard key={p.product} product={p} />
        ))}
      </div>
    </section>
  );
}
