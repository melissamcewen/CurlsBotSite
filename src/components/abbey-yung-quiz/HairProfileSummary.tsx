'use client';

import { buildHairProfileBullets } from '@/lib/abbey-yung-quiz';
import type { QuizState, RawAnswers } from '@/lib/abbey-yung-quiz/types';

export function HairProfileSummary({
  state,
  answers,
}: {
  state: QuizState;
  answers: RawAnswers;
}) {
  const bullets = buildHairProfileBullets(state, answers);

  return (
    <div className="card rounded-2xl bg-base-200">
      <div className="card-body gap-3">
        <h3 className="card-title text-lg">Your hair snapshot</h3>
        <p className="text-sm text-base-content">
          How your answers translate before we match products to Abbey&apos;s
          step order.
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm text-base-content">
          {bullets.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
