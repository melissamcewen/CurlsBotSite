'use client';

import Image from 'next/image';
import { PorosityType } from '@/lib/routineBuilder';
import {
  ArrowLeft,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import Avatar from '@/components/avatar';
import Link from 'next/link';
import PorosityEmailSignup from '@/components/PorosityEmailSignup';
import { RoutineWidget } from '@/components/routine/RoutineWidget';

interface PorosityInfo {
  title: string;
  description: string;
  characteristics: string[];
  tips: string[];
}

interface Props {
  porosityType: string;
  porosityInfo: PorosityInfo;
}

export function PorosityPageClient({ porosityType, porosityInfo }: Props) {
  // Convert URL type to PorosityType
  const getPorosityType = (type: string): PorosityType => {
    switch (type) {
      case 'high-porosity':
        return 'high_porosity';
      case 'low-porosity':
        return 'low_porosity';
      case 'mixed-porosity':
        return 'mixed_porosity';
      case 'normal-porosity':
        return 'normal_porosity';
      default:
        return 'normal_porosity';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-lg flex items-center gap-2 mb-4">
        <Avatar imageUrl="/normal.svg" altText="Curlsbot" />
        <span className="text-primary">CurlsBot</span> thinks you have:{' '}
      </div>
      <h1 className="text-3xl font-bold mb-4">{porosityInfo.title}</h1>
      <p className="text-lg mb-8">
        {porosityInfo.description} Not what you expected? Read our science-based
        explainer{' '}
        <Link
          href="https://curlsbot.com/blog/hair-porosity-explained"
          target="_blank"
          className="text-primary underline"
        >
           at our blog.
        </Link>
      </p>

      {/* Light product book signup – same form IDs as porosity, book promo copy */}
      <section className="card bg-base-100 border border-base-300 rounded-xl mb-8">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/images/porosity/book.png"
              alt="Lightweight Products Guide"
              width={50}
              height={50}
              className="rounded"
            />
            <h2 className="text-lg font-semibold">
              Find light products for fine, wavy, or low-porosity hair
            </h2>
          </div>
          <p className="text-sm text-base-content/70 mb-3">
            Get the free ebook that shows how to spot lightweight formulas{' '}
            <span className="underline">anywhere.</span>
          </p>
          <PorosityEmailSignup
            porosityType={porosityType}
            layout="compact"
            buttonText="Get the ebook"
            placeholder="Enter your email…"
          />
        </div>
      </section>

      <Link href="/porosity" className="btn btn-primary gap-2  mb-4">
        <ArrowLeft className="w-5 h-5" />
        Retake Porosity Quiz
      </Link>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Characteristics</h2>
          <ul className="list-disc list-inside space-y-2">
            {porosityInfo.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Care Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            {porosityInfo.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="card bg-base-100 border border-base-300 h-full flex flex-col">
          <div className="card-body flex flex-col flex-1">
            <div className="flex items-start gap-4 flex-1">
              <BookOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h2 className="card-title text-lg">
                  Want to learn more about hair porosity?
                </h2>
                <p>
                  Read our comprehensive guide to understanding hair porosity,
                  including why internet porosity tests often fail and what
                  actually matters for hair care.
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link
                href="/blog/hair-porosity-explained"
                className="btn btn-primary"
              >
                Read the Guide
              </Link>
            </div>
          </div>
        </div>
        {/* Strandprint Promotion */}
        <div className="card bg-base-100 border border-base-300 h-full flex flex-col">
          <div className="card-body flex flex-col flex-1">
            <div className="flex items-start gap-4 flex-1">
              <FlaskConical className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h2 className="card-title text-lg">
                  Get your exact porosity with scientific analysis
                </h2>
                <p>
                  Want to know your exact porosity? Strandprint provides
                  scientific analysis of your hair&apos;s porosity with detailed
                  results. Use code{' '}
                  <strong className="text-primary">CBOT10</strong> for 10% off
                  your order.
                </p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <a
                href="https://www.strandprint.com/"
                target="_blank"
                className="btn btn-primary"
              >
                Visit Strandprint
              </a>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Build Your Routine</h2>
      <RoutineWidget
        presetPorosity
        initialPorosity={getPorosityType(porosityType)}
        presetHairType={false}
      />
    </div>
  );
}
