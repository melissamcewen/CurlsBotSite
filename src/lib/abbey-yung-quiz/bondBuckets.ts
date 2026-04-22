import type { AbbeyYungProduct } from '@/data/abbeyYungProducts';

/** Assign each bond product to a single step bucket (1 → 5 → 7 priority). */
export function bucketBondRepairProduct(
  p: AbbeyYungProduct,
): 1 | 5 | 7 | null {
  if (p.steps.includes(1)) return 1;
  if (p.steps.includes(5)) return 5;
  if (p.steps.includes(7)) return 7;
  return null;
}

export function partitionBondRepairByStep(
  products: AbbeyYungProduct[],
): {
  step1: AbbeyYungProduct[];
  step5: AbbeyYungProduct[];
  step7: AbbeyYungProduct[];
} {
  const step1: AbbeyYungProduct[] = [];
  const step5: AbbeyYungProduct[] = [];
  const step7: AbbeyYungProduct[] = [];
  for (const p of products) {
    const b = bucketBondRepairProduct(p);
    if (b === 1) step1.push(p);
    else if (b === 5) step5.push(p);
    else if (b === 7) step7.push(p);
  }
  return { step1, step5, step7 };
}
