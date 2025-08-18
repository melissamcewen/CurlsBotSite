import fs from 'fs';
import path from 'path';

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

function parseBoolean(value: string): boolean {
  return value.toUpperCase() === 'TRUE';
}

function parseTags(tags: string): string[] {
  if (!tags) return [];
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function parseLinks(
  video: string,
  youtubePlaylist: string,
  textInstructions: string,
) {
  const links: Array<{
    title: string;
    url: string;
    type: string;
  }> = [];

  if (video && video.trim()) {
    links.push({
      title: 'Video Tutorial',
      url: video.trim(),
      type: 'video',
    });
  }

  if (youtubePlaylist && youtubePlaylist.trim()) {
    links.push({
      title: 'YouTube Playlist',
      url: youtubePlaylist.trim(),
      type: 'youtube-playlist',
    });
  }

  if (textInstructions && textInstructions.trim()) {
    links.push({
      title: 'Text Instructions',
      url: textInstructions.trim(),
      type: 'text',
    });
  }

  return links.length > 0 ? links : undefined;
}

function convertCsvToTechniques(csvContent: string): Technique[] {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      // Handle commas within quoted fields
      const values: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current);

      return {
        name: values[0]?.trim() || '',
        mustKnow: parseBoolean(values[1] || ''),
        easy: parseBoolean(values[2] || ''),
        what: values[3]?.trim() || '',
        whatItDoes: values[4]?.trim() || '',
        products: values[5]?.trim() || '',
        tools: values[6]?.trim() || '',
        forWho: values[7]?.trim() || '',
        tags: parseTags(values[8] || ''),
        links: parseLinks(values[9] || '', values[10] || '', values[11] || ''),
        curlsBotCommentary: values[12]?.trim() || undefined,
      };
    });
}

function generateTypeScriptFile(techniques: Technique[]): string {
  const techniquesJson = JSON.stringify(techniques, null, 2);

  return `// Auto-generated from techniques.csv
// Run: npm run convert-techniques

export interface Technique {
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

export const techniques: Technique[] = ${techniquesJson};
`;
}

function main() {
  try {
    const csvPath = path.join(process.cwd(), 'src', 'data', 'techniques.csv');
    const outputPath = path.join(process.cwd(), 'src', 'data', 'techniques.ts');

    console.log('Reading CSV file...');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    console.log('Converting CSV to techniques...');
    const techniques = convertCsvToTechniques(csvContent);

    console.log(`Found ${techniques.length} techniques`);

    console.log('Generating TypeScript file...');
    const tsContent = generateTypeScriptFile(techniques);

    console.log('Writing TypeScript file...');
    fs.writeFileSync(outputPath, tsContent, 'utf-8');

    console.log(
      `✅ Successfully converted ${techniques.length} techniques to ${outputPath}`,
    );

    // Log some stats
    const mustKnowCount = techniques.filter((t) => t.mustKnow).length;
    const easyCount = techniques.filter((t) => t.easy).length;
    const withLinksCount = techniques.filter((t) => t.links).length;

    console.log(`📊 Stats:`);
    console.log(`  - Must-know techniques: ${mustKnowCount}`);
    console.log(`  - Easy techniques: ${easyCount}`);
    console.log(`  - Techniques with links: ${withLinksCount}`);
  } catch (error) {
    console.error('❌ Error converting CSV:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
