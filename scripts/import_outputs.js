#!/usr/bin/env node
/**
 * Convert pipeline.js output JSONs into TypeScript source files
 * under src/data/majors/, src/data/minors/, src/data/cotermPrograms/.
 *
 * Usage: node scripts/import_outputs.js [--only <id1,id2,...>] [--dry-run]
 *
 * Only imports programs with verdict PASS (or no verdict). Programs with
 * needsReview: true are printed but not imported unless --force is passed.
 *
 * After running, re-export from the index files manually or via the
 * BUILT_IN_MAJORS / BUILT_IN_MINORS / BUILT_IN_COTERMS arrays.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir    = dirname(fileURLToPath(import.meta.url));
const ROOT     = join(__dir, '..');
const OUT_DIR  = join(__dir, 'output');

const TARGET_DIRS = {
  major:  join(ROOT, 'src/data/majors'),
  minor:  join(ROOT, 'src/data/minors'),
  coterm: join(ROOT, 'src/data/cotermPrograms'),
};

const DRY_RUN = process.argv.includes('--dry-run');
const FORCE   = process.argv.includes('--force');
const onlyIdx = process.argv.indexOf('--only');
const ONLY    = onlyIdx !== -1 ? new Set(process.argv[onlyIdx + 1].split(',')) : null;

function toVarName(id) {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function configToTs(config) {
  return `import type { MajorConfig } from '../majorSchema';

export const ${toVarName(config.id)}: MajorConfig = ${JSON.stringify(config, null, 2)};
`;
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error(`ERROR: ${OUT_DIR} not found. Run pipeline.js first.`);
    process.exit(1);
  }

  for (const dir of Object.values(TARGET_DIRS)) mkdirSync(dir, { recursive: true });

  const files = readdirSync(OUT_DIR).filter(
    f => f.endsWith('.json') && !['flags.json', 'link_report.json', 'catalog_report.json'].includes(f)
  );

  let imported = 0, skipped = 0, needsReview = 0;

  for (const file of files) {
    const data = JSON.parse(readFileSync(join(OUT_DIR, file), 'utf8'));
    if (!data.config) { skipped++; continue; }

    const { config } = data;
    if (ONLY && !ONLY.has(config.id)) continue;

    if (data.needsReview && !FORCE) {
      console.log(`  SKIP (needs review): ${config.name} - ${data.flags?.length ?? 0} flags`);
      needsReview++;
      continue;
    }

    const category = config.category ?? 'major';
    const dir = TARGET_DIRS[category] ?? TARGET_DIRS.major;
    const outFile = join(dir, `${config.id}.ts`);

    if (DRY_RUN) {
      console.log(`  DRY-RUN: would write ${outFile}`);
    } else {
      writeFileSync(outFile, configToTs(config));
      console.log(`  IMPORT: ${config.name} → ${outFile}`);
    }
    imported++;
  }

  console.log(`\nImported: ${imported} | Skipped (needs review): ${needsReview} | No config: ${skipped}`);
  if (needsReview > 0 && !FORCE) {
    console.log('Run with --force to import programs that need review.');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
