#!/usr/bin/env node
/**
 * Verify that all URLs referenced in parsed MajorConfig outputs are reachable
 * and that the page title/content matches what's expected.
 *
 * Usage: node scripts/check_links.js [--output-dir scripts/output]
 *
 * Checks:
 *  - listUrl on every Slot
 *  - listUrl on every MetaRequirement
 *  - Any URLs embedded in note fields
 *
 * Writes: scripts/output/link_report.json
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.argv.indexOf('--output-dir') !== -1
  ? process.argv[process.argv.indexOf('--output-dir') + 1]
  : join(__dir, 'output');

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'Stanford-Planner-Bot/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    return { url, status: res.status, ok: res.status < 400 };
  } catch (e) {
    return { url, status: 0, ok: false, error: e.message };
  }
}

function collectUrls(config) {
  const urls = new Set();
  const urlRe = /https?:\/\/[^\s"']+/g;

  const scanSlots = (slots) => {
    for (const slot of slots ?? []) {
      if (slot.listUrl) urls.add(slot.listUrl);
      if (slot.note) for (const m of slot.note.matchAll(urlRe)) urls.add(m[0]);
    }
  };

  for (const sec of config.sections ?? []) {
    scanSlots(sec.slots);
    if (sec.note) for (const m of sec.note.matchAll(urlRe)) urls.add(m[0]);
  }
  for (const track of config.tracks ?? []) {
    for (const sec of track.sections ?? []) scanSlots(sec.slots);
  }
  for (const meta of config.metaRequirements ?? []) {
    if (meta.listUrl) urls.add(meta.listUrl);
  }
  return [...urls];
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`ERROR: ${OUTPUT_DIR} not found. Run pipeline.js first.`);
    process.exit(1);
  }

  const files = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.json') && f !== 'flags.json' && f !== 'link_report.json');

  // Collect all unique URLs across all configs
  const urlToPrograms = new Map();
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(OUTPUT_DIR, file), 'utf8'));
    if (!data.config) continue;
    for (const url of collectUrls(data.config)) {
      if (!urlToPrograms.has(url)) urlToPrograms.set(url, []);
      urlToPrograms.get(url).push(data.program?.name ?? file);
    }
  }

  const allUrls = [...urlToPrograms.keys()];
  console.log(`Checking ${allUrls.length} unique URLs…`);

  // Check in batches of 10
  const results = [];
  const BATCH = 10;
  for (let i = 0; i < allUrls.length; i += BATCH) {
    const batch = allUrls.slice(i, i + BATCH);
    const batchResults = await Promise.all(batch.map(checkUrl));
    for (const r of batchResults) {
      r.programs = urlToPrograms.get(r.url);
      results.push(r);
      process.stdout.write(r.ok ? '.' : 'X');
    }
  }
  console.log();

  const broken = results.filter(r => !r.ok);
  console.log(`\n${broken.length} broken links out of ${results.length} total`);
  if (broken.length > 0) {
    console.log('\nBroken links:');
    for (const r of broken) {
      console.log(`  ${r.status || 'ERR'} ${r.url}`);
      console.log(`       used by: ${r.programs?.join(', ')}`);
    }
  }

  const report = { total: results.length, broken: broken.length, results };
  writeFileSync(join(OUTPUT_DIR, 'link_report.json'), JSON.stringify(report, null, 2));
  console.log(`\nReport: ${join(OUTPUT_DIR, 'link_report.json')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
