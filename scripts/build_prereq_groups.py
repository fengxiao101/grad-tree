#!/usr/bin/env python3
"""
Phase 1: Static-parse prereqGroups for all courses in courses-core-2627.json.

Rules (mirroring and improving courseWarnings.ts extractPrereqGroups):
- Strip "Prerequisite(s):" header
- Remove noise: "or equivalent", "or consent of instructor", etc.
- Skip sentences that describe equivalence ("X is equivalent to Y")
- Skip recommended-only sentences
- Skip coreq/concurrent sentences
- Handle substitute notation: "(X may substitute for Y)" → X becomes OR option with Y
- Split by ";" for strong AND, then by ", and " / " and " for weaker AND
- Within each chunk, group by "or" for OR groups

Writes prereqGroups to each course entry ([] if no prereqs found, absent if no text).
"""

import json, re, sys
from pathlib import Path

STOP_WORDS = {'AND','OR','FOR','THE','WITH','IN','OF','NO','NOT','TO','A','AN','AT','BE',
              'BY','DO','IF','ON','UP','AS','IS','IT','SO','US','WE','HE','SHE','THEY'}

# ----- sentence-level skip patterns -----
EQUIV_SENTENCE = re.compile(
    r'\b(?:is\s+(?:considered\s+)?equivalent\s+to|are\s+equivalent\s+to|'
    r'credit\s+will\s+not\s+be\s+granted\s+for\s+both|'
    r'may\s+not\s+receive\s+credit\s+for\s+both|'
    r'equivalent\s+courses?\s+(?:include|are|is))\b', re.I
)
RECOMMENDED_ONLY = re.compile(r'\brecommended\b', re.I)
REQUIRED_KEYWORD = re.compile(r'\brequired\b', re.I)
COREQ = re.compile(r'\b(?:co-?req(?:uisite)?|concurrent(?:ly)?)\b', re.I)
ADMIN_START = re.compile(
    r'^(?:consent|permission|graduate standing|note:|students may|this course|enrollment limited'
    r'|for more information|see instructor|contact)', re.I
)

# ----- noise to strip from body -----
NOISE_PATTERNS = [
    (re.compile(r',?\s*or equivalents?', re.I), ''),
    (re.compile(r',?\s*or consent (?:of|from) (?:the )?instructor', re.I), ''),
    (re.compile(r',?\s*or permission of (?:the )?instructor', re.I), ''),
    (re.compile(r',?\s*or (?:the )?instructor[\'\'s]* (?:consent|permission)', re.I), ''),
    (re.compile(r',?\s*or department permission', re.I), ''),
    (re.compile(r'consent of instructor', re.I), ''),
    (re.compile(r'permission of instructor', re.I), ''),
    # "or equivalent" variants inside parens, e.g. "(or equivalent)"
    (re.compile(r'\(\s*or\s+equivalent[s]?\s*\)', re.I), ''),
    # "(for linear algebra)" type annotations
    (re.compile(r'\(for [^)]+\)', re.I), ''),
    # "(or equivalent classes with permission of the instructor)"
    (re.compile(r'\(or equivalent [^)]+\)', re.I), ''),
]

# ----- substitute pattern: "X may substitute for Y" / "X may be taken in place of Y" -----
# Also: "(Public Policy majors may take X as a substitute for Y)"
SUBSTITUTE_RE = re.compile(
    r'(?P<sub>[A-Z][A-Z0-9&\s]+?\d{1,3}[A-Z]{0,4})\s+'
    r'(?:may(?:\s+be)?\s+(?:substituted?|taken)\s+(?:for|as\s+a\s+substitute\s+for|in\s+place\s+of))\s+'
    r'(?P<for>[A-Z][A-Z0-9&\s]+?\d{1,3}[A-Z]{0,4})',
    re.I
)
# "may take X as a substitute for Y"
MAY_TAKE_RE = re.compile(
    r'may\s+take\s+(?P<sub>[A-Z][A-Z0-9&\s]+?\d{1,3}[A-Z]{0,4})\s+as\s+a\s+substitute\s+for\s+'
    r'(?P<for>[A-Z][A-Z0-9&\s]+?\d{1,3}[A-Z]{0,4})',
    re.I
)


def norm_code(dept, num):
    return f"{dept.strip().upper()} {num.strip().upper()}"


DEPT_NUM_RE = re.compile(r'\b([A-Z][A-Z0-9&]{0,9})\s+(\d{1,3}[A-Z]{0,4})\b')
COMPACT_RE  = re.compile(r'\b([A-Z]{2,6})(\d{1,3}[A-Z]{0,2})\b')
CONT_RE     = re.compile(r'^(?:\s*(?:,|\/|or|and)\s*)(\d{1,3}[A-Z]{0,4})\b', re.I)


def extract_or_groups(chunk: str, default_dept: str | None, self_codes: set[str]) -> list[list[str]]:
    """Parse a chunk of prereq text into OR groups."""
    upper = chunk.upper()
    matches: list[dict] = []

    for m in DEPT_NUM_RE.finditer(upper):
        dept = m.group(1)
        if dept in STOP_WORDS:
            continue
        code = norm_code(dept, m.group(2))
        if code in self_codes:
            continue
        matches.append({'code': code, 'start': m.start(), 'end': m.end()})
        # continuation numbers: "MATH 19, 20, 21"
        tail = upper[m.end():]
        while True:
            cm = CONT_RE.match(tail)
            if not cm:
                break
            cont_code = norm_code(dept, cm.group(1))
            if cont_code not in self_codes:
                matches.append({'code': cont_code, 'start': m.end(), 'end': m.end() + len(cm.group(0))})
            tail = tail[len(cm.group(0)):]

    for m in COMPACT_RE.finditer(upper):
        dept = m.group(1)
        if dept in STOP_WORDS:
            continue
        code = norm_code(dept, m.group(2))
        if code in self_codes:
            continue
        if not any(mx['code'] == code for mx in matches):
            matches.append({'code': code, 'start': m.start(), 'end': m.end()})

    if default_dept:
        bare_re = re.compile(r'\b(\d{1,3}[A-Z]{0,4})\b')
        for m in bare_re.finditer(upper):
            raw = m.group(1)
            if int(re.match(r'\d+', raw).group()) < 10:
                continue
            s, e = m.start(), m.end()
            if any(mx['start'] <= s and mx['end'] >= e for mx in matches):
                continue
            code = norm_code(default_dept, raw)
            if code not in self_codes:
                matches.append({'code': code, 'start': s, 'end': e})

    if not matches:
        return []
    matches.sort(key=lambda x: x['start'])

    groups: list[list[str]] = []
    current = [matches[0]['code']]
    for i in range(1, len(matches)):
        between = upper[matches[i-1]['end']:matches[i]['start']].strip()
        if re.match(r'^[,\s]*OR\b', between, re.I):
            current.append(matches[i]['code'])
        else:
            groups.append(current)
            current = [matches[i]['code']]
    groups.append(current)
    # deduplicate within each group
    return [[*dict.fromkeys(g)] for g in groups if g]


def extract_prereq_groups(raw_text: str, self_codes: set[str], default_dept: str | None) -> list[list[str]]:
    """Main entry: parse prereq text → AND-of-ORs list."""
    text = re.sub(r'\s+', ' ', raw_text).strip()
    if not text:
        return []
    if re.match(r'^(?:none|no prerequisites?)\b', text, re.I):
        return []

    # Strip header
    body = re.sub(r'^[Pp]re-?req(?:uisites?)?(?:\s+are)?\s*[:\s]\s*', '', text)

    # Apply noise stripping
    for pat, repl in NOISE_PATTERNS:
        body = pat.sub(repl, body)

    # Extract substitute pairs before further processing
    # "X may substitute for Y" or "may take X as substitute for Y"
    substitute_map: dict[str, list[str]] = {}  # original_code → [sub_code, ...]
    for m in list(MAY_TAKE_RE.finditer(body)) + list(SUBSTITUTE_RE.finditer(body)):
        sub_raw = m.group('sub').strip()
        for_raw = m.group('for').strip()
        # extract codes from each
        sub_matches = DEPT_NUM_RE.findall(sub_raw.upper()) or COMPACT_RE.findall(sub_raw.upper())
        for_matches = DEPT_NUM_RE.findall(for_raw.upper()) or COMPACT_RE.findall(for_raw.upper())
        for fd, fn in for_matches:
            for_code = norm_code(fd, fn)
            for sd, sn in sub_matches:
                sub_code = norm_code(sd, sn)
                substitute_map.setdefault(for_code, []).append(sub_code)

    groups: list[list[str]] = []
    sentences = re.split(r'(?<=[.!?])\s+|\s*\.\s*$', body)

    for sentence in sentences:
        s = sentence.strip()
        if not s:
            continue
        # Skip equivalence sentences
        if EQUIV_SENTENCE.search(s):
            continue
        # Skip recommended-only
        if RECOMMENDED_ONLY.search(s) and not REQUIRED_KEYWORD.search(s):
            continue
        # Skip coreq
        if COREQ.search(s):
            continue
        # Skip admin sentences
        if ADMIN_START.match(s):
            continue
        # Skip parenthetical substitute clauses - they've already been captured
        # Remove them so they don't re-generate as separate prereq groups
        s = re.sub(r'\([^)]*(?:may\s+(?:take|substitute)|substitute|in\s+place\s+of)[^)]*\)', '', s, flags=re.I)

        # Split by semicolons (strong AND)
        for chunk in re.split(r'\s*;\s*', s):
            # Split by ", and " or " and " (weaker AND)
            and_parts = re.split(r',?\s+and\s+', chunk, flags=re.I)
            for part in and_parts:
                for group in extract_or_groups(part.strip(), default_dept, self_codes):
                    groups.append(group)

    # Apply substitute_map: for any group containing a "for" code, add the substitutes as OR options
    result: list[list[str]] = []
    for group in groups:
        expanded = list(group)
        for code in group:
            for sub in substitute_map.get(code, []):
                if sub not in expanded and sub not in self_codes:
                    expanded.append(sub)
        result.append(expanded)

    # Deduplicate identical groups
    seen: list[tuple] = []
    deduped: list[list[str]] = []
    for g in result:
        t = tuple(sorted(g))
        if t not in seen:
            seen.append(t)
            deduped.append(g)

    return deduped


def get_self_codes(course: dict) -> set[str]:
    return {norm_code(d, n) for d, n in zip(course['depts'], course['numbers'])}


def main():
    base = Path(__file__).parent.parent / 'src' / 'data' / 'catalog'
    core_path = base / 'courses-core-2627.json'

    print("Reading catalog...")
    core = json.loads(core_path.read_text())

    processed = 0
    skipped_no_text = 0

    for course in core:
        prereq_text = course.get('prerequisites', '')
        if not prereq_text:
            course.pop('prereqGroups', None)
            skipped_no_text += 1
            continue

        self_codes = get_self_codes(course)
        default_dept = course['depts'][0] if len(course['depts']) == 1 else None
        groups = extract_prereq_groups(prereq_text, self_codes, default_dept)
        course['prereqGroups'] = groups
        processed += 1

    print(f"Processed {processed} courses with prereq text.")
    print(f"  No prereq text: {skipped_no_text}")

    print(f"\nWriting {core_path}...")
    core_path.write_text(json.dumps(core, ensure_ascii=False, separators=(',', ':')))
    print("Done.")

    # Flag courses with equiv/substitute/range patterns that are hard to parse correctly
    flag_re = re.compile(r'\b(?:equivalent|substitut|may take|in place of)\b|\d{2,3}-\d{2,3}', re.I)
    flagged = []
    for c in core:
        p = c.get('prerequisites', '')
        if not p or not c.get('prereqGroups'):
            continue
        if flag_re.search(p):
            key = f"{c['depts'][0]} {c['numbers'][0]}"
            flagged.append({'course': key, 'prereqText': p, 'parsedGroups': c['prereqGroups']})

    flag_path = Path(__file__).parent / 'flagged_prereqs.json'
    flag_path.write_text(json.dumps(flagged, indent=2, ensure_ascii=False))
    print(f"\n{len(flagged)} courses flagged for AI review → {flag_path}")


if __name__ == '__main__':
    main()
