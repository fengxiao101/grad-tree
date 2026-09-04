#!/usr/bin/env node
/**
 * Stanford program hardcoding pipeline.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-… node scripts/pipeline.js [--program <id>] [--wave <n>]
 *
 * Reads:  scripts/data/programs.json   (from enumerate.py)
 * Writes: scripts/output/<id>.json     (parsed MajorConfig)
 *         scripts/output/flags.json    (all flags across all programs)
 *
 * Flow per program:
 *   1. Fetch bulletin HTML + follow all external approved-course links
 *   2. Agent A: parse → MajorConfig JSON + flags[]
 *   3. Agent B: independently validate A's output + flag discrepancies
 *   4. Merge flags, write output
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

const PROGRAMS_FILE = join(__dir, 'data', 'programs.json');
const OUTPUT_DIR    = join(__dir, 'output');
const FLAGS_FILE    = join(OUTPUT_DIR, 'flags.json');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── HTML fetcher ─────────────────────────────────────────────────────────────

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};

async function fetchHtml(url, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        signal: AbortSignal.timeout(20_000),
      });
      if (res.status === 405 || res.status === 429) {
        // Rate limited - wait longer before retry
        const wait = 5000 * (attempt + 1);
        console.log(`    Rate limited (${res.status}), waiting ${wait/1000}s…`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const text = await res.text();
      if (text.includes('Human Verification')) throw new Error('Bot detection triggered');
      return text;
    } catch (e) {
      if (attempt === retries) throw e;
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
}

/** Extract all hrefs from <a> tags that point to external approved-course lists. */
function extractApprovedListUrls(html) {
  const urls = new Set();
  // Common approved-list hosts
  const patterns = [
    /href="(https?:\/\/ughb\.stanford\.edu[^"]+)"/g,
    /href="(https?:\/\/pwr\.stanford\.edu[^"]+)"/g,
    /href="(https?:\/\/engineering\.stanford\.edu\/students-academics\/majors[^"]+)"/g,
    // Relative bulletin links to other pages (e.g. approved-course lists embedded in bulletin)
    /href="(https?:\/\/bulletin\.stanford\.edu\/courselist[^"]+)"/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) urls.add(m[1]);
  }
  return [...urls];
}

/** Fetch a page and return a text summary suitable for inclusion in a prompt. */
async function fetchPageText(url) {
  try {
    const html = await fetchHtml(url);
    // Strip tags, collapse whitespace
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    return { url, text: text.slice(0, 8000) }; // cap per-page to avoid context overflow
  } catch (e) {
    return { url, error: e.message };
  }
}

// ── Agent A prompt ────────────────────────────────────────────────────────────

function agentAPrompt(program, bulletinText, approvedListPages) {
  const approvedListsSection = approvedListPages.length > 0
    ? `\n\n## External Approved-Course Pages\n\nI have fetched these pages that were linked from the bulletin. Parse the course lists from them and use them to populate the relevant slot's \`options[]\`:\n\n${
        approvedListPages.map(p =>
          p.error
            ? `### ${p.url}\nFETCH ERROR: ${p.error}`
            : `### ${p.url}\n${p.text}`
        ).join('\n\n---\n\n')
      }`
    : '';

  return `You are parsing a Stanford academic program requirement sheet into a structured JSON format.

## Program
- Name: ${program.name}
- URL: ${program.url}
- Category: ${program.category} (one of: major, minor, coterm)

## Bulletin HTML (text-stripped)
${bulletinText.slice(0, 15000)}
${approvedListsSection}

## Output Schema
Produce a JSON object with exactly this shape:

\`\`\`typescript
interface CourseOption {
  dept: string;    // e.g. "CS", "MATH"
  number: string;  // e.g. "107E", "224N"
  name?: string;
  units?: number;
}

type SlotType = 'required' | 'pick-one' | 'pick-from-list' | 'any-approved';

interface Slot {
  id: string;           // kebab-case, unique within program, e.g. "math-51"
  label: string;        // human label, e.g. "Linear Algebra & Differential Calculus"
  type: SlotType;
  options: CourseOption[];
  count?: number;       // pick-from-list: how many to fill
  minUnits?: number;
  minLevel?: 100 | 200 | 300;  // course must be at this level or higher
  optional?: boolean;
  note?: string;        // copy explanatory text, caveats, asterisks from bulletin
  listUrl?: string;     // keep original URL even when options[] is populated
  mutuallyExclusive?: string[];
}

interface MajorSection {
  id: string;
  name: string;
  minUnits?: number;
  maxOverlapUnits?: number;
  allowDoubleCount?: boolean;
  phase?: 'pre-major' | 'major';  // use 'pre-major' for prerequisites to declare
  trackSelector?: boolean;
  note?: string;
  slots: Slot[];
}

interface Track {
  id: string;
  name: string;
  minUnits?: number;
  sections: MajorSection[];
}

interface MetaRequirement {
  id: string;
  label: string;
  note?: string;
  listUrl?: string;
  options: CourseOption[];  // courses that qualify; populate from linked pages
  minCount: number;
}

interface MajorConfig {
  id: string;            // kebab-case program id, e.g. "cs-bs"
  name: string;
  school: string;
  year: string;          // "2025-26"
  category: 'major' | 'minor' | 'coterm';
  totalMinUnits?: number;
  sections: MajorSection[];
  tracks?: Track[];
  metaRequirements?: MetaRequirement[];
  wimCourses?: CourseOption[];  // WIM-approved courses for this program
}
\`\`\`

## Critical parsing rules

### READ ALL TEXT - including footnotes, asterisks, and introductory paragraphs
- Requirements hidden in footnotes or asterisks are REAL requirements - encode them as slots with note fields
- Introductory paragraphs may describe prerequisites or unit minimums - capture them

### Slot types
- \`required\`: exactly one specific course, e.g. CS 106B
- \`pick-one\`: 2-5 equivalent alternatives, student picks one
- \`pick-from-list\`: student picks N courses from a longer list (use count field)
- \`any-approved\`: no fixed list, student picks from an external approved list

### IMPORTANT: Follow external links
- When the bulletin says "approved course list" or links to ughb.stanford.edu, pwr.stanford.edu, etc.:
  - If I have fetched that page (see External Approved-Course Pages above): parse the courses from it and put them in \`options[]\`; set \`type: "pick-from-list"\` (not "any-approved"); still set \`listUrl\`
  - If the page is NOT fetched: use \`type: "any-approved"\` and set \`listUrl\`
- Technology in Society (TiS): this is a single-course requirement embedded in engineering majors (NOT a standalone program). The approved course list is at https://ughb.stanford.edu/courses/tech-in-society. Parse it into options[].
- WIM (Writing in Major): each major has its own WIM-approved list. Capture these in \`wimCourses[]\` on the MajorConfig AND as a slot in the relevant section.

### Notes and explanatory text
- Copy any clarifying text, exceptions, asterisk footnotes, or caveats into \`note\` on the relevant slot or section
- Example: "* CS 106B may not be used if you took CS 106X" → note on the cs-106b slot

### Tracks and concentrations
- If the program has named tracks/concentrations/specializations, use \`tracks[]\` on MajorConfig
- The section with \`trackSelector: true\` has no slots of its own; tracks are selected inside it
- CS specializations (AI, Systems, etc.) are tracks, not separate programs

### Pre-major vs major
- Sections listing prerequisites to declare the major: set \`phase: "pre-major"\`
- These are typically labeled "Foundation", "Prerequisites", "Required before declaration"

### MetaRequirements
- Cross-section requirements that can be satisfied by ANY course in the program (e.g. "Significant Implementation Experience" for CS coterm, or "Ethics" breadth)
- Set \`minCount\` to how many qualifying courses are needed (usually 1)

### Units
- If the bulletin says "at least X units from the following": set \`minUnits: X\` on the section
- If it says "at least X units at the 200+ level": set \`minUnits: X\` and \`minLevel: 200\` on the section
- If a single slot requires at least X units (e.g. senior project ≥ 3 units): set \`minUnits: X\` on the slot

### Double-counting
- \`allowDoubleCount: true\` on a section means those courses can ALSO count for another program's requirements
- Foundation/math/science sections often allow this for double-counting with general requirements
- Set \`maxOverlapUnits\` when the program caps how many units may overlap with another program

## Output format

Return a JSON object with two keys:
\`\`\`json
{
  "config": { ...MajorConfig... },
  "flags": [
    "FLAG: <description of ambiguity, missing info, or parsing assumption made>"
  ]
}
\`\`\`

Flags should note: ambiguous wording, links you could not follow, courses not in standard dept+number format, unusual requirements, anything that needs human review.

DO NOT return any text outside the JSON object.`;
}

// ── Agent B prompt ────────────────────────────────────────────────────────────

function agentBPrompt(program, bulletinText, approvedListPages, agentAConfig) {
  const approvedListsSection = approvedListPages.length > 0
    ? `\n\n## External Approved-Course Pages\n${
        approvedListPages.map(p =>
          p.error ? `### ${p.url}\nFETCH ERROR: ${p.error}` : `### ${p.url}\n${p.text}`
        ).join('\n\n---\n\n')
      }`
    : '';

  return `You are independently validating a parsed Stanford program requirement sheet.

## Program
- Name: ${program.name}
- URL: ${program.url}
- Category: ${program.category}

## Bulletin HTML (text-stripped)
${bulletinText.slice(0, 15000)}
${approvedListsSection}

## Agent A's Parsed Output
\`\`\`json
${JSON.stringify(agentAConfig, null, 2).slice(0, 8000)}
\`\`\`

## Your task

Read the bulletin text INDEPENDENTLY and carefully, including:
- ALL paragraphs (introductions, conclusions, notes)
- ALL footnotes, asterisks, and fine print
- ALL tables and lists
- ALL linked external pages that were fetched above

Then compare your independent reading to Agent A's JSON and flag any discrepancy.

Check specifically:
1. **Missing requirements** - is there a requirement in the bulletin that Agent A missed?
2. **Wrong slot type** - should a slot be pick-from-list instead of any-approved (or vice versa)?
3. **Missing courses** - does Agent A's options[] omit courses that appear in the bulletin or linked pages?
4. **Missing notes** - are there asterisks, footnotes, or caveats that Agent A didn't capture in note fields?
5. **Unit errors** - is minUnits correct? Did A miss a "minimum X units" requirement?
6. **Phase errors** - prerequisites to declare marked as 'major' instead of 'pre-major' (or vice versa)?
7. **WIM courses** - if this is a major, does Agent A have wimCourses[]? Are they correct?
8. **MetaRequirements** - are there cross-cutting requirements (like "Significant Implementation Requirement") that A missed?
9. **Track errors** - if tracks exist, did A capture them correctly?
10. **TiS requirement** - if this is an engineering major, does it have a Technology in Society requirement? Did A capture it with actual courses (not just any-approved)?
11. **Double-counting** - are allowDoubleCount flags correct?

## Output format

Return ONLY a JSON object:
\`\`\`json
{
  "verdict": "PASS" | "FAIL",
  "flags": [
    "FLAG: <specific discrepancy or missing item>"
  ],
  "patch": {
    // Optional: if small corrections are obvious, suggest them here as a partial MajorConfig patch
    // e.g. { "wimCourses": [...], "sections[0].minUnits": 45 }
    // Leave empty {} if no patch or if changes are too large
  }
}
\`\`\`

If verdict is PASS, flags may be empty. If FAIL, list every discrepancy you found.
DO NOT return any text outside the JSON object.`;
}

// ── Per-program processor ─────────────────────────────────────────────────────

async function processProgram(program) {
  const outFile = join(OUTPUT_DIR, `${program.id ?? toId(program.name)}.json`);

  // Skip already-processed programs unless --force
  if (!process.argv.includes('--force') && existsSync(outFile)) {
    const existing = JSON.parse(readFileSync(outFile, 'utf8'));
    console.log(`  SKIP (already done): ${program.name}`);
    return existing;
  }

  console.log(`\n→ Processing: ${program.name}`);
  console.log(`  URL: ${program.url}`);

  // 1. Fetch bulletin + approved-list pages
  let bulletinHtml;
  try {
    bulletinHtml = await fetchHtml(program.url);
  } catch (e) {
    const result = { program, error: `fetch failed: ${e.message}`, flags: [`FLAG: Could not fetch bulletin page: ${e.message}`] };
    writeResult(outFile, result);
    return result;
  }

  const bulletinText = htmlToText(bulletinHtml);
  const approvedUrls = extractApprovedListUrls(bulletinHtml);
  console.log(`  Approved-list links found: ${approvedUrls.length}`);

  const approvedListPages = await Promise.all(approvedUrls.map(fetchPageText));

  // 2. Agent A: parse
  let parseResult;
  try {
    const aResponse = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 8192,
      messages: [{ role: 'user', content: agentAPrompt(program, bulletinText, approvedListPages) }],
    });
    parseResult = JSON.parse(extractJson(aResponse.content[0].text));
    console.log(`  Agent A: ${parseResult.flags?.length ?? 0} flags`);
  } catch (e) {
    const result = { program, error: `Agent A failed: ${e.message}`, flags: [`FLAG: Agent A parse error: ${e.message}`] };
    writeResult(outFile, result);
    return result;
  }

  // 3. Agent B: validate
  let validationResult;
  try {
    const bResponse = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      messages: [{ role: 'user', content: agentBPrompt(program, bulletinText, approvedListPages, parseResult.config) }],
    });
    validationResult = JSON.parse(extractJson(bResponse.content[0].text));
    console.log(`  Agent B: ${validationResult.verdict} - ${validationResult.flags?.length ?? 0} flags`);
  } catch (e) {
    validationResult = { verdict: 'ERROR', flags: [`FLAG: Agent B validation error: ${e.message}`], patch: {} };
  }

  // 4. Merge flags
  const allFlags = [
    ...(parseResult.flags ?? []),
    ...(validationResult.flags ?? []),
  ];

  const result = {
    program,
    config: parseResult.config,
    verdict: validationResult.verdict,
    patch: validationResult.patch ?? {},
    flags: allFlags,
    needsReview: validationResult.verdict === 'FAIL' || allFlags.length > 0,
  };

  writeResult(outFile, result);
  return result;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function htmlToText(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<(br|p|li|tr|h[1-6]|div)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function toId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractJson(text) {
  // Strip markdown code fences if present
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  // Find first { to last }
  const start = text.indexOf('{');
  const end   = text.lastIndexOf('}');
  if (start !== -1 && end !== -1) return text.slice(start, end + 1);
  return text;
}

function writeResult(file, result) {
  writeFileSync(file, JSON.stringify(result, null, 2));
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ERROR: Set ANTHROPIC_API_KEY environment variable');
    process.exit(1);
  }

  if (!existsSync(PROGRAMS_FILE)) {
    console.error(`ERROR: ${PROGRAMS_FILE} not found. Run scripts/enumerate.py first.`);
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const allPrograms = JSON.parse(readFileSync(PROGRAMS_FILE, 'utf8'));

  // CLI filters
  const programFilter = process.argv.indexOf('--program');
  const programs = programFilter !== -1
    ? allPrograms.filter(p => p.name.toLowerCase().includes(process.argv[programFilter + 1].toLowerCase()))
    : allPrograms;

  console.log(`Processing ${programs.length} programs…`);

  const allFlags = [];
  let passed = 0, failed = 0, errors = 0;

  // Process concurrently in batches of 3 (API rate limits)
  const BATCH = 3;
  for (let i = 0; i < programs.length; i += BATCH) {
    const batch = programs.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(p => processProgram(p).catch(e => ({
      program: p, error: e.message, flags: [`FLAG: Unhandled error: ${e.message}`],
    }))));

    for (const r of results) {
      if (r.error) errors++;
      else if (r.verdict === 'PASS') passed++;
      else failed++;

      if (r.flags?.length) {
        allFlags.push({ program: r.program?.name, flags: r.flags });
      }
    }

    // Print wave summary every BATCH
    console.log(`\n── Batch ${Math.floor(i / BATCH) + 1} summary: ${passed} PASS, ${failed} FAIL, ${errors} ERROR ──`);
  }

  // Write consolidated flags
  writeFileSync(FLAGS_FILE, JSON.stringify(allFlags, null, 2));

  console.log(`\n═══ COMPLETE ═══`);
  console.log(`  PASS:   ${passed}`);
  console.log(`  FAIL:   ${failed}`);
  console.log(`  ERROR:  ${errors}`);
  console.log(`  Flags:  ${allFlags.reduce((n, f) => n + f.flags.length, 0)}`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Flags:  ${FLAGS_FILE}`);
}

main().catch(e => { console.error(e); process.exit(1); });
