# Hair Quiz

## Todo

- [x] Create quiz basic code/data and tests
  - [x] Scaffold the types/structure
  - [x] Add in the questions from this doc
  - [ ] Add User journey tests
    - [ ] straight
    - [ ] wavy
    - [ ] curly
    - [ ] zig zag
- [x] Implement quiz front end
  - [ ] Take a look at the porosity quiz for info
  - [ ] Start over button
- [ ] Implement product rec api (separate codebase so don't worry about it yet)
  - [ ] Tag tools
  - [ ] Hair Typing extension
  - [ ] Add new products/tools to DB
    - [ ] Bounce curl
    - [ ] Aunt Jackie's
  - [ ] Add product recs to quiz
- [ ] Create pages
- [ ] Create infrastructure for hair type pages (MDX, see how the categories pages are implemented)
- [ ] Add email signup
- [ ] Email newsletter
- [ ] Social campaigns
  - [ ] Reddit
  - [ ] Pinterest
  - [ ] Instagram
- [ ] Optional: collect data

## Hair Types

1a. Pin Straight
1b. Straight
1c. Straight with texture
2a. Light Waves
2b. Waves
2c. Very Wavy
3a. Loose curls
3b. Curly
3c. Very curly
4a. Coily
4b. Zig-zag
4c. Tight zig-zag

Some of these aren't part of the quiz (like 1c and will only be accessed through sister types links)

## Page Structure

- Description
- Picture
- Sister types (with descriptions and links), for example 2a's sister types would be 1c and 2b
  - Border between types is fluid
  - Multiple hairs, hair cut, hair care preferences and practices
  - Common to be between types or move types due to changes in hair care, cuts, hormones, etc.
- Product recs
- Influencers

## Product recs

Pre-poo (for types 3/4 only)

Co-wash (for types 3/4 only)

Shampoo (all types)

Clarifying shampoo (all types but really important for 2/3a/3b)

Conditioner (all types)

Leave in (types 3/4)

Foam (types 2/3)

Serums (types 1/2)

Cream (types 3/4)

Gel (types 3)

Liquid gels (type 3a

Custard (types 4)

Hairspray (1/2/3b)

- Tools
  - Hair stretcher for 3c/4
  - Denman brush for 3/4
  - Bounce curl brush
  - Boar bristle brush 1/2a
  - Diffuser 2-4
  - Bonnets 2-4
  - Scalp massager (3-4)
  - Deep condition cap (4)
  - Hair towel (all)
  - Spray bottle (3c-4)

## Product recs API

- Protein (for hair that needs more structure like 2/3)
- Hold (for hair that needs more hold like 2/3)
- Smooth (for hair that needs smoothing like 1/2)
- Protection (for hair that needs protection like 3/4)
- Anti-static (for 1/2)
- Low-oil/heavy ingredients (for 1/2/3a)
- Volumizing (for 1/2)
- Tools need tagging

## Questions

Format

- Answer (points to) [go to]
- More predictive questions at beginning of section, idea is only resort to less predictive if we don't get clear answers from the more predictive ones
- Please make it easy to update like not have to manually assign ids when adding questions

### 1 vs. 2/3/4

- Does your hair dry straight without needing products, heat, or tools?
  - Yes [go to 1 vs 2]
  - No [go to 2/3a vs. 3/4]

### 1 vs. 2

- Is your hair perfectly straight with no bends when wet?
  - Yes
  - No [go to 2a vs 2c]
- Have you ever tried any techniques to form waves like scrunching? Did waves form?
  - Yes [go to 2a vs 2c]
  - No [1a vs. 1b/1c]
  - N/A
- Does your hair form any waves/bends overnight or in high humidity?
  - Yes [go to 2a vs 2c]
  - No [1a vs. 1b/1c]

### 1a vs. 1b/1c

- Do heatless curls work well in your hair?
  - Yes [go to 1b vs 1c]
  - No
  - N/A
- Do you get more volume in your hair from using a stronger/clarifying shampoo?
  - Yes [go to 1b vs 1c]
  - No
  - N/A
- Do you often struggle with frizzy hair?
  - No [1a]
  - Yes [go to 1b vs 1c]
  - N/A
- Is your hair easy to detangle
  - No [1b vs 1c]
  - Yes [1a]

### 1b vs. 1c

- Do you get "triangle hair" (where hair is flat on top and wide at the bottom)?
  - Yes [result 1c]
  - No [result 1b]

### 2/3 vs. 3/4

- When you run your fingers through your dry hair, does it glide through smoothly without getting caught in your hair?
  - Yes [go to 2 vs. 3]
  - No [go to 3a/3c vs. 3c/4]
  - N/A
- Does brushing your hair when dry make it smooth and sleek?
  - Yes [go to 2 vs. 3]
  - No [go to 3a/3c vs. 3c/4]
  - N/A
- Do heavy products make your hair limp with stringy almost straight pieces?
  - Yes [go to 2 vs. 3]
  - No [go to 3a/3c vs. 3c/4]
  - N/A
- Do you have trouble getting volume at your roots?
  - Yes [go to 2 vs. 3]
  - No [go to 3a/3c vs. 3c/4]
  - N/A
- Is your hair much longer if you stretch it out?
  - Yes [go to 3a/3c vs. 3c/4]
  - No [go to 2 vs. 3]

If all NA go to 2 vs. 4

### 2 vs. 3

- Have you ever noticed your hair forming curls when you used no heat and let it dry naturally?
  - Yes [go to 3a vs. 3c]
  - No
- When your hair is wet, do you see curls forming?
  - Yes [go to 3a vs. 3c]
  - No
- If you scrunch your hair with gel or mousse/foam and let it air dry, does it form ringlets or just enhanced waves?
  - Yes [go to 3a vs. 3c]
  - No [go to 2a vs. 2c]
  - N/A
- Do you have biological parents or full siblings with obviously curly hair?
  - Yes [go to 3a vs. 3c]
  - No [go to 2a vs. 2c]

### 2a vs. 2c

- Do you struggle to get volume at your roots?
  - Yes
  - No [result 2c]
- Does your hair tend to fall flat quickly, even with product?
  - Yes [go to 2a vs. 2b]
  - No [result 2c]
  - N/A
- Does your hair ever get straight closer to the roots when you use no heat/product and let it dry naturally?
  - Yes [go to 2a vs. 2b]
  - No [result 2c]

### 2a vs. 2b

- Does brushing your hair when dry make it straight at the roots?
  - Yes [result 2a]
  - No
  - N/A
- Does your hair ever get completely straight closer to the roots when you use no heat/product and let it dry naturally?
  - Yes [result 2a]
  - No [result 2b]

### 3a/3c vs. 3c/4

- Do you have trouble growing your hair long/gaining length?
  - Yes [go to 3c vs. 4]
  - No [go to 3a vs. 3c]
  - N/A
- When your hair is wet, do your curls immediately clump into well-defined elongated ringlets without much effort?
  - Yes [go to 3a vs. 3c]
  - No [go to 3c vs. 4]
- Does your hair shrink significantly (50% or more) when it dries?
  - Yes [go to 3c vs. 4]
  - No [go to 3a vs. 3c]
  - N/A
- Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?
  - Yes [go to 3a vs. 3c]
  - No [go to 3c vs. 4]
  - N/A
- Do your curls ever become limp and stretched out overnight?
  - Yes [go to 3a vs. 3c]
  - No [go to 3c vs. 4]
  - N/A

### 3a/3b vs. 3c

- Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?
  - Yes [go to 3a vs. 3b]
  - No [result 3c]
  - N/A
- Do you have a lot of variation in your curl pattern between different parts of your hair?
  - Yes [go to 3a vs. 3b]
  - No [result 3c]
- Do you have trouble getting volume at your roots?
  - No [result 3c]
  - Yes [go to 3a vs. 3b]

### 3a vs. 3b

- Do you get a lot of volume at your roots if it's cut shorter?
  - Yes (3b)
  - No (3a)
  - N/A
- Is your hair much longer wet than dry?
  - Yes (3b)
  - No (3a)

### 3c vs. 4

- Does your hair shrink more than 50% of its length when it dries?
  - Yes [go to 4a vs. 4c]
  - No (3c)
- Do you have static flyaways?
  - Yes [result 3c]
  - No (4)
- Do you experience a lot of breakage?
  - Yes (4)
  - No (3c)
- Does your hair absorb moisture quickly but also dry out just as fast?
  - Yes (4)
  - No (3c)
- Do you find that gel alone can help define your curls without needing a butter or heavy cream?
  - Yes (3c)
  - No (4)
  - N/A
- Do you have trouble getting volume at your roots?
  - Yes (3c)
  - No (4)
- Is your hair much longer when braided?
  - Yes (4)
  - No (3c)

Result: - If 3c has more points, result = 3c - If 4 has more points go to 4a vs. 4c

## 4a vs. 4c

- Do you see a consistent spiral curl pattern without needing to define it with product or styling?
  - Yes (4a)
  - No (4c)
- Does your hair clump into small, defined curls when wet without needing much manipulation?
  - Yes (4a)
  - No (4c)
- Does your hair experience extreme shrinkage, often more than 75% of its length?
  - Yes (4c)
  - No (4a)
- Does your hair often feel dry again shortly after applying products?
  - Yes (4c)
  - No (4a)
  - N/A
- When styling, does your hair easily form twists or braids without unraveling?
  - Yes (4c)
  - No (4a)
  - N/A
- Does your hair respond well to just gel or lighter creams for definition?
  - Yes (4a)
  - No (4c)
  - N/A

Result: - If 4a has more points, 4a - If 4c has more points, 4c

## Discard questions

3c vs 3a

- Does your hair shrink more than 50% of its length when it dries?
  - Yes [result 3c]
  - No (3a)
  - N/A
- Do you ever have static flyaways?
  - Yes [go to 3a vs. 3b]
  - No (3c)
- Does your hair have a lot of shine even without product?
  - Yes (3a)
  - No [result 3c]
  - N/A
- Do you struggle with a greasy scalp and dry ends?

  - Yes (3c)
  - No (3a)
  - N/A

- Do you often have trouble with static flyaways?
  - Yes (2a)
  - No
- Does brushing your hair when dry make it smooth and sleek?
  - Yes (2a)
  - No (2c)
- Does brushing your hair when dry make it poofy?
  - Yes (2c)
  - No (2a)
- Do you struggle with getting volume?
  - Yes [1a vs. 1b/1c]
  - No
- Does your hair get poofy when dry brushed?

  - Yes
  - No [1a vs. 1b/1c]

- Is your hair much longer wet than dry?
  - Yes [go to 3a vs. 3c]
  - No [go to 2a vs. 2c]
- Does your hair tend to gain volume in humid weather?
  - Yes [go to 2a vs 2c]
  - No [1a vs. 1b/1c]
  - N/A
- Does your have have much more volume wet vs. dry?
  - Yes
  - No [1a vs. 1b/1c]
- Does your hair get more volume when dry brushed?
  - Yes
  - No [1a vs. 1b/1c]
  - Do you get "triangle hair" when you dry brush your hair(where hair is flat on top and wide at the bottom)?
  - Yes
  - No [go to 2a vs. 2b]
  - N/A
- Is your hair much longer wet than dry?
  - Yes [result 2c]
  - No [go to 2a vs. 2b]

When you stretch out your hair when dry does it spring back into shape quickly? - Yes [result 2b] - No [result 2a]

## Sister types

| Pattern Strength  | Low | Med | High |
| ----------------- | --- | --- | ---- |
| Contours per Inch |     | 1a  |      |
| 0                 | 1c  | 1b  |      |
| 1-2               | 2a  | 2b  | 2c   |
| 2-2.5             | 3a  | 3b  | 3c   |
| 2.5-3             |     |     | 4a   |
| 3-4               |     |     | 4b   |
| 5+                |     |     | 4c   |

## Content Notes

- 1a (pattern: strong)
  - Phenotype associated with E Asian heritage
  - Smooth, sleek, glossy
  - Struggle with body and can't easily get texture
  - Dry brushing works great
  - Sister type is not 1b but 1c, because of irregular hairs with age
  - Large hair shaft diameter than 1b
- 1b
  - Standard
  - Can easily do heatless curls
  - Have trouble with body
  - Sister type is 1c because 1a is unique
  - Smaller diameter than 1a
- 1c
  - More body
  - Some irregular hairs (may be associated with age)
  - Less trouble with body more struggle with frizz
  - Dry brushing can make hair poofy/pyramid shaped
  - Anti static and smoothing crucial, light hold to hold down frizz
  - sister type 1b, 2a
- 2a
  - Can be mixed, with straight sections and wavy sections
  - Can have poor results from trying products that are too hard hold or too oily
  - May be able to do some straight stuff like dry brushing
  - Struggle with volume
  - Sister type is 3a (weak curls) and 1c (poofy straight)
  - Can be straight at the roots especially with long hair
- 2b
  - Stronger wave pattern, more volume, can get really good results from hold products
  - wave pattern lessens closer to roots esp as hair gets longer
- 2c
  - Strongest wave pattern
  - Wavy all over even near roots
- 3a
  - Weak curl pattern
  - Can have "Irish curls" mixed pieces with waves/straight
  - Sisters are 3b, 1c, 2a
  - can be accused of "forcing their curls"
- 3b
  - Strong curl pattern
  - Sister 3a and 3c
- 3c
  - Strongest curl pattern
  - Can do a lot of different styls
  - Sister 3b 4a
  - Low to moderate shrinkage
- 4a
  - Tight coils, very strong pattern
  - Sisters are 3c and 4b
  - Moderate shrinkage
- 4b
  - Even more tightly coiled, high shrinkage
  - Can be 4a aging
  - Sisters are 4a, 4c, 3c
  - Twists, more variation along length in diameter and shape
  - Higher definition
- 4c
  - Zigzag pattern
  - Easy to twist and manipulate, interlocking, no static
  - High shrinkage
  - Extremely dense
