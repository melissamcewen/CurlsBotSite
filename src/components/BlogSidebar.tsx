'use client';

import { GraduationCap, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

export default function BlogSidebar() {
  return (
    <aside className="hidden lg:block sticky top-4 space-y-4">
      {/* Quizzes Section */}
      <div className="card border-2 border-primary bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-base flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Take a Quiz
          </h2>
          <div className="space-y-2">
            <Link
              href="/hair-types/quiz"
              className="btn btn-sm btn-primary w-full"
            >
              Learn your Hair-type
            </Link>
            <Link
              href="/porosity-quiz"
              className="btn btn-sm btn-primary w-full"
            >
              Learn your Porosity
            </Link>
          </div>
        </div>
      </div>

      {/* Lead Magnet Section */}
      <div className="card border-2 border-info bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Free Guide
          </h2>
          <p className="text-sm">
            Get our guide to finding light products anywhere!
          </p>
          <Link
            href="/light-products-mini-guide"
            className="btn btn-sm btn-info w-full"
          >
            Get the Guide
          </Link>
        </div>
      </div>

      {/* Curls Monthly Section */}
      <div className="card border-2 border-secondary bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-base flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Try New Products
          </h2>
          <p className="text-sm">
            Try 5 curl products a month with Curls Monthly!
          </p>
          <a
            href="https://curlsmonthly.com/?ref=curlsbot"
            target="_blank"
            className="btn btn-sm btn-secondary w-full"
          >
            Check it out
          </a>
        </div>
      </div>
    </aside>
  );
}
