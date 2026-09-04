# AI agent tooling

Notes and agent definitions used when encoding Stanford programs with an AI
assistant. None of this ships in the app; it exists so a coding session picks up
the project's conventions instead of rediscovering them.

| File | Purpose |
|---|---|
| `encoding-pipeline.md` | Project overview, the encoding pipeline, schema rules, remaining work, tech notes |
| `encoding-mistakes.md` | Every mistake past encodings made. Read before encoding a program |

## Agent definitions stay where the tools look for them

These paths are fixed by the tools that read them, so they are not moved here:

| Path | Read by |
|---|---|
| `CLAUDE.md` (repo root) | Claude Code, which imports `encoding-pipeline.md` |
| `AGENTS.md` (repo root) | Codex, which points at `encoding-pipeline.md` |
| `.claude/agents/*.md` | Claude Code subagent discovery |
| `.codex/agents/*.toml` | Codex agent discovery |

Both agent sets implement the same three-phase pipeline: an extractor fetches a
bulletin page once into `course_sheets/{id}.cache.json`, a maker turns that
cache into a `MajorConfig` TypeScript file, and a checker diffs the two. Nothing
after the extractor re-fetches the bulletin.
