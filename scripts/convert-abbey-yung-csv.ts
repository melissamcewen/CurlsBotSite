import fs from 'fs';
import path from 'path';

interface AbbeyYungProduct {
  product: string;
  drugstore: boolean;
  step: number;
  steps: number[];
  comments: string;
  heaviness: string;
  amazon: string;
}

function parseBoolean(value: string): boolean {
  return value === '1';
}

function parseStep(value: string): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function parseCommaSeparatedSteps(value: string): number[] {
  if (!value) return [];
  return value
    .split(',')
    .map((step) => parseInt(step.trim(), 10))
    .filter((step) => !isNaN(step));
}

function convertCsvToAbbeyYungData(csvContent: string): AbbeyYungProduct[] {
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

      // Handle step field that might contain comma-separated values
      const stepValue = values[2]?.trim() || '';
      const steps = stepValue.includes(',')
        ? parseCommaSeparatedSteps(stepValue)
        : [parseStep(stepValue)];

      return {
        product: values[0]?.trim() || '',
        drugstore: parseBoolean(values[1] || ''),
        step: steps.length === 1 ? steps[0] : 0, // Use first step for primary, or 0 if multiple
        steps: steps, // Keep all steps for reference
        comments: values[3]?.trim() || '',
        heaviness: values[4]?.trim() || '',
        amazon: values[5]?.trim() || '',
      };
    });
}

function generateTypeScriptFile(products: AbbeyYungProduct[]): string {
  const productsJson = JSON.stringify(products, null, 2);

  return `// Auto-generated from abbey-yung.csv
// Run: npm run convert-abbey-yung

export interface AbbeyYungProduct {
  product: string;
  drugstore: boolean;
  step: number;
  steps: number[];
  comments: string;
  heaviness: string;
  amazon: string;
}

export const abbeyYungProducts: AbbeyYungProduct[] = ${productsJson};
`;
}

function main() {
  try {
    const csvPath = path.join(process.cwd(), 'src', 'data', 'abbey-yung.csv');
    const outputPath = path.join(
      process.cwd(),
      'src',
      'data',
      'abbeyYungProducts.ts',
    );

    console.log('Reading CSV file...');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    console.log('Converting CSV to Abbey Yung products...');
    const products = convertCsvToAbbeyYungData(csvContent);

    console.log(`Found ${products.length} products`);

    console.log('Generating TypeScript file...');
    const tsContent = generateTypeScriptFile(products);

    console.log('Writing TypeScript file...');
    fs.writeFileSync(outputPath, tsContent, 'utf-8');

    console.log(
      `✅ Successfully converted ${products.length} Abbey Yung products to ${outputPath}`,
    );

    // Log some stats
    const drugstoreCount = products.filter((p) => p.drugstore).length;
    const withCommentsCount = products.filter((p) => p.comments).length;
    const withAmazonCount = products.filter((p) => p.amazon).length;
    const heavinessStats = products.reduce((acc, p) => {
      if (p.heaviness) {
        acc[p.heaviness] = (acc[p.heaviness] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    console.log(`📊 Stats:`);
    console.log(`  - Drugstore products: ${drugstoreCount}`);
    console.log(`  - Products with comments: ${withCommentsCount}`);
    console.log(`  - Products with Amazon links: ${withAmazonCount}`);
    console.log(`  - Heaviness breakdown:`, heavinessStats);
  } catch (error) {
    console.error('❌ Error converting CSV:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
