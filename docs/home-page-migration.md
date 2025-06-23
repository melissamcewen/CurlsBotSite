# Home Page Revamp

Context: CurlsBot was originally a hackathon project and only had the CGM analyzer, so it made sense for the CGM analyzer to be on the home page. Now that we have less of a focus on CGM, I'd like to move the CGM analyzer elsewhere and have the homepage be a hub that explains the site and directs users to things they are interested in.

## Design Prompts

### Homepage

- goal: make it easy to see what the site does at a glance for new visitors while making it more accessible
- Our main CGM tool the analyzer is moving elsewhere, and I'm reducing our emphasis/promotion of CGM so I want it to be easy to get to but not a focus
- Maybe first card (or something like a mini hero, but I don't want to use real daisyui hero element because it takes up too much space) a one sentence intro, a friendly image (use placeholders), then in small text a link like "go to the analyzer" but don't make it a button
- Second would be learn about your hair, with a short 1 sentence CTA, button to hair type quiz
- Third would be Curly Girl Method, buttons link to analyzer and cgm hub
- Forth would be porosity, say what it is and link to quiz and analyzer
- then idk if this would be a card or a section, we could copy the relaeted blog post design src/app/blog/[slug]/page.tsx to show a selection of blog posts
- no images in the cards (except the top hero-ish thing), but use icons

### CGM Hub

**Design Prompt: CGM Hub for Curlsbot.com**

Create a visually appealing and user-friendly information hub for the Curly Girl Method (CGM) using a card-based UI. The goal is to give users a simple overview of CGM and guide them to more detailed resources. The target audience is people new to CGM—especially those seeking beginner-friendly info.

**Visual Style**: Clean, approachable, modern, mobile-friendly. Use soft, natural colors and curly hair-inspired visuals (waves, spirals). Include simple illustrations or icons for visual interest.

**Cards:**

1. **Intro to CGM**

   - Content: Brief explanation of CGM, created by Lorraine Massey and introduced in her book.
   - CTA: Button tMo full CGM guide.
   - Optional: Small image of the book or illustration of curly hair.

2. **Ingredient Rules**

   - Content: Quick list of what to avoid:

     - No sulfates (in shampoos)
     - No silicones
     - No waxes
     - Avoid drying alcohols

   - CTA: Button linking to full ingredient cheatsheet.
   - Optional: Icons representing each ingredient type (e.g., bottle with X).

3. **Curlsbot CGM Analyzer**

   - Content: Description of the analyzer tool. "Paste in an ingredient list and instantly check if the product is CGM-friendly."
   - CTA: Button linking to the analyzer.
   - Optional: Graphic showing an input box or example scan.

## Task

- [x] Create CGM (curly girl method) hub
  - [x] Basic cheatsheet
    - What is CGM (link to guide)
    - What to avoid (link to Ingredient Cheat SHeet and Analyzer)
    - Key Techniques
- [x] Move analyzer from homepage to /analyzer
- [ ] Should we put in a redirect for SEO purposes?
- [x] Other things that need to be fixed
  - [x] the lab photo needs to use /cgm analyzer
  - [x] Redirect any / with params to analyzer
  - [x] "Analyze" buttons across site
  - [x] Any other links to "analyzer"
  - [x] loading scaffold
- [ ] Publish guide
- [ ] Testing
- [x] Redesign homepage (Daisy UI 4)
  - [x] Top box = quizzes
  - [x] Next box = CGM (link to hub)
  - [x] Other boxes like read our blog

# Log

## Completed Tasks

### 1. Created New CGM Analyzer Page

- Created new page at `/analyzer`
- Moved analyzer component from homepage to new page
- Set up proper metadata and SEO for the new page
- Implemented server-side analysis functionality

### 2. Updated Analyze Buttons Across Site

Updated all components that had links to the old analyzer URL:

- `ProductCard.tsx` - Updated to `/analyzer?ingredients=`
- `ProductListicle.tsx` - Updated to `/analyzer?ingredients=`
- `products/page.tsx` - Updated to `/analyzer?ingredients=`
- `LocalizedProductLink.tsx` - Updated to `/analyzer?ingredients=`
- `BlogProduct.tsx` - Updated to `/analyzer?ingredients=`

### 3. Updated Blog Content

- Updated references to the analyzer in blog posts:
  - `is-protein-bad-for-low-porosity-hair.mdx`
  - `is-shea-moisture-curl-friendly.mdx`

### 4. Set Up Redirects

- Added redirect from homepage with ingredients param to new analyzer in `next.config.mjs`
- Updated lab photo page to use new analyzer URL by modifying `AdvancedIngredientForm.tsx`

### 5. Built and Updated CGM Hub Page

- Created the CGM Hub at `/curly-girl-method` using DaisyUI 4, following the design prompt and wireframe.
- Replaced all card image placeholders with real images:
  - Book cover: `/images/cgm-hub/book.png`
  - Ingredient rules: `/images/cgm-hub/rules.png`
  - Analyzer: `/images/cgm-hub/analyzer.png`
- Used the Next.js `<Image />` component for all images for best performance and responsiveness.
- Updated card layout and image container sizes for a clean, modern look.
- Improved list styling and ensured all text is left-aligned for clarity.

## Pending Tasks

1. Create CGM hub with:
   - Basic cheatsheet
   - CGM guide link
   - Ingredient Cheat Sheet link
   - Key techniques section
2. Redesign homepage with Daisy UI 4:
   - Add quizzes section
   - Add CGM hub section
   - Add blog section
