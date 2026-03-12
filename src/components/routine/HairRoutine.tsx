'use client';

import { RoutineWidget } from './RoutineWidget';
import type { PorosityType } from '@/lib/porosity';

export type { PorosityType };

export interface HairRoutineProps {
  /** @deprecated Use initialHairType instead. Kept for backward compatibility. */
  hairType?: string;
  /** Initial porosity (e.g. from quiz). */
  initialPorosity?: PorosityType;
  /** CurlsBot type or hair pattern slug (e.g. from quiz). When provided, hair type filter is pre-set. */
  curlsBotType?: string;
  /** Optional short description shown under the title. */
  productTypeDescription?: string;
}

/**
 * Light routine widget: 3 steps (clarifying shampoo, conditioner, styler),
 * randomize button, and CTA to full routine builder.
 * Use presetPorosity / presetHairType when embedding on quiz result pages.
 */
export default function HairRoutine({
  hairType,
  initialPorosity = 'normal_porosity',
  curlsBotType,
  productTypeDescription,
}: HairRoutineProps) {
  const initialHairType = curlsBotType ?? hairType;
  const presetHairType = Boolean(initialHairType);

  return (
    <RoutineWidget
      initialPorosity={initialPorosity}
      initialHairType={initialHairType}
      presetPorosity={false}
      presetHairType={presetHairType}
      productTypeDescription={productTypeDescription}
    />
  );
}
