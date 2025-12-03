# Hair Type Quiz — Simplified Spec (v2)

## 1. Overview

Refactor the existing hair type quiz into a short, image-based experience that reflects a **new classification system based on pattern and elongation/shrinkage**, not the outdated Andre Walker chart.
The quiz should feel fast, visual, and educational — guiding users to a clear, empowering result that links to product picks, related guides, and the mailing list.

### Primary outputs

One of six pattern results:

1. **Tight Coils / Zig-zags**
2. **Coily**
3. **Tight Curls**
4. **Loose Curls**
5. **Wavy**
6. **Swavy**

Straight should have a listing on the landing page but is not part of the system

Each result page includes:

- Short, plain-language description of what this pattern means
- Shrinkage/elongation summary
- Walker & “Common/social” mapping
- Product recommendations (via affiliate link blocks... we can use existing ones on quiz result pages for now)
- Links to other quizzes & articles
- Mailing list signup

---

## 2. Goals

- **Shorter flow:** ~5–6 questions, < 1 minute total
- **Visual clarity:** many questions have images or icons of patterns
- **Conversion goals:**
  - Encourage affiliate product clicks
  - Increase time on site via related links
  - Collect emails via “Send me my results” form
- **Educational tone:** shift away from “type numbers” toward “behavior & care guidance”

---

## 3. URL Structure

- **Landing:** `/hair-types` → Explains the new system, lists all six types, links to guides
- **Quiz:** `/hair-types/quiz` → Interactive flow
- **Result pages:** `/hair-types/quiz/{type}` → Individual results

---

## 4. Hair Type System (new classification)

Sure! Here’s that table rewritten cleanly as bullet points:

---

### **Tight Coils / Zig-zags**

- **Shrinkage:** 75%+
- **Typical behaviors:** Minimal elongation even when wet; dense and fragile structure
- **Walker system:** 4B–4C
- **Common / social system:** 4B–4C

---

### **Coily**

- **Shrinkage:** 50–75%
- **Typical behaviors:** Shrinks heavily; coils elongate somewhat when wet
- **Walker system:** 4A
- **Common / social system:** 4A

---

### **Tight Curls**

- **Shrinkage:** 25–50%
- **Typical behaviors:** Springy curls; well-defined but shrink noticeably when dry
- **Walker system:** 3B
- **Common / social system:** 3C

---

### **Loose Curls**

- **Shrinkage:** Little–25%
- **Typical behaviors:** Elongates easily; curls may stretch into waves
- **Walker system:** 3A
- **Common / social system:** 3A

---

### **Wavy**

- **Shrinkage:** Little
- **Typical behaviors:** Mix of waves and occasional curls
- **Walker system:** 2A–3A
- **Common / social system:** 2A–3A

---

### **Swavy**

- **Shrinkage:** Little to none
- **Typical behaviors:** Barely wavy; may dry mostly straight
- **Walker system:** 2A–2C
- **Common / social system:** 1B–2A

---

## 5. Quiz Flow

### Q0 — Straight gate

**Question:**
"Does your hair dry perfectly straight — with no bends or curves — naturally, without products, tools, or heat?"

- **Yes → "Straight" mini-result page** (short explanation + links to other quizzes like porosity)
- **No → continue**

---

### Q1 — Most common pattern (single select)

**Prompt:**
"What's your most common hair pattern when it dries naturally (no products, tools, or heat)?"

**Options (each with image):**

- Waves
- Curls
- Coils
- Zig-zags

User selects **one** option (their primary pattern).

---

### Q2 — Additional patterns (conditional multi-select)

Only appears after Q1. Asks if they have other patterns in addition to their primary one.

**Prompt:**
"Do you have any other curl pattern types that appear in your hair naturally?"

**Options shown (multi-select, filtered based on Q1 selection):**

- If Q1 = **Waves** → Show: Straight, Curls
- If Q1 = **Curls** → Show: Waves, Coils, Zig-zags
- If Q1 = **Coils** → Show: Curls, Zig-zags
- If Q1 = **Zig-zags** → Show: Curls, Coils

**Note on "Straight" option:** When primary pattern is Waves, "Straight" appears as a checkbox option in Q2 to capture straight-like behavior. If checked alone (without Curls), this directly leads to Swavy result (no need for shrinkage question). However, if both "Straight" and "Curls" are checked, the result is Wavy (curls take precedence). This represents sections of hair that may be barely wavy or dry mostly straight.

User can select **none, one, or multiple** additional patterns. Selecting none means they only have the primary pattern.

**Rationale:** This guided approach shows only adjacent/related patterns, reducing confusion and focusing on relevant combinations. Starting with primary pattern creates a clearer, more intuitive flow.

---

### Q3 — Wet elongation (conditional)

Only appears for Coils or Zig-zags paths to distinguish Coily vs Tight Coils/Zig-zags.

**Prompt:**
"When you wet your hair, does it loosen/elongate noticeably?"

- Yes → Coily
- No → Tight Coils/Zig-zags

**When this appears:**

- Always for Coils or Zig-zags paths
- Also for Curls + Coils paths

---

### Q4 — Shrinkage level (conditional)

For Curls-only paths to distinguish Loose Curls vs Tight Curls.

**Prompt:**
"How much does your hair shrink when it dries? (If you stretched out a curl, how much shorter would it be?)"

- Little to no shrinkage (little–25%) → Loose Curls
- Moderate shrinkage (25–50%) → Tight Curls

**When this appears:**

- Only for Curls-only paths (no additional patterns)
- Also for Curls + Waves paths

---

## 6. How the Quiz Determines Results (decision logic)

The result is determined by combining Q1 (primary pattern) + Q2 (additional patterns) + Q3/Q4 (shrinkage/elongation):

### Decision Tree

```
Q0: Straight? → "Straight" result page

Q1: Primary Pattern
├─ Waves (only, Q2: no additional patterns selected)
│  └─ Result: Swavy (if they had curls, they would have selected "Curls" in Q2)
│
├─ Waves + Q2: Also has "Straight" only (checked, Curls NOT checked)
│  └─ Result: Swavy (straight-like behavior indicates barely wavy)
│
├─ Waves + Q2: Also has Curls? (checked, with or without Straight)
│  └─ Result: Wavy (curls indicate wavy pattern; Straight + Curls together = Wavy)
│
├─ Curls (only)
│  └─ Q4: Shrinkage?
│     ├─ Little–25% → Loose Curls
│     └─ 25–50% → Tight Curls
│
├─ Curls + Q2: Also has Waves?
│  └─ Result: Loose Curls (waves make it looser)
│
├─ Curls + Q2: Also has Coils?
│  └─ Q3: Elongates when wet?
│     ├─ Yes → Coily (transitional)
│     └─ No → Tight Curls (closer to curls)
│
├─ Curls + Q2: Also has Zig-zags?
│  └─ Result: Tight Curls (zig-zags are tighter variant)
│
├─ Coils (only)
│  └─ Q3: Elongates when wet?
│     ├─ Yes → Coily
│     └─ No → Tight Coils/Zig-zags
│
├─ Coils + Q2: Also has Curls?
│  └─ Q3: Elongates when wet?
│     ├─ Yes → Coily
│     └─ No → Tight Coils/Zig-zags
│
├─ Coils + Q2: Also has Zig-zags?
│  └─ Result: Tight Coils/Zig-zags (zig-zags dominate)
│
├─ Zig-zags (only)
│  └─ Q3: Elongates when wet?
│     ├─ Yes → Coily (edge case)
│     └─ No → Tight Coils/Zig-zags
│
└─ Zig-zags + Q2: Also has Curls or Coils?
   └─ Result: Tight Coils/Zig-zags (zig-zags are tightest pattern)
```

### Result Mapping Summary

- **Waves only (no additional patterns selected)** → **Swavy** (if they had curls, they would have selected "Curls" in Q2)
- **Waves + Straight only (checked, no Curls)** → **Swavy** (straight-like sections indicate barely wavy)
- **Waves + Curls** → **Wavy** (curls indicate wavy pattern)
- **Waves + Straight + Curls (both checked)** → **Wavy** (curls take precedence, indicating wavy not swavy)
- **Curls only + little–25% shrinkage** → **Loose Curls**
- **Curls only + 25–50% shrinkage** → **Tight Curls**
- **Curls + Waves** → **Loose Curls**
- **Curls + Coils + elongates** → **Coily**
- **Coils only + elongates** → **Coily**
- **Coils only + no elongation** → **Tight Coils/Zig-zags**
- **Zig-zags only + no elongation** → **Tight Coils/Zig-zags**
- **Zig-zags + other patterns** → **Tight Coils/Zig-zags**

---

## 7. Result Pages

Each at `/hair-types/quiz/{type}`

### Page structure

1. **Hero section:** image, type name, short description
2. **Quick comparison:** Walker & Common mappings
3. **What this means:** 2–3 short paragraphs explaining structure and behavior
4. **Care priorities / recommendations:** 3–5 short bullet points
5. **Product section:** grid of recommended products (affiliate-linked)
   - _Note: Product recommendations will be migrated from the original quiz result pages (HairRoutine component) and adapted for new pattern types. This is on hold for now._
6. **Next steps:** links to Porosity Quiz, Wash Routine Guides, etc.
7. **Email opt-in:** “Send me my results + starter routine”

### Example summary per type

**Tight Coils/Zig-zags:**

- 75%+ shrinkage; rarely elongates
- Type-2 hydrogen bonds dominate; hair stays short when wet
- Needs emollient, protective styling; wet detangling often best

**Coily:**

- 50–75% shrinkage; defined coils that stretch slightly when wet
- Focus on slip & moisture; protect from single-strand knots

**Tight Curls:**

- 25–50% shrinkage; strong definition and spring
- Moderate weight products; wet detangling preferred

**Loose Curls:**

- Little shrinkage; stretches easily
- Light stylers; hard-hold gels to preserve curl shape

**Wavy:**

- Mix of waves & soft curls; elongates readily
- Very light stylers; avoid heavy leave-ins

**Swavy:**

- Barely wavy; elongates to near straightness
- Lightweight creams or gels for “beach waves”; dry detangling works best

---

## 8. Landing Page `/hair-types`

Purpose: explain the system, show all six types, and link to both the quiz and each result page.

**Sections**

1. **Intro:** short paragraph introducing the idea of pattern + shrinkage system
2. **Type grid:** six cards (image, 1-sentence description, “Learn more” link)
3. **“Take the Quiz” CTA** (button → `/hair-types/quiz`)
4. **FAQ:** e.g., “How is this different from the Walker system?”
5. **Optional comparison table:** New system vs Walker vs Common

---

## 9. Redirects (from old quiz results)

- Redirect old quiz results to new - 1a = Straight - 1b = Straight - 1c = Straight - 2a = Wavy - 2b= Wavy - 2c = Wavy - 3a= Loose Curls - 3b Tight curls - 3c= Coils - 4a= Tight Coils/Zig-zags - 4b= Tight Coils/Zig-zags
  Each redirect can include a note like “We’ve updated our system! Here’s your closest match. Take the quiz again if you'd like a better match”

---

## 10. Visual & UX guidelines

- Use clear pattern photos or stylized vector art (not stock models).
- All images have descriptive alt text (e.g., “S-shaped wave pattern”).
- Buttons large enough for mobile tapping.
- Smooth progress bar or dots indicator.
- Keep transitions short (fade or slide).
- End screen has clear CTA: “See My Type →”

### Deliverables summary

- `/hair-types` → Overview
- `/hair-types/quiz` → Interactive quiz
- `/hair-types/quiz/{type}` → 6 result pages
- Content for each type (images, short copy, care tips)- ask me for this because I have it

---

## 11. Migration Plan

This section outlines the step-by-step plan to **completely replace** the existing 12-type Walker-based system with the new 6-type pattern-based system.

**Approach:** Direct replacement (not gradual rollout with feature flags)

- New quiz will replace old quiz at `/hair-types/quiz`
- Old quiz routes (1a-4c) will redirect to new pattern types
- Temporary routes (`/quiz-new`) used for testing before replacement
- Old quiz code will be archived/removed after successful replacement

### Phase 1: Foundation & Data Structure

#### 1.1 Create New Type Definitions

**Files to create/modify:**

- `src/app/hair-types/quiz/newTypes.ts` (new file)

**Tasks:**

- Define the 6 new hair type constants:
  - `tight-coils-zigzags`
  - `coily`
  - `tight-curls`
  - `loose-curls`
  - `wavy-loose-curls`
  - `swavy`
- Define type metadata structure:
  - Display name
  - Slug/identifier
  - Shrinkage range
  - Walker system mapping
  - Common/social system mapping
  - Description
  - Care priorities

**Dependencies:** None

---

#### 1.2 Update Type Parameters System

**Files to modify:**

- `src/app/hair-types/quiz/parameters.ts`
- `src/app/hair-types/quiz/types.ts`

**Tasks:**

- Create new `HairPatternType` enum/type for the 6 types
- Create simplified `HairPatternParameters` interface:
  ```typescript
  interface HairPatternParameters {
    patternType: HairPatternType;
    shrinkage: string; // e.g., "75%+", "50-75%", etc.
    walkerMapping: string; // e.g., "4B-4C"
    commonMapping: string; // e.g., "4B-4C"
    description: string;
    carePriorities: string[];
  }
  ```
- Keep old parameter system for backward compatibility during migration
- Export mapping functions from old types to new types

**Dependencies:** 1.1

---

#### 1.3 Create Quiz Logic Engine

**Files to create:**

- `src/app/hair-types/quiz/newQuizData.ts`
- `src/app/hair-types/quiz/newQuizLogic.ts`

**Tasks:**

- Define new simplified question structure:
  - Q0: Straight gate (single yes/no)
  - Q1: Most common pattern (single select: Waves, Curls, Coils, Zig-zags)
  - Q2: Additional patterns (conditional multi-select, filtered based on Q1)
  - Q3: Wet elongation (conditional yes/no, for coils/zig-zags paths)
  - Q4: Shrinkage level (conditional, alternative to Q3 for some paths)
- Create pattern adjacency mapping:
  ```typescript
  const patternAdjacency: Record<Pattern, Pattern[]> = {
    waves: ['straight', 'curls'],
    curls: ['waves', 'coils', 'zig-zags'],
    coils: ['curls', 'zig-zags'],
    'zig-zags': ['curls', 'coils'],
  };
  ```
- Create result determination logic:
  - Decision tree based on primary pattern + additional patterns + shrinkage/elongation
  - Handle all combinations systematically
  - Edge cases: only one pattern, no additional patterns, multiple additional patterns
- Create helper functions:
  - `determineHairType(answers: QuizAnswers): HairPatternType`
  - `getAdjacentPatterns(primaryPattern: Pattern): Pattern[]`
  - `shouldAskElongation(primaryPattern: Pattern, additionalPatterns: Pattern[]): boolean`
  - `shouldAskShrinkage(primaryPattern: Pattern, additionalPatterns: Pattern[]): boolean`
  - `validateQuizAnswers(answers: QuizAnswers): boolean`

**Decision tree logic (see Section 6 for full details):**

```
Q0: Straight? → "Straight" result page
Q1: Primary Pattern (single select)
  - Waves
  - Curls
  - Coils
  - Zig-zags
Q2: Additional patterns? (multi-select, filtered by Q1)
  - Waves → show: Straight, Curls
  - Curls → show: Waves, Coils, Zig-zags
  - Coils → show: Curls, Zig-zags
  - Zig-zags → show: Curls, Coils
Q3/Q4: Shrinkage/elongation (conditional)
  - Always for Coils/Zig-zags paths
  - Optionally for Waves-only paths
Result determination combines Q1 + Q2 + Q3/Q4
```

**Dependencies:** 1.1, 1.2

---

### Phase 2: UI Components

#### 2.1 Create New Quiz Component

**Files to create:**

- `src/app/hair-types/quiz/NewQuiz.tsx`

**Files to reference:**

- `src/app/porosity-quiz/Quiz.tsx` (for UI pattern)
- `src/app/hair-types/quiz/Quiz.tsx` (for structure)

**Tasks:**

- Create new quiz component with simplified flow
- Implement **single-select** for Q1 (most common pattern)
- Implement **conditional multi-select** for Q2 (additional patterns, filtered by Q1)
- Add image support for pattern options
- Implement conditional rendering for Q2 (only shows after Q1)
- Implement conditional rendering for Q3/Q4 (shrinkage/elongation questions)
- Filter Q2 options based on Q1 selection using adjacency mapping
- Add progress indicator (dots or progress bar) - _Completed: Dots indicator showing current question and completed steps_
- Maintain chat bubble UI style consistent with existing quiz
- Add "Start Over" button (always visible)
- Handle Straight result separately (different flow)

**Features:**

- **Q1:** Single-select radio buttons or card selection (4 options: Waves, Curls, Coils, Zig-zags)
- **Q2:** Multi-select checkbox/toggle buttons (filtered options based on Q1)
- Image icons/illustrations for each pattern type - _Completed: Pattern images integrated for Q1 and Q2 (Waves, Curls, Coils, Zig-zags images from /images/hair-types/)_
- Smooth transitions between questions
- Mobile-responsive design
- Accessible form controls (keyboard navigation, ARIA labels)
- Clear visual distinction between single-select (Q1) and multi-select (Q2)

**Dependencies:** 1.3

---

#### 2.2 Create Landing Page

**Files to create:**

- `src/app/hair-types/page.tsx`

**Tasks:**

- Create overview page explaining new system
- Display 6 type cards in grid layout
- Each card shows:
  - Type name
  - 1-sentence description
  - Image/icon
  - "Learn more" link to result page
- Add "Take the Quiz" CTA button
- Add FAQ section:
  - "How is this different from the Walker system?"
  - "Can I still use the old quiz?"
  - "What if my hair is between types?"
- Add optional comparison table (New vs Walker vs Common)
- Include Straight type card (not part of quiz, links to porosity/other resources)

**Content sections:**

1. Hero/intro paragraph
2. Type grid (6 cards + Straight)
3. "Take the Quiz" CTA
4. FAQ accordion
5. Comparison table (optional)

**Dependencies:** 1.1, 1.2

---

#### 2.3 Create New Result Page Component

**Files to create:**

- `src/app/hair-types/quiz/NewQuizResult.tsx`

**Files to reference:**

- `src/app/hair-types/quiz/QuizResult.tsx` (for structure)
- `src/app/porosity/[type]/PorosityPageClient.tsx` (for layout)

**Tasks:**

- Create result component for new 6 types
- Structure sections per spec:
  1. Hero section (image, type name, description)
  2. Quick comparison (Walker & Common mappings)
  3. What this means (2-3 paragraphs)
  4. Care priorities (3-5 bullet points)
  5. Product recommendations (grid, reuse existing product components)
     - _Note: Product recommendations will be migrated from original quiz result pages (HairRoutine component) and adapted for new pattern types. This is on hold._
  6. Next steps (links to other quizzes/articles)
  7. Email opt-in form
- Maintain feedback mechanism (accurate/inaccurate)
- Use existing product recommendation components (when migrated - on hold)
- Link to porosity quiz and routine builder

**Dependencies:** 1.2, 2.1

---

#### 2.4 Replace Result Pages Route

**Files to replace:**

- `src/app/hair-types/quiz/[type]/page.tsx` → Replace to handle new pattern types instead of old Walker types

**Files to reference:**

- `src/app/hair-types/quiz-new/[type]/page.tsx` (temporary route, will be moved)
- `src/app/porosity/[type]/page.tsx` (metadata pattern)

**Tasks:**

- Replace existing dynamic route to support new pattern types
- Handle both old Walker types (1a-4c) via redirects AND new pattern types
- Support slugs: `tight-coils-zigzags`, `coily`, `tight-curls`, `loose-curls`, `wavy-loose-curls`, `swavy`, `straight`
- Generate metadata (title, description) per type
- Load type data from new type definitions
- Render `NewQuizResult` component for new types
- Handle 404 for invalid types
- Add structured data (Schema.org Article)
- **After testing:** Remove temporary `/quiz-new` routes

**Dependencies:** 2.3

---

#### 2.5 Create Straight Result Page

**Files to create:**

- `src/app/hair-types/quiz/straight/page.tsx`

**Tasks:**

- Create special result page for straight hair
- Explain that straight hair isn't part of the pattern system
- Link to other resources:
  - Porosity quiz
  - Routine builder
  - Other relevant guides
- Simple, short page (not a full result page)

**Dependencies:** None (can be done early)

---

### Phase 3: Replace Old Quiz & Set Up Redirects

#### 3.1 Replace Main Quiz Route

**Files to replace:**

- `src/app/hair-types/quiz/page.tsx` → Replace to use new quiz component

**Tasks:**

- Replace old quiz component with new `NewQuiz` component
- Update route to use new quiz logic and flow
- Remove references to old quiz data and logic
- **After testing:** Remove old quiz files or move to `_deprecated/` folder

**Files that can be archived after replacement:**

- `src/app/hair-types/quiz/Quiz.tsx` (old quiz component)
- `src/app/hair-types/quiz/quizData.ts` (old quiz data - keep only for reference)
- Old result component files if not needed

**Dependencies:** 2.1, 2.2

---

#### 3.2 Create Redirect System

**Files to create/modify:**

- `next.config.mjs` (redirects section)

**Tasks:**

- **COMPLETED:** Map old types to new types in `next.config.mjs`:
  - `1a`, `1b`, `1c` → `/hair-types/quiz-new/straight` (will update to `/hair-types/quiz/straight` after replacement)
  - `2a`, `2b`, `2c` → `/hair-types/quiz-new/wavy-loose-curls`
  - `3a` → `/hair-types/quiz-new/loose-curls`
  - `3b` → `/hair-types/quiz-new/tight-curls`
  - `3c` → `/hair-types/quiz-new/coily`
  - `4a` → `/hair-types/quiz-new/coily`
  - `4b`, `4c` → `/hair-types/quiz-new/tight-coils-zigzags`
- **After replacement:** Update redirects to point to `/hair-types/quiz/[patternType]` instead of `/quiz-new`
- Ensure permanent 301 redirects for SEO

**Dependencies:** 2.4, 3.1

---

#### 3.3 Update Navigation & Links

**Files to modify:**

- `src/components/Navbar.tsx`
- `src/app/(home)/page.tsx` (homepage quiz link)
- Any other pages linking to old quiz

**Tasks:**

- Update links from old quiz to new quiz
- Update navigation menu if needed
- Update homepage quiz card description if needed
- Ensure all internal links point to new structure

**Dependencies:** 2.1, 2.2

---

### Phase 4: Testing

#### 4.1 Update Existing Tests

**Files to modify:**

- `src/tests/app/hair-types/Quiz.test.tsx`
- `src/tests/app/hair-types/QuizLogic.test.ts`

**Tasks:**

- Create new test file for new quiz: `NewQuiz.test.tsx`
- Test quiz logic:
  - Straight gate detection
  - Pattern recognition multi-select
  - Conditional question display
  - Result determination for all paths
- Test edge cases:
  - All patterns selected
  - Single pattern selected
  - Invalid answer combinations
- Test redirects from old types
- Create smoke tests for result pages

**Dependencies:** 2.1, 3.1

---

#### 4.2 Create User Journey Tests

**Files to create:**

- `tests/src/app/hair-types/quiz-journey.test.tsx`

**Tasks:**

- Test complete user journeys following new flow:
  - **Straight hair path:** Q0: Yes → Straight result page
  - **Swavy path (Waves only):** Q1: Waves → Q2: No additional → Q4: Little shrinkage → Swavy
  - **Swavy path (Waves + Straight only):** Q1: Waves → Q2: "Straight" checked (Curls not checked) → Swavy (direct result, no shrinkage question needed)
  - **Wavy path (Waves + Curls):** Q1: Waves → Q2: "Curls" checked → Q4: Some shrinkage → Wavy
  - **Wavy path (Waves + Straight + Curls):** Q1: Waves → Q2: Both "Straight" and "Curls" checked → Wavy (curls take precedence)
  - **Loose Curls path:** Q1: Curls → Q2: Also Waves → Loose Curls
  - **Tight Curls path:** Q1: Curls → Q2: No additional → Q4: 25-50% shrinkage → Tight Curls
  - **Coily path:** Q1: Coils → Q2: No additional → Q3: Yes (elongates) → Coily
  - **Tight Coils path:** Q1: Zig-zags → Q2: No additional → Q3: No (doesn't elongate) → Tight Coils/Zig-zags
- Test Q2 filtering (adjacency mapping):
  - Selecting Waves shows only Straight and Curls options
  - Selecting Curls shows Waves, Coils, Zig-zags
  - Selecting Coils shows Curls and Zig-zags
  - Selecting Zig-zags shows Curls and Coils
- Test conditional questions (Q3/Q4 only appear when needed)
- Test that all paths lead to valid result pages
- Test that result pages render correctly
- Test redirects from old quiz results

**Dependencies:** 2.1, 2.4, 3.1

---

### Phase 5: Content & Assets

#### 5.1 Create Type Content

**Files to create:**

- Content data structure or MDX files (as needed)

**Tasks:**

- **Wait for user to provide content** (per spec line 270)
- Structure content for each type:
  - Short description (hero section)
  - What this means (2-3 paragraphs)
  - Care priorities (3-5 bullet points)
  - Walker & Common mappings
- Create content templates/structure

**Dependencies:** User-provided content

---

#### 5.2 Add Pattern Images

**Files/assets needed:**

- Pattern illustrations/icons for:
  - Waves
  - Curls
  - Coils
  - Zig-zags
- Type result images (6 types + straight)

**Tasks:**

- Add images to `public/images/hair-types/patterns/`
- Create or source pattern illustrations
- Ensure all images have descriptive alt text
- Optimize images for web

**Dependencies:** User-provided images or design assets

---

### Phase 6: Complete Replacement & Cleanup

#### 6.1 Finalize Route Replacement

**Tasks:**

1. **Replace main quiz route:**

   - Move `NewQuiz` component to replace `Quiz` in `/hair-types/quiz/page.tsx`
   - Remove old quiz component references
   - Update route to handle new quiz flow

2. **Replace result route:**

   - Update `/hair-types/quiz/[type]/page.tsx` to handle new pattern types
   - Support both redirect handling for old types and new pattern types
   - Remove temporary `/quiz-new` routes after testing

3. **Update redirects:**
   - Change redirects in `next.config.mjs` from `/quiz-new/` to `/quiz/`
   - All old Walker types (1a-4c) redirect to new pattern types
   - Maintain permanent 301 redirects for SEO

**Dependencies:** 3.1, 3.2, 4.1 (after testing)

---

#### 6.2 Archive Old Quiz Code

**Files to archive/remove:**

- `src/app/hair-types/quiz/Quiz.tsx` → Move to `_deprecated/` or delete
- `src/app/hair-types/quiz/QuizResult.tsx` → Keep for reference if needed, or archive
- `src/app/hair-types/quiz/quizData.ts` → Keep for reference (mapping data) or archive
- `src/app/hair-types/quiz-new/` → Remove entire directory after route replacement

**Tasks:**

- Move old quiz files to `_deprecated/hair-types-quiz/` folder (or delete if confident)
- Update any remaining references to old quiz components
- Clean up unused imports and dependencies

**Dependencies:** 6.1

---

#### 6.3 Analytics & Monitoring

**Tasks:**

- Update Google Analytics events for new quiz:
  - Quiz starts (`quiz_start`)
  - Quiz completions (`quiz_complete`)
  - Result page views (`result_view`)
  - Feedback (accurate/inaccurate) (`quiz_feedback`)
  - Email signups from results (`email_signup`)
- Monitor new quiz metrics:
  - Completion rate
  - Time to complete
  - Most common results
  - User feedback scores
- Compare with old quiz metrics (if available)

**Dependencies:** 3.1, 2.3

---

#### 6.4 Final Verification

**Tasks:**

1. **Test all routes:**

   - Verify new quiz works at `/hair-types/quiz`
   - Verify all result pages work at `/hair-types/quiz/[patternType]`
   - Verify redirects work for old types (1a-4c)
   - Verify straight result page works

2. **Test navigation:**

   - Verify all internal links point to new routes
   - Verify homepage quiz link works
   - Verify landing page links work

3. **Clean up:**
   - Remove temporary test routes (`/quiz-new`)
   - Update any documentation referencing old system
   - Verify no broken links or 404s

**Dependencies:** 6.1, 6.2, 3.3

---

### Implementation Order Recommendation

1. **Phase 1** (Foundation) - Can be done in parallel

   - 1.1 New type definitions
   - 1.2 Update parameters
   - 1.3 Quiz logic

2. **Phase 2** (UI) - Sequential within phase

   - 2.5 Straight page (simple, can be done early)
   - 2.1 New quiz component
   - 2.2 Landing page
   - 2.3 Result component
   - 2.4 Result pages

3. **Phase 3** (Replacement & Redirects) - After Phase 2

   - 3.1 Replace main quiz route
   - 3.2 Create redirect system (redirects already set up)
   - 3.3 Update navigation & links

4. **Phase 4** (Testing) - Ongoing

   - 4.1 Update tests (as components are built)
   - 4.2 User journey tests (after Phase 2 complete)

5. **Phase 5** (Content) - When content is ready

   - 5.1 Type content
   - 5.2 Pattern images

6. **Phase 6** (Complete Replacement & Cleanup) - Final
   - 6.1 Finalize route replacement
   - 6.2 Archive old quiz code
   - 6.3 Analytics & monitoring
   - 6.4 Final verification

---

### Risk Mitigation

**Potential issues:**

- Old quiz URLs in external links/bookmarks
  - **Solution:** Permanent redirects (301) in `next.config.mjs` maintain SEO and user access
- User confusion about system change
  - **Solution:** Clear messaging on landing page, FAQ section, redirects maintain continuity
- Content not ready
  - **Solution:** Use placeholder content initially, mark as TODO for future updates
- Images not ready
  - **Solution:** Pattern images already integrated, placeholder images used where needed
- Breaking changes to product recommendations
  - **Solution:** Product recommendations migration on hold, will reuse existing components when ready
- Route conflicts during replacement
  - **Solution:** Temporary routes (`/quiz-new`) allow testing before replacing main routes

---

### Success Criteria

- [ ] New quiz completes in < 1 minute
- [ ] All 6 result pages render correctly
- [ ] Landing page explains system clearly
- [ ] All old quiz results redirect properly
- [ ] Tests pass for new quiz logic
- [ ] User journey tests cover all paths
- [ ] Analytics tracking works
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] No console errors or warnings


## Launch Checklist
- [ ] Landing Page
  - [ ] Graphics
  - [ ] Copy
  - [ ] Improve design
- [ ] Result Page
  - [ ] Recommendations
  - [ ] Graphics
  - [ ] Design
  - [ ] Copy
    - [ ] Email CTA
- [ ] Assets
  - [ ] Chart
