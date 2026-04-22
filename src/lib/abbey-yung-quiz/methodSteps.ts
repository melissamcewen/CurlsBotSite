/** Abbey Yung method wash-day order — aligns with AbbeyYungMethodTable / product `steps` */
export const abbeyYungMethodSteps: Record<
  number,
  { title: string; description: string }
> = {
  1: {
    title: 'Pre-wash bond repair treatment',
    description:
      'Optional bond repair used before shampoo (for example Eprès). Abbey often uses this on wash days when hair needs extra structural support.',
  },
  2: {
    title: 'Pre-shampoo oil treatment',
    description:
      'Oil on dry hair before you shampoo — helps with slip and tangles so you can still use a stronger cleanser at the roots.',
  },
  3: {
    title: 'Clarifying / deep cleaning shampoo',
    description:
      'Deep clean to remove buildup, oils, and hard-water residue. Typically at least weekly, depending on how your scalp and water behave.',
  },
  4: {
    title: 'Gentle cleansing shampoo',
    description:
      'A milder shampoo for other wash days — conditioning or strengthening formulas for hair that needs less stripping.',
  },
  5: {
    title: 'Post-shampoo bond repair treatment',
    description:
      'In-shower bond treatments after shampoo (for example k18 or drugstore bond masks).',
  },
  6: {
    title: 'Rinse-out conditioner',
    description:
      'Conditioner, gloss, or mask depending on how much moisture and weight your hair needs — rinse before leave-in.',
  },
  7: {
    title: 'Post-wash bond repair',
    description:
      'Extra bond support after rinsing when damage is severe — some products need heat to activate; check the label.',
  },
  8: {
    title: 'Leave-in conditioner + heat protection',
    description:
      'Base layer for moisture, slip, and protection before styling — choose weight based on how easily your hair gets weighed down.',
  },
  9: {
    title: 'Styling products',
    description:
      'Optional volume, texture, or hold (sprays, mousses, etc.) — applied as part of your finished style.',
  },
  10: {
    title: 'Style sealers',
    description:
      'Optional finishing oils, creams, or serums to smooth, add shine, or lock in the look after styling.',
  },
  11: {
    title: 'Between-wash care',
    description:
      'Refreshers, dry shampoo, mists, or treatments between full wash days — for heat, dryness, or scalp oiliness as needed.',
  },
};
