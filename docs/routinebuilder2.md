# Routine Builder 2.0
This is a new routine generator that will provide a recommended routine at the end of quizzes. It will be implemented first on the Hair Types quiz result page which is at. src/app/hair-types/quiz/QuizResult.tsx

## tests
please focus on smoke tests, using real API data, and avoid using mocks whenever possible


## Design
I want to simplify to hopefully increase coversion rates for people buying products

Use emoji and/or Lucide icons

Use DaisyUI colors

## Old routine builder

Old files
DO NOT TOUCH if you need to make changes copy the file and rename it
- Product listing component src/components/ui/product/ProductCard.tsx
- Filtering src/lib/productFiltering.ts
- Routine Builder src/lib/routineBuilder.ts
  Also DO NOT TOUCH old test files, all old files will remain in use in other parts of the site

ALWAYS REVIEW OLD CODE BEFORE DOING ANYTHING


Remember for products low and high porosity are not exclusive, a product can be high AND low porosity

For product tags, porosity tags are no longer in use, we use the extensions porosity

Review API docs docs/haircareanalyser.md before doing anything with the API

You may need to query the API to get the correct names of the categories like I'm not sure if it's "deep_conditioners" or "deep-conditioners"

Here is a sample product from the API
```
   "clarifying_shampoo": {
      "name": "Clarifying Shampoo",
      "brand": "Moroccanoil",
      "product_categories": [
        "clarifying_shampoos"
      ],
      "tags": [
        "low_porosity",
        "normal_porosity",
        "featured"
      ],
      "buy_links": [
        {
          "url": "https://amzn.to/4iSDfKT",
          "retailer": "Amazon",
          "country": "AU"
        },
        {
          "url": "https://fave.co/3PMQGyT",
          "retailer": "Moroccanoil"
        },
        {
          "url": "https://go.skimresources.com?id=276362X1762442&xs=1&url=https%3A%2F%2Fau.moroccanoil.com%2Fproducts%2Fclarifying-shampoo",
          "retailer": "Moroccanoil",
          "country": "AU"
        }
      ],
      "description": "This shampoo has some stronger cleansers, but that's fine in a clarifying shampoo because you're only using it once in a while. It's sulfate-free, so it won't strip your hair too much. It's also got some nice oils in it to help keep your hair from getting too dry.",
      "asin": "B0089NVH5W",
      "ingredients_raw": "aqua water eau, cocamidopropyl hydroxysultaine, disodium laureth sulfosuccinate, sodium lauryl sulfoacetate, sodium lauroyl sarcosinate, sodium polystyrene sulfonate, sodium chloride, cocamidopropylamine oxide, argania spinosa argan kernel oil, persea gratissima avocado oil, rosmarinus officinalis rosemary leaf extract, chamomilla recutita matricaria flower extract, lavandula angustifolia lavender flower extract, simmondsia chinensis jojoba seed extract, keratin amino acids, hydrolyzed keratin, silk amino acids, panthenol, sodium pca, cinnamidopropyltrimonium chloride, butylene glycol, peg-40 hydrogenated castor oil, peg-150 pentaerythrityl tetrastearate, peg-6 caprylic capric glycerides, caprylyl glycol, tetrasodium edta, disodium edta, chlorphenesin, phenoxyethanol, parfum fragrance, ci 17200 red 33, ci 19140 yellow 5, sodium hydroxide, citric acid, alpha-isomethyl ionone, butylphenyl methylpropional, linalool, hydroxyisohexyl 3-cyclohexene carboxaldehydethylpropional",
      "cost": 3.8,
      "id": "clarifying_shampoo",
      "systems_excluded": [],
      "status": "ok",
      "extensions": {
        "frizzbot": {
          "simple_humectants_number": 4,
          "film_forming_humectants_number": 3,
          "emollients_number": 2,
          "simple_humectants": [
            "Panthenol",
            "Sodium PCA",
            "Butylene glycol",
            "Caprylyl Glycol"
          ],
          "film_forming_humectants": [
            "Keratin",
            "Hydrolyzed keratin",
            "Silk Amino Acids"
          ],
          "emollients": [
            "Avocado Oil",
            "Castor Oil"
          ],
          "score": -66
        },
        "porosity": {
          "high": 50,
          "low": 100
        },
        "sebderm": {
          "hasTriggers": true,
          "triggers": [
            {
              "id": "avocado_oil",
              "name": "Avocado Oil",
              "reason": "Contains fatty acids that can feed Malassezia yeast"
            },
            {
              "id": "silk_amino_acids",
              "name": "Silk Amino Acids",
              "reason": "Amino acids can be metabolized by Malassezia, potentially worsening symptoms"
            },
            {
              "id": "castor_oil",
              "name": "Castor Oil",
              "reason": "Contains fatty acids that can feed Malassezia yeast"
            }
          ]
        }
      },
      "cost_rating": "5"
    },
```

## Tests
- Must utilize localization and filter for products for current country src/contexts/LocalizationContext.tsx
- Must pass the quiz result's CurlsBotType and create routines based on the specific steps listed later in the document, for example if the component is passed 'Straight thick hair' it provides the 'Straight' routine which has the steps (default normal porosity) Clarifying, Shampoo, Conditioner, Styler 1
  - Straight = CurlsBotTypes 'Straight fine hair', 'Straight hair', 'Straight thick Hair'
  - Wavy = 'Wavy fine hair', 'Wavy hair', 'Loose curls'
  - Curly = 'Curly hair'
  - Very curly = 'Very curly hair'
- Must prioritize "featured" products
- Must have ability to prioritize brands, which is configurable in the code
- Must have one product per step
- Must have a "Shuffle products" button that grabs new random products
- Ability to exempt some steps from filtering like Deep Conditioners
- Must have filters and filter products based on the filters
  - Porosity (high, low, normal, mixed), default
  - CGM true/false (default true)
  - Minimal true/false (default false)
    - Only includes shampoo/cowash (depending on type/porosity), conditioner, and styler 2


## Steps
- Pre poo
- Clarifying: For occasional use to help clear buildup
- Shampoo: Helps cleanse the scalp and hair
- Cowash: A gentler way to cleanse hair that can prevent damage especially for very curly hair
- Conditioner: Helps detangle and adds moisturization
- Deep Conditioner: For occasional use. Provides deep penetrating conditioning that lasts for several washes. If you have low porosity use a heated cap.
- Leave In: Helps keep the hair conditioned after the wash, if you have mixed porosity use on ends only
- Styler 1: Helps form curls/waves and adds moisture, usually applied on soaking wet hair
- Styler 2: Helps seal in moisture and fix style, can be applied on soaking wet or towel-dried hair depending on instructions on product
- Refresher: Can help refresh your style on non-wash days



## Routines

### Straight Hair Routine
Filtering should be lightweight products only, then based on porosity
- Pre poo
  - Mixed or high porosity only
- Clarifying
- Shampoo
- Conditioner
- Styler 1: Spray or serum

### Wavy hair routine
Filtering should be lightweight products only, then based on porosity
- Pre poo
  - Mixed or high porosity only
- Clarifying
- Shampoo
- Conditioner
- Gel or Custard
- Foam or Spray

### Curly
- Pre poo
  - Mixed or high porosity only
- Clarifying
- Shampoo OR Cowash
- Conditioner
- Deep conditioner
- Leave In
- Styler 1: Cream OR Custard
- Styler 2: Spray OR Foam OR Oil
- Refreshers

### Very Curly
- Pre poo
  - Mixed or high porosity only
- Clarifying
- Shampoo for low porosity, Mixed gets both shampoo and cowash Cowash for other porosities
- Conditioner
- Leave In
- Deep conditioner
- Styler 1: Cream OR Custard. For low porosity only custard.
- Styler 2: Spray OR Foam OR Oil
- Refreshers


