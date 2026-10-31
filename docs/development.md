# Development

## Setup and commands

Use the Node version in [.nvmrc](../.nvmrc); the supported range is declared in
[package.json](../package.json). Install with Yarn Classic using the committed
[yarn.lock](../yarn.lock). The package scripts are the canonical command definitions.

```sh
nvm use
yarn install --frozen-lockfile
yarn dev
```

The default local URL is http://localhost:3000. No application API credentials
are required by the current source. Build tooling, translation compilation, and
linting require devDependencies; do not omit them from the build environment.
Runtime imports must have direct runtime dependencies rather than relying on
packages brought in by test tools.

## Choose verification by change

| Change                              | Checks                                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Any code change                     | `yarn tsc`, `yarn lint`, relevant Jest tests; run the complete suite before handoff when feasible.                                    |
| Ordinary pre-handoff checks         | `yarn weok` runs type checking, lint, formatting, Jest, and context checks; it does not build or run browsers.                        |
| Documentation or context            | `yarn check:context`, formatting of changed files, and manually follow a representative task through AGENTS → document → source/test. |
| Domain/state behavior               | Regression test in the owning `__tests__` directory, including boundary values and persistence compatibility when relevant.           |
| UI or browser behavior              | Relevant component tests and `yarn test:e2e`; `yarn test:e2e:all` exercises the supported project matrix.                             |
| Build dependencies, Next/Lingui/PWA | `yarn build`; for production behavior start with `yarn start` and inspect it in the target browser.                                   |

[Playwright configuration](../playwright.config.ts) owns browser/device targets,
server startup, retries, and artifacts. Install its browsers with
`yarn playwright install --with-deps` when the environment needs them. Screenshot
baselines are platform-specific; do not regenerate them merely to silence a failure.
After an intended visual change, regenerate them with `yarn test:e2e:update`.
Czech locale snapshots run locally only; [test locales](../e2e-tests/shared/consts.ts)
exclude them on CI.

Production offline verification must load the application online, allow the
service worker to activate, then exercise reload and inventory operations offline.
The current Playwright server is development mode, where PWA is disabled, so its
success does not prove offline support. Use the configured browser/device targets
for that verification too. Fonts use [next/font/google](../src/components/layout/fonts.ts),
so a build may need network access to retrieve fonts.

CI definitions are canonical: [main](../.github/workflows/main.yml) and
[Playwright](../.github/workflows/playwright.yml). Main CI checks types, lint,
context, and Jest, but does not run production build or formatting. Existing test
discovery/coverage gaps are tracked in [TODO](../TODO.md); an available test file
or screenshot is not evidence of a passing run.

## Catalog and translation work

1. Read [domain](domain.md), the relevant catalog factory, and adjacent tests.
2. Keep domain types translation-free and preserve the config `msg` restriction
   explained in [architecture](architecture.md).
3. Run `yarn translations:extract` when messages change; review the resulting PO
   diff. Extraction uses `--clean`, so unrelated message deletion needs scrutiny.
4. Preserve manual translations and review locale switching and reference-page
   fallback when relevant. Use current source/test behavior rather than duplicating
   numeric tables in prose.
5. Use the RPG terms in [terminology](terminology.md) for Russian and English text.

## Multiple agents

Assign each task a scope, affected contracts, and required checks. Use separate
worktrees for concurrent implementations; coordinate edits to state shape,
category lists, package/lock files, and shared catalogs before integration.
Do not overwrite another task's changes or reset an unfamiliar dirty tree.

The E2E setup defaults to port 3100, not the dev port, and outside CI reuses
whatever server already answers there, even an unrelated application. Verify
which checkout owns the server, or set `E2E_PORT` to another free port. Run such
suites serially. For
parallel UI work, use isolated ports and browser profiles. Separate worktrees
alone do not isolate ports or localStorage on the same origin.

A handoff should contain scope, changed contracts, actual check results, and
remaining questions. Keep temporary execution notes out of permanent agent
instructions. Skills are optional and tool-independent procedures should have
one owner: move a specialized recurring procedure into a Skill only when needed,
then link to it instead of maintaining two copies.

## Deployment and release

Owner-confirmed external behavior: every commit pushed to GitHub receives a
Vercel deployment at a temporary URL. Deployment scripts have been lost;
restoration is tracked in [TODO](../TODO.md). The repository does not establish
Vercel account settings, production promotion, or the full deployment procedure.

The [release workflow](../.github/workflows/release.yml) creates an archive and
GitHub release when a `v*` tag is pushed; it is not the Vercel deployment
pipeline. Version-bump scripts commit/tag and are release actions, not validation
commands. Do not push merely to test a documentation change: it triggers the
externally configured deployment.

To release, bump the version on `main`, then run `yarn release`. The
[release script](../scripts/release.sh) checks the repository state, runs
`yarn weok`, tags `HEAD` if the bump left no tag, pushes `main` and the tag, and
waits for the workflow. It requires an authenticated GitHub CLI.

## Context maintenance and evaluation

[AGENTS.md](../AGENTS.md) is the only repository instruction source; Claude Code
loads it through [CLAUDE.md](../CLAUDE.md). Do not generate separate rules for
other agents. Test loading in a fresh Codex/Claude Code session after changing
entry points, including effects of personal/global instructions.

`check:context` checks local Markdown file links and the Claude import adapter.
It does not validate external resources, semantic correctness, or full Markdown
syntax. Lint checks the architecture's existing import restrictions. Review
changes to linked source files for documentation impact; do not require a prose
edit when the contract has not changed.

Evaluate context on bounded tasks: find an encumbrance rule/test, explain an old
JSON import, add a translated catalog item, or identify checks for a PWA change.
Compare correct file selection, missed invariants, context read, time to first
useful action, and integration conflicts before/after. Keep results as task/CI
artifacts rather than a second permanent architecture inventory. Resolve semantic
contradictions by review and behavioral tests, not text matching alone.
