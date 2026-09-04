# Stanford ExploreCourses - Prerequisite Parsing Pattern Catalog

**Purpose:** Reference for building an LLM-based prereq extractor that converts raw `<prerequisites>` XML text into structured `prereqs[]` / `coreqs[]` arrays.  
**Data source:** ExploreCourses XML API. Patterns were sampled from 2025-26; the
agents now query 2026-27, and the language patterns are unchanged.  
**Sampling:** ~65 courses across CS, MATH, EE, ECON, STATS, CHEM, PHYS  
**Date compiled:** 2026-07-19

---

## Structured `prereqs` / `coreqs` representation

The target output for each course is:

```ts
prereqs: string[][]   // AND of ORs - outer array is AND, inner arrays are OR groups
coreqs:  string[][]   // same structure; courses that may be taken concurrently
```

Example - CS 161 requires (106B OR 106X) AND (103 OR 103B) AND (109 OR STATS 116):

```ts
prereqs: [["CS 106B","CS 106X"], ["CS 103","CS 103B"], ["CS 109","STATS 116"]]
coreqs:  []
```

---

## Pattern Catalog

### 1. `none`
**Definition:** The `<prerequisites>` XML element is empty, absent, or contains only whitespace.  
**Parsed result:** `prereqs: [], coreqs: []`  
**Frequency:** Very common - roughly 30–40% of courses.

**Examples:**
- CS 107 - `""` (element present but empty)
- MATH 171 - `""` (foundational proof course, no listed prereqs)
- EE 101A - `""` (intro circuits, no prereqs listed)
- ECON 1 - `""` (introductory survey)
- STATS 116 - not returned at all in search results for its own course code
- PHYS 121 - `""`

**Parsing rule:** If trimmed text is empty → `prereqs: [], coreqs: []`.

---

### 2. `simple-one`
**Definition:** A single course is required. May include a redundant "Prerequisite:" or "Prerequisites:" prefix.  
**Parsed result:** `prereqs: [["DEPT N"]], coreqs: []`

**Examples:**
- CS 110: `"107"` - bare number without dept prefix
- CS 111: `"Prerequisite: CS107."` - includes prefix + period
- ECON 52: `"Prerequisites: ECON 50"` - plural prefix form
- PHYS 131: `"PHYSICS 130"` - dept uses full "PHYSICS" not "PHYS"
- MATH 104: `"Math 51"` - "Math" spelled out, mixed case
- MATH 113: `"Math 51"`
- CHEM 31B: `"Chem 31A"`

**Parsing rules:**
- Strip leading `"Prerequisite:"` / `"Prerequisites:"` (case-insensitive) and trailing punctuation.
- Canonicalize dept: `"Math"` → `MATH`, `"PHYSICS"` → `PHYS`, `"Chem"` → `CHEM`.
- A bare number (no dept) must be resolved using the course's own dept (CS 110 says "107" → CS 107).

---

### 3. `simple-one-equiv`
**Definition:** A single course is required, but the text explicitly says "or equivalent" - meaning a placement test, AP credit, or equivalent course may substitute.  
**Parsed result:** `prereqs: [["DEPT N"]], coreqs: []` - still encodes the named course; the "equivalent" cannot be resolved to specific course codes.

**Examples:**
- CS 106B: `"106A or equivalent"` → `[["CS 106A"]]`
- CS 190: `"CS 140 or equivalent"` → `[["CS 140"]]`
- ECON 102A: `"MATH 20 or equivalent"` → `[["MATH 20"]]`
- STATS 200: `"STATS 118 or equivalent. See https://statistics.stanford.edu/course-equiv for equivalent courses in other departments that satisfy these prerequisites."` → `[["STATS 118"]]`
- PHYS 43 (partial): `"PHYSICS 41, 41E or equivalent"` - "or equivalent" scopes to the whole group

**Parsing rules:**
- Strip `"or equivalent"` / `"or equivalents"` before tokenizing.
- URL references (like the STATS 200 example) should be noted but ignored for structure extraction.
- Do NOT create a fake "equivalent" course entry.

---

### 4. `simple-or`
**Definition:** The student must take one of N alternatives - all are genuine acceptable substitutes for the same slot.  
**Parsed result:** `prereqs: [["A","B","C"]], coreqs: []`

**Examples:**
- CS 154: `"CS 103 or 103B"` → `[["CS 103","CS 103B"]]`
- CS 224S: `"CS124, CS221, CS224N, or CS229"` → `[["CS 124","CS 221","CS 224N","CS 229"]]`
  - Note: comma-separated with "or" before last - this is `simple-or`, NOT `implicit-and`
- MATH 106 prereq for MATH 244 (from context): `"MATH 106 or MATH 116"` → `[["MATH 106","MATH 116"]]`

**Parsing rules:**
- Key signals: `"or"`, `" / "` between same-slot alternatives, comma list ending in `"or"`.
- Distinguish from `implicit-and` (see §6): `simple-or` uses a terminal "or" or "/" between ALL items; `implicit-and` uses commas where each item is separately required.
- Abbreviated numbers: `"CS 103 or 103B"` - the bare `103B` inherits the dept from the preceding `CS 103`.

---

### 5. `and-of-ors`
**Definition:** Multiple independent requirement groups, each with alternatives. The student must satisfy at least one option from EACH group.  
**Parsed result:** `prereqs: [groupA, groupB, ...]` where each group is a `string[]`

**Examples:**
- CS 161: `"106B or 106X; 103 or 103B; 109 or STATS 116"`
  → `[["CS 106B","CS 106X"],["CS 103","CS 103B"],["CS 109","STATS 116"]]`
- CS 221: `"CS 103 or CS 103B/X, CS 106B or CS 106X, CS 109, and CS 161 (algorithms, probability, and object-oriented programming in Python)"`
  → `[["CS 103","CS 103B","CS 103X"],["CS 106B","CS 106X"],["CS 109"],["CS 161"]]`
  - Note: parenthetical `"(algorithms, probability...)"` is annotation, not more courses.
- CS 107E: `"CS106B or CS106X, and consent of instructor."`
  - Partial `and-of-ors`; "consent of instructor" is not a course (see `consent-escape` in §10).
- PHYS 43: `"PHYSICS 41, 41E or equivalent. MATH 21 or MATH 51 or CME 100 or equivalent."`
  → `[["PHYS 41","PHYS 41E"],["MATH 21","MATH 51","CME 100"]]`

**Parsing rules:**
- Group delimiters: semicolons (`;`), the word `"and"` between groups, or a period (`.`) separating independent sentences.
- Within each group: `"or"` or `/` separates alternatives.
- Parenthetical content is annotation unless it contains a course code pattern (`DEPT NNN`).

---

### 6. `implicit-and`
**Definition:** Comma-separated list where each item is independently required - no `"and"` keyword - and the commas do NOT mean "or". Each item becomes its own OR-group of size 1.  
**Parsed result:** `prereqs: [["A"],["B"],["C"]], coreqs: []`

**Examples:**
- CS 248A: `"CS 107, MATH 51"` → `[["CS 107"],["MATH 51"]]`
- CS 103 (from context): `"Prerequisite: CS106B or equivalent. CS106B may be taken concurrently with CS103."` - the comma in this case separates two sentences, not an and-list
- CHEM 31A: `"Math 18 (or placement beyond), and Chem11 or placement into Chem31A..."` - here the comma IS explicit-and

**Parsing rules:**
- A comma-only list with NO terminal "or" = `implicit-and`.
- A comma list that ENDS with "or X" = `simple-or` (the "or" governs all items).
- When each comma-separated item contains different dept codes or course levels, assume `implicit-and`.
- Ambiguity test: ask "Could you take A OR B?" If no, it's `implicit-and`. If yes, it's `simple-or`.

---

### 7. `nested-or`
**Definition:** The logic is nested: one path requires multiple courses in sequence, another path is a single alternative. Cannot be flattened into a simple AND-of-ORs.  
**Parsed result:** Complex; may need a special encoding or note.

**Examples:**
- MATH 151: `"Math 61CM, or Math 52 and either Math 56 or Math 115 (or equivalent)"`
  Logic: `61CM` OR (`52` AND (`56` OR `115`))
  Flat approximation: `[["MATH 61CM","MATH 52"],["MATH 61CM","MATH 56","MATH 115"]]` - NOT achievable with simple AND-of-ORs.
- EE 142 (observed context): `"an introductory course in electromagnetics (PHYSICS 43, PHYSICS 63, PHYSICS 81, or EE 42) and a solid background in vector calculus (CME 100, CME 102, or MATH 52...)"`
  Logic: (one of PHYS 43/63/81/EE 42) AND (one of CME 100/102/MATH 52)
  This is actually `and-of-ors` wrapped in prose labels - closer to §5 than true nesting.
- PHYS 155 context: `"Physics 120 and 121, or EE 142 and 242; Physics 121/EE 142 can be taken concurrently"`
  Logic: (120 AND 121) OR (EE142 AND EE242) - two possible compound paths.

**Parsing rules:**
- Signal phrases: `"either...or"`, `"one of X and Y, or Z"`, `"(A or B) and (C or D)"`.
- When both branches of an OR require multiple courses, you cannot represent this in simple `prereqs[][]` without information loss.
- **Recommended approach:** Encode the union of all named courses in one flat `prereqs` structure and add a `note` field with the full logic. Flag for human review.

---

### 8. `with-coreq`
**Definition:** At least one course is explicitly marked as a co-requisite - may be taken concurrently in the same term, not necessarily before.  
**Parsed result:** Named courses go to `coreqs[]`, strict prereqs stay in `prereqs[]`.

**Examples:**
- EE 65: `"Physics 41. Pre- or co-requisite: Math 53 or CME 102"`
  → `prereqs: [["PHYS 41"]], coreqs: [["MATH 53","CME 102"]]`
- CS 111ACE: `"Prerequisite: consent of instructor. Corequisite: CS111"`
  → `prereqs: [], coreqs: [["CS 111"]]` (consent = no structured prereq)
- PHYS 46: `"Pre- or corequisite: PHYSICS 45"` → `prereqs: [], coreqs: [["PHYS 45"]]`
- PHYS 120: `"PHYSICS 81; MATH 52 and MATH 53. Completion of OR co-enroll in: PHYS 111 or MATH 131P or MATH 173 or Math 220 or Math 220A."`
  → `prereqs: [["PHYS 81"],["MATH 52"],["MATH 53"]], coreqs: [["PHYS 111","MATH 131P","MATH 173","MATH 220","MATH 220A"]]`
- CS 103: `"CS106B may be taken concurrently with CS103"` - the "or equivalent" on CS 106B makes it also a possible prereq
  → `prereqs: [], coreqs: [["CS 106B"]]` with note about "or equivalent"

**Signal phrases:** `"pre- or co-requisite"`, `"corequisite"`, `"co-requisite"`, `"may be taken concurrently"`, `"co-enroll in"`, `"or co-enroll"`.

**Parsing rules:**
- Move any course following a coreq signal phrase to `coreqs`, not `prereqs`.
- "Pre- or co-requisite" means the course CAN be taken before OR during - classify as `coreq` since concurrent is allowed.

---

### 9. `recommended-only`
**Definition:** All listed courses are preceded by "recommended" or "familiarity with" - there are no hard prerequisites. Recommended courses should NOT appear in `prereqs[]`.  
**Parsed result:** `prereqs: [], coreqs: []`

**Examples:**
- CS 106A: `"No prior programming experience required."` → `[]`
- CS 131: `"Students should be familiar with Python, Calculus & Linear Algebra."` → `[]`
- PHYS 45: `"Recommended prerequisite: PHYSICS 41 or equivalent. MATH 21 or MATH 51 or CME 100 or equivalent"`
  - **Tricky case:** First sentence is "Recommended prerequisite" (soft); second sentence gives no qualifier but follows in same field. Treat both as soft here; add as a note.
- PHYS 43 (partial): `"Recommended corequisite: MATH 52 or CME 102"` → does not go into `coreqs[]` since it's only recommended

**Signal phrases:** `"recommended"`, `"familiarity with"`, `"background in"` (when no hard req precedes), `"helpful"`, `"not required"`.

**Parsing rule:** If ALL content is behind a "recommended" qualifier → `prereqs: [], coreqs: []`. If SOME content is recommended and SOME is hard, parse the hard content only and ignore the recommended portion.

---

### 10. `consent-only`
**Definition:** Instructor/department consent is the ONLY stated prerequisite. No specific courses are listed.  
**Parsed result:** `prereqs: [], coreqs: []` - consent is an administrative gate, not a course.

**Examples:**
- CS 110A: `"consent of instructor"` → `prereqs: [], coreqs: []`
- CS 111ACE: `"Prerequisite: consent of instructor. Corequisite: CS111"` - consent part → `prereqs: []`; coreq part → `coreqs: [["CS 111"]]`

**Signal phrases:** `"consent of instructor"`, `"consent of department"`, `"permission of instructor"`, `"instructor's approval"`.

**Note on `consent-escape`:** Many courses say "…or consent of instructor" at the END of an otherwise-structured prereq text. This "escape valve" should be stripped; it does not add a course to `prereqs[]`. Example: CS 107E "CS106B or CS106X, **and consent of instructor**" → `[["CS 106B","CS 106X"]]`.

---

### 11. `level-requirement`
**Definition:** The text references a course level, sequence, or proficiency level rather than specific course codes. No individual courses can be reliably extracted.  
**Parsed result:** `prereqs: [], coreqs: []` with a `note` preserving the raw text.

**Examples:**
- CS 149: `"The course is open to students who have completed the introductory CS course sequence through 111."` → `prereqs: []`, note the raw text
- CS 40 (observed context): `"Programming maturity up to CS 107. Familiarity with the command line..."` → level mention, no strict course encoding
- CS 349D (observed context): `"Background in computer systems, ML and deep learning is recommended but not required (CS 111/240, 144/244, 244B or 245)"` - parentheticals are examples, not requirements

**Signal phrases:** `"through [course]"`, `"at the level of"`, `"up to [course]"`, `"course sequence through"`, `"introductory [dept] sequence"`.

---

### 12. `with-placement-test`
**Definition:** A placement test, diagnostic, or departmental exam is offered as an alternative path to satisfy the prerequisite.  
**Parsed result:** Include the named course in `prereqs[]`; note the placement alternative in a comment.

**Examples:**
- PHYS 41: `"Physics placement diagnostic AND Math 20 or higher"`
  → `prereqs: [["MATH 20"]]` - placement diagnostic is not a course, strip it; note that an alternative entrance path exists
- CHEM 31A: `"Math 18 (or placement beyond), and Chem11 or placement into Chem31A with Autumn General Chemistry Placement test"`
  → `prereqs: [["MATH 18"],["CHEM 11"]]` - both placement alternatives stripped

**Parsing rules:**
- Strip phrases: `"placement into"`, `"placement beyond"`, `"placement test"`, `"diagnostic"`, `"AP score of X"`.
- The named course(s) remain in `prereqs[]`; the placement is treated as an unlisted equivalent.

---

### 13. `self-reference`
**Definition:** The course's own code or name appears in its own `<prerequisites>` text. This is a copy-paste error in the ExploreCourses data.  
**Parsed result:** Remove the self-referencing course code; parse the remaining text normally.

**Examples:**
- MATH 21: `"Math 21 (preferred), or equivalent (5 on the AP Calculus BC test...)"` - MATH 21 listing itself as preferred prereq. The real intent is "equivalent to MATH 21 or a qualifying AP/IB score."
  → After stripping self-ref: treat as `recommended-only` / `with-placement-test`
- Observed in context for PHYSICS 155: `"Physics 120 and 121, or EE 142 and 242; Physics 121/EE 142 can be taken concurrently"` - PHYS 121 appears in both the prereq list and the concurrency note

**Detection rule:** If `DEPT NUMBER` in the prereq text matches the course being described, flag as self-reference. The self-referencing entry should be excluded from `prereqs[]`.

---

### 14. `hard-soft-qualifier`
**Definition:** The text explicitly labels some requirements as "hard" (required) and others as "soft" (recommended). Only the "hard" prereqs go into `prereqs[]`.

**Examples:**
- CS 145: `"CS106B or CS106X; CS103. Need to have a basic understanding of RAM, disks, sorting/hashing algorithms. Soft prereqs: One of CS161 or CS111."`
  Hard: `[["CS 106B","CS 106X"],["CS 103"]]`; soft: CS 161 or CS 111 - not in `prereqs[]`
- MS&E 145: `"Hard prerequisites: MS&E 120 or 220, or CS 109, or STATS 116."` - explicit label
  → `[["MS&E 120","MS&E 220","CS 109","STATS 116"]]`

**Signal phrases for hard:** `"hard prerequisites:"`, `"required:"`, `"Prerequisite:"` (unqualified).  
**Signal phrases for soft:** `"soft prereqs:"`, `"recommended:"`, `"helpful:"`, `"background in"`.

---

### 15. `skill-description`
**Definition:** The `<prerequisites>` field contains only prose describing required knowledge or skill level, with no parseable `DEPT NNN` course codes.  
**Parsed result:** `prereqs: [], coreqs: []` - skill requirements cannot be encoded as course codes.

**Examples:**
- CS 255: `"basic probability theory"` → `[]`
- MATH 19: `"periodic trigonometric functions, advanced algebra, and analysis of elementary functions (including exponentials and logarithms)"` → `[]`
- CS 131: `"Students should be familiar with Python, Calculus & Linear Algebra."` → `[]`
- PHYS 45 (second clause): `"MATH 21 or MATH 51 or CME 100 or equivalent"` - this one DOES have codes, so it's not skill-description

**Parsing rule:** If no `DEPT NNN` pattern (two or more uppercase letters + space + number) can be found → `prereqs: []`. Store the raw text in a `note` field for manual review.

---

### 16. `mixed`
**Definition:** The field contains both parseable course codes AND prose skill descriptions interleaved. Some requirements are extractable, others are not.

**Examples:**
- CS 229: `"knowledge of basic CS principles...to the equivalency of CS106A, CS106B, or CS106X, familiarity with probability theory to the equivalency of CS 109, MATH151, or STATS 116, and familiarity with multivariable calculus and linear algebra to the equivalency of MATH51 or CS205."`
  Extractable: `[["CS 106A","CS 106B","CS 106X"],["CS 109","MATH 151","STATS 116"],["MATH 51","CS 205"]]`
  - but note the phrasing is `"to the equivalency of X"` not `"requires X"`, so these are soft equivalency references, not hard prereqs.
- CS 231N: `"Proficiency in Python...College Calculus, Linear Algebra (e.g. MATH 19, MATH 51)... Basic Probability and Statistics (e.g. CS 109)"`
  The `"e.g."` signals these are examples, not requirements → `prereqs: []`
- CS 234: `"proficiency in python, CS 229 or equivalents or permission of the instructor; linear algebra, basic probability"`
  Course component: `[["CS 229"]]`; prose component: "linear algebra, basic probability" → cannot encode
- CS 224N: `"calculus and linear algebra; CS124, CS221, or CS229."`
  Course component: `[["CS 124","CS 221","CS 229"]]`; "calculus and linear algebra" → `skill-description` part ignored

**Parsing rules:**
- Extract all `DEPT NNN` patterns that appear as requirements (not after "e.g.", "such as", "like").
- Prose portions around the codes → `skill-description`, store in note.
- Distinguish `"to the equivalency of X"` (soft/example) from `"prerequisite: X"` (hard).

---

## Sample Parse Table

| Course | Raw prereq text (≤120 chars) | Pattern | `prereqs[][]` | `coreqs[][]` | Notes |
|--------|------------------------------|---------|---------------|--------------|-------|
| CS 106A | "No prior programming experience required." | recommended-only | `[]` | `[]` | Negative statement; no courses |
| CS 106B | "106A or equivalent" | simple-one-equiv | `[["CS 106A"]]` | `[]` | Bare number; inherit dept CS |
| CS 103 | "Prerequisite: CS106B or equivalent. CS106B may be taken concurrently" | simple-one-equiv + with-coreq | `[]` | `[["CS 106B"]]` | "or equivalent" + concurrent → coreq only |
| CS 107 | *(empty)* | none | `[]` | `[]` | Foundational systems course |
| CS 110 | "107" | simple-one | `[["CS 107"]]` | `[]` | Bare number; inherit dept CS |
| CS 111 | "Prerequisite: CS107." | simple-one | `[["CS 107"]]` | `[]` | Strip prefix + trailing period |
| CS 107E | "CS106B or CS106X, and consent of instructor." | and-of-ors + consent-escape | `[["CS 106B","CS 106X"]]` | `[]` | Strip consent-escape |
| CS 111ACE | "Prerequisite: consent of instructor. Corequisite: CS111" | consent-only + with-coreq | `[]` | `[["CS 111"]]` | Consent → no prereq; coreq extracted |
| CS 140E | *(empty)* | none | `[]` | `[]` | - |
| CS 143 | "103 or 103B, 107 equivalent, or consent from instructor." | simple-or + consent-escape | `[["CS 103","CS 103B","CS 107"]]` | `[]` | Ambiguous parse; "103, 107, or consent" treated as or-group; strip consent |
| CS 145 | "CS106B or CS106X; CS103. Soft prereqs: One of CS161 or CS111." | hard-soft-qualifier | `[["CS 106B","CS 106X"],["CS 103"]]` | `[]` | Soft prereqs excluded |
| CS 149 | "The course is open to students who have completed the introductory CS course sequence through 111." | level-requirement | `[]` | `[]` | Cannot encode sequence level |
| CS 154 | "CS 103 or 103B" | simple-or | `[["CS 103","CS 103B"]]` | `[]` | Second item inherits dept |
| CS 161 | "106B or 106X; 103 or 103B; 109 or STATS 116" | and-of-ors | `[["CS 106B","CS 106X"],["CS 103","CS 103B"],["CS 109","STATS 116"]]` | `[]` | Semicolons = group separators |
| CS 221 | "CS 103 or CS 103B/X, CS 106B or CS 106X, CS 109, and CS 161 (algorithms...)" | and-of-ors | `[["CS 103","CS 103B","CS 103X"],["CS 106B","CS 106X"],["CS 109"],["CS 161"]]` | `[]` | Parenthetical is annotation |
| CS 224N | "calculus and linear algebra; CS124, CS221, or CS229." | mixed | `[["CS 124","CS 221","CS 229"]]` | `[]` | Prose "calculus and linear algebra" → note |
| CS 248A | "CS 107, MATH 51" | implicit-and | `[["CS 107"],["MATH 51"]]` | `[]` | Two independent requirements |
| CS 229 | "...to the equivalency of CS106A, CS106B, or CS106X...CS 109, MATH151, or STATS 116..." | mixed | `[]` | `[]` | "equivalency of" = soft; treat as recommended-only |
| MATH 21 | "Math 21 (preferred), or equivalent (5 on the AP Calculus BC test...)" | self-reference + with-placement-test | `[]` | `[]` | Self-ref stripped; placement noted |
| MATH 52 | "Math 21 and Math 51 or equivalents." | implicit-and + ambiguous-or-scope | `[["MATH 21"],["MATH 51"]]` | `[]` | "or equivalents" scopes to both; strip |
| MATH 151 | "Math 61CM, or Math 52 and either Math 56 or Math 115 (or equivalent)" | nested-or | `[["MATH 61CM","MATH 52"],["MATH 61CM","MATH 56","MATH 115"]]` | `[]` | Cannot express cleanly; flag for note |
| MATH 171 | *(empty)* | none | `[]` | `[]` | - |
| EE 65 | "Physics 41. Pre- or co-requisite: Math 53 or CME 102" | simple-one + with-coreq | `[["PHYS 41"]]` | `[["MATH 53","CME 102"]]` | Period separates prereq from coreq |
| PHYS 41 | "Physics placement diagnostic AND Math 20 or higher" | with-placement-test | `[["MATH 20"]]` | `[]` | Strip diagnostic; "or higher" → not a course |
| PHYS 43 | "PHYSICS 41, 41E or equivalent. MATH 21 or MATH 51 or CME 100 or equivalent. Recommended coreq..." | and-of-ors + recommended-only | `[["PHYS 41","PHYS 41E"],["MATH 21","MATH 51","CME 100"]]` | `[]` | Recommended coreq excluded |
| PHYS 45 | "Recommended prerequisite: PHYSICS 41 or equivalent. MATH 21 or MATH 51 or CME 100 or equivalent" | recommended-only | `[]` | `[]` | First clause labeled recommended; second unlabeled but follows |
| PHYS 120 | "PHYSICS 81; MATH 52 and MATH 53. Completion of OR co-enroll in: PHYS 111 or MATH 131P..." | and-of-ors + with-coreq | `[["PHYS 81"],["MATH 52"],["MATH 53"]]` | `[["PHYS 111","MATH 131P","MATH 173","MATH 220"]]` | Explicit co-enroll clause → coreqs |
| PHYS 131 | "PHYSICS 130" | simple-one | `[["PHYS 130"]]` | `[]` | - |
| ECON 51 | "Math 51" | simple-one | `[["MATH 51"]]` | `[]` | Cross-dept prereq |
| ECON 52 | "Prerequisites: ECON 50" | simple-one | `[["ECON 50"]]` | `[]` | Strip prefix |
| ECON 102A | "MATH 20 or equivalent" | simple-one-equiv | `[["MATH 20"]]` | `[]` | - |
| STATS 200 | "STATS 118 or equivalent. See https://statistics.stanford.edu/course-equiv..." | simple-one-equiv | `[["STATS 118"]]` | `[]` | Strip URL |
| CHEM 31A | "Math 18 (or placement beyond), and Chem11 or placement into Chem31A with Autumn...test" | with-placement-test | `[["MATH 18"],["CHEM 11"]]` | `[]` | Placement alternatives stripped |
| CHEM 31B | "Chem 31A" | simple-one | `[["CHEM 31A"]]` | `[]` | - |

---

## Common Parsing Mistakes

### Mistake 1: Treating coreqs as prereqs

**Problem:** "Pre- or co-requisite: X" means X can be taken AT THE SAME TIME. Encoding it in `prereqs[]` would reject a student who is currently enrolled in X, even though the course allows concurrent enrollment.

**Real examples:**
- EE 65: `"Pre- or co-requisite: Math 53 or CME 102"` - MATH 53/CME 102 go to `coreqs[]` not `prereqs[]`
- PHYS 46: `"Pre- or corequisite: PHYSICS 45"` - co-req only, `prereqs: []`
- CS 103: `"CS106B may be taken concurrently"` - CS 106B is a coreq, not a hard prereq

**Fix:** After extracting course codes, check if they are preceded (within 30 characters) by any coreq signal phrase. If yes, route to `coreqs[]`.

---

### Mistake 2: Treating recommended courses as hard prerequisites

**Problem:** Extracting course codes from "Recommended: X" or "familiarity with X (e.g., CS 109)" and adding them to `prereqs[]`.

**Real examples:**
- CS 229: `"to the equivalency of CS106A"` - these are soft equivalency targets, not enforced prereqs
- CS 231N: `"e.g. MATH 19, MATH 51"` - the `"e.g."` marker means these are examples; they are NOT required
- PHYS 43: `"Recommended corequisite: MATH 52 or CME 102"` - recommended AND coreq; should NOT appear in either `prereqs[]` or `coreqs[]`

**Fix:** Strip all content after `"recommended"`, `"e.g."`, `"such as"`, `"for example"`, `"helpful"`. Do not add those courses to the output.

---

### Mistake 3: Misparsing OR logic as AND

**Problem:** A comma-separated list looks like `implicit-and` but is actually `simple-or`.

**Real examples:**
- CS 224S: `"CS124, CS221, CS224N, or CS229"` - the terminal `"or"` governs all four items; `prereqs: [["CS 124","CS 221","CS 224N","CS 229"]]`
  - Wrong parse: `[["CS 124"],["CS 221"],["CS 224N"],["CS 229"]]` (would require ALL four)
- CS 154: `"CS 103 or 103B"` - this is one OR-group, not two required courses

**Fix:** If the last delimiter before the final item in a comma list is `"or"`, the entire list is a single OR-group. Only use `implicit-and` when there is NO terminal "or" anywhere in the list.

---

### Mistake 4: Failing to strip the "or consent" escape valve

**Problem:** `"consent of instructor"` appears at the end of a structured prereq and gets parsed as if it were a course code.

**Real examples:**
- CS 107E: `"CS106B or CS106X, and consent of instructor."` - "consent of instructor" is NOT a course
- CS 143: `"103 or 103B, 107 equivalent, or consent from instructor."` - ditto

**Fix:** Before tokenizing, strip: `"or consent of instructor"`, `"or permission of instructor"`, `"or instructor's consent"`, `"or consent from instructor"` (and variations). These never produce entries in `prereqs[]`.

---

### Mistake 5: Ignoring dept-inference for bare numbers

**Problem:** When a prereq says just `"107"` or `"103 or 103B"`, the dept is inherited from the course being described. Failing to infer it produces unparseable codes like `["107"]`.

**Real examples:**
- CS 110: `"107"` → must become `CS 107`
- CS 161: `"106B or 106X; 103 or 103B; 109 or STATS 116"` - `106B`, `106X`, `103`, `103B`, `109` all inherit `CS`; only `STATS 116` is cross-dept

**Fix:** When a token is a bare number (optionally with letter suffix), prepend the course's own dept code. When a full `DEPT NNN` appears, switch context to that dept for subsequent bare numbers within the same group.

---

### Mistake 6: Self-reference (copy-paste errors in ExploreCourses data)

**Problem:** The course lists its own code as a prerequisite - typically because the course description was copy-pasted from a catalog entry for a different course.

**Real example:**
- MATH 21: `"Math 21 (preferred), or equivalent"` - MATH 21 appears in its own prereq field

**Fix:** After extracting course codes, filter out any code that matches the subject+code of the course being processed. Log it as a data quality warning.

---

### Mistake 7: Misparsing "and X or equivalents" scope

**Problem:** `"Math 21 and Math 51 or equivalents"` is ambiguous. "or equivalents" could scope to just MATH 51, or to the whole pair (MATH 21 AND MATH 51).

**Real examples:**
- MATH 52: `"Math 21 and Math 51 or equivalents."` - likely means "the pair (21 AND 51), or their equivalents"
- MATH 53: `"Math 21 and Math 51, or equivalents."` - same

**Fix:** When `"or equivalents"` follows a multi-course AND list, assume it scopes to the entire AND group. Encode the named courses and note that the combination has an equivalent exit.

---

### Mistake 8: Dept name normalization failures

**Problem:** ExploreCourses uses inconsistent dept name capitalization and spelling. Common variations:

| Found in prereq text | Canonical form |
|----------------------|----------------|
| `"Math"` | `MATH` |
| `"MATH"` | `MATH` |
| `"PHYSICS"` | `PHYS` |
| `"Physics"` | `PHYS` |
| `"Chem"` | `CHEM` |
| `"CME"` | `CME` |
| `"CS106B"` (no space) | `CS 106B` |
| `"CS 103B/X"` | `CS 103B`, `CS 103X` |

**Fix:** Maintain a normalization table. Always emit `DEPT NNN` with exactly one space. Split `/`-separated alternatives into separate course codes.

---

## Additional Dept-Specific Quirks

### CS
- Bare numbers without dept prefix are extremely common: `"107"`, `"103 or 103B"`, `"106B or 106X"`. Always inherit `CS` unless a cross-dept code appears.
- `"106X"` is an honors section of CS 106B - treat as equivalent to `CS 106B` in prereq context; some prereqs list both explicitly.
- `"103B"` is a variant of CS 103 (without proofs focus). When a prereq says `"103 or 103B"`, it means either is acceptable.
- Some courses use `CS 103B/X` to compress `CS 103B` and another variant into one token; split on `/`.

### MATH
- MATH spells out its dept as `"Math"` (capitalized, not all-caps) in all prereq text. Normalize to `MATH`.
- The MATH 61CM/62CM/63CM series is an alternative honors track to MATH 51/52/53. When a prereq offers both, encode as OR alternatives: `[["MATH 51","MATH 61CM"]]`.
- MATH 171 has an empty prereq field even though it requires substantial mathematical maturity; the real requirement is communicated through course description, not the prereq field.

### EE
- Many core EE courses (EE 100, EE 101A, EE 178, EE 263) have EMPTY prereq fields in ExploreCourses, even though course descriptions mention expected background.
- `"PHYSICS"` is used in full for cross-dept physics prereqs; normalize to `PHYS`.
- EE 65 has a compound prereq + coreq in one field: `"Physics 41. Pre- or co-requisite: Math 53 or CME 102"`. The period separates them clearly.

### PHYS
- PHYS uses `"PHYSICS"` as its dept code in prereq text (e.g., `"PHYSICS 43"`). Normalize to `PHYS` in output.
- PHYS 41 requires a "Physics placement diagnostic" - this is an administrative test, not a course. Strip it.
- PHYS 43 uses both comma and period to separate two requirement groups; both are group delimiters here, not implicit-and commas.
- PHYS 45 is an interesting edge case: "Recommended prerequisite" for PHYS 41 but then a second sentence with course codes. Since the entire field is introduced under the "Recommended" label, treat everything as soft.

### ECON / STATS
- ECON 51 requires MATH 51 - cross-dept prereqs are common and the dept code is explicit.
- STATS 116 does not appear in its own search results for 2025-26, yet appears as an accepted alternative in ~15+ other courses (CS 109, CS 161, CS 229 all accept it). It is an active course; the search gap may be a data issue.
- `"STATS 118 or equivalent. See [URL]"` - the URL points to an equivalency table but cannot be automatically resolved. Extract `STATS 118` and note the URL in a comment.

### CHEM
- CHEM 31X (honors version of CHEM 31A/31B) did not appear in 2025-26 active results; the standard sequence is CHEM 31A → CHEM 31B.
- CHEM 33 has no prereq field, even though it logically follows CHEM 31A/31B.
- `"Chem11"` appears in some prereq text; normalize to `CHEM 11`.

---

## Quick-Reference: Signal Phrase → Action

| Signal phrase | Action |
|---------------|--------|
| `"Prerequisite:"` / `"Prerequisites:"` | Strip prefix; parse remainder |
| `"or equivalent"` / `"or equivalents"` | Strip phrase; keep named courses |
| `"or consent of instructor"` | Strip phrase; no course added |
| `"or permission of instructor"` | Strip phrase; no course added |
| `"recommended"` / `"recommended prerequisite"` | Skip everything in this clause |
| `"e.g."` / `"such as"` / `"for example"` | Skip course codes following this |
| `"to the equivalency of"` | Skip course codes following this |
| `"pre- or co-requisite"` / `"corequisite"` | Route course codes to `coreqs[]` |
| `"may be taken concurrently"` | Route course codes to `coreqs[]` |
| `"completion of OR co-enroll in"` | Route course codes to `coreqs[]` |
| `"familiarity with"` | Skip - skill requirement, no course |
| `"placement into"` / `"placement test"` | Strip - not a course code |
| `"or higher"` / `"or above"` | Strip - level qualifier, not a course |
| `"helpful"` / `"not required"` | Skip everything in this clause |
| `"Soft prereqs:"` | Skip everything after this label |
| `"Hard prerequisites:"` | Keep everything after this label |
| `"See [URL]"` | Strip URL; note in comment |

---

## Patterns Not Yet Observed (but Anticipated)

- **time-requirement** - "Junior standing or above" - cannot map to specific courses; treat as level-requirement
- **gpa-requirement** - "GPA ≥ 3.0 in CS courses" - not a course; store in note
- **unit-count** - "30 units of prior coursework" - not a course; store in note
- **major-restriction** - "Open to CS majors only" - not a prereq course; store in note
- **sequential-coreq** - "A and B, where B may be taken concurrently" - only B goes to coreqs; A stays in prereqs
