import { readdirSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST_DIR = new URL('../dist/', import.meta.url);
const ASSET_DIR = new URL('assets/', DIST_DIR);

const limits = {
  initial: Number(process.env.BUNDLE_INITIAL_KB ?? 650),
  printPreview: Number(process.env.BUNDLE_PRINT_PREVIEW_KB ?? 50),
  fullCatalog: Number(process.env.BUNDLE_FULL_CATALOG_KB ?? 1900),
};

const files = readdirSync(ASSET_DIR)
  .filter(file => file.endsWith('.js'))
  .map(file => {
    const bytes = readFileSync(new URL(file, ASSET_DIR));
    return {
      file,
      source: bytes.toString('utf8'),
      rawKb: bytes.byteLength / 1024,
      gzipKb: gzipSync(bytes).byteLength / 1024,
    };
  })
  .sort((a, b) => b.gzipKb - a.gzipKb);

const html = readFileSync(new URL('index.html', DIST_DIR), 'utf8');
const entryFile = basename(html.match(/<script[^>]+src="[^"]*\/([^/"]+\.js)"/)?.[1] ?? '');

const targets = [
  {
    label: 'Initial application',
    asset: files.find(asset => asset.file === entryFile),
    limitKb: limits.initial,
  },
  {
    label: 'Print preview',
    asset: files.find(asset =>
      asset.source.includes('Grad Tree Degree Plan')
      && asset.source.includes('Save PDF'),
    ),
    limitKb: limits.printPreview,
  },
  {
    label: 'Full catalog',
    // The full course catalog is intentionally the largest lazy chunk. Its
    // production filename is opaque so source module names are not exposed.
    asset: files.find(asset => asset.file !== entryFile),
    limitKb: limits.fullCatalog,
  },
];

console.log('\nBundle report (production, gzip)');
console.log('--------------------------------');
for (const asset of files.slice(0, 12)) {
  console.log(`${asset.gzipKb.toFixed(1).padStart(8)} KB  ${asset.file}`);
}

const failures = [];
console.log('\nBundle budgets');
console.log('--------------');
for (const target of targets) {
  if (!target.asset) {
    failures.push(`${target.label}: expected bundle was not found`);
    console.log(` MISSING  ${target.label}`);
    continue;
  }
  const passed = target.asset.gzipKb <= target.limitKb;
  console.log(
    `${passed ? ' PASS' : ' FAIL'}    ${target.label}: ${target.asset.gzipKb.toFixed(1)} KB / ${target.limitKb} KB`,
  );
  if (!passed) failures.push(`${target.label} exceeds its gzip budget`);
}

if (failures.length > 0) {
  console.error(`\n${failures.join('\n')}`);
  process.exitCode = 1;
}
