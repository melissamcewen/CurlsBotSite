# Scripts

This directory contains utility scripts for the CurlsBot site.

## compare-abbey-yung-step.ts

Compares the products currently assigned to a method step in `src/data/abbeyYungProducts.ts` against an expected list. The default comparison is the styling-products list for step 9. Edit the `comparisons` array in the script to check another step or multiple steps.

### Usage

```bash
npx tsx scripts/compare-abbey-yung-step.ts
```

The report lists products currently in the step, expected products missing from the data, and products in the data that are not in the expected list. The script exits with status 1 when it finds differences, so it can also be used in automation.

## audit-external-links.ts

Audits outbound links by scanning project files for absolute URLs and reporting external domains and occurrences.

### Usage

```bash
npm run audit:external-links
```

Optional flags:

- `--root <path>`: scan a specific folder (default: `src`)
- `--include <ext1,ext2>`: customize file extensions (default includes mdx/ts/tsx/js/jsx/json/csv)
- `--internal-domain <domain>`: add an internal domain that should not be treated as external
- `--output-json <path>`: save a JSON report

Example:

```bash
tsx scripts/audit-external-links.ts --root src --internal-domain curlsbot.co --output-json scripts/reports/external-links-audit.json
```

## convert-techniques-csv.ts

Converts the `src/data/techniques.csv` file to a TypeScript file with proper typing.

### Usage

```bash
npm run convert-techniques
```

### What it does

- Reads the CSV file from `src/data/techniques.csv`
- Converts boolean strings ("TRUE"/"FALSE") to actual booleans
- Parses comma-separated tags into arrays
- Combines Video, YouTube Playlist, and Text Instructions into a single `links` object
- Generates a TypeScript file with proper interface definitions
- Outputs to `src/data/techniques.ts`

### Generated Structure

The script creates a `Technique` interface with the following structure:

```typescript
interface Technique {
  name: string;
  mustKnow: boolean;
  easy: boolean;
  what: string;
  whatItDoes: string;
  products: string;
  tools: string;
  forWho: string;
  tags: string[];
  links?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  curlsBotCommentary?: string;
}
```

The `links` array contains objects with:

- `title`: Human-readable title for the link
- `url`: The actual URL
- `type`: The type of link (`video`, `youtube-playlist`, or `text`)

### Stats

The script also outputs statistics about the conversion:

- Total number of techniques
- Number of must-know techniques
- Number of easy techniques
- Number of techniques with links
