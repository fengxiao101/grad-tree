# Encoding Mistakes Log

Read this file FIRST before extracting or encoding any program. Every mistake here was caught by the checker and must not recur.

---

## EE-BS (wave 2, 2026-07)
- **Core is ALL 5 required** (EE42 + EE100 + EE101A + EE102A + EE108) - not pick-one between EE102A and EE108
- **Physics E&M is not a separate slot** - science section is PHYS41+EE65 OR PHYS61+EE65 (two full-path options), E&M is subsumed
- **Engineering fundamentals electives**: exactly 18 ENGR courses approved - not ME or CEE courses
- **Every track has a completely different design+elective list** - read each track section separately; do not copy across tracks
- **WIM list is 10 specific courses**: CS194W, EE109, EE133, EE134, EE153, EE155, EE168, EE191W, EE264W, EE267W - not EE191W/EE192/EE194W/EE214B
- **PTS track requires EE101B** - EE218 does not appear in EE-BS at all
- **Math elective is MATH 113** (Linear Algebra and Matrix Theory) - not MATH 151
- **Technology in Society**: 20+ courses listed inline - encode all of them, never emit a listUrl

## HUMBI-BS (wave 2, 2026-07)
- **totalMinUnits: 81** not 90
- **Core courses are 118A/B, 120A/B, 125A/B** - old HUMBIO 101/102/103/104 are retired
- **WIM = all three B-series courses** (118B + 120B + 125B together) - not HUMBIO 191W/192/198
- **STATS 60 explicitly excluded** from stats requirement - do not include it in approved list
- **Capstone has 5 options** (Practicum, Synthesis, HumBio Honors, IDH, Sci Comm) - old encode had only 2
- **No fixed tracks** - concentration is student-designed; never emit `tracks[]` for HumBio

## BIO-BS (wave 2, 2026-07)
- **totalMinUnits: 89** not 90
- **BioFoundations series is BIO 87–95** - old BIO 82/83/84 are retired
- **WIM courses**: BIO 115, 126, 149, 216, 218, 254 - not BIO 191W/194W
- **7 subplans** with completely different course requirements each - read every subplan separately
- BIO Math series dept code was unknown; used CME 100 as confirmed equivalent with note

## PSYCH-BA (wave 2, 2026-07)
- **totalMinUnits: 70** not 65
- **Both PSYCH 1 AND PSYCH 10 are required** - PSYCH 10 is not optional or a substitute
- **AP credit NOT accepted** for any psychology requirement - must be noted explicitly
- **WIM courses**: PSYCH 138, 164, 175, 180 - not PSYCH 191/194/195
- **Capstone: PSYCH 198** (Honors, apply April 15 junior year) OR **PSYCH 196** (Applied)

## POLISCI-BA (wave 2, 2026-07)
- **totalMinUnits: 70** not 60
- **Structure is 5-path primary/secondary system** (25+15 units) - not the 4-subfield breadth model
- Double-counting rules are complex and must be encoded fully in section notes

## Minors with tracks (2026-07 wave)
- **Always add a `trackSelector` section** - if a minor has `tracks[]`, the UI renders nothing for those tracks unless `sections[]` includes `{ trackSelector: true, slots: [] }`. Creative Writing, Ethics in Society, Human Biology, IR Minor were all broken for this reason.
- **trackSelector position matters** - if there are shared required sections (e.g., HumBio Core, IR Core Course), put trackSelector AFTER them in `sections[]`; shared sections always render, track-specific ones only render when a track is selected
- **Minor track sections must be merged before computeAssignments** - in MajorSection.tsx, the `minorAssignments` loop must build `effectiveMinor` (merge active track's sections) before calling `computeAssignments`, same as the major's `effectiveMajorConfig` pattern; without this, all track-section slots show as unfilled and contribute 0 units
- **Per-track `minUnits` for header display** - some minors have different unit totals per subplan (e.g., Earth Systems Sustainability=35, EJ=30); set `totalMinUnits` to the baseline, set track-level `minUnits` for the subplan, and use `activeTrack?.minUnits ?? config.totalMinUnits` in the header
- **Sub-requirements within ONE section** - when the bulletin says "≥X units total from these N categories, ≥1 per category, double-counting between categories allowed", encode as ONE section with `minUnits: X, allowDoubleCount: true` containing N `pick-from-list, count: 1` slots - not N separate top-level sections (Earth Systems minor had this wrong)
- **Capstone sections** - always scroll to the bottom of the bulletin page; Human Rights minor was missing its entire capstone section (HUMRTS 199 / Course Equivalency)

## ECON-BA (2026-07-18)
- **ECON 50Q name wrong**: an earlier file had 'Economic Analysis I (Honors)'. The actual name is 'Economic Analysis I (Quantitative)'. Take course names from the cached bulletin text, never from context.
- **Wrong capstone/WIM course**: an earlier file had ECON 138 as the policy seminar and WIM. ECON 138 is 'Optimization Models in Power Systems', unrelated. The policy seminar is ECON 101, which carries the WIM designation. Never infer WIM from a course number pattern.
- **ECON 1 placement**: it had been put in a separate pre-major prereq section. It is core required course #1 in the bulletin's numbered list.
- **Wrong field course list**: an earlier file had roughly 34 courses, many invalid (ECON 100, 101 as field, 103A, 116, 164, 167, 168, 176, 181, 186, 191). The real list has 43 approved courses. Parse the entire field list from the bulletin, never guess.
- **Wrong ECON 135/140/141 restriction**: the old note said ECON 135 cannot count. In fact all three can count, but only ONE of 135/140/141 may count as a field course, because they overlap in content. Read restriction notes exactly.
- **Missing 55/80 residency rule**: a footnote requires at least 55 of the 80 units to be taken at Stanford in California. Always read footnotes.
- **Missing C= GPA floor**: the bulletin requires a C= (2.0) GPA across all units applied toward the major. Encode program-level GPA rules, not only per-course grade minimums.
- **Missing ECON 139D**: the bulletin names this specific directed reading course. An earlier file had ECON 199, which is wrong.

## Schema / UI patterns (2026-07)

- **pre-major sections don't count toward minor units** - set `phase: 'pre-major'` on prerequisite sections (e.g., math series for Physics minor) so their slots are skipped in `totalAssignedUnits`; also add `allowDoubleCount: true` so those courses can still be counted for the major
- **Minor elective sections: consolidate slots** - instead of 3-4 separate `any-approved` slots for electives, use ONE slot with `count: N` (e.g., `count: 3`); the UI shows 0/3 with a single "Search & add" button and chips for each added course; much cleaner than N separate rows
- **Extra tagged courses now count toward program units** - if a card is tagged as 'minor' (or 'major') it now counts toward `totalAssignedUnits` even if it doesn't match any slot; students can add overflow electives beyond explicit slots and they contribute to the unit total
- **`pick-from-list, count: N` replaces two duplicate pick-one slots** - if two slots list the same N options (e.g., Physics minor "Advanced Course 1" and "Advanced Course 2"), replace with a single `pick-from-list, count: 2` slot; the UI shows 0/2 and lets the student pick any 2 different options
- **Minors with tracks need `trackSelector: true` section** - same rule as before; if `tracks[]` exists, `sections[]` must include `{ trackSelector: true }` or nothing renders (Sociology, SymSys both needed this)
- **Hover popup on pinned chips** - courses added via "Search & add" into an `any-approved` slot show as green chips; hovering a chip now shows the course detail popup with a "Delete" button (same as CourseChip)
- **"3 of 5 areas" structure** - use a single section with `minCourses: 3` and 5 optional `pick-from-list, count: 1` slots (one per area); the section shows complete when ≥3 area slots are filled; Music minor uses this pattern

## General patterns caught repeatedly
- `totalMinUnits` is ALWAYS in the bulletin header - never derive it by summing sections
- WIM = explicit list in bulletin, never inferred from course name suffixes (W, 191W, etc.)
- Capstone is almost always at the bottom of the bulletin page - always scroll to end
- "complete any of the following" sections are optional-choice sections - never omit them
- listUrl is forbidden - if courses are listed on the bulletin, encode them all inline
- Tracks[] only for programs with named fixed specializations - never for student-designed concentrations
