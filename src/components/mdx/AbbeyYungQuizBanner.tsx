import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function AbbeyYungQuizBanner() {
  return (
    <div className="not-prose mb-6 rounded-2xl border border-base-300 bg-base-100">
      <div className="flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-content">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-base-content">
              Want your custom Abbey Yung-ish routine?
            </h3>
            <p className="mt-1 text-sm text-base-content">
              Take the quiz to get step-by-step product picks based on your hair,
              scalp, damage level, and styling goals.
            </p>
          </div>
        </div>
        <Link href="/labs/abbey-yung-ish-routine" className="btn btn-primary">
          Take the Quiz
        </Link>
      </div>
    </div>
  );
}
