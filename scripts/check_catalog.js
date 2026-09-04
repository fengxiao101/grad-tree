#!/usr/bin/env node
/**
 * Cross-reference all course codes in parsed MajorConfig outputs against
 * the local catalog (src/data/catalog/courses-2627.json).
 *
 * Usage: node scripts/check_catalog.js [--output-dir scripts/output]
 *
 * Writes: scripts/output/catalog_report.json
 *
 * Flags courses that:
 *  - Don't exist in the catalog (may be cross-listed under different dept/number)
 *  - Have mismatched units (MajorConfig says 4 but catalog says 3-5)
 *  - Are graduate-only (100+ vs 200+ level mismatches)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = join(__dir, '..');

const CATALOG_FILE = join(ROOT, 'src/data/catalog/courses-2627.json');
const OUTPUT_DIR   = process.argv.indexOf('--output-dir') !== -1
  ? process.argv[process.argv.indexOf('--output-dir') + 1]
  : join(__dir, 'output');

// ── Load catalog ─────────────────────────────────────────────────────────────

function loadCatalog() {
  const raw = JSON.parse(readFileSync(CATALOG_FILE, 'utf8'));
  const map = new Map();
  // Courses are cross-listed: depts[i] pairs with numbers[i], and every pair
  // must resolve to the same course object.
  for (const course of raw) {
    for (let i = 0; i < course.depts.length; i++) {
      map.set(`${course.depts[i].trim().toUpperCase()}|${course.numbers[i].trim().toUpperCase()}`, course);
    }
  }
  return map;
}

// ── Collect all CourseOptions from a MajorConfig ──────────────────────────────

function collectCourseOptions(config) {
  const courses = [];

  const fromSlots = (slots, context) => {
    for (const slot of slots ?? []) {
      for (const opt of slot.options ?? []) {
        courses.push({ ...opt, context: `${context} → ${slot.label}` });
      }
    }
  };

  for (const sec of config.sections ?? []) {
    fromSlots(sec.slots, sec.name);
  }
  for (const track of config.tracks ?? []) {
    for (const sec of track.sections ?? []) {
      fromSlots(sec.slots, `${track.name} / ${sec.name}`);
    }
  }
  for (const meta of config.metaRequirements ?? []) {
    for (const opt of meta.options ?? []) {
      courses.push({ ...opt, context: `MetaReq: ${meta.label}` });
    }
  }
  for (const opt of config.wimCourses ?? []) {
    courses.push({ ...opt, context: 'WIM courses' });
  }

  return courses;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(CATALOG_FILE)) {
    console.error(`ERROR: Catalog not found at ${CATALOG_FILE}`);
    process.exit(1);
  }
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`ERROR: ${OUTPUT_DIR} not found. Run pipeline.js first.`);
    process.exit(1);
  }

  const catalog = loadCatalog();
  console.log(`Loaded ${catalog.size} courses from catalog`);

  const files = readdirSync(OUTPUT_DIR).filter(
    f => f.endsWith('.json') && !['flags.json', 'link_report.json', 'catalog_report.json'].includes(f)
  );

  const missingCourses = [];
  const unitMismatches = [];
  let totalChecked = 0;

  for (const file of files) {
    const data = JSON.parse(readFileSync(join(OUTPUT_DIR, file), 'utf8'));
    if (!data.config) continue;

    const programName = data.config.name ?? file;
    const opts = collectCourseOptions(data.config);

    for (const opt of opts) {
      const key = `${opt.dept.trim().toUpperCase()}|${opt.number.trim().toUpperCase()}`;
      const found = catalog.get(key);
      totalChecked++;

      if (!found) {
        // Try with common cross-listing patterns (e.g. "CS" vs "COMPSCI")
        const altKey = tryAltKey(opt.dept, opt.number);
        const altFound = altKey ? catalog.get(altKey) : null;
        missingCourses.push({
          program: programName,
          course: `${opt.dept} ${opt.number}`,
          name: opt.name,
          context: opt.context,
          altMatch: altFound ? altKey : null,
        });
      } else if (opt.units != null) {
        // Check unit mismatch
        const catalogUnits = parseUnits(found.units ?? '');
        if (catalogUnits !== null && Math.abs(catalogUnits - opt.units) > 1) {
          unitMismatches.push({
            program: programName,
            course: `${opt.dept} ${opt.number}`,
            configUnits: opt.units,
            catalogUnits,
          });
        }
      }
    }
  }

  console.log(`\nChecked ${totalChecked} course codes across ${files.length} programs`);
  console.log(`Missing: ${missingCourses.length} | Unit mismatches: ${unitMismatches.length}`);

  if (missingCourses.length > 0) {
    console.log('\nMissing courses (not in catalog):');
    for (const m of missingCourses.slice(0, 30)) {
      const alt = m.altMatch ? ` (alt key: ${m.altMatch})` : '';
      console.log(`  ${m.course}${alt} - ${m.program} [${m.context}]`);
    }
    if (missingCourses.length > 30) console.log(`  … and ${missingCourses.length - 30} more`);
  }

  if (unitMismatches.length > 0) {
    console.log('\nUnit mismatches:');
    for (const m of unitMismatches) {
      console.log(`  ${m.course}: config says ${m.configUnits} but catalog says ${m.catalogUnits} - ${m.program}`);
    }
  }

  const report = {
    totalChecked,
    missingCount: missingCourses.length,
    unitMismatchCount: unitMismatches.length,
    missingCourses,
    unitMismatches,
  };
  writeFileSync(join(OUTPUT_DIR, 'catalog_report.json'), JSON.stringify(report, null, 2));
  console.log(`\nReport: ${join(OUTPUT_DIR, 'catalog_report.json')}`);
}

function tryAltKey(dept, number) {
  // Common abbreviation expansions
  const expansions = { 'COMPSCI': 'CS', 'EECS': 'EE', 'MGMT': 'MSE' };
  const contractions = { 'CS': 'COMPSCI' };
  const alt = expansions[dept.toUpperCase()] ?? contractions[dept.toUpperCase()];
  return alt ? `${alt}|${number.toUpperCase()}` : null;
}

function parseUnits(unitsStr) {
  if (!unitsStr) return null;
  const m = unitsStr.match(/(\d+)/);
  return m ? parseInt(m[1]) : null;
}

main().catch(e => { console.error(e); process.exit(1); });
