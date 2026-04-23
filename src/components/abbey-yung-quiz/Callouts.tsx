'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  Droplet,
  Droplets,
  Flame,
  FlaskConical,
  Info,
  PackageSearch,
  Sparkles,
} from 'lucide-react';
import type { QuizState, RoutineResult } from '@/lib/abbey-yung-quiz/types';

type CalloutVariant = 'warning' | 'info';

type CalloutEntry = {
  key: string;
  variant: CalloutVariant;
  Icon: LucideIcon;
  content: ReactNode;
};

function CalloutCard({
  variant,
  Icon,
  children,
}: {
  variant: CalloutVariant;
  Icon: LucideIcon;
  children: ReactNode;
}) {
  const border =
    variant === 'warning' ? 'border-warning' : 'border-info';
  const iconSurface =
    variant === 'warning'
      ? 'bg-warning text-warning-content'
      : 'bg-info text-info-content';

  return (
    <div
      role="alert"
      className={`flex gap-3 rounded-2xl border-2 ${border} bg-base-100 p-3 sm:gap-4 sm:p-4`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${iconSurface}`}
        aria-hidden
      >
        <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1 text-sm leading-snug text-base-content sm:text-[15px] sm:leading-relaxed">
        {children}
      </div>
    </div>
  );
}

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

  const alerts: CalloutEntry[] = [];

  if (state.damageLevel >= 3) {
    alerts.push({
      key: 'damage-3',
      variant: 'warning',
      Icon: AlertTriangle,
      content:
        'Your hair shows significant damage. Stick with bond repair consistently for a few months before evaluating whether to cut back.',
    });
  }

  if (state.chemicalDamage === true) {
    alerts.push({
      key: 'chem',
      variant: 'info',
      Icon: FlaskConical,
      content:
        'Chemical treatments like bleach and dye break strong disulfide bonds inside the hair. Strong bond repair (Eprès, k18) is the most targeted treatment for this.',
    });
  }

  if (state.heatStyling === 'high') {
    alerts.push({
      key: 'heat-high',
      variant: 'info',
      Icon: Flame,
      content:
        'High heat also breaks inner cortex bonds over time. Strong bond repair helps maintain hair health even with regular heat use.',
    });
  }

  if (!state.chemicalDamage && state.heatStyling !== 'high') {
    alerts.push({
      key: 'weak-bond',
      variant: 'info',
      Icon: Info,
      content: (
        <>
        With non chemical/heat damage you won&apos;t benefit as much from strong bond builders (k18, Epres) that target that type of damage; you can pick whatever bond products you prefer but the less strong ones are usually cheaper. Read more in our <Link href="/blog/skeptics-guide-bond-repair" className="link link-primary font-medium">bond repair guide</Link>.
        </>
      ),
    });
  }

  if (state.hardWater === null) {
    alerts.push({
      key: 'hw-unknown',
      variant: 'info',
      Icon: Droplets,
      content: (
        <>
          Not sure if you have hard water?{' '}
          <Link href="/blog/curly-hair-hard-water" className="link link-hover font-medium">
            Check our guide →
          </Link>
        </>
      ),
    });
  }

  if (state.tanglyDuringShampoo === true) {
    alerts.push({
      key: 'pre-oil',
      variant: 'info',
      Icon: Droplet,
      content:
        'Apply the pre-shampoo oil mostly to your ends, as it protects drier sections while letting you use a stronger shampoo at the roots.',
    });
  }

  if (result.fallbacksUsed.length > 0) {
    alerts.push({
      key: 'fallback',
      variant: 'warning',
      Icon: PackageSearch,
      content: `We couldn't find a drugstore match for: ${result.fallbacksUsed.join(', ')}. Showing the closest alternative.`,
    });
  }

  if (skipBond && result.bondRepair.length === 0) {
    alerts.push({
      key: 'skip-bond',
      variant: 'info',
      Icon: Sparkles,
      content:
        "Your hair sounds healthy so bond repair probably isn't necessary right now. If you start chemical treatments or consistent heat styling, revisit this.",
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {alerts.map((a) => (
        <CalloutCard key={a.key} variant={a.variant} Icon={a.Icon}>
          {a.content}
        </CalloutCard>
      ))}
    </div>
  );
}
