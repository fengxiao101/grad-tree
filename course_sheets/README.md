# course_sheets

**Everything in this folder is gitignored except this file.** After a fresh
clone the folder is empty, and that is expected.

## What lands here

The program encoding pipeline writes its working artifacts here:

| File | Written by | Contents |
|---|---|---|
| `{id}.cache.json` | `program-extractor` | One bulletin page, fetched once, structured plus raw text |
| `{id}_raw.txt` | `program-extractor` | Verbatim page text kept alongside the cache |
| `prereq-db.json` | `prereq-extractor` | Parsed prerequisites per course, keyed `"DEPT NNN"` |
| `plan-export.json` | you, by hand | A plan exported from the app for `prereq-tagger` to validate |
| PDFs | you, by hand | Bulletin and catalog PDFs used while encoding |

## Why it is ignored

These are regenerable, large (the catalog PDFs alone ran to tens of megabytes),
and transcribed from Stanford's published bulletin, so they are not ours to
redistribute. Keeping them out of the repository keeps clones small and avoids
shipping someone else's material.

Nothing in the build reads this folder. `npm run build` and the Vercel deploy
work with it empty, which is exactly how CI runs.

## If you are encoding a program

The cache exists so a bulletin page is fetched once and never again. Check for
`{id}.cache.json` before fetching, and write it immediately after fetching and
before parsing, so a crash mid-parse does not cost another fetch.

The documentation that used to live here is now in `ai_agents/`:
`encoding-pipeline.md`, `encoding-mistakes.md` and `prereq-patterns.md`.
