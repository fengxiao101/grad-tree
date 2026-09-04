#!/usr/bin/env python3
"""
Enumerate Stanford undergraduate + coterm programs from the bulletin sitemap.

No headless browser needed - pages are server-side rendered.

Usage: python3 scripts/enumerate.py
Output: scripts/data/programs.json
"""

import json
import re
import sys
import time
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError

SITEMAP = "https://bulletin.stanford.edu/sitemap.xml"
OUTPUT  = Path(__file__).parent / "data" / "programs.json"

HEADERS = {"User-Agent": "Stanford-Planner-Bot/1.0 (course research)"}

# Suffixes we care about:
#   BS / BA / ENG      → undergraduate major
#   MIN / PMN          → minor / program minor (PMN = professional minor)
#   MS                 → graduate / coterm master's
UNDERGRAD_MAJOR  = {"BS", "BA", "ENG"}
MINOR_SUFFIX     = {"MIN", "PMN"}
COTERM_SUFFIX    = {"MS"}   # will refine by checking page content

CATEGORY_MAP = {
    "BS": "major", "BA": "major", "ENG": "major",
    "MIN": "minor", "PMN": "minor",
    "MS": "coterm",
}


def fetch(url: str) -> str:
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="replace")


def html_to_text(html: str) -> str:
    html = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.DOTALL)
    html = re.sub(r"<style[^>]*>.*?</style>",  "", html, flags=re.DOTALL)
    html = re.sub(r"<(br|p|li|tr|h[1-6]|div)[^>]*>", "\n", html)
    html = re.sub(r"<[^>]+>", " ", html)
    for ent, ch in [("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"), ("&nbsp;", " "), ("&#39;", "'")]:
        html = html.replace(ent, ch)
    html = re.sub(r"\s{2,}", " ", html)
    return html.strip()


def parse_program_page(url: str, program_id: str) -> dict | None:
    """Fetch one bulletin program page and extract metadata."""
    try:
        html = fetch(url)
    except URLError as e:
        print(f"  FETCH ERROR {url}: {e}", file=sys.stderr)
        return None

    # Extract h1 title - format: "CS-BS - Computer Science (BS)"
    # The page has two <h1>: "Stanford University" and then the program title
    all_h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.DOTALL)
    raw_title = ""
    for h in all_h1s:
        t = re.sub(r"<[^>]+>", "", h).strip()
        if " - " in t or "(" in t:  # the program-name h1 has "CODE - Name (Degree)"
            raw_title = t
            break
    if not raw_title and all_h1s:
        raw_title = re.sub(r"<[^>]+>", "", all_h1s[-1]).strip()

    # Parse "CODE - Full Name (Degree)" pattern
    m = re.match(r"^[A-Z0-9\-]+ - (.+?)(?:\s+\([^)]+\))?$", raw_title)
    name = m.group(1).strip() if m else raw_title

    suffix = program_id.split("-")[-1].upper() if "-" in program_id else ""
    category = CATEGORY_MAP.get(suffix, "unknown")

    # For MS programs, check if the page says "Coterminal" to confirm it's a coterm
    if category == "coterm":
        text_preview = html_to_text(html)[:3000].lower()
        if "coterminal" not in text_preview and "coterm" not in text_preview:
            category = "graduate"  # pure grad, not coterm

    return {
        "id": program_id.lower(),
        "name": name,
        "url": url,
        "suffix": suffix,
        "category": category,
    }


def main():
    print("Fetching sitemap…")
    sitemap_xml = fetch(SITEMAP)

    all_urls = re.findall(r"https://bulletin\.stanford\.edu/programs/([^<\s]+)", sitemap_xml)
    print(f"Total programs in sitemap: {len(all_urls)}")

    # Filter to our target suffixes
    target_suffixes = UNDERGRAD_MAJOR | MINOR_SUFFIX | COTERM_SUFFIX
    filtered = [(pid, f"https://bulletin.stanford.edu/programs/{pid}")
                for pid in all_urls
                if "-" in pid and pid.split("-")[-1].upper() in target_suffixes]

    print(f"Target programs (UG + minors + MS): {len(filtered)}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    results = []
    errors  = []
    for i, (pid, url) in enumerate(filtered, 1):
        print(f"[{i}/{len(filtered)}] {pid}… ", end="", flush=True)
        info = parse_program_page(url, pid)
        if info:
            results.append(info)
            cat_short = info["category"][0].upper() if info["category"] else "?"
            print(f"{info['name']} ({cat_short})")
        else:
            errors.append(pid)
            print("ERROR")
        # Polite crawl rate
        if i % 10 == 0:
            time.sleep(0.5)

    # Summary
    by_cat = {}
    for r in results:
        by_cat.setdefault(r["category"], 0)
        by_cat[r["category"]] += 1

    print(f"\n✓ Fetched: {len(results)}  ✗ Errors: {len(errors)}")
    for cat, n in sorted(by_cat.items()):
        print(f"  {cat}: {n}")

    with open(OUTPUT, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nWrote {len(results)} programs → {OUTPUT}")


if __name__ == "__main__":
    main()
