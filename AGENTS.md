# Stanford Course Planner - AGENTS.md

## Project overview

React 18 + TypeScript + Vite + Tailwind CSS single-page app for planning a Stanford 4-year degree.
Key stores: `src/store/usePlannerStore.ts` (Zustand v5 + persist).
Key data files: `src/data/majors/`, `src/data/minors/`, `src/data/cotermPrograms/`, schema at `src/data/majorSchema.ts`.

---

## Program encoding pipeline

### Naming convention
- File: `src/data/majors/{dept}-{degree}-2526.ts` - e.g. `cs-bs-2526.ts`, `humbi-bs-2526.ts`
- Export const: `{DEPT}_{DEGREE}_2526` - e.g. `HUMBI_BS_2526`, `POLISCI_BA_2526`
- `id` field: `'{dept}-{degree}-2526'` - e.g. `'humbi-bs-2526'`

### To add a new program to the dropdown
1. Create the file in the correct subfolder (`majors/`, `minors/`, `cotermPrograms/`)
2. Import it in the corresponding `index.ts` and add to the `BUILT_IN_*` array
3. Add its dept-prefix → dept-abbreviation entry to `DEPT_KEYWORD` in `MajorSection.tsx` if the abbreviation differs from the id prefix

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

## Maker agent - lessons learned (2025-26 wave)

### BEFORE writing any code, do ALL of these:
1. **Read the entire bulletin page** including footnotes, restriction tables, and any "notes" sections below the main requirements. Critical rules are almost always in footnotes.
2. **Note `totalMinUnits` first** - it's in the bulletin header. Don't guess from section sums.
3. **Look up all core course series** - don't assume course numbers. Old numbers become obsolete (BIO 82/83/84 → BIO 87-95 BioFoundations; HUMBIO 101-104 → 118A/B, 120A/B, 125A/B).
4. **Find all WIM courses** - search the bulletin for "WIM" and "Writing in the Major" explicitly. Don't infer from course names.
5. **Find all capstone options** - usually listed at the bottom of the bulletin page. Note whether it's "pick 1 of N" or all required.
6. **Record every double-counting restriction** - which courses can or can't overlap with other majors, minors, or coterms.

### Common mistakes to avoid

| Mistake | Correct approach |
|---|---|
| Guessing `totalMinUnits` from section sums | Read the bulletin header directly |
| Using outdated course numbers | Verify on ExploreCourses XML for current dept/number pairs |
| Assuming WIM = courses with 191W/194W suffix | Find the explicit WIM list in the bulletin |
| Treating optional capstone tracks as major sections | Mark capstone slots with `optional: true` |
| Including excluded courses in approved lists | Read the explicit exclusion notes (e.g. STATS 60 for HumBio) |
| Encoding fixed tracks when program has student-designed concentrations | HumBio has NO fixed tracks - remove all `tracks:` |
| Encoding 4-subfield breadth for PolySci when it uses path system | Read the actual structure, not assumptions from similar programs |
| Using `PSYCH 10` as optional when it's required alongside `PSYCH 1` | Both intros can be required simultaneously |
| Assuming AP credit is accepted | Read the AP credit note; PSYCH explicitly says AP NOT accepted |
| Using a dead `listUrl` instead of listing courses | If bulletin shows courses inline, encode them all - no listUrl |
| Wrong EE core (pick-one between EE102A/EE108) | EE core = ALL 5 required: EE42+EE100+EE101A+EE102A+EE108 |
| Separate "Physics E&M" slot in EE science section | EE science = PHYS41+EE65 OR PHYS61+EE65; E&M is not a science slot |
| Wrong EE engineering fundamentals elective list | 18 approved ENGR courses - not ME/CEE courses |
| Wrong EE track design/elective courses | Each track has completely different design+elective lists; read each separately |
| Wrong EE WIM list (191W/192/194W/214B) | EE WIM = CS194W, EE109, EE133, EE134, EE153, EE155, EE168, EE191W, EE264W, EE267W |
| Wrong EE PTS required course (EE218) | PTS requires EE101B; EE218 doesn't appear in EE-BS at all |
| EE Math elective MATH 151 | Correct is MATH 113 (Linear Algebra and Matrix Theory) |

### Priority checklist for every program

- [ ] `totalMinUnits` - confirmed from bulletin header
- [ ] Core required courses - course numbers verified current
- [ ] WIM courses - explicitly identified, not inferred
- [ ] Statistics requirement - including what's excluded
- [ ] Capstone - all options listed, correct course numbers
- [ ] Double-counting rules - noted in section `note` field
- [ ] Honors requirements - GPA cutoffs, application deadlines
- [ ] Grade requirements - usually C- minimum; note any exceptions

### Checker agent must run SIMULTANEOUSLY with maker

For each program:
1. Maker reads full bulletin and writes the config
2. **Checker immediately verifies** the config against the same bulletin source
3. If checker finds a discrepancy, maker corrects before moving to next program

Checker must flag:
- `totalMinUnits` off by even 1
- Any section/slot with wrong course numbers
- Missing WIM section or wrong WIM courses
- Missing capstone options
- Double-counting rules not encoded in `note` fields
- Courses excluded by the bulletin that appear in approved lists

### Writing well-organized code

- Use shared helper patterns: `pick-from-list` + `listUrl` instead of enumerating 40 courses when the list is on the bulletin
- Group related slots into named sections with clear `note` fields
- Don't repeat the program name in every slot label
- Keep `any-approved` slots lean - put the full list URL in `listUrl` rather than encoding hundreds of options
- For tracks: only create `tracks[]` when the bulletin has named/fixed specialization tracks. Student-designed concentrations = no tracks.

---

## Paused / saved work

### PHYS-BS (phys-bs-2526) - NOT YET ENCODED
- totalMinUnits: 77
- Core: PHYS 41, 43, 45, 70, 71L/EE65, 72L, 73L/81L, 120
- Intermediate: PHYS 110, 121, 131 (all required)
- Math intro: MATH 51+52+53 OR MATH 61CM+62CM+63CM, PLUS one of MATH 104/120/131/193
- WIM: PHYS 191
- Capstone: 3 options; PHYS 100/EE65/PHYS 171 uniquely allowed to double-count for capstone AND pathway
- 8 pathways: Core, Astrophysics, Biophysics, Computational, Geophysics, Mathematical Physics, Physics Education, Quantum Science
- No course can double-count between core and pathway (only exception above)
- Honors: 3.30 overall + 3.50 physics GPA; ≥3 units PHYS 209
- Source: https://bulletin.stanford.edu/programs/PHYS-BS

---

## Programs completed and verified (2025-26)

### Majors
| Program | File | Status |
|---|---|---|
| Econ BA | `econ-ba-2526.ts` | Done + checked |
| EE BS | `ee-bs-2526.ts` | Done + checked |
| Math BS | `math-bs-2526.ts` | Done + checked |
| ME BS | `me-bs-2526.ts` | Done + checked |
| Symbolic Systems BS | `symbo-bs-2526.ts` | Done + checked |
| Bio BS | `bio-bs-2526.ts` | Done + checked |
| Human Biology BS | `humbi-bs-2526.ts` | Done + checked |
| Psychology BA | `psych-ba-2526.ts` | Done + checked |
| Political Science BA | `polisci-ba-2526.ts` | Done + checked |

### Minors
| Program | File | Status |
|---|---|---|
| Music | `music-minor-2526.ts` | Done + checked |
| CS | `cs-minor-2526.ts` | Done + checked |
| Econ | `econ-minor-2526.ts` | Done + checked |
| Math | `math-minor-2526.ts` | Done + checked |
| Stats | `stats-minor-2526.ts` | Done + checked |
| Data Science | `datasci-minor-2526.ts` | Done + checked |

### Coterms
| Program | File | Status |
|---|---|---|
| CS MS | `cs-ms-2526.ts` | Done + checked |
| MS&E MS | `mse-ms-2526.ts` | Done + checked |

---

## Tech notes

- **Tailwind JIT**: use exact class strings, never concatenate (e.g. `text-${color}-500` breaks)
- **Zustand selectors**: always select minimal state; avoid selecting the whole store object
- **Dropdown search**: `SearchableSelect` in `MajorSection.tsx` - accepts `options[]` with `{ value, label, keywords, group }`. `keywords` string is searched alongside `label`. Dept abbreviations are in `DEPT_KEYWORD` map.
- **Stanford Bulletin**: HTML is server-side rendered; course IDs are opaque numerics. Use ExploreCourses XML API (`https://explorecourses.stanford.edu/search?view=xml&...`) to look up dept+number from course title.
