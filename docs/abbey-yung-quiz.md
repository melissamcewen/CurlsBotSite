# Abbey Yung Routine Quiz — Implementation Spec
**For**: Claude Code / AI coding tool handoff
**Stack**: Next.js, React, TypeScript, DaisyUI 5, Tailwind CSS

---

## What You're Building

A multi-step wizard quiz that collects hair/scalp information, then outputs a personalized product routine. The product data is a static TypeScript array (`abbeyYungProducts`). All logic is client-side — no backend needed.

The quiz has **14 questions**, followed by a **results page** showing a curated routine.

---

## File Structure

should go in
/labs/abbey-yung-ish-routine

products are already in /src/data/AbbeyYungProducts.ts

---

## Types



```ts
// Raw answers from the quiz wizard — stored as the user progresses
interface RawAnswers {
  damageTypes: string[];          // Q1 values
  damageSigns: string[];          // Q2 values
  hairLength: string;             // Q3 value
  heatStyling: string[];          // Q4 values
  tanglyDuringShampoo: boolean;   // Q5
  tanglyGeneral: string;          // Q6 value
  scalpType: string;              // Q7 value
  hardWater: 'yes' | 'no' | 'unknown';  // Q8
  cleansingNeeds: string;         // Q9 value
  washFrequency: string;          // Q10 value
  productWeight: string;          // Q11 value
  drugstore: 'yes' | 'no' | 'either';  // Q12
  betweenWash: string[];          // Q13 values
  boosts: string[];               // Q14 values
}

// Derived state — computed by computeQuizState()
interface QuizState {
  chemicalDamage: boolean;
  heatDamage: boolean;
  damageLevel: 1 | 2 | 3 | 4;
  heatStyling: 'none' | 'low' | 'high';
  fragile: boolean;
  tanglyDuringShampoo: boolean;
  tanglyGeneral: 'rare' | 'sometimes' | 'constant';
  scalpType: 'dry' | 'normal' | 'oily' | 'extra oily' | 'unknown';
  hardWater: boolean | null;
  cleansingNeeds: 'gentle' | 'normal' | 'strong';
  washFrequency: 'daily' | 'multi-weekly' | 'weekly-or-less';
  weight: 'very light' | 'light' | 'medium' | 'heavy';
  drugstoreOnly: boolean;
  noPreference: boolean;
  betweenWashHeat: boolean;
  betweenWashDryness: boolean;
  betweenWashOiliness: boolean;
  boosts: Array<'smoothing' | 'volume' | 'texture' | 'hold'>;
}

// Shape returned by selectProducts()
interface RoutineResult {
  preShampooOil: AbbeyYungProduct | null;
  clarifyingShampoo: AbbeyYungProduct | null;
  everydayShampoo: AbbeyYungProduct | null;
  everydayShampooNote: string | null;  // e.g. "can double as daily shampoo"
  bondRepair: AbbeyYungProduct[];      // 0–3 items
  conditioner: AbbeyYungProduct | null;
  leaveIn: AbbeyYungProduct | null;
  betweenWashHeatProtection: AbbeyYungProduct | null;
  betweenWashDryness: AbbeyYungProduct | null;
  betweenWashOilControl: AbbeyYungProduct | null;
  smoothingBoost: AbbeyYungProduct | null;
  volumeBoost: AbbeyYungProduct | null;
  textureBoost: AbbeyYungProduct | null;
  holdBoost: AbbeyYungProduct | null;
  fallbacksUsed: string[];  // list of step names where drugstore filter was relaxed
}
```

---



## Questions

All questions use DaisyUI 5 components. Use `card`, `checkbox`, `radio`, `btn` as appropriate.

For **multi-select** questions: render checkboxes. Enable the "Next" button once at least one option is selected (except where "None" is a valid single answer).

For **single-select** questions: render radio buttons OR clickable cards. Auto-advance to next step on selection (no separate Next button needed) — this is faster UX.

Show a **collapsible info block** (`<details>` / DaisyUI collapse) beneath the question label when explanatory copy is provided.

---

### Q1 — Damage Types
**Label**: Has your hair been through any of these?
**Type**: Multi-select checkbox
**Options** (values in parentheses):
- `colored` — Oxidative color (most box dye or salon dye)
- `highlighted` — Highlighted
- `bleached` — Bleached
- `permed` — Permed
- `relaxed` — Relaxed
- `heat-damaged` — Heat damaged (from tools/blowdryer)
- `none` — None of the above

**Mutual exclusivity**: If `none` is selected, deselect all others. If any other option is selected, deselect `none`.

**Collapsible info**:
> These types of damage break strong internal bonds inside the hair fiber. Some bond repair products specifically target these; others don't. You can read more in our [bond repair guide](/blog/skeptics-guide-bond-repair)

---

### Q2 — Damage Signs
**Label**: Do you notice any of these?
**Type**: Multi-select checkbox
**Options**:
- `breakage` — Breakage
- `split-ends` — Split ends
- `brittleness` — Brittleness
- `feels-dry` — Feels dry
- `feels-fried` — Feels fried / very damaged
- `none` — None of the above

**Mutual exclusivity**:
- If `none` selected → deselect all others
- If any other option selected → deselect `none`

**Collapsible info**:
> More signs of damage = more bond repair products may help. (CurlsBot's interpretation, not Abbey's own framework.)

---

### Q3 — Hair Length
**Label**: How long is your hair?
**Type**: Single select (auto-advance)
**Options**:
- `very-short` — Very short
- `short` — Short (chin length or less)
- `long` — Long (past chin to shoulder)
- `very-long` — Very long (past shoulders)

**Collapsible info**:
> Longer hair has older ends that tend to be more damaged, regardless of what you do to it.

---

### Q4 — Heat Styling
**Label**: Do you use heat on your hair?
**Type**: Multi-select checkbox
**Options**:
- `none` — No heat styling
- `diffuse` — Diffusing
- `blowdry-low` — Blowdry on low heat
- `blowdry-high` — Blowdry on medium/high heat
- `heat-tools` — Heat tools (straighteners, curling irons, etc.)

**Mutual exclusivity**: If `none` selected, deselect all others. If any other selected, deselect `none`.

---

### Q5 — Shampoo Tangles
**Label**: Does shampooing make your hair really tangled or rough?
**Type**: Single select (auto-advance)
**Options**:
- `yes` — Yes, it gets rough/tangled during washing
- `no` — No, shampooing is fine

---

### Q6 — General Tangles
**Label**: How often do you deal with tangles?
**Type**: Single select (auto-advance)
**Options**:
- `rare` — Rarely — easy to detangle
- `sometimes` — Sometimes get tangles
- `constant` — Constant tangling issues

---

### Q7 — Scalp Type
**Label**: How would you describe your scalp?
**Type**: Single select (auto-advance)
**Options**:
- `dry` — Dry
- `normal` — Normal
- `oily` — Oily
- `extra-oily` — Very oily
- `unknown` — Not sure

---

### Q8 — Hard Water
**Label**: Do you have hard water?
**Type**: Single select (auto-advance)
**Options**:
- `yes` — Yes
- `no` — No
- `unknown` — Not sure

Show inline link: "How to tell if you have hard water →" pointing to `/blog/curly-hair-hard-water`

---

### Q9 — Cleansing Needs
**Label**: What type of shampoo do you prefer?
**Type**: Single select (auto-advance)
**Options**:
- `strong` — I need a strong shampoo — otherwise my hair still feels dirty
- `normal` — Most shampoos work fine for me or no preference
- `gentle` — Shampoo tends to make my hair feel dry or rough — I need something gentle

---

### Q10 — Wash Frequency
**Label**: How often do you wash your hair?
**Type**: Single select (auto-advance)
**Options**:
- `daily` — Daily
- `multi-weekly` — A few times a week
- `weekly-or-less` — Once a week or less

---

### Q11 — Product Weight
**Label**: How does your hair react to products?
**Type**: Single select (auto-advance)
**Options**:
- `heavy` — Loves lots of product — never weighed down
- `medium` — Fine with a moderate amount
- `light` — Easily weighed down
- `very-light` — Anything is too much — even a little product weighs it down
- `unknown` — Not sure (maps to `medium`)

---

### Q12 — Drugstore Preference
**Label**: Do you have a budget preference?
**Type**: Single select (auto-advance)
**Options**:
- `yes` — Drugstore only
- `no` — Salon/prestige only
- `either` — No preference

---

### Q13 — Between-Wash Needs
**Label**: Do you have any of these between wash day needs?
**Type**: Multi-select checkbox
**Options**:
- `heat` — I heat style between washes
- `dryness` — My hair feels dry between washes
- `oiliness` — My scalp gets oily between washes
- `none` — None of the above

**Mutual exclusivity**: If `none` selected, deselect all others. If any other selected, deselect `none`.

---

### Q14 — Boosts (Optional)
**Label**: Any optional extras you want in your routine?
**Type**: Multi-select checkbox
**Options**:
- `smoothing` — Smoothness & shine boost (a finishing oil-type product)
- `volume` — Volume styling product
- `texture` — Texture boost (beachy / bedhead look) styling product
- `hold` — Hold boost (keeps style in place through humidity and wind)
- `none` — None, keep it minimal


**Note**: This is the last question. The CTA button should read "Build my routine →" instead of "Next".

---

## Computing Quiz State

Pure function: `(answers: RawAnswers) => QuizState`

### chemicalDamage
`true` if `answers.damageTypes` includes any of: `colored`, `highlighted`, `bleached`, `permed`, `relaxed`

### heatDamage
`true` if `answers.damageTypes` includes `heat-damaged`

### damageLevel (1–4)

**Step 1** — if `answers.damageSigns` includes `feels-fried`: return `damageLevel = 4` immediately.

**Step 2** — score from `damageSigns`:
```
breakage     → +1 (also sets fragile = true)
split-ends   → +1
brittleness  → +1 (also sets fragile = true)
feels-dry    → +1
```

**Step 3** — score from `hairLength`:
```
long       → +1
very-long  → +1
```

**Step 4** — map total score:
```
0   → 1
1   → 2
2–3 → 3
4+  → 4
```

### heatStyling
```
if answers.heatStyling includes 'none' only → 'none'
if includes 'blowdry-high' OR 'heat-tools' → 'high'
else (diffuse or blowdry-low present) → 'low'
```

### scalpType
```
'dry'        → 'dry'
'normal'     → 'normal'
'oily'       → 'oily'
'extra-oily' → 'extra oily'
'unknown'    → 'unknown'
```

### hardWater
```
'yes'     → true
'no'      → false
'unknown' → null
```

### cleansingNeeds
Direct map from Q9 value: `'strong'` / `'normal'` / `'gentle'`

### washFrequency
```
'daily'          → 'daily'
'multi-weekly'   → 'multi-weekly'
'weekly-or-less' → 'weekly-or-less'
```

### weight
```
'heavy'     → 'heavy'
'medium'    → 'medium'
'light'     → 'light'
'very-light' → 'very light'
'unknown'   → 'medium'
```

### drugstoreOnly / noPreference
```
'yes'    → drugstoreOnly: true,  noPreference: false
'no'     → drugstoreOnly: false, noPreference: false
'either' → drugstoreOnly: false, noPreference: true
```

### betweenWash booleans
```
betweenWashHeat     = answers.betweenWash.includes('heat')
betweenWashDryness  = answers.betweenWash.includes('dryness')
betweenWashOiliness = answers.betweenWash.includes('oiliness')
```

### boosts
Map Q14 values (`smoothing`, `volume`, `texture`, `hold`) to array, excluding `none`.

---

## weightFilter.ts

Export one function:

```ts
function weightIsEligible(
  productWeight: Weight | Weight[] | undefined,
  userWeight: QuizState['weight']
): boolean
```

Weight hierarchy (most to least conditioning):
```
heavy > medium > light > very light
```

A product is eligible if **any** of its weights are ≤ the user's selected weight.

Mapping:
```
user 'heavy'      → eligible: PREFER heavy, but medium, light, very light ok if no heavy options
user 'medium'     → eligible: PREFER medium, but light and very light ok if no medium options
user 'light'      → eligible: PREFER light, but very light ok if no light optons
user 'very light' → eligible: very light only
```

If `productWeight` is `undefined` or `'unknown'`, the product is always eligible (don't filter it out).

---

## selectProducts.ts

Pure function: `(state: QuizState) => RoutineResult`

All selection follows **priority order**: when multiple products qualify, pick the first one that has an `img` field; if none have images, pick the first qualifying product in array order.

### Helper: applyDrugstoreFilter(candidates, state)

```ts
function applyDrugstoreFilter(
  candidates: AbbeyYungProduct[],
  state: QuizState
): { products: AbbeyYungProduct[]; fallback: boolean }
```

- If `state.drugstoreOnly = true`:
  - Filter to `p.drugstore === true`
  - If result is empty, return all candidates with `fallback: true`
  - Otherwise return filtered with `fallback: false`
- Otherwise: return all candidates with `fallback: false`

Track `fallback: true` results and add the step name to `result.fallbacksUsed`.

---

### Pre-shampoo oil (Step 2)

**Show only if** `state.tanglyDuringShampoo === true`

```
candidates = abbeyYungProducts.filter(p =>
  p.steps.includes(2) &&
  weightIsEligible(p.weight, state.weight)
)
```
Pick 1. Note only options are drugstore so far so if they only want salon products don't filter the drugstore products put in a note to say that this product was recommended even though it's drugstore

---

### Clarifying shampoo (Step 3)

```
candidates = abbeyYungProducts.filter(p =>
  p.steps.includes(3) &&
  p.tags?.includes('clarifying-shampoo')
)
```

Apply in order:
1. If `state.hardWater === true`: filter to `p.tags?.includes('hard-water-deposit-removal')`
2. If `state.scalpType !== 'unknown'`: prefer products where `p.scalpType` is `normal`
3. Prefer products where `cleaningPower` matches:
   - `'strong'` → prefer includes `'strong'`
   - `'gentle'` → prefer includes `'light'`
   - `'normal'` → prefer includes `'moderate'`
   (Again, sort — don't hard-exclude)
4. If `state.fragile === true`: sort products tagged `'fragile'` to the top
5. Apply drugstore filter
6. Pick 1

**Determine if everyday shampoo is needed:**

Set `showEverydayShampoo = true` by default, then:
- If `state.washFrequency === 'weekly-or-less'`: `showEverydayShampoo = false`
- Else if `(state.scalpType === 'oily' || state.scalpType === 'extra oily') && state.cleansingNeeds === 'strong'`:
  - Check if the selected clarifying shampoo has tag `'daily-shampoo'`
  - If yes: `showEverydayShampoo = false`, set `everydayShampooNote = "This shampoo is gentle enough to use daily — it can double as your everyday shampoo too."`

---

### Strengthening shampoo (Step 4)

**Show only if** `showEverydayShampoo === true`

```
candidates = abbeyYungProducts.filter(p =>
  p.steps.includes(4) &&
  (p.tags?.includes('conditioning-shampoo') || p.tags?.includes('strength-repair-shampoo'))
)
```

1. If `state.fragile === true`: sort products tagged `'fragile'` to the top
2. Apply weight filter
3. Apply drugstore filter
4. Pick 1

---

### Conditioner / Mask / Gloss (Step 6)

```
candidates = abbeyYungProducts.filter(p => p.steps.includes(6))
```

Determine preferred type:
- `state.weight === 'very light'` → prefer gloss: sort products where `p.heaviness` contains `'light'` or `p.comments` contains `'Gloss'` to top
- `state.weight === 'heavy'` OR `state.tanglyGeneral === 'constant'` → prefer mask: sort products where `p.comments` contains `'Mask'` to top
- Otherwise → prefer conditioner: sort products where `p.comments` contains `'Conditioner'` to top

Apply weight filter, then drugstore filter. Pick 1.

---

### Leave-in (Step 8)

```
candidates = abbeyYungProducts.filter(p => p.steps.includes(8))
```

Apply weight filter, then drugstore filter. Pick 1.

---

### Bond repair

**How many products to select:**
```
damageLevel 1 → 0 products
damageLevel 2 → 1 product
damageLevel 3 → 2 products
damageLevel 4 → 3 products
```

**Exception — skip bond repair entirely if:**
```
state.chemicalDamage === false &&
state.heatDamage === false &&
state.heatStyling === 'none' &&
state.damageLevel === 1
```
In this case, return `bondRepair: []`.

**Selection strategy:**

First, determine if strong bond repair is needed:
```
needsStrongBond = state.chemicalDamage || state.heatDamage || state.heatStyling === 'high'
```

If `needsStrongBond`:
1. Try to pick 1 strong bond product. Priority order within strong bond products:
   - Step 1 products first (Eprès)
   - Step 5 products second (k18)
   - Step 7 products third
2. Apply drugstore filter. If no drugstore strong bond exists, use the salon product and add to `fallbacksUsed` with note "No drugstore option exists for strong bond repair."

Fill remaining slots with weak bond products (`tags` includes `'weak-bond-repair'`):
- Prefer Step 5 products first, then Step 7
- Apply weight filter
- Apply drugstore filter
- Do not duplicate products already selected

If `!needsStrongBond`:
- Fill all slots from weak bond products using the same logic as above.

---

### Between-wash — heat protection

**Show only if** `state.betweenWashHeat === true`

```
candidates = abbeyYungProducts.filter(p =>
  p.steps.includes(11) &&
  p.tags?.includes('between-wash-heat-protection')
)
```

Skip weight filter (all are `unknown` weight). Apply drugstore filter. Pick 1.

---

### Between-wash — dryness

**Show only if** `state.betweenWashDryness === true`

```
candidates = abbeyYungProducts.filter(p =>
  p.steps.some(s => s === 11 || s === 10) &&  // includes multi-step products
  p.tags?.includes('between-wash-dryness-relief')
)
```

Apply weight filter where `p.weight !== 'unknown'`. Apply drugstore filter. Pick 1.

---

### Between-wash — oil control

**Show only if** `state.betweenWashOiliness === true`

```
candidates = abbeyYungProducts.filter(p =>
  p.steps.includes(11) &&
  p.tags?.includes('between-wash-oil-control-relief')
)
```

Apply drugstore filter. Pick 1.

---

### Boosts (Step 9 / 10)

For each boost in `state.boosts`:

| Boost | Step | Tag |
|---|---|---|
| `smoothing` | 10 | `'style-smoothing'` |
| `volume` | 9 | `'style-volume'` |
| `texture` | 9 | `'style-texture'` |
| `hold` | 9 | `'style-hold'` |

For each:
```
candidates = abbeyYungProducts.filter(p =>
  p.steps.includes(step) &&
  p.tags?.includes(tag)
)
```
Apply weight filter (for smoothing only — others are style sprays and less weight-sensitive). Apply drugstore filter. Pick 1.

---

## RoutineResults

Display the routine in this order:

1. **Callouts** — contextual alerts at the top (see Callouts section below)
2. **Pre-shampoo oil** — if `result.preShampooOil` is not null
3. **Clarifying shampoo**
4. **Everyday shampoo** — if not null; show `everydayShampooNote` beneath if set
5. **Bond repair** — rendered by `<BondRepairSection>` if `result.bondRepair.length > 0`
6. **Conditioner / mask / gloss**
7. **Leave-in**
8. **Between-wash** — group into one section if any are present
9. **Boosts** — group into one section if any are present

Each step uses `<StepSection>` which wraps a labeled heading + `<ProductCard>`.

---

## StepSection

Props:
```ts
{ label: string; note?: string; children: React.ReactNode }
```

Renders a section heading (e.g., "Clarifying Shampoo") and optional note text beneath it, then the child `ProductCard`.

---

## ProductCard

Props: `{ product: AbbeyYungProduct; stepLabel?: string }`

Display:
- If `product.img` exists: render image (use Next.js `<Image>`)
- Product name (bold)
- Drugstore badge (DaisyUI badge) if `product.drugstore === true`
- `product.comments` — Abbey's note on the product
- `product.bestFor` — if present, show as a smaller line ("Best for: …")
- `product.frequency` — if present, show as a smaller line ("How often: …")
- Buy links:
  - If `product.links` exists and length > 0: render each as a DaisyUI `btn btn-sm`
  - Otherwise: render `product.amazon` as a single "Buy on Amazon" button
  - Open all links in `_blank`

---

## BondRepairSection

Props: `{ products: AbbeyYungProduct[]; state: QuizState; fallbackNote?: string }`

Render a section titled "Bond Repair" with a brief intro:

> Bond repair products work during washing to reinforce the internal structure of damaged hair. Use them in wash-day order.

Then render one `<ProductCard>` per product, in the order they were selected (strong bond first, then weak bond).

If `fallbackNote` is set (drugstore unavailable), show a DaisyUI `alert alert-info` with the note.

---

## Callouts

Props: `{ state: QuizState; result: RoutineResult }`

Render DaisyUI `alert` components for applicable conditions:

| Condition | Alert text |
|---|---|
| `state.damageLevel >= 3` | "Your hair shows significant damage. Stick with bond repair consistently for a few months before evaluating whether to cut back." |
| `state.chemicalDamage === true` | "Chemical treatments like bleach and dye break strong disulfide bonds inside the hair. Strong bond repair (Eprès, k18) is the most targeted treatment for this." |
| `state.heatStyling === 'high'` | "High heat also breaks inner cotex bonds over time. Strong bond repair helps maintain hair health even with regular heat use." |
| `(state.chemicalDamage !== true) || state.heatStyling !== 'high'` | "With non chemical/heat damage you won't benefit as much from strong bond builders  (k18, Epres) that target that type of damage, you can pick whatever bond products you prefer but the less strong ones are usually cheaper" |
| `state.hardWater === null` | "Not sure if you have hard water? [Check our guide →]" |
| `state.tanglyDuringShampoo === true` | "Apply the pre-shampoo oil mostly to your ends — it protects drier sections while letting you use a stronger shampoo at the roots." |
| `result.fallbacksUsed.length > 0` | "We couldn't find a drugstore match for: [list]. Showing the closest alternative." |
| Bond repair skipped entirely | "Your hair sounds healthy — bond repair probably isn't necessary right now. If you start chemical treatments or consistent heat styling, revisit this." |

Show only the alerts that apply. Do not show all of them every time.

---

## Edge Case Handling (Summary)

| Scenario | Behavior |
|---|---|
| No products match all filters | Relax drugstore filter first (set `fallback: true`). If still empty after that, relax weight filter too. Always pick something rather than returning null where possible. |
| `step: 0` products in data | Always use `product.steps[]` for eligibility, never `product.step`. Some products have `step: 0` as a sentinel — ignore the `step` field. |
| `productWeight` is `undefined` | Treat as always eligible (never filter out). |
| Living Proof Triple Bond (Step 7, strong bond) | Only include if `state.heatStyling !== 'none'` — it requires heat to activate. |
| Bond repair skip condition | Skip entirely if `!chemicalDamage && !heatDamage && heatStyling === 'none' && damageLevel === 1`. Show callout. |
| Conditioner type detection | Use `p.comments` string to detect gloss/mask/conditioner (values are `'Gloss'`, `'Mask'`, or contain `'Conditioner'`). This is the only available signal in the current data — do not rely on a `type` field. |
| Multiple weights in `product.weight[]` | A product with `weight: ['light', 'medium']` is eligible for users with `medium` or heavier preference, because it has a `medium` option. Apply `weightIsEligible` to the array — if any weight in the array passes, the product is eligible. |

---

## Attribution Disclaimer

Show this at the top of the quiz and/or results page. Match Melissa's writing voice — do not make it sound corporate:

> *This quiz is my interpretation of Abbey Yung's method, built by studying her content. I'm not Abbey and this isn't official — I'm just someone who watched a lot of videos and took notes. Her content is the authoritative source. If you want to learn more about this please read [my guide to the Abbey Yung Method](/blog/the-abbey-yung-method).*
