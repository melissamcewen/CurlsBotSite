'use client';

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
      <p className="text-lg mb-8">{porosityInfo.description}</p>

      <div className="card bg-base-100 mb-8">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <BookOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="card-title text-lg mb-2">
                Want to learn more about hair porosity?
              </h2>
              <p className="mb-4">
                Read our comprehensive guide to understanding hair porosity,
                including why internet porosity tests often fail and what
                actually matters for hair care.
              </p>
              <Link
                href="/blog/hair-porosity-explained"
                className="btn btn-primary"
              >
                Read the Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PorosityEmailSignup porosityType={porosityType} />

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

      {/* Strandprint Promotion */}
      <div className="card bg-base-100 mt-8">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <FlaskConical className="w-8 h-8 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="card-title text-xl mb-2">
                Get Your Exact Porosity with Scientific Analysis
              </h2>
              <p className="mb-4">
                Want to know your exact porosity? Strandprint provides
                scientific analysis of your hair&apos;s porosity with detailed
                results. Use code{' '}
                <strong className="text-primary">CBOT10</strong> for 10% off
                your order.
              </p>
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
      <p className="text-base-content/70 text-sm mb-4 flex items-center gap-2">
        Product links are affiliate links that help support the site
      </p>
      <RoutineWidget
        presetPorosity
        initialPorosity={getPorosityType(porosityType)}
        presetHairType={false}
      />
    </div>
  );
}
