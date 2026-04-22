/** Abbey Yung method wash-day order — aligns with AbbeyYungMethodTable / product `steps` */
export const abbeyYungMethodSteps: Record<
  number,
  { title: string; description: string }
> = {
  1: {
    title: 'Pre-wash bond repair treatment',
    description:
      'Optional bond repair used before shampoo (for example Eprès).',
  },
  2: {
    title: 'Pre-shampoo oil treatment',
    description:
      'Oil on dry hair before you shampoo, which helps with slip and tangles so you can still use a stronger cleanser at the roots.',
  },
  3: {
    title: 'Clarifying / deep cleaning shampoo',
    description:
      'Deep clean to remove buildup, oils, and hard-water residue. Abbey recommends using this at least once a week.',
  },
  4: {
    title: 'Gentle cleansing shampoo',
    description:
      'A milder shampoo for other wash days with conditioning or strengthening actives.',
  },
  5: {
    title: 'Post-shampoo bond repair treatment',
    description:
      'In-shower bond treatments after shampoo (for example k18 or drugstore bond masks). Note Abbey recommends some products that say they are for pre-shampoo for post-shampoo use (as she has found this to be more effective).',
  },
  6: {
    title: 'Rinse-out conditioner',
    description:
      'Conditioner, gloss, or mask depending on how much moisture and weight your hair needs. Rinse before leave-in.',
  },
  7: {
    title: 'Post-wash bond repair',
    description:
      'Extra bond support after rinsing when damage is severe',
  },
  8: {
    title: 'Leave-in conditioner + heat protection',
    description:
      'Base layer for moisture, slip, and protection before styling',
  },
  9: {
    title: 'Styling products',
    description:
      'Optional volume, texture, or hold (sprays, mousses, etc.) to be applied as part of your finished style.',
  },
  10: {
    title: 'Style sealers',
    description:
      'Optional finishing oils, creams, or serums to smooth, add shine, or lock in the look after styling.',
  },
  11: {
    title: 'Between-wash care',
    description:
      'Refreshers, dry shampoo, mists, or treatments between full wash days. For heat, dryness, or scalp oiliness as needed.',
  },
};
