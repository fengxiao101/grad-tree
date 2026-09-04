# Grad Tree - encoding pipeline

How Stanford degree programs get encoded into `MajorConfig` files, and the rules
that keep those encodings faithful to the bulletin.

Conventions for anyone working here, human or agent: do not commit or push
unless you have been asked to, and never re-fetch a bulletin page that is
already cached.

---

## Project overview

React 18 + TypeScript + Vite + Tailwind CSS single-page app for planning a Stanford 4-year degree.
Key stores: `src/store/usePlannerStore.ts` (Zustand v5 + persist).
Key data files: `src/data/majors/`, `src/data/minors/`, `src/data/cotermPrograms/`, schema at `src/data/majorSchema.ts`.

### UI text rules (apply everywhere: components and data file strings)
- **NEVER use `u` as a unit abbreviation** - always write ` units` (e.g. `4/6 units`, not `4/6u`)
- **NEVER use an em dash (the long dash) in user-facing text** - use a colon or a comma instead, e.g. `Path A: Public Policy Majors`

---

## Program coverage

93 programs are encoded: 39 majors, 34 minors and 20 co-terms. See Remaining work
below for what is left.

To find a program that is not yet covered, browse
**https://bulletin.stanford.edu/programs?page=1&pq=** across all its pages:

- **Majors and minors**: filter → Program Level = Undergraduate, deselect the rest
- **Coterms**: filter → Co-terminal = Yes, deselect Undergraduate

---

## Program encoding pipeline

### BEFORE encoding any major, minor, or coterm - mandatory pre-flight

Before writing a single line of TypeScript for any program, re-read and internalize:

1. **`ai_agents/encoding-mistakes.md`** - all known pitfalls from prior encodings
2. **`src/data/majorSchema.ts`** - slot fields are `options` (not `courses`), sections use `name` (not `label`)
3. **The checklist below** - totalMinUnits, WIM, capstone, double-count, no duplicate courses

Key things to verify before coding:
- `totalMinUnits` - always from the bulletin header, never summed from sections
- WIM - must come from explicit bulletin text, never inferred from course name suffixes (e.g. 191W)
- Capstone - list all options; mark with `optional: true` if pick-one-of-many
- No duplicate courses - do not encode the same course twice under different slot names/numbers
- Unit slots vs count slots - use `minUnits` alone when bulletin specifies a unit floor with no fixed course count; only add `count` when the bulletin explicitly says "take N courses"
- Slot type `pick-from-list` with both `count` and `minUnits` when bulletin requires both (e.g. "at least 5 courses totaling at least 15 units")
- Chemistry-style conditionals - encode as pick-one + optional dependent slot with note
- After writing the file, run `npm run programs:manifest` to regenerate the dropdown

### Cost-aware workflow - pick the right mode for the task

**Always read `ai_agents/encoding-mistakes.md` first, regardless of mode.**

---

#### Mode A - New program (no cache yet)
Spawn **one combined agent per program** that does all three phases: fetch → cache → TypeScript. Run multiple programs in parallel.

**Use subagent_type `claude` (the general agent) when you want one agent to do all three phases.** The specialised agents are deliberately split so that only the extractor can reach the network: the extractor fetches and writes the cache but never writes TypeScript, and the maker writes TypeScript but cannot fetch. Use them separately when you want that separation enforced, and the general agent when you would rather pay one agent's overhead.

```
Agent prompt: "Read encoding-mistakes.md first. The bulletin is a JS SPA - use 
preview_start to open [bulletin URL] in browser, wait ~3s, then get_page_text to read 
all content including footnotes. Do NOT use WebFetch. Write cache to 
course_sheets/{id}.cache.json IMMEDIATELY after reading (before any parsing). Then write 
src/data/{subfolder}/{id}.ts from the cache. No listUrl. totalMinUnits from header only.
The bulletin shows course numbers as readable text - extract dept+number directly, 
no ExploreCourses calls needed."
```

After all agents finish, optionally run program-checker (see Mode A-lite below for when to skip it).

**Cost: 1 fetch per program. Multiple programs run in parallel.**

#### Mode A-lite - Simple programs (≤ 8 slots, no tracks)
Same as Mode A but **skip the checker**. Programs with ≤ 8 slots and no tracks are small enough to verify visually in 30 seconds. Checker is only worth the cost for complex programs (EE-BS, CS-BS, CS-MS level).

#### Mode A-batch - Multiple small programs in one agent
For minors and simple BAs: give **one general (`claude`) agent 2–4 programs at once**. It fetches each, writes each cache, then writes each TS file. Pays the fixed agent overhead once.

```
Agent prompt: "Read encoding-mistakes.md first. The bulletin is a JS SPA - use 
preview_start + get_page_text (NOT WebFetch) for each URL. Encode these programs in 
sequence: [list]. For each: open bulletin URL in browser, read full text, write cache 
to course_sheets/{id}.cache.json, write src/data/{subfolder}/{id}.ts. No listUrl. 
totalMinUnits from header only."
```

**Cost: N fetches, 1 agent overhead. ~3× cheaper than N separate agents for small programs.**

---

#### Mode B - Re-audit existing program (cache exists)
Do it inline - no agents needed.

```
1. Read course_sheets/{id}.cache.json
2. Read src/data/majors/{id}.ts
3. Diff inline: totalMinUnits, section names, course sets per section, WIM, restrictions in notes
4. Edit the .ts file directly for any discrepancies found
```

**Cost: 2 file reads + targeted edits. Zero fetches.**

---

#### Mode C - Re-audit existing program (no cache)
Run program-extractor agent first to create the cache, then do Mode B inline.

**Cost: 1 fetch + 2 file reads.**

---

#### Agents available
- **program-extractor** - fetch once, save cache JSON (raw text + structured courses)
- **program-maker** - read cache, write TypeScript (no fetching)
- **program-checker** - JSON diff cache vs TypeScript (no fetching, cheap)
- **prereq-extractor** - reads prerequisite text from ExploreCourses into `course_sheets/prereq-db.json`
- **prereq-tagger** - validates prereq ordering in a plan; checks coterm/minor tags don't auto-count toward major

Cache files: `course_sheets/` (local only, not committed).
Mistake log: `ai_agents/encoding-mistakes.md` - read before every extraction.

---

#### Hard rules (all modes)
- **Bulletin URLs only** - always use `https://bulletin.stanford.edu/programs/{ID}/` as the source URL. Never use ExploreCourses, the CS dept site, or any other Stanford URL as the primary program source. Examples: `https://bulletin.stanford.edu/programs/MATSC-MIN/`, `https://bulletin.stanford.edu/programs/MGTSC-MS/`
- **Bulletin is a JS SPA - use browser tools, not WebFetch** - `bulletin.stanford.edu` is a CourseDog-powered SPA that requires JavaScript to render. `WebFetch` returns an empty shell. To read it: call `preview_start {url: "https://bulletin.stanford.edu/programs/{ID}/"}` to open a browser tab, wait ~3s for JS to render, then call `read_page` or `get_page_text` to extract the full rendered content. Do NOT try WebFetch, do NOT try to find an API endpoint - just open in browser and read.
- **No `listUrl`** - encode all courses inline; if a list is behind a link, use `any-approved` + `options: []` + note with URL
- **`totalMinUnits` from bulletin header only** - never sum sections
- **WIM from explicit bulletin text** - never infer from course name suffixes
- **Never re-fetch** if a cache file already exists
- **Checker is a diff, not a re-read** - it only reads the two files, never the bulletin
- **Write cache first** - always write `course_sheets/{id}.cache.json` immediately after fetching, before any parsing or TS writing. If the agent crashes mid-parse, the cache survives and Mode B can finish the job without re-fetching.
- **Bulletin text is already readable - no ExploreCourses needed** - bulletin.stanford.edu renders course numbers as plain text (e.g. "CS 161 Design and Analysis of Algorithms"). Extract `{ dept: 'CS', number: '161' }` directly. Never call ExploreCourses at any point during encoding - the app's course card popup does its own live lookup at display time.

### Naming convention
- File: `src/data/majors/{dept}-{degree}-2526.ts` - e.g. `cs-bs-2526.ts`, `humbi-bs-2526.ts`
- Export const: `{DEPT}_{DEGREE}_2526` - e.g. `HUMBI_BS_2526`, `POLISCI_BA_2526`
- `id` field: `'{dept}-{degree}-2526'` - e.g. `'humbi-bs-2526'`

### To add a new program to the dropdown
1. Create the file in the correct subfolder (`majors/`, `minors/`, `cotermPrograms/`)
2. Import it in the corresponding `index.ts` and add to the `BUILT_IN_*` array
3. Add its dept-prefix → dept-abbreviation entry to `DEPT_KEYWORD` in `src/components/major/programOptions.ts` if the abbreviation differs from the id prefix

### MajorConfig schema (see `src/data/majorSchema.ts` for full spec)
```ts
{
  id, name, school, year,
  category: 'major' | 'minor' | 'coterm',
  totalMinUnits: number,
  sections: MajorSection[],
  tracks?: Track[],
  wimCourses?: CourseRef[],
  metaRequirements?: MetaReq[],
}
```
Section slot types: `'required' | 'pick-one' | 'pick-from-list' | 'any-approved'`
Use `optional: true` on a slot when it's one-of-many capstone options.
Use `allowDoubleCount: true` on a section when the bulletin explicitly permits double-counting.

---

## Maker agent - lessons learned

### BEFORE writing any code, do ALL of these:
1. **Read the entire bulletin page** including footnotes, restriction tables, and any "notes" sections below the main requirements. Critical rules are almost always in footnotes.
2. **Note `totalMinUnits` first** - it's in the bulletin header. Don't guess from section sums.
3. **Look up all core course series** - don't assume course numbers. Old numbers become obsolete (BIO 82/83/84 → BIO 87-95 BioFoundations; HUMBIO 101-104 → 118A/B, 120A/B, 125A/B).
4. **Find all WIM courses** - search the bulletin for "WIM" and "Writing in the Major" explicitly. Don't infer from course names.
5. **Find all capstone options** - usually listed at the bottom of the bulletin page. Note whether it's "pick 1 of N" or all required.
6. **Record every double-counting restriction** - which courses can or can't overlap with other majors, minors, or coterms.

### Common mistakes to avoid

These apply to any program. Mistakes specific to one program, such as the EE-BS
core or the HumBio capstone, live in `ai_agents/encoding-mistakes.md`.

| Mistake | Correct approach |
|---|---|
| Adding `count` to unit-based slots | Use `minUnits` alone when the bulletin specifies a unit minimum with no fixed course count. Only add `count` when the bulletin explicitly requires a specific number of courses (e.g. "take 4 of the 6", "≥3 courses"). Never infer a count from units ÷ 3. |
| Assuming a dept has only one degree type | Many depts have separate BA **and** BS programs with different requirements (e.g. ECON-BA vs ECON-BS, STS-BA vs STS-BS). Always confirm which degree is being encoded; never merge or assume they share requirements. Separate files: `econ-ba-2526.ts` and `econ-bs-2526.ts`. |
| Guessing `totalMinUnits` from section sums | Read the bulletin header directly |
| Using outdated course numbers | The bulletin shows current course numbers - read the page text carefully |
| Assuming WIM = courses with 191W/194W suffix | Find the explicit WIM list in the bulletin |
| Treating optional capstone tracks as major sections | Mark capstone slots with `optional: true` |
| Using a dead `listUrl` instead of listing courses | If bulletin shows courses inline, encode them all - no listUrl |

### Priority checklist for every program

- [ ] `totalMinUnits` - confirmed from bulletin header
- [ ] Core required courses - course numbers verified current
- [ ] WIM courses - explicitly identified, not inferred
- [ ] Statistics requirement - including what's excluded
- [ ] Capstone - all options listed, correct course numbers
- [ ] Double-counting rules - noted in section `note` field
- [ ] Honors requirements - GPA cutoffs, application deadlines
- [ ] Grade requirements - usually C- minimum; note any exceptions

### When to run the checker

Run program-checker **after** the maker completes, for complex programs only:
- Any program with tracks (EE-BS, CS-BS, CS-MS etc.)
- Any program with ≥ 10 slots
- Any program where course numbers were ambiguous during extraction

**Skip the checker** for simple programs (minors, small BAs with ≤ 8 slots, no tracks). Visual inspection of the TS file is faster.

Checker reads cache + TS only - never the bulletin.

Checker must flag:
- `totalMinUnits` off by even 1
- Any section/slot with wrong course numbers
- Missing WIM section or wrong WIM courses
- Missing capstone options
- Double-counting rules not encoded in `note` fields
- Courses excluded by the bulletin that appear in approved lists

### Writing well-organized code

- **Extract shared course lists as `const` arrays** at the top of the file (e.g., `GENERAL_ELECTIVES`, `TRACK_B_OPTIONS`) and reference them from multiple slots - avoids repeating the same 50-course array per track
- Group related slots into named sections with clear `note` fields
- Don't repeat the program name in every slot label
- Use `any-approved` + `options: []` + URL in `note` when the approved list is too large to enumerate AND the bulletin itself doesn't list them inline. Encode inline when the bulletin gives a finite list (even 80+ courses).
- For tracks: only create `tracks[]` when the bulletin has named/fixed specialization tracks. Student-designed concentrations = no tracks.

### Minor-specific schema patterns

Recorded in `ai_agents/encoding-mistakes.md` under Schema / UI patterns:
trackSelector sections, consolidating elective slots, `phase: 'pre-major'`,
the "N of M areas" shape, and how tagged overflow courses count.

---

## Program encoding notes

`src/data/programManifest.generated.ts` is the authoritative list of what is
encoded. This section records only the programs whose structure is unusual
enough to be worth knowing before re-auditing them.

### Majors

| Program | File | Structure |
|---|---|---|
| MS&E BS | `mse-bs-2526.ts` | flat, depth F&D/O&A/OTP + 2 additional |
| Biomedical Computation BS | `bioc-bs-2526.ts` | 4 concentration tracks |
| Chemistry BS | `chem-bs-2526.ts` | 2 pathway tracks: Traditional + Biological Chemistry; WIM=CHEM131, Capstone=CHEM185 |
| Materials Science BS | `matsci-bs-2526.ts` | 9 focus area tracks + self-defined; WIM from MATSCI160/161/162/164 depth labs; 3 capstone tracks |
| Design BS | `design-bs-2526.ts` | 3 Methods tracks, 4 domains |
| STS BA | `sts-ba-2526.ts` | 6 pathway tracks; pathway core encoded inline, depth any-approved; BA list approx. from BS bulletin |
| STS BS | `sts-bs-2526.ts` | 6 pathway tracks; pathway core encoded inline, depth any-approved; exact from BS bulletin |
| International Relations BA | `ir-ba-2526.ts` | 11 pathways as any-approved, full core + capstone |
| Data Science BS | `datasci-bs-2526.ts` | 4 subplan tracks: Math&Comp, Bio&Med, Comp Neuro, Quant Finance |
| Earth Systems BS | `earthsys-bs-2526.ts` | 8 subplan tracks: Biosphere, Energy S&T, Env Geoscience, Human Env Systems, Land Systems, OAC, Sust Food & Ag, Sust Societies & Env |
| History BA | `history-ba-2526.ts` | Sources & Methods, Doing History, pre-1700, concentration any-approved, WIM 209S, capstone 3 options |
| Communication BA | `comm-ba-2526.ts` | core 3 courses, Area I+II 4 total, WIM, pre-approved non-COMM electives, capstone 3 options |
| English BA | `english-ba-2526.ts` | 5 fields of study: Literature, CW Prose, CW Poetry, Interdisciplinary, Lit&Phil, CCA; WIM=5XX WISE seminars; 5 capstone options |
| Sociology BA | `socio-ba-2526.ts` | 2 tracks: Standard BA + DSMM subplan; 5 foundation areas pick-3; WIM=SOC 202 or 204A |
| Public Policy BA | `publpol-ba-2526.ts` | 14 concentration tracks; prep/core/WIM/capstone sections; PUBLPOL 200H satisfies both WIM+capstone |
| Aeronautics & Astronautics BS | `aa-bs-2526.ts` | math 24u with 3 pick-ones + optional, science 17u, TiS, ENGR fund, 11 depth courses, focus electives ≥9u, Spacecraft/Aircraft capstone+WIM track |
| Chemical Engineering BS | `chemeng-bs-2526.ts` | math CME100 or MATH51+52, CHEM+PHYS science, TiS pick-from-list, 11 depth courses; WIM=185A, Capstone=185B |

### Minors

| Program | File | Structure |
|---|---|---|
| Ethics in Society | `ethso-minor-2526.ts` | 2 tracks |
| Creative Writing | `crwrit-minor-2526.ts` | 3 tracks |
| Human Biology | `humbi-minor-2526.ts` | 4 tracks |
| International Relations | `intlr-minor-2526.ts` | 11 pathway tracks |
| Symbolic Systems | `symbo-minor-2526.ts` | 2 option tracks |
| Mechanical Engineering | `me-minor-2526.ts` | 3 option tracks |
| Sociology | `socio-minor-2526.ts` | 2 tracks: Traditional + PIP |
| Anthropology | `anthro-minor-2526.ts` | advisor-driven, any-approved |
| Human Rights | `humrts-minor-2526.ts` | 3-stream breadth |

### Coterms

| Program | File | Structure |
|---|---|---|
| CME MS | `cme-ms-2526.ts` | 4 tracks: General CME, Data Science, Imaging Science, MCF |
| International Policy MA | `intlpol-ma-2526.ts` | 4 subplan tracks: Cyber, ENRE, GovDev, ISEC |
| Public Policy MA | `publpol-ma-2526.ts` | 3 path tracks: Path A/PP major, Path B/Econ major, Path C/others |
| Biology MS | `bio-ms-2526.ts` | advisor-designed, any-approved |
| Design MS | `design-ms-2526.ts` | 3 Methods tracks: Physical Form, Emerging Tech, Human Behavior |
| Communication MA | `comm-ma-2526.ts` | 2 subplan tracks: Media Studies, Journalism |
| History MA | `history-ma-2526.ts` | advisor-designed, 9 courses / 7 HISTORY |
| Sociology MA | `socio-ma-2526.ts` | SOC270 + SOC280A required, advisor-designed rest |
| Symbolic Systems MS | `symbo-ms-2526.ts` | 4 breadth areas + seminar×3 + thesis |
## Remaining work

Every program in the queue has been encoded: 39 majors, 34 minors and 20
co-terms, all listed above. Two items are left.

**Engineering BS.** Never encoded. The bulletin ID was not confirmed; check
whether the program is `ENGR-BS` or `ENGPHYS-BS` before starting.

**Optional elective enumeration.** CS MS, AA MS, ChemEng MS and BioE MS each
carry one or two `any-approved` elective slots with `options: []`. That is the
documented pattern where the bulletin gives no finite list, so they work as
intended and render as Search and add slots. Enumerating the lists would only
make the picker more helpful.

Confirm a bulletin ID by opening `https://bulletin.stanford.edu/programs/{ID}/`
rather than guessing from the department abbreviation: several differ from the
obvious form, such as `DATSC-BS`, `INPOL-MA` and `PUBPO-MA`.

## Prereq parsing pipeline (scripts/)

Three-script chain: `parse_catalog.py` → `build_prereq_groups.py` → `apply_prereq_corrections.py`

`parse_catalog.py` extracts `prerequisites` text inline; the former `extract_prereqs.py` was merged into it and removed. Both the full and core JSON files get the `prerequisites` field. `build_prereq_groups.py` reads core+full (2627 paths), writes `prereqGroups` to the core file, and emits `flagged_prereqs.json` for AI review.

### Known parser weaknesses / edge cases (from 2526 AI review)

These patterns cause incorrect `prereqGroups` output and require AI review after each pipeline run.

**Spurious course codes from non-prereq text:**
- Phone numbers in admin text: "650-723-1549" → ROOM 111, MUSIC 650, MUSIC 723 (clerkship courses)
- Period ranges: "PERIODS AVAILABLE: 2-12" → DERM 12 (medical school rotations)
- Building addresses, room codes, and admin annotations generate phantom dept+number pairs

**OR vs AND grouping errors:**
- Comma list ending in "or": "MATH 51, 52, or 53" should be ONE OR group, not 51-AND-52-OR-53
- "one of X, Y, Z" pattern: the entire list is one OR group
- Slash notation: "CME 102/ME 300A" = OR (not two separate AND requirements)
- "DEPT 105/205" cross-listed pairs: = OR
- Language course alternates: "SPANLANG 13 or 23B" = OR; "MUSIC 65A/65AZ" = OR

**Dept name normalization failures:**
- "PHYSICS" → should be "PHYS"; "ECONOMICS" → "ECON" (the full English name appears in prose)
- "LING" vs "LINGUIST": prereq text may say "LING 250" when the dept code is "LING"
- "physical chemistry (171)" → should be CHEM 171, not CHEMENG 171 (context-dependent dept)

**Bare number continuation:**
- "MATH 19, 20, 21" → all inherit MATH dept (works)
- Bug: "AA 146A" had spurious "AA 21" from MATH continuation bleeding across dept boundary

**Non-prereq text mistakenly parsed:**
- "Recommended Prerequisite" sections: if entire prereq block is recommended, result should be `[]`
- Corequisite sentences ("may be taken concurrently"): skip, don't add to prereqGroups
- "(formerly 188)" parentheticals: annotation, not a real prereq
- Visiting/clerkship admin text: "VISITING: Open to visitors. TYPE OF CLERKSHIP:" generates spurious codes
- Equivalence sentences: "X is equivalent to Y" → skip entirely
- "course X is a requirement for Y" admin info → skip

**Range notation:**
- "ECON 202-204" should expand to ECON 202, ECON 203, ECON 204 (parser only gets 202 and 204, misses 203)

**Nested OR that can't perfectly flatten:**
- "Math 61CM, or 52 and (56 or 115)" → best AND-of-ORs: (61CM OR 52) AND (61CM OR 56 OR 115)
- "(CME 100, CME 102) or (MATH 51, MATH 53)" → paired OR

**"May substitute for" patterns:**
- "X may substitute for Y" → X becomes OR option in the group that contains Y
- "students may take X as a substitute for Y" → same

**Courses with only visiting-student prereqs:**
- "PEDS 303A": prereq includes "MEDICINE 300A for visiting students only" - strip to Stanford-only prereq

---

## Tech notes

- **Tailwind JIT**: use exact class strings, never concatenate (e.g. `text-${color}-500` breaks)
- **Zustand selectors**: always select minimal state; avoid selecting the whole store object
- **Dropdown search**: `SearchableSelect` in `src/components/major/ProgramSelector.tsx` - accepts `options[]` with `{ value, label, keywords, group }`. `keywords` string is searched alongside `label`. Dept abbreviations are in `DEPT_KEYWORD` map.
- **Stanford Bulletin**: bulletin.stanford.edu pages render course numbers as readable text (e.g. "CS 161 Design and Analysis of Algorithms") - extract dept+number directly, no ExploreCourses lookups needed.
