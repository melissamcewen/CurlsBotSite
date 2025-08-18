# Converting Techniques Dictionary

- currently data in /src/data/techniques.ts
- replace landing page in /src/curly-techniques-dictionary
- needs to be SEO optimized (don't forget to put in sitemap)
- Use Daisy UI 5 components
- Filter by tags
- Search text


Sample entry
```ts
 {
    "name": "Crystal clarifying",
    "mustKnow": false,
    "easy": false,
    "what": "Using a powdered packet that you mix into a rinse",
    "whatItDoes": "More effectively cleans hard water buildup vs. shampoos",
    "products": "Crystal treatment like Malibu C",
    "tools": "None",
    "forWho": "Anyone",
    "tags": [
      "Hard Water",
      "Cleansing",
      "Wavy Hair",
      "Curly Hair",
      "Coily Hair",
      "Kinky Hair"
    ],
    "links": [
      {
        "title": "Video Tutorial",
        "url": "https://www.youtube.com/watch?v=xkhSVdnHzNg",
        "type": "video"
      }
    ]
  },

```


# My recommended UX

* **Default: Card grid (DaisyUI `card`, `badge`).**

  * Top bar: keyword **Search** + **Tag filters** (multi-select chips) + toggles for **Must‑Know** ★ and **Easy** 😊.
  * Card content:

    * Title + small icon row: ★ for `mustKnow`, 😊 for `easy` (tooltips).
    * “What” + “What it does” (two-line clamp).
    * Badges for hair types/tags.
    * Tiny footer: product/tool hints + “Video”/“Guide” icons.


# Implementation notes (quick hits)

* **Icons instead of columns** for `easy` and `mustKnow` in both views; expose filters for them.
* **Search**: full‑text across `name`, `what`, `whatItDoes`, `tags`, `products`.
* **DaisyUI bits**: `card`, `badge`, `input` (search), `dropdown`/`menu` (filters),
* **Performance**: client-side filter/search (look at other tables in the site like /ingredients to see how I implemented that) if <500 items

