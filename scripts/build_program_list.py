#!/usr/bin/env python3
"""
Build programs.json from the bulletin sitemap + partial fetch results.

Uses already-fetched names from programs.json where available, and for
the rest derives names from the program ID using a lookup table.

Run after enumerate.py hits rate limits.
"""

import json
import re
import time
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

PARTIAL   = Path(__file__).parent / "data" / "programs.json"
OUTPUT    = Path(__file__).parent / "data" / "programs.json"
SITEMAP   = "https://bulletin.stanford.edu/sitemap.xml"

HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

UNDERGRAD_MAJOR  = {"BS", "BA", "ENG"}
MINOR_SUFFIX     = {"MIN", "PMN"}
COTERM_SUFFIX    = {"MS"}

CATEGORY_MAP = {
    "BS": "major", "BA": "major", "ENG": "major",
    "MIN": "minor", "PMN": "minor",
    "MS": "coterm",
}

# Known coterm-eligible MS programs (from Stanford's official coterm list)
# Source: https://registrar.stanford.edu/students/coterminal-master-degree-program
KNOWN_COTERMINAL_MS = {
    "AA-MS", "AEPHY-MS", "BIO-MS", "BIOE-MS", "BIOPH-MS", "CE-MS",
    "CHEM-MS", "CHPR-MS", "CS-MS", "EASYS-MS", "EE-MS", "ENGR-MS",
    "ENVRES-MS", "FSYS-MS", "ICME-MS", "MATSCI-MS", "MATSC-MS",
    "ME-MS", "MECH-MS", "MGTSC-MS", "MS-MS", "MSANDE-MS", "NEURS-MS",
    "PHYS-MS", "STATS-MS", "STMRM-MS", "SYMBO-MS", "SUSTSCI-MS",
    # Engineering programs
    "CEE-MS", "CME-MS", "ENVRES-MS",
}

# Dept code → human name (derived from already-fetched records + common knowledge)
DEPT_NAMES = {
    "AA":     "Aeronautics and Astronautics",
    "AEPHY":  "Applied and Engineering Physics",
    "AFRAM":  "African and African American Studies",
    "AMSTU":  "American Studies",
    "ANTHR":  "Anthropology",
    "APLPH":  "Applied Physics",
    "ARCHA":  "Archaeology",
    "ART":    "Art History",
    "ARTHS":  "Art History",
    "ARTP":   "Art Practice",
    "ARTS":   "Interdisciplinary Arts",
    "ASAM":   "Asian American Studies",
    "BIO":    "Biology",
    "BIOC":   "Biochemistry",
    "BIOE":   "Bioengineering",
    "BIOPH":  "Biophysics",
    "BMDS":   "Biomedical Data Science",
    "CANBI":  "Cancer Biology",
    "CE":     "Civil Engineering",
    "CEE":    "Civil and Environmental Engineering",
    "CHEM":   "Chemistry",
    "CHEME":  "Chemical Engineering",
    "CHILT":  "Chicana/o-Latina/o Studies",
    "CHPR":   "Community Health and Prevention Research",
    "CIMGT":  "Construction and Infrastructure Management",
    "CLASS":  "Classics",
    "CME":    "Computational and Mathematical Engineering",
    "COMMU":  "Communication",
    "CPLIT":  "Comparative Literature",
    "CRWRIT": "Creative Writing",
    "CS":     "Computer Science",
    "CSB":    "Computational and Systems Biology",
    "CSRE":   "Comparative Studies in Race and Ethnicity",
    "DATSC":  "Data Science",
    "DATSCI": "Data Science",
    "DBIO":   "Developmental Biology",
    "DESIGN": "Design",
    "DIGHUM": "Digital Humanities",
    "EASST":  "East Asian Languages and Cultures",
    "EASYS":  "Earth Systems",
    "ECON":   "Economics",
    "ED":     "Education",
    "EE":     "Electrical Engineering",
    "ENGR":   "Engineering",
    "ENVRES": "Environment and Resources",
    "ESS":    "Earth and Planetary Sciences",
    "FEMST":  "Feminist, Gender, and Sexuality Studies",
    "FILMST": "Film and Media Studies",
    "FSYS":   "Food Systems",
    "GENE":   "Genetics",
    "GEOPH":  "Geophysics",
    "GERST":  "German Studies",
    "GLBLST": "Global Studies",
    "HMN GEN":"Human Genetics",
    "HRP":    "Health Research and Policy",
    "HSTRY":  "History",
    "HUMBI":  "Human Biology",
    "HUMRTS": "Human Rights",
    "ICME":   "Institute for Computational and Mathematical Engineering",
    "IDMEN":  "Interdisciplinary Medical Neuroscience",
    "ILAC":   "Iberian and Latin American Cultures",
    "IMMUN":  "Immunology",
    "INTLR":  "International Relations",
    "ITAL":   "Italian",
    "JEWSH":  "Jewish Studies",
    "LING":   "Linguistics",
    "MATH":   "Mathematics",
    "MATSC":  "Materials Science and Engineering",
    "MATSCI": "Materials Science and Engineering",
    "MCP":    "Master of City Planning",
    "ME":     "Mechanical Engineering",
    "MED":    "Medicine",
    "MEDHUM": "Medical Humanities",
    "MEDST":  "Medieval Studies",
    "MELLC":  "Middle Eastern Languages and Cultures",
    "MGTSC":  "Management Science and Engineering",
    "MI":     "Management Information",
    "MLASC":  "Machine Learning and Applications to Sciences and Computation",
    "MODLAN": "Modern Languages",
    "MSANDE": "Management Science and Engineering",
    "MS":     "Materials Science",
    "MUSIC":  "Music",
    "NATAM":  "Native American Studies",
    "NEURS":  "Neurosciences",
    "OCEANS": "Oceans",
    "PAS":    "Polish and Eastern European Studies",
    "PHILO":  "Philosophy",
    "PHREL":  "Philosophy and Religious Studies",
    "PHYS":   "Physics",
    "PLA":    "Product Life Analytics",
    "POLSC":  "Political Science",
    "PORT":   "Portuguese",
    "PSYCH":  "Psychology",
    "PUBPO":  "Public Policy",
    "RELST":  "Religious Studies",
    "SLAV":   "Slavic Languages and Literatures",
    "SOCIO":  "Sociology",
    "SPAN":   "Spanish and Portuguese",
    "STATS":  "Statistics",
    "STMRM":  "Stem Cell Biology and Regenerative Medicine",
    "STS":    "Science, Technology, and Society",
    "SUSTSCI":"Sustainability Science and Practice",
    "SYMBO":  "Symbolic Systems",
    "THPST":  "Theater and Performance Studies",
    "TRAM":   "Translational and Applied Medicine",
    "TRANS":  "Transatlantic Studies",
    "URBST":  "Urban Studies",
}

def dept_from_id(program_id):
    return program_id.split("-")[0].upper() if "-" in program_id else program_id.upper()


def fetch_with_browser_ua(url):
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", errors="replace")


def html_to_text(html):
    html = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.DOTALL)
    html = re.sub(r"<style[^>]*>.*?</style>",  "", html, flags=re.DOTALL)
    html = re.sub(r"<[^>]+>", " ", html)
    for ent, ch in [("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"), ("&nbsp;", " "), ("&#39;", "'")]:
        html = html.replace(ent, ch)
    return re.sub(r"\s{2,}", " ", html).strip()


def parse_name_from_page(url):
    try:
        html = fetch_with_browser_ua(url)
        all_h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.DOTALL)
        for h in all_h1s:
            t = re.sub(r"<[^>]+>", "", h).strip()
            if " - " in t:
                m = re.match(r"^[A-Z0-9\- ]+ - (.+?)(?:\s+\([^)]+\))?$", t)
                return m.group(1).strip() if m else t
        return None
    except Exception:
        return None


def main():
    # Load already-fetched data
    already = {}
    if PARTIAL.exists():
        for p in json.load(open(PARTIAL)):
            already[p["id"]] = p

    print(f"Already have {len(already)} programs")

    # Fetch sitemap for full list
    print("Fetching sitemap…")
    sitemap_xml = fetch_with_browser_ua(SITEMAP)
    all_pids = re.findall(r"https://bulletin\.stanford\.edu/programs/([^<\s]+)", sitemap_xml)

    target_suffixes = UNDERGRAD_MAJOR | MINOR_SUFFIX | COTERM_SUFFIX
    filtered_pids = [pid for pid in all_pids
                     if "-" in pid and pid.split("-")[-1].upper() in target_suffixes]

    print(f"Target programs: {len(filtered_pids)}")

    results = []
    needs_fetch = []

    for pid in filtered_pids:
        pid_lower = pid.lower()
        suffix = pid.split("-")[-1].upper()
        dept = dept_from_id(pid)

        if pid_lower in already:
            # Already have good data
            existing = already[pid_lower]
            if existing.get("name") and existing["name"] != "Stanford University":
                results.append(existing)
                continue

        # Determine category
        pid_upper = pid.upper()
        if suffix in UNDERGRAD_MAJOR:
            cat = "major"
        elif suffix in MINOR_SUFFIX:
            cat = "minor"
        elif suffix == "MS":
            # Check known coterm list
            cat = "coterm" if pid_upper in KNOWN_COTERMINAL_MS else "graduate"
        else:
            cat = "unknown"

        # Get name from dept lookup
        name = DEPT_NAMES.get(dept)
        if name:
            results.append({
                "id": pid_lower,
                "name": name,
                "url": f"https://bulletin.stanford.edu/programs/{pid}",
                "suffix": suffix,
                "category": cat,
            })
        else:
            # Need to fetch this one
            needs_fetch.append((pid, suffix, cat))

    # Fetch missing names with browser UA + delays
    print(f"\nNeed to fetch {len(needs_fetch)} programs for name lookup…")
    for i, (pid, suffix, cat) in enumerate(needs_fetch, 1):
        url = f"https://bulletin.stanford.edu/programs/{pid}"
        print(f"[{i}/{len(needs_fetch)}] {pid}… ", end="", flush=True)
        name = parse_name_from_page(url)
        if name:
            results.append({"id": pid.lower(), "name": name, "url": url, "suffix": suffix, "category": cat})
            print(name)
        else:
            dept = dept_from_id(pid)
            # Use id as fallback name
            fallback = dept.title() + " " + suffix
            results.append({"id": pid.lower(), "name": fallback, "url": url, "suffix": suffix, "category": cat})
            print(f"(fallback: {fallback})")
        time.sleep(1.5)

    # Sort by id
    results.sort(key=lambda p: p["id"])

    # Stats
    from collections import Counter
    cats = Counter(p["category"] for p in results)
    print(f"\n✓ Total: {len(results)}")
    for cat, n in sorted(cats.items()):
        print(f"  {cat}: {n}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nWrote {len(results)} programs → {OUTPUT}")


if __name__ == "__main__":
    main()
