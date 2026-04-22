'use client';

import Link from 'next/link';
import type { QuizState, RoutineResult } from '@/lib/abbey-yung-quiz/types';

export function Callouts({
  state,
  result,
}: {
  state: QuizState;
  result: RoutineResult;
}) {
  const skipBond =
    !state.chemicalDamage &&
    !state.heatDamage &&
    state.heatStyling === 'none' &&
    state.damageLevel === 1;

  const alerts: { key: string; className: string; content: React.ReactNode }[] =
    [];

  if (state.damageLevel >= 3) {
    alerts.push({
      key: 'damage-3',
      className: 'alert-warning',
      content:
        'Your hair shows significant damage. Stick with bond repair consistently for a few months before evaluating whether to cut back.',
    });
  }

  if (state.chemicalDamage === true) {
    alerts.push({
      key: 'chem',
      className: 'alert-info',
      content:
        'Chemical treatments like bleach and dye break strong disulfide bonds inside the hair. Strong bond repair (Eprès, k18) is the most targeted treatment for this.',
    });
  }

  if (state.heatStyling === 'high') {
    alerts.push({
      key: 'heat-high',
      className: 'alert-info',
      content:
        'High heat also breaks inner cortex bonds over time. Strong bond repair helps maintain hair health even with regular heat use.',
    });
  }

  if (!state.chemicalDamage && state.heatStyling !== 'high') {
    alerts.push({
      key: 'weak-bond',
      className: 'alert-info',
      content:
        "With non chemical/heat damage you won't benefit as much from strong bond builders (k18, Epres) that target that type of damage — you can pick whatever bond products you prefer but the less strong ones are usually cheaper.",
    });
  }

  if (state.hardWater === null) {
    alerts.push({
      key: 'hw-unknown',
      className: 'alert-info',
      content: (
        <>
          Not sure if you have hard water?{' '}
          <Link href="/blog/curly-hair-hard-water" className="link link-hover">
            Check our guide →
          </Link>
        </>
      ),
    });
  }

  if (state.tanglyDuringShampoo === true) {
    alerts.push({
      key: 'pre-oil',
      className: 'alert-info',
      content:
        'Apply the pre-shampoo oil mostly to your ends — it protects drier sections while letting you use a stronger shampoo at the roots.',
    });
  }

  if (result.fallbacksUsed.length > 0) {
    alerts.push({
      key: 'fallback',
      className: 'alert-warning',
      content: `We couldn't find a drugstore match for: ${result.fallbacksUsed.join(', ')}. Showing the closest alternative.`,
    });
  }

  if (skipBond && result.bondRepair.length === 0) {
    alerts.push({
      key: 'skip-bond',
      className: 'alert-info',
      content:
        "Your hair sounds healthy — bond repair probably isn't necessary right now. If you start chemical treatments or consistent heat styling, revisit this.",
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((a) => (
        <div
          key={a.key}
          role="alert"
          className={`alert ${a.className} rounded-2xl text-base-content`}
        >
          <span>{a.content}</span>
        </div>
      ))}
    </div>
  );
}
