# Repository instructions

## Working rules

- Inspect the relevant implementation and tests before changing behavior.
- Preserve unrelated working-tree changes. Keep changes scoped to the task.
- Distinguish implemented behavior, intended rules, and unresolved questions.
  Do not silently turn a known defect into a domain requirement.
- Keep one canonical source per fact. Read values, scripts, types, and tool
  settings from code/configuration; do not copy them into instruction files.
- Preserve the import boundaries enforced by ESLint. Their rationale and the
  actual module relationships are in [architecture](docs/architecture.md).
- Add a regression test for a behavior fix. Select checks using
  [development](docs/development.md), and report what ran, what failed, and
  what was not checked. Never claim a check passed without running it.
- Update the owning document when changing a documented contract or workflow.
  Put pending work in [TODO](TODO.md), not in these instructions.

## Read only the context needed for the task

| Task                                                           | Start here                           |
| -------------------------------------------------------------- | ------------------------------------ |
| Product scope or user scenario                                 | [Product](docs/product.md)           |
| Equipment, money, encumbrance, movement, firearms              | [Domain](docs/domain.md)             |
| RPG terms in Russian or English text                           | [Terminology](docs/terminology.md)   |
| State, import/export, routing, localization, module boundaries | [Architecture](docs/architecture.md) |
| Setup, checks, translations, deployment, parallel work         | [Development](docs/development.md)   |
| Outstanding defects or planned work                            | [TODO](TODO.md)                      |

Follow the document's source links into the relevant implementation and tests.
Do not preload every document or the entire rulebook for an unrelated task.

## Tool independence

This file is the canonical repository instruction source. `CLAUDE.md` only
imports it; do not add a second set of rules there or in tool-specific settings.
Use ordinary Markdown links for on-demand context, not automatic imports of all
project documentation. Add a specialized Skill only for a recurring workflow
that needs instructions beyond the development guide. Add `docs/adr/` only when
recording a significant architectural decision, including its alternatives and
consequences; do not invent historical rationale.
