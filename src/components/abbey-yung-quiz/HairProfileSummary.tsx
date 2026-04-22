'use client';

import {
  buildHairProfileSections,
  type HairProfileSection,
  type HairProfileSectionId,
} from '@/lib/abbey-yung-quiz';
import type { QuizState, RawAnswers } from '@/lib/abbey-yung-quiz/types';
import {
  Droplets,
  Flame,
  RefreshCw,
  Scan,
  Sparkles,
} from 'lucide-react';

const SECTION_META: Record<
  HairProfileSectionId,
  { Icon: typeof Sparkles; accentClass: string }
> = {
  basics: {
    Icon: Sparkles,
    accentClass: 'bg-primary text-primary-content',
  },
  heatScalp: {
    Icon: Flame,
    accentClass: 'bg-secondary text-secondary-content',
  },
  waterRoutine: {
    Icon: Droplets,
    accentClass: 'bg-accent text-accent-content',
  },
  between: {
    Icon: RefreshCw,
    accentClass: 'bg-neutral text-neutral-content',
  },
};

function DamageSignalBar({ level }: { level: number }) {
  return (
    <div
      className="flex gap-1 md:gap-1.5"
      role="img"
      aria-label={`Damage signal level ${level} of 4 from quiz answers`}
    >
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className={`h-1.5 min-h-1.5 flex-1 rounded-full md:h-2 md:min-h-2 ${
            n <= level ? 'bg-warning' : 'bg-base-300'
          }`}
        />
      ))}
    </div>
  );
}

export function HairProfileSummary({
  state,
  answers,
}: {
  state: QuizState;
  answers: RawAnswers;
}) {
  const sections = buildHairProfileSections(state, answers);

  return (
    <div className="card card-border rounded-2xl bg-base-200">
      <div className="card-body gap-3 p-4 sm:gap-5 sm:p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="flex gap-3 sm:gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content sm:h-14 sm:w-14 sm:rounded-2xl"
              aria-hidden
            >
              <Scan className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h3 className="card-title text-lg font-bold leading-tight sm:text-xl">
                Your hair snapshot
              </h3>
              <p className="mt-1 text-sm leading-snug text-base-content sm:mt-2 sm:leading-relaxed">
                How your answers translate before we match products to
                Abbey&apos;s step order.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1.5 rounded-xl bg-base-100 p-3 sm:gap-2 sm:rounded-2xl sm:p-4 lg:max-w-sm lg:shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-base-content sm:text-xs">
              Damage signal
            </p>
            <DamageSignalBar level={state.damageLevel} />
            <p className="text-[11px] leading-snug text-base-content sm:text-xs">
              Matches the level called out in your summary below (quiz-based,
              not a clinical score).
            </p>
          </div>
        </div>

        <div className="my-1 h-px w-full bg-base-300 sm:my-2" aria-hidden />

        <div className="flex flex-col gap-3 sm:gap-4">
          {sections.map((section) => (
            <ProfileSectionBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileSectionBlock({ section }: { section: HairProfileSection }) {
  const { Icon, accentClass } = SECTION_META[section.id];

  return (
    <section className="rounded-xl border border-base-300 bg-base-100 p-3 sm:rounded-2xl sm:p-4 md:p-5">
      <div className="mb-2 flex items-center gap-2 sm:mb-4 sm:gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl ${accentClass}`}
          aria-hidden
        >
          <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} />
        </div>
        <h4 className="text-[15px] font-bold leading-snug text-base-content sm:text-base">
          {section.title}
        </h4>
      </div>
      <ul className="flex flex-col gap-2 border-t border-base-300 pt-3 sm:gap-3 sm:pt-4">
        {section.lines.map((line, i) => (
          <li
            key={i}
            className="relative pl-3 text-sm leading-snug text-base-content before:absolute before:left-0 before:top-[0.45rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary sm:leading-relaxed sm:before:top-2"
          >
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
