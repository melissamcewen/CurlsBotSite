import fs from 'fs';
import path from 'path';

interface BondProduct {
  name: string;
  link: string;
  curlFocused: boolean;
  activeType: string;
  bondRepairResearchGrade: string;
}

function parseBoolean(value: string): boolean {
  const normalized = value.trim().toUpperCase();
  return normalized === 'TRUE' || normalized === '1' || normalized === 'YES';
}

function convertCsvToBondProducts(csvContent: string): BondProduct[] {
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

      const name = values[0]?.trim() || '';
      const link = values[1]?.trim() || '';
      const curlFocused = parseBoolean(values[2] || '');
      const activeType = values[3]?.trim() || '';
      const bondRepairResearchGrade = values[4]?.trim() || '';

      // Skip rows with empty name
      if (!name) {
        return null;
      }

      return {
        name,
        link,
        curlFocused,
        activeType,
        bondRepairResearchGrade,
      };
    })
    .filter((product): product is BondProduct => product !== null);
}

function generateTypeScriptFile(products: BondProduct[]): string {
  const productsJson = JSON.stringify(products, null, 2);

  return `// Auto-generated from bond-products.csv
// Run: npm run convert-bond-products

export interface BondProduct {
  name: string;
  link: string;
  curlFocused: boolean;
  activeType: string;
  bondRepairResearchGrade: string;
}

export const bondProducts: BondProduct[] = ${productsJson};
`;
}

function main() {
  try {
    const csvPath = path.join(process.cwd(), 'src', 'data', 'bond-products.csv');
    const outputPath = path.join(
      process.cwd(),
      'src',
      'data',
      'bondProducts.ts',
    );

    console.log('Reading CSV file...');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    console.log('Converting CSV to Bond products...');
    const products = convertCsvToBondProducts(csvContent);

    console.log(`Found ${products.length} products`);

    console.log('Generating TypeScript file...');
    const tsContent = generateTypeScriptFile(products);

    console.log('Writing TypeScript file...');
    fs.writeFileSync(outputPath, tsContent, 'utf-8');

    console.log(
      `✅ Successfully converted ${products.length} Bond products to ${outputPath}`,
    );

    // Log some stats
    const curlFocusedCount = products.filter((p) => p.curlFocused).length;
    const withLinksCount = products.filter((p) => p.link).length;
    const researchGradeStats = products.reduce((acc, p) => {
      if (p.bondRepairResearchGrade) {
        acc[p.bondRepairResearchGrade] = (acc[p.bondRepairResearchGrade] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    console.log(`📊 Stats:`);
    console.log(`  - Curl focused products: ${curlFocusedCount}`);
    console.log(`  - Products with links: ${withLinksCount}`);
    console.log(`  - Research grade breakdown:`, researchGradeStats);
  } catch (error) {
    console.error('❌ Error converting CSV:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}









