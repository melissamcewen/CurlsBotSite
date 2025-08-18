# Scripts

This directory contains utility scripts for the CurlsBot site.

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
