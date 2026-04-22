import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { FlaskConical } from 'lucide-react';
import Avatar from '@/components/avatar';
import { AbbeyYungQuiz } from '@/components/abbey-yung-quiz/AbbeyYungQuiz';

export const metadata: Metadata = {
  title: 'Abbey Yung–style routine quiz',
  description:
    'Answer a few questions to get a personalized wash-day routine inspired by Abbey Yung’s method.',
  openGraph: {
    title: 'Abbey Yung–style routine quiz',
    description:
      'Answer a few questions to get a personalized wash-day routine inspired by Abbey Yung’s method.',
  },
};

export default function AbbeyYungIshRoutinePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">

      <div className="mb-8 flex items-center gap-3">
        <Avatar imageUrl="/normal.svg" altText="Curlsbot" />
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Abbey Yung</span>–ish routine quiz
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl bg-base-200 p-8 text-center text-base-content">
            Loading quiz…
          </div>
        }
      >
        <AbbeyYungQuiz />
      </Suspense>
    </div>
  );
}
