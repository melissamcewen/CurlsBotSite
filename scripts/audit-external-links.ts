import fs from 'fs';
import path from 'path';

type LinkOccurrence = {
  filePath: string;
  line: number;
  column: number;
  url: string;
};

type ParsedArgs = {
  roots: string[];
  include: Set<string>;
  outputJson?: string;
  internalDomains: Set<string>;
};

const URL_REGEX = /https?:\/\/[^\s<>"'`\\),]+/g;
const DEFAULT_INCLUDE = new Set([
  '.md',
  '.mdx',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.csv',
]);

function parseArgs(argv: string[]): ParsedArgs {
  const roots: string[] = [];
  const include = new Set(DEFAULT_INCLUDE);
  let outputJson: string | undefined;
  const internalDomains = new Set<string>([
    'curlsbot.com',
    'www.curlsbot.com',
    'localhost',
    '127.0.0.1',
  ]);

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === '--root' && argv[i + 1]) {
      roots.push(argv[i + 1]);
      i += 1;
      continue;
    }

    if (token === '--include' && argv[i + 1]) {
      include.clear();
      argv[i + 1]
        .split(',')
        .map((ext) => ext.trim())
        .filter(Boolean)
        .forEach((ext) => include.add(ext.startsWith('.') ? ext : `.${ext}`));
      i += 1;
      continue;
    }

    if (token === '--internal-domain' && argv[i + 1]) {
      internalDomains.add(argv[i + 1].trim().toLowerCase());
      i += 1;
      continue;
    }

    if (token === '--output-json' && argv[i + 1]) {
      outputJson = argv[i + 1];
      i += 1;
      continue;
    }
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      internalDomains.add(siteUrl.hostname.toLowerCase());
    } catch {
      // Ignore invalid NEXT_PUBLIC_SITE_URL values.
    }
  }

  if (roots.length === 0) {
    roots.push('src');
  }

  return { roots, include, outputJson, internalDomains };
}

function shouldSkipDirectory(dirName: string): boolean {
  return dirName === 'node_modules' || dirName === '.next' || dirName === '.git';
}

function walkDirectory(
  absDir: string,
  includeExtensions: Set<string>,
  files: string[],
): void {
  const entries = fs.readdirSync(absDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      if (!shouldSkipDirectory(entry.name)) {
        walkDirectory(fullPath, includeExtensions, files);
      }
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (includeExtensions.has(ext)) {
      files.push(fullPath);
    }
  }
}

function normalizeUrl(raw: string): string {
  return raw.replace(/[.,;:!?]+$/g, '');
}

function findUrlsInFile(absFilePath: string, workspaceRoot: string): LinkOccurrence[] {
  const content = fs.readFileSync(absFilePath, 'utf8');
  const matches: LinkOccurrence[] = [];
  const relativeFilePath = path.relative(workspaceRoot, absFilePath);
  const lines = content.split('\n');

  lines.forEach((lineContent, lineIndex) => {
    URL_REGEX.lastIndex = 0;
    let match: RegExpExecArray | null = URL_REGEX.exec(lineContent);

    while (match) {
      const rawUrl = match[0];
      const url = normalizeUrl(rawUrl);
      matches.push({
        filePath: relativeFilePath,
        line: lineIndex + 1,
        column: match.index + 1,
        url,
      });
      match = URL_REGEX.exec(lineContent);
    }
  });

  return matches;
}

function isExternalUrl(url: string, internalDomains: Set<string>): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return !internalDomains.has(host);
  } catch {
    return false;
  }
}

function groupByDomain(urls: string[]): Map<string, string[]> {
  const byDomain = new Map<string, string[]>();

  urls.forEach((url) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();
      const current = byDomain.get(host) ?? [];
      current.push(url);
      byDomain.set(host, current);
    } catch {
      // Ignore invalid URLs after extraction.
    }
  });

  return byDomain;
}

function main(): void {
  const workspaceRoot = process.cwd();
  const args = parseArgs(process.argv.slice(2));

  const filesToScan: string[] = [];
  args.roots.forEach((root) => {
    const absRoot = path.resolve(workspaceRoot, root);
    if (fs.existsSync(absRoot)) {
      walkDirectory(absRoot, args.include, filesToScan);
    }
  });

  const allOccurrences = filesToScan.flatMap((filePath) =>
    findUrlsInFile(filePath, workspaceRoot),
  );

  const allUrls = allOccurrences.map((item) => item.url);
  const uniqueUrls = Array.from(new Set(allUrls));
  const externalUrls = uniqueUrls.filter((url) =>
    isExternalUrl(url, args.internalDomains),
  );
  const externalOccurrences = allOccurrences.filter((item) =>
    externalUrls.includes(item.url),
  );
  const byDomain = groupByDomain(externalUrls);

  console.log('\nExternal Link Audit');
  console.log('===================');
  console.log(`Scanned files: ${filesToScan.length}`);
  console.log(`All absolute URLs found: ${allUrls.length}`);
  console.log(`Unique absolute URLs: ${uniqueUrls.length}`);
  console.log(`Unique external URLs: ${externalUrls.length}`);
  console.log(`External domains: ${byDomain.size}`);

  const sortedDomains = Array.from(byDomain.entries()).sort(
    (a, b) => b[1].length - a[1].length,
  );

  if (sortedDomains.length > 0) {
    console.log('\nExternal domains by unique URL count:');
    sortedDomains.forEach(([domain, urls]) => {
      console.log(`- ${domain}: ${urls.length}`);
    });
  }

  if (externalOccurrences.length > 0) {
    console.log('\nFirst 100 external link occurrences:');
    externalOccurrences.slice(0, 100).forEach((occurrence) => {
      console.log(
        `- ${occurrence.filePath}:${occurrence.line}:${occurrence.column} -> ${occurrence.url}`,
      );
    });
  }

  if (args.outputJson) {
    const payload = {
      generatedAt: new Date().toISOString(),
      scannedFiles: filesToScan.length,
      totals: {
        absoluteUrls: allUrls.length,
        uniqueAbsoluteUrls: uniqueUrls.length,
        uniqueExternalUrls: externalUrls.length,
        externalDomains: byDomain.size,
      },
      internalDomains: Array.from(args.internalDomains).sort(),
      domains: sortedDomains.map(([domain, urls]) => ({
        domain,
        uniqueUrlCount: urls.length,
        urls: Array.from(new Set(urls)).sort(),
      })),
      occurrences: externalOccurrences,
    };

    const absOutputPath = path.resolve(workspaceRoot, args.outputJson);
    fs.mkdirSync(path.dirname(absOutputPath), { recursive: true });
    fs.writeFileSync(absOutputPath, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`\nSaved JSON report: ${args.outputJson}`);
  }
}

if (require.main === module) {
  main();
}
