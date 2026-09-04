# Grad Tree

A four-year degree planner for Stanford students. Drag courses onto a quarter
grid and watch major, minor, co-term, WAYS, and writing requirements resolve
against them in real time.

Not affiliated with, endorsed by, or operated by Stanford University. Encoded
requirements are a convenience, not an official audit. Always confirm your plan
against the [Stanford Bulletin](https://bulletin.stanford.edu) and your academic
advisor.

## Demo

[Watch a walkthrough of the planner](https://youtu.be/DwPdG_RABAY)

## What it does

- **Plan by quarter.** Drag and drop courses across a 4 or 5 year grid, with an
  unsorted pool for courses you have not placed yet.
- **Live requirement tracking.** 93 encoded programs: 39 majors, 34 minors, and
  20 co-terminal master's programs, including track and concentration selection.
- **Double and secondary majors.** Track more than one major at once, with the
  double-counting rules each program actually allows.
- **Prerequisite warnings.** Flags courses scheduled before their prerequisites,
  parsed from the catalog's prerequisite text.
- **Test and transfer credit.** AP, IB, and A-Level scores plus transfer courses
  feed into requirement satisfaction.
- **Scenarios.** Keep up to 10 alternative plans side by side and compare them.
- **Export and share.** Print a plan, export it as a PDF, or share it directly.

## Getting started

Requires Node 20.19 or later.

```bash
npm install
cp .env.example .env   # then fill in your Firebase keys
npm run dev
```

The app runs fully offline against `sessionStorage`. Firebase is only needed for
cloud sync and sign-in; without it, sign-in is hidden and everything else works.
See `.env.example` for what each variable does.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Regenerates the program manifest, then starts Vite |
| `npm run build` | Manifest, typecheck, production build, bundle size check |
| `npm run preview` | Serves the production build locally |
| `npm run programs:manifest` | Rebuilds `src/data/programManifest.generated.ts` |
| `npm test` | Runs the characterization tests |
| `npm run lint` | ESLint over source, tests and scripts |

## Architecture

```
src/
  components/   React UI
  store/        Zustand stores (planner state, prereq highlighting)
  data/
    majors/     One MajorConfig per major
    minors/     One MajorConfig per minor
    cotermPrograms/  One MajorConfig per co-term program
    catalog/    Course catalog JSON plus lookup and search
    majorSchema.ts   The MajorConfig type: start here
  utils/        Requirement matching, prereq parsing, warnings
scripts/        Catalog parsing and program manifest generation
```

Built with React 18, TypeScript, Vite, Tailwind CSS, Zustand, dnd-kit, and
Firebase.

**Program loading is lazy.** `src/data/programRegistry.ts` resolves a program id
to a dynamic import via `import.meta.glob`, so selecting a major loads only that
program's chunk. Do not add a barrel file that imports every program eagerly, as
that would pull all 93 into the initial bundle.

**The course catalog is split in two.** `catalog/index.ts` loads a compact core
catalog (6,774 courses, no descriptions) used for all requirement matching.
`catalog/full.ts` carries descriptions and prerequisites and is loaded on demand
by `catalog/lazyFull.ts` when a search or detail view needs it.

## Adding a program

Each program is one `MajorConfig` object. Read `src/data/majorSchema.ts` for the
schema and `ai_agents/encoding-pipeline.md` for the full encoding pipeline and its rules. In short:

1. Read the program's page on the Stanford Bulletin, footnotes included.
2. Write `src/data/{majors,minors,cotermPrograms}/{id}-2526.ts`, taking
   `totalMinUnits` from the bulletin header rather than summing sections.
3. Run `npm run programs:manifest` so it appears in the program picker.

Helper builders in `src/data/majorBuilders.ts` cut down the boilerplate.

## Contributing

Requirement corrections are the most valuable contribution: there are 93
programs encoded by hand, and the bulletin changes every year.

**Reporting a wrong requirement.** Open an issue with a link to the program's
page on the [Stanford Bulletin](https://bulletin.stanford.edu) and quote the
line that disagrees with the app. The bulletin page is the source of truth, so
a correction without one cannot be verified.

**Fixing one yourself.**

1. Edit the program's file under `src/data/majors`, `src/data/minors` or
   `src/data/cotermPrograms`. `src/data/majorSchema.ts` documents every field,
   and `ai_agents/encoding-mistakes.md` lists the traps previous encodings
   fell into.
2. Run `npm run programs:manifest`. A new or renamed program does not appear in
   the picker until the generated manifest is rebuilt, and a test fails if it is
   stale.
3. Run `npm run build`. It regenerates the manifest, typechecks, builds and
   checks the bundle budgets. Run `npm run lint` and `npm test` too. CI runs all
   three on every pull request.
4. Cite the bulletin page in your pull request, the same as for an issue.

Taking `totalMinUnits` from the bulletin header rather than summing sections,
and only marking a course WIM when the bulletin says so, are the two mistakes
that come up most often.

## License

Apache License 2.0. See [LICENSE](LICENSE).

The license covers this project's source code. The bundled Stanford imagery and
the course and degree requirement data under `src/data/` are third-party
material included so the app builds and runs; see [NOTICE](NOTICE) before
redistributing or deploying a fork.
