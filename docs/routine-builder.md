# Routine Builder Refactor Spec

## Goal

Consolidate all routine builder widgets across the site into a single consistent implementation with two variants: a **light/embedded** version and a **full** standalone version.

---

## Current Files

- `src/components/routine/HairRoutine.tsx`
- `src/lib/routineBuilder.ts`
- `src/lib/porosity.ts`

---

## Widget Variants

### Light (Embedded)
- Shows a simplified 3-step routine: **clarifying shampoo, conditioner, styler**
- "Randomize" button to cycle through alternative product suggestions
- CTA linking to `/routine-builder` for the full experience
- Embedded on: porosity quiz results page, hair type quiz results page

### Full
- Lives at `/routine-builder`
- Shows all 7 routine steps (see below)
- Multiple product options per step
- Randomize button to rotate options
- All filters exposed (see Filter Logic section)

### Context-Aware Behavior (both variants)
- When embedded on a **hair type quiz results page**: hair type filter is pre-set to the quiz result and the hair type filter UI is hidden
- When embedded on a **porosity quiz results page**: porosity filter is pre-set to the quiz result and the porosity filter UI is hidden; hair type filter IS shown with a link to the hair type quiz
- When accessed from a quiz results page via URL params, filters should initialize from those params

---

## Routine Steps

| # | Step | Who It's For | Notes |
|---|------|-------------|-------|
| 1 | **Clarifying shampoo** | Everyone | Weekly for loose curls (or every wash if needed); every 2–4 weeks for tight curls |
| 2 | **Everyday shampoo** | Tight curls (required); loose curls (optional) | Gentler option for non-clarifying washes |
| 3 | **Conditioner** | Everyone | |
| 4 | **Repair treatment** | High porosity hair | Bond repair products; can substitute for conditioner. Tag: `bond-repair` |
| 5 | **Leave-in or cream** | Everyone | Use one with heat protection if user uses heat. Some creams double as stylers (tag TBD) |
| 6 | **Styler** | Optional | Gels, foams; extra hold and definition |
| 7 | **Oils and refreshers** | Optional | Dry finisher; scrunching out crunch, spot-treating rough areas |

---

## Filter Logic

### Hair Type Filter
Options use **CurlsBot types**. These map to product tags as follows:

| CurlsBot Type | Family | Product Tag |
|--------------|--------|-------------|
| Swavy | Loose curls | `wavy` |
| Wavy | Loose curls | `wavy` |
| Loose Curls | Loose curls | `wavy` |
| Tight Curls | Tight curls | `curly` |
| Coily | Tight curls | `coily` |
| Tightly Coiled | Tight curls | `coily` |

- Tooltip or help link → hair type quiz (`/hair-types/quiz`)
- Hidden when widget is on a hair type quiz results page

### Porosity Filter
Based on the numerical `extensions.porosity` score in the product data.

| Filter Value | Threshold Logic |
|-------------|-----------------|
| Low porosity | `porosity.low` score above threshold (lightweight products) |
| High porosity | `porosity.high` score above threshold |
| Mixed porosity | Must meet **both** high and low porosity criteria |

> Values can be found /Users/melissamcewen/Sites/curlsbotsiteNEXT/src/components/routine/HairRoutine.tsx

- Tooltip or help link → porosity quiz (`/porosity/quiz`)
- Hidden when widget is on a porosity quiz results page

### Other Filters
| Filter | Type | Notes |
|--------|------|-------|
| CGM-friendly | Boolean toggle | Link to CGM hub for users who aren't sure |
| Country | Select | For localization — scaffold now, build out later (existing code to preserve) |

### Product Tags
- Keep: `cgm`
	- cgm comes from   "status": "ok" in the api
- Lightweight
- High Porosity
- Low Porosity
- Protein-free from extensions.autotagger.tags in the api

---

## Product Display

Each suggested product card should show at a glance:
- Product name and brand
- Image *(see Data / Images section below)*
- Relevant tags (e.g. protein-free, CGM, lightweight)
- If a **sample is available on Curls Monthly**: show a callout and link to Curls Monthly

### Prioritization Logic
- In US results: **prioritize products tagged `samples`** (available via Curls Monthly partner)
- Curls Monthly is a recurring subscription affiliate — highest value per conversion

---

## Data & Images

- Primary data source: `haircare-ingredients-analyzer` library (existing JSON)


> Note: The JSON-based product data structure makes schema changes painful. Any image solution should match the existing pattern of using product IDs to attach supplemental data rather than modifying core product objects.

---

## UI & Component Notes

- DaisyUI 5 components
- Flat, colorful design style consistent with site
- Color palette:
  - Pink: `oklch(0.7894 0.1012 356.3)`
  - Teal: `oklch(0.7617 0.0895 200.03)`
  - Yellow: `oklch(0.7938 0.146 78.62)`
  - Off-white background
- "Saved routine" / print view: keep if it exists, but make it more printer-friendly

---

## Deployment Locations

| Location | Variant | Pre-set Filters |
|----------|---------|-----------------|
| `/routine-builder` | Full | None (user sets all filters) |
| Porosity quiz results page | Light | Porosity pre-set from result; hair type shown |
| Hair type quiz results page | Light | Hair type pre-set from result; porosity shown |

---

## Open Items / TODOs

- [ ] Define exact porosity score thresholds for low/high/mixed
- [ ] Update `/best` pages — product IDs have changed and need to be updated
- [ ] Decide on tag for creams that double as stylers (step 5/6 overlap)
- [ ] Scaffold country filter for future localization (don't build out yet)
- [ ] Decide whether to keep "saved routine" feature; if yes, improve print styles

---

## User Stories / Acceptance Criteria

### Light widget (quiz results pages)

- **As a user on a quiz results page**, I see a mini routine widget with 3 steps: clarifying shampoo, conditioner, styler
- **As a user on a quiz results page**, I can click "randomize" to see different product suggestions for any step
- **As a user on a quiz results page**, I see a CTA to build a full routine at `/routine-builder`
- **As a user on the porosity results page**, the porosity filter is pre-set to my result; I can filter by hair type and see a link to the hair type quiz if I don't know my type
- **As a user on the hair type results page**, the hair type filter is pre-set to my result; I can filter by porosity and see a link to the porosity quiz if I don't know my porosity

### Full widget (`/routine-builder`)

- **As a user**, I can filter by hair type, porosity, and CGM; each filter has a tooltip or link explaining what it means and how to find out my type/porosity
- **As a user arriving from a quiz results page**, my quiz result is pre-populated in the relevant filter
- **As a user**, I see multiple product options per routine step
- **As a user**, I can randomize product suggestions per step
- **As a user**, I can click a CGM tag to go to the Curly Girl hub

### Product cards (both variants)

- **As a user**, I can see at a glance whether a product is protein-free, CGM, or lightweight
- **As a user**, if a product sample is available on Curls Monthly, I see a callout and a link to Curls Monthly

## Example haircare-ingredients-analyzer object

   "gentle_clarifying_shampoo": {
      "name": "Gentle Clarifying Shampoo",
      "brand": "Bounce Curl",
      "product_categories": [
        "clarifying_shampoos"
      ],
      "tags": [
        "protein",
        "glycerin-free"
      ],
      "ingredients_raw": "water, sodium lauroyl methyl isethionate, decyl glucoside, sodium cocoyl isethionate, disodium cocoamphodiacetate, propanediol, panthenol pro-vitamin b5, polyquaternium-10, hydroxypropyl methylcellulose, biotin, vanillin, hydrolyzed adansonia digitata baobab seed protein, nigella sativa virgin black cumin oil, stearamidopropyl dimethylamine, lactic acid, caprylhydroxamic acid, rosmarinus officinalis rosemary leaf extract, boswellia carterii oil, lactobacillus punica granatum fruit ferment extract, lactobacillus pumpkin ferment extract, argania spinosa kernel oil, cocos nucifera coconut oil, citrus aurantium bergamia bergamot fruit oil, anthemis nobilis flower oil, geranium maculatum oil, citrus paradisi grapefruit seed oil, lavandula angustifolia lavender oil, pogostemon cablin oil, citrus aurantium dulcis orange seed oil, citrus nobilis mandarin orange peel oil, caprylyl glycol",
      "buy_links": [
        {
          "url": "https://glnk.io/x26q/curlsbot258",
          "retailer": "Bounce Curl"
        }
      ],
      "description": "A shampoo that clarifies without stripping your hair.",
      "id": "gentle_clarifying_shampoo",
      "systems_excluded": [],
      "status": "ok",
      "extensions": {
        "frizzbot": {
          "simple_humectants_number": 4,
          "film_forming_humectants_number": 1,
          "emollients_number": 4,
          "simple_humectants": [
            "Propanediol",
            "Panthenol",
            "Lactic Acid",
            "Caprylyl Glycol"
          ],
          "film_forming_humectants": [
            "Unknown Protein"
          ],
          "emollients": [
            "Unknown Polyquat",
            "Stearamidopropyl Dimethylamine",
            "Argan Oil",
            "Coconut Oil"
          ],
          "score": -33
        },
        "porosity": {
          "high": 100,
          "low": 0
        },
        "sebderm": {
          "hasTriggers": true,
          "triggers": [
            {
              "id": "argan_oil",
              "name": "Argan Oil",
              "reason": "Contains fatty acids that can feed Malassezia yeast"
            },
            {
              "id": "coconut_oil",
              "name": "Coconut Oil",
              "reason": "Contains fatty acids that can feed Malassezia yeast"
            }
          ]
        },
        "autoTagger": {
          "tags": [
            "protein",
            "glycerin-free"
          ]
        }
      }
    },

## Typescript type

export interface Product {
  /** Name of the product */
  name: string;
  /** Unique identifier for the product */
  id: string;
  /** Brand name */
  brand: string;
  /** URL where the product can be purchased */
  buy_links: BuyLink[];
  /** Systems this product is excluded from */
  systems_excluded?: string[];
  /** Categories the product belongs to */
  product_categories: string[];
  /** Tags the product belongs to */
  tags?: string[];
  /** Cost of the product in USD */
  cost?: number;
  /** Cost rating from 1-5 based on cost */
  cost_rating?: string;
  /** Raw ingredients list from the product */
  ingredients_raw?: string;
  /** Description of the product */
  description?: string;
  /** ASIN of the product */
  asin?: string;
  /** Analysis status for the product */
  status?: 'ok' | 'caution' | 'warning' | 'error';
  /** Analysis */
  analysis?: AnalysisResult;
  /** Extensions for additional analysis */
  extensions?: Extensions;
}

/** Buy link */
export interface BuyLink {
  url: string;
  countries?: string[];
  retailer?: string;
  description?: string;
}
