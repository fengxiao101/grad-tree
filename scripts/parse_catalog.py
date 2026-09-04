#!/usr/bin/env python3
"""
Parse Stanford ExploreCourses PDF (exported as text via pdftotext) into courses-YYZZ.json.

Usage:
  pdftotext -layout database_courses.pdf courses_raw.txt
  python3 scripts/parse_catalog.py courses_raw.txt src/data/catalog/courses-2627.json [existing_json]

Also writes a core (no-description) version alongside the full output:
  courses-2627.json       - full, with description (lazy-loaded for course popups)
  courses-core-2627.json  - stripped, no description (loaded at startup)

Cross-listed courses (e.g. "AA 132: Title (AA 232, EPS 195, EPS 245)")
are emitted as a single entry with parallel depts[]/numbers[] arrays.
needsApplication is preserved from an existing JSON if provided.
WIM is not detected or stored (major configs carry wimCourses explicitly).
"""

import re, sys, json
from pathlib import Path

# ── WAY tag normalization ─────────────────────────────────────────────────────
WAY_MAP = {
    'WAY-A-II': 'AII', 'WAY-AII': 'AII',
    'WAY-SMA':  'SMA',
    'WAY-SI':   'SI',
    'WAY-AQR':  'AQR',
    'WAY-CE':   'CE',
    'WAY-EDP':  'EDP',
    'WAY-ER':   'ER',
    'WAY-FR':   'FR',
    # lowercase variants (typos in PDF)
    'way_ce': 'CE', 'way_aqr': 'AQR',
}

DEPT_RE       = re.compile(r'^([A-Z][A-Z0-9&]*)\s+([0-9][A-Z0-9]*[A-Z0-9]?)\s*:\s*(.+)$')
CROSS_RE      = re.compile(r'\(([^)]+)\)\s*$')
TERM_RE       = re.compile(
    r'Terms:\s*([^|]+?)\s*\|'
    r'.*?Units:\s*([^|]+?)\s*(?:\||$)'
)
UGRE_RE       = re.compile(r'UG Reqs:\s*(.+?)(?:\s*\||\s*$)')
XLIST_RE      = re.compile(r'([A-Z][A-Z0-9&]*)\s+([0-9][A-Z0-9]*[A-Z0-9]?)')
XLIST_FULL_RE = re.compile(r'^([A-Z][A-Z0-9&]*)\s+([0-9][A-Z0-9]*[A-Z0-9]?)$')
BODY_PAREN_RE = re.compile(r'^\s*\(([^)]+)\)')
PREREQ_RE     = re.compile(
    r'\b(?:Recommended\s+)?[Pp]re-?reqs?(?:uisites?)?\s*(?:\(s\))?\s*(?:are|:)',
    re.IGNORECASE,
)


def parse_terms_line(line: str) -> dict:
    """Extract terms, units, ways, writing, college, language from Terms: … line."""
    result = {
        'terms':    [],
        'units':    '',
        'ways':     [],
        'writing':  None,
        'college':  False,
        'language': False,
    }

    m = TERM_RE.search(line)
    if m:
        terms_raw = m.group(1).strip()
        result['terms'] = [t.strip() for t in re.split(r'[,\s]+', terms_raw)
                           if t.strip() in ('Aut', 'Win', 'Spr', 'Sum')]
        result['units'] = m.group(2).strip()

    ugre_m = UGRE_RE.search(line)
    if ugre_m:
        tags = [t.strip() for t in ugre_m.group(1).split(',')]
        for tag in tags:
            tag_upper = tag.upper().strip()
            if tag in WAY_MAP:
                result['ways'].append(WAY_MAP[tag])
            elif tag_upper in WAY_MAP:
                result['ways'].append(WAY_MAP[tag_upper])
            elif tag == 'Writing 1' or tag_upper == 'WRITING 1':
                result['writing'] = '1'
            elif tag == 'Writing 2' or tag_upper == 'WRITING 2':
                result['writing'] = '2'
            elif tag == 'College' or tag_upper == 'COLLEGE':
                result['college'] = True
            elif tag == 'Language' or tag_upper == 'LANGUAGE':
                result['language'] = True
            # GER:DB-*, THINK, WIM, SLE - intentionally ignored

    return result


def parse_course_header(line: str):
    """Parse 'DEPT NUM: Title (CROSS1 NUM1, CROSS2 NUM2)' → (depts, numbers, title)."""
    m = DEPT_RE.match(line.strip())
    if not m:
        return None
    primary_dept   = m.group(1)
    primary_number = m.group(2)
    title_raw      = m.group(3).strip()

    depts   = [primary_dept]
    numbers = [primary_number]

    # Strip ALL trailing cross-listing parentheticals (some courses have two groups).
    title = title_raw
    while True:
        cm = CROSS_RE.search(title)
        if not cm:
            break
        inner = cm.group(1)
        if not XLIST_RE.search(inner):
            break   # trailing paren is not a cross-listing, leave it
        for xm in XLIST_RE.finditer(inner):
            d, n = xm.group(1), xm.group(2)
            depts.append(d)
            numbers.append(n)
        title = title[:cm.start()].strip()

    return depts, numbers, title


def extract_prereq_text(description: str) -> str | None:
    """Extract prerequisite sentence(s) from description text."""
    if not description:
        return None
    m = PREREQ_RE.search(description)
    if not m:
        return None
    tail = description[m.start():]
    sentences = re.split(r'(?<=[.!?])\s+', tail)
    parts = []
    total = 0
    for s in sentences:
        if re.match(r'^(?:Instructors?|Terms?|Note|Enrollment|Grading)\s*:', s, re.IGNORECASE):
            break
        parts.append(s)
        total += len(s)
        if total > 400:
            break
    result = re.sub(r'\s+', ' ', ' '.join(parts)).strip()
    return result if result else None


def extract_body_crosslistings(description: str, depts: list, numbers: list) -> str:
    """
    Strip leading parentheticals from description that are purely DEPT NUM lists
    and add them to depts/numbers.  Stops at the first paren with any English text.
    This catches cross-listings the bulletin placed in the body paragraph instead of
    the course header, while staying well away from prereq text (which appears later
    in the description and always contains English words like 'Prerequisite:').
    """
    text = description
    existing = {f"{d} {n}" for d, n in zip(depts, numbers)}
    while True:
        m = BODY_PAREN_RE.match(text)
        if not m:
            break
        inner = m.group(1).strip()
        items = [i.strip() for i in inner.split(',') if i.strip()]
        if not items or not all(XLIST_FULL_RE.match(item) for item in items):
            break   # contains English words - stop
        for item in items:
            xm = XLIST_FULL_RE.match(item)
            d, n = xm.group(1), xm.group(2)
            key = f"{d} {n}"
            if key not in existing:
                depts.append(d)
                numbers.append(n)
                existing.add(key)
        text = text[m.end():].lstrip()
    return text


def parse_text(text: str) -> list[dict]:
    lines = text.splitlines()

    start = 0
    for i, line in enumerate(lines):
        if DEPT_RE.match(line.strip()):
            start = i
            break

    courses = []
    i = start

    while i < len(lines):
        stripped = lines[i].strip()

        # If the header line has an unclosed parenthesis (cross-listing list
        # wrapped to the next line by pdftotext), join continuation lines
        # until the closing ')' is found.
        if (DEPT_RE.match(stripped)
                and '(' in stripped
                and ')' not in stripped.split('(', 1)[1]):
            cont_end = i
            combined = stripped
            for j in range(i + 1, min(i + 10, len(lines))):
                next_ln = lines[j].strip()
                if not next_ln:
                    break
                if next_ln.startswith('Terms:') or next_ln.startswith('Instructors:'):
                    break
                if DEPT_RE.match(next_ln):   # next course starts
                    break
                combined += ' ' + next_ln
                cont_end = j
                if ')' in next_ln:
                    break
            stripped = combined
            i = cont_end   # will be incremented past continuation after header

        header = parse_course_header(stripped)
        if header is None:
            i += 1
            continue

        depts, numbers, title = header
        i += 1

        desc_lines = []
        terms_info = {}
        while i < len(lines):
            ln = lines[i]
            if ln.strip().startswith('Terms:'):
                terms_info = parse_terms_line(ln)
                i += 1
                if i < len(lines) and lines[i].strip().startswith('Instructors:'):
                    i += 1
                break
            # A line that looks like a course header for the CURRENT course is
            # a self-reference in the description (e.g. "SURG 236: ... empowers").
            # Treat it as description text rather than a new course start.
            if DEPT_RE.match(ln.strip()):
                hm = DEPT_RE.match(ln.strip())
                if hm and hm.group(1) == depts[0] and hm.group(2) == numbers[0]:
                    desc_lines.append(ln.strip())
                    i += 1
                    continue
                break
            if ln.strip():
                desc_lines.append(ln.strip())
            i += 1

        description = ' '.join(desc_lines)
        description = extract_body_crosslistings(description, depts, numbers)
        prereq = extract_prereq_text(description)

        course_entry = {
            'depts':            depts,
            'numbers':          numbers,
            'title':            title,
            'units':            terms_info.get('units', ''),
            'terms':            terms_info.get('terms', []),
            'ways':             terms_info.get('ways', []),
            'writing':          terms_info.get('writing', None),
            'college':          terms_info.get('college', False),
            'language':         terms_info.get('language', False),
            'needsApplication': False,
            'description':      description,
        }
        if prereq:
            course_entry['prerequisites'] = prereq
        courses.append(course_entry)

    return courses


def build_key(dept: str, number: str) -> str:
    return f"{dept.upper()} {number.upper()}"


def merge_duplicates(courses: list[dict]) -> list[dict]:
    """
    If two parsed entries share ANY dept+number key, merge them into one.
    Handles cross-listings that appear from two primary perspectives.
    """
    seen: dict[str, int] = {}
    out:  list[dict]     = []

    for c in courses:
        existing_idx = None
        for d, n in zip(c['depts'], c['numbers']):
            k = build_key(d, n)
            if k in seen:
                existing_idx = seen[k]
                break

        if existing_idx is not None:
            ex = out[existing_idx]
            ex_keys = {build_key(d, n) for d, n in zip(ex['depts'], ex['numbers'])}
            for d, n in zip(c['depts'], c['numbers']):
                k = build_key(d, n)
                if k not in ex_keys:
                    ex['depts'].append(d)
                    ex['numbers'].append(n)
                    ex_keys.add(k)
                    seen[k] = existing_idx
        else:
            idx = len(out)
            out.append(c)
            for d, n in zip(c['depts'], c['numbers']):
                seen[build_key(d, n)] = idx

    return out


def preserve_from_existing(courses: list[dict], existing_path: str | None) -> list[dict]:
    """Copy needsApplication from the old JSON where we have a key match."""
    if not existing_path or not Path(existing_path).exists():
        return courses

    with open(existing_path) as f:
        old = json.load(f)

    old_map: dict[str, dict] = {}
    for c in old:
        for d, n in zip(c['depts'], c['numbers']):
            k = build_key(d, n)
            old_map[k] = {
                'needsApplication': c.get('needsApplication', False),
            }

    for c in courses:
        for d, n in zip(c['depts'], c['numbers']):
            k = build_key(d, n)
            if k in old_map:
                info = old_map[k]
                if info['needsApplication']:
                    c['needsApplication'] = True
                break

    return courses


def write_json(data: list[dict], path: str) -> None:
    Path(path).write_text(
        json.dumps(data, ensure_ascii=False, separators=(',', ':')),
        encoding='utf-8',
    )


def main():
    if len(sys.argv) < 3:
        print("Usage: parse_catalog.py <raw_text_file> <output_full_json> [existing_json_to_preserve]")
        sys.exit(1)

    raw_path    = sys.argv[1]
    output_path = sys.argv[2]
    existing    = sys.argv[3] if len(sys.argv) > 3 else None

    # Derive core path: courses-2627.json → courses-core-2627.json
    p = Path(output_path)
    core_path = str(p.parent / p.name.replace('courses-', 'courses-core-'))

    print(f"Reading {raw_path}…")
    text = Path(raw_path).read_text(encoding='utf-8', errors='replace')

    print("Parsing courses…")
    courses = parse_text(text)
    print(f"  Parsed {len(courses)} raw entries")

    print("Merging cross-listed duplicates…")
    courses = merge_duplicates(courses)
    print(f"  After merge: {len(courses)} unique courses")

    print("Preserving needsApplication from existing JSON…")
    courses = preserve_from_existing(courses, existing)

    needs_count   = sum(1 for c in courses if c['needsApplication'])
    multi_count   = sum(1 for c in courses if len(c['depts']) > 1)
    writing_count = sum(1 for c in courses if c['writing'])
    college_count = sum(1 for c in courses if c['college'])
    lang_count    = sum(1 for c in courses if c['language'])
    prereq_count  = sum(1 for c in courses if c.get('prerequisites'))
    print(f"  needsApplication: {needs_count}  cross-listed: {multi_count}")
    print(f"  writing(WR1/WR2): {writing_count}  college: {college_count}  language: {lang_count}")
    print(f"  with prerequisites: {prereq_count}")

    print(f"Writing full catalog → {output_path}…")
    write_json(courses, output_path)

    print(f"Writing core catalog (no descriptions) → {core_path}…")
    core = [{k: v for k, v in c.items() if k != 'description'} for c in courses]
    write_json(core, core_path)

    print(f"Done - {len(courses)} courses.")
    print(f"  Full: {Path(output_path).stat().st_size / 1e6:.1f} MB")
    print(f"  Core: {Path(core_path).stat().st_size / 1e6:.1f} MB")


if __name__ == '__main__':
    main()
