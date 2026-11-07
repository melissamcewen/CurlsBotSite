#!/usr/bin/env node
import { abbeyYungProducts } from '../src/data/abbeyYungProducts';

type StepComparison = {
  step: number;
  label: string;
  expected: string[];
};

// Edit this list to compare another routine step, or add more entries.
const comparisons: StepComparison[] = [
  {
    step: 9,
    label: 'Styling products',
    expected: [
      'L’Oréal Paris EverPure Iron Sleek Coat',
      'Pureology Smooth Gloss Silkmorphose Spray',
      'K18 AstroLift™ Reparative Volume Spray',
      'L’Oréal Paris Elvive Big Lift Volumizing Mousse',
      'TRESemmé Plumping Mousse Amplified Volume',
      'Nexxus MVP Styler Multitasking Styler',
      'Nexxus Air Shape Workable Hold',
      'TRESemmé Dry Texture Finishing Hairspray',
      'Living Proof Full Dry Volume & Texture Spray',
      'Amika Soulstruck Nourishing Dry Hair Mask',
    ],
  },
];

function normalize(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

let hasDifferences = false;

for (const comparison of comparisons) {
  const current = abbeyYungProducts.filter((product) =>
    product.steps.includes(comparison.step),
  );
  const expectedByName = new Map(
    comparison.expected.map((name) => [normalize(name), name]),
  );
  const currentByName = new Map(
    current.map((product) => [normalize(product.product), product.product]),
  );

  const missing = comparison.expected.filter(
    (name) => !currentByName.has(normalize(name)),
  );
  const extra = current
    .filter((product) => !expectedByName.has(normalize(product.product)))
    .map((product) => product.product);

  console.log(`\nStep ${comparison.step}: ${comparison.label}`);
  console.log(
    `Expected: ${comparison.expected.length} | Current: ${current.length}`,
  );
  console.log(`\nIn data (${current.length}):`);
  for (const name of currentByName.values()) console.log(`  - ${name}`);

  console.log(`\nMissing from data (${missing.length}):`);
  for (const name of missing) console.log(`  - ${name}`);

  console.log(`\nNot in expected list (${extra.length}):`);
  for (const name of extra) console.log(`  - ${name}`);

  if (missing.length > 0 || extra.length > 0) hasDifferences = true;
}

if (hasDifferences) process.exitCode = 1;
