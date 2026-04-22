'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  computeQuizState,
  createEmptyRawAnswers,
  parseQuizSearchParams,
  selectProducts,
  serializeQuizSearchParams,
} from '@/lib/abbey-yung-quiz';
import type { RawAnswers } from '@/lib/abbey-yung-quiz/types';
import { RoutineResults } from './RoutineResults';

const TOTAL_STEPS = 14;

function toggleNoneMulti(
  current: string[],
  value: string,
  noneValue: string,
): string[] {
  if (value === noneValue) {
    return [noneValue];
  }
  const withoutNone = current.filter((x) => x !== noneValue);
  if (withoutNone.includes(value)) {
    return withoutNone.filter((x) => x !== value);
  }
  return [...withoutNone, value];
}

function canProceed(step: number, a: RawAnswers): boolean {
  switch (step) {
    case 0:
      return a.damageTypes.length > 0;
    case 1:
      return a.damageSigns.length > 0;
    case 2:
      return a.hairLength !== '';
    case 3:
      return a.heatStyling.length > 0;
    case 4:
      return a.tanglyDuringShampoo !== undefined;
    case 5:
      return a.tanglyGeneral !== '';
    case 6:
      return a.scalpType !== '';
    case 7:
      return true;
    case 8:
      return a.cleansingNeeds !== '';
    case 9:
      return a.washFrequency !== '';
    case 10:
      return a.productWeight !== '';
    case 11:
      return a.drugstore === 'yes' || a.drugstore === 'no' || a.drugstore === 'either';
    case 12:
      return a.betweenWash.length > 0;
    case 13:
      return a.boosts.length > 0;
    default:
      return false;
  }
}

export function AbbeyYungQuiz() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<RawAnswers>(createEmptyRawAnswers());
  const [showResults, setShowResults] = useState(false);
  const [urlReady, setUrlReady] = useState(false);

  const hydratedFromUrl = useRef(false);

  const state = useMemo(() => computeQuizState(answers), [answers]);
  const result = useMemo(() => selectProducts(state), [state]);

  useEffect(() => {
    if (hydratedFromUrl.current) return;
    hydratedFromUrl.current = true;
    const parsed = parseQuizSearchParams(searchParams);
    if (parsed) {
      setAnswers(parsed.answers);
      setShowResults(parsed.showResults);
      if (parsed.showResults) {
        setStep(TOTAL_STEPS - 1);
      }
    }
    setUrlReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (!urlReady) return;
    const qs = serializeQuizSearchParams(answers, showResults).toString();
    const href = qs ? `${pathname}?${qs}` : pathname;
    router.replace(href, { scroll: false });
  }, [answers, showResults, urlReady, pathname, router]);

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      setStep(TOTAL_STEPS - 1);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  };

  const finish = () => {
    setShowResults(true);
  };

  const reset = () => {
    setAnswers(createEmptyRawAnswers());
    setStep(0);
    setShowResults(false);
    router.replace(pathname, { scroll: false });
  };

  const nextDisabled = !canProceed(step, answers);

  const singleAdvance = (patch: Partial<RawAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  if (showResults) {
    return (
      <div className="flex flex-col gap-6">
        <blockquote className="border-l-4 border-primary pl-4 text-sm italic text-base-content">
          This quiz is my interpretation of Abbey Yung&apos;s method, built by
          studying her content. I&apos;m not Abbey and this isn&apos;t endorsed by Abbey. I&apos;m just someone who watched a lot of videos and took notes.
          Her content is the authoritative source. If you want to learn more
          about this please read{' '}
          <Link href="/blog/the-abbey-yung-method" className="link link-primary" target="_blank">
            my guide to the Abbey Yung Method
          </Link>
          .
        </blockquote>
        <RoutineResults state={state} answers={answers} result={result} />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-primary rounded-xl"
            onClick={reset}
          >
            Start over
          </button>
          <Link href="/labs" className="btn btn-ghost rounded-xl">
            Back to Labs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <blockquote className="border-l-4 border-primary pl-4 text-sm italic text-base-content">
        This quiz is my interpretation of Abbey Yung&apos;s method, built by
        studying her content. I&apos;m not Abbey and this isn&apos;t official —
        I&apos;m just someone who watched a lot of videos and took notes. Her
        content is the authoritative source. If you want to learn more about
        this please read{' '}
        <Link href="/blog/the-abbey-yung-method" className="link link-primary">
          my guide to the Abbey Yung Method
        </Link>
        .
      </blockquote>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-base-content">
          Question {step + 1} of {TOTAL_STEPS}
        </span>
        <progress
          className="progress progress-primary w-32 sm:w-48"
          value={step + 1}
          max={TOTAL_STEPS}
        />
      </div>

      <div className="card rounded-2xl bg-base-200">
        <div className="card-body">
          {step === 0 && (
            <Q
              title="Has your hair been through any of these?"
              details={
                <>
                  These types of damage break strong internal bonds inside the
                  hair fiber. Some bond repair products specifically target
                  these; others don&apos;t. You can read more in our{' '}
                  <Link
                    href="/blog/skeptics-guide-bond-repair"
                    className="link link-primary"
                    target="_blank"
                  >
                    bond repair guide
                  </Link>
                  .
                </>
              }
            >
              <div className="flex flex-col gap-3">
                {[
                  ['colored', 'Oxidative color (most box dye or salon dye)'],
                  ['highlighted', 'Highlighted'],
                  ['bleached', 'Bleached'],
                  ['permed', 'Permed'],
                  ['relaxed', 'Relaxed'],
                  ['heat-damaged', 'Heat damaged (from tools/blowdryer)'],
                  ['none', 'None of the above'],
                ].map(([v, label]) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-base-100 p-3"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-0.5"
                      checked={answers.damageTypes.includes(v)}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          damageTypes: toggleNoneMulti(
                            prev.damageTypes,
                            v,
                            'none',
                          ),
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Q>
          )}

          {step === 1 && (
            <Q
              title="Do you notice any of these?"
              details={
                <>
                  More signs of damage = more bond repair products may help.
                  (CurlsBot&apos;s interpretation, not Abbey&apos;s own
                  framework.)
                </>
              }
            >
              <div className="flex flex-col gap-3">
                {[
                  ['breakage', 'Breakage'],
                  ['split-ends', 'Split ends'],
                  ['brittleness', 'Brittleness'],
                  ['feels-dry', 'Feels dry'],
                  ['feels-fried', 'Feels fried / very damaged'],
                  ['none', 'None of the above'],
                ].map(([v, label]) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-base-100 p-3"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-0.5"
                      checked={answers.damageSigns.includes(v)}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          damageSigns: toggleNoneMulti(
                            prev.damageSigns,
                            v,
                            'none',
                          ),
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Q>
          )}

          {step === 2 && (
            <Q
              title="How long is your hair?"
              details="Longer hair has older ends that tend to be more damaged, regardless of what you do to it."
            >
              <div className="flex flex-col gap-3">
                {[
                  ['very-short', 'Very short'],
                  ['short', 'Short (chin length or less)'],
                  ['long', 'Long (past chin to shoulder)'],
                  ['very-long', 'Very long (past shoulders)'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ hairLength: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 3 && (
            <Q title="Do you use heat on your hair?">
              <div className="flex flex-col gap-3">
                {[
                  ['none', 'No heat styling'],
                  ['diffuse', 'Diffusing'],
                  ['blowdry-low', 'Blowdry on low heat'],
                  ['blowdry-high', 'Blowdry on medium/high heat'],
                  ['heat-tools', 'Heat tools (straighteners, curling irons, etc.)'],
                ].map(([v, label]) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-base-100 p-3"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-0.5"
                      checked={answers.heatStyling.includes(v)}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          heatStyling: toggleNoneMulti(
                            prev.heatStyling,
                            v,
                            'none',
                          ),
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Q>
          )}

          {step === 4 && (
            <Q title="Does shampooing make your hair really tangled or rough?">
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, tanglyDuringShampoo: true }));
                    setStep(5);
                  }}
                >
                  Yes, it gets rough/tangled during washing
                </button>
                <button
                  type="button"
                  className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                  onClick={() => {
                    setAnswers((a) => ({ ...a, tanglyDuringShampoo: false }));
                    setStep(5);
                  }}
                >
                  No, shampooing is fine
                </button>
              </div>
            </Q>
          )}

          {step === 5 && (
            <Q title="How often do you deal with tangles?">
              <div className="flex flex-col gap-3">
                {[
                  ['rare', 'Rarely, it\'s easy to detangle'],
                  ['sometimes', 'Sometimes get tangles'],
                  ['constant', 'Constant tangling issues'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ tanglyGeneral: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 6 && (
            <Q title="How would you describe your scalp?">
              <div className="flex flex-col gap-3">
                {[
                  ['dry', 'Dry'],
                  ['normal', 'Normal'],
                  ['oily', 'Oily'],
                  ['extra-oily', 'Very oily'],
                  ['unknown', 'Not sure'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ scalpType: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 7 && (
            <Q
              title="Do you have hard water?"
              extra={
                <Link
                  href="/blog/curly-hair-hard-water"
                  className="link link-primary text-sm"
                  target="_blank"
                >
                  How to tell if you have hard water →
                </Link>
              }
            >
              <div className="flex flex-col gap-3">
                {(
                  [
                    ['yes', 'Yes'],
                    ['no', 'No'],
                    ['unknown', 'Not sure'],
                  ] as const
                ).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() =>
                      singleAdvance({ hardWater: v })
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 8 && (
            <Q title="What type of shampoo do you prefer?">
              <div className="flex flex-col gap-3">
                {[
                  [
                    'strong',
                    'I need a strong shampoo, otherwise my hair still feels dirty',
                  ],
                  [
                    'normal',
                    'Most shampoos work fine for me or no preference',
                  ],
                  [
                    'gentle',
                    'Shampoo tends to make my hair feel dry or rough, I need something gentle',
                  ],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ cleansingNeeds: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 9 && (
            <Q title="How often do you wash your hair?">
              <div className="flex flex-col gap-3">
                {[
                  ['daily', 'Daily'],
                  ['multi-weekly', 'A few times a week'],
                  ['weekly-or-less', 'Once a week or less'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ washFrequency: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 10 && (
            <Q title="How does your hair react to products?">
              <div className="flex flex-col gap-3">
                {[
                  [
                    'heavy',
                    'Loves lots of product and is never weighed down',
                  ],
                  ['medium', 'Fine with a moderate amount'],
                  ['light', 'Easily weighed down'],
                  [
                    'very-light',
                    'Anything is too much, even a little product weighs it down',
                  ],
                  ['unknown', 'Not sure'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ productWeight: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 11 && (
            <Q title="Do you have a budget preference?">
              <div className="flex flex-col gap-3">
                {(
                  [
                    ['yes', 'Drugstore only'],
                    ['no', 'Salon/prestige only'],
                    ['either', 'No preference'],
                  ] as const
                ).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    className="btn btn-block justify-start rounded-xl bg-base-100 text-left font-normal"
                    onClick={() => singleAdvance({ drugstore: v })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step === 12 && (
            <Q title="Do you have any of these between wash day needs?">
              <div className="flex flex-col gap-3">
                {[
                  ['heat', 'I heat style between washes'],
                  ['dryness', 'My hair feels dry between washes'],
                  ['oiliness', 'My scalp gets oily between washes'],
                  ['none', 'None of the above'],
                ].map(([v, label]) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-base-100 p-3"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-0.5"
                      checked={answers.betweenWash.includes(v)}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          betweenWash: toggleNoneMulti(
                            prev.betweenWash,
                            v,
                            'none',
                          ),
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Q>
          )}

          {step === 13 && (
            <Q title="Any optional extras you want in your routine?">
              <div className="flex flex-col gap-3">
                {[
                  [
                    'smoothing',
                    'Smoothness & shine boost (a finishing oil-type product)',
                  ],
                  ['volume', 'Volume styling product'],
                  [
                    'texture',
                    'Texture boost (beachy / bedhead look) styling product',
                  ],
                  [
                    'hold',
                    'Hold boost (keeps style in place through humidity and wind)',
                  ],
                  ['none', 'None, keep it minimal'],
                ].map(([v, label]) => (
                  <label
                    key={v}
                    className="flex cursor-pointer items-start gap-3 rounded-xl bg-base-100 p-3"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-0.5"
                      checked={answers.boosts.includes(v)}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          boosts: toggleNoneMulti(prev.boosts, v, 'none'),
                        }))
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Q>
          )}

          <div className="card-actions mt-6 justify-between">
            <button
              type="button"
              className="btn btn-ghost rounded-xl gap-2"
              onClick={goBack}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            {step === TOTAL_STEPS - 1 ? (
              <button
                type="button"
                className="btn btn-primary rounded-xl gap-2"
                disabled={nextDisabled}
                onClick={finish}
              >
                Build my routine
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary rounded-xl gap-2"
                disabled={nextDisabled}
                onClick={goNext}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Q({
  title,
  details,
  children,
  extra,
}: {
  title: string;
  details?: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <>
      <h2 className="card-title text-xl">{title}</h2>
      {extra ? <div className="mt-2">{extra}</div> : null}
      {details ? (
        <details className="collapse collapse-arrow rounded-xl bg-base-100">
          <summary className="collapse-title text-sm font-medium">
            More context
          </summary>
          <div className="collapse-content text-sm">{details}</div>
        </details>
      ) : null}
      <div className="mt-4">{children}</div>
    </>
  );
}
