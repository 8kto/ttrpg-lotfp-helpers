# Architecture

## Runtime and responsibilities

This is a Next.js **Pages Router** application. Versions and dependencies are
owned by [package.json](../package.json) and [yarn.lock](../yarn.lock), not this
page. `use client` directives do not make it an App Router application.

| Area                         | Responsibility / source                                                                                                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Routing and page composition | [pages](../src/pages/inventory/), [app wrapper](../src/pages/_app.tsx), [Next config](../next.config.js); static translation props and responsive inventory composition.                              |
| UI and interaction           | [components](../src/components/); grids, forms, drawers, details. Purchase orchestration currently lives in [component helpers](../src/components/EquipmentList/helpers.ts).                          |
| Domain shapes                | [domain](../src/domain/); types and enums. There is currently a type dependency on the state module's category union.                                                                                 |
| Catalogs                     | [Equipment](../src/config/) and category factories; localized data obtained via getters and cloned for callers.                                                                                       |
| Inventory persistence        | [InventoryState](../src/state/InventoryState.ts); Hookstate singleton, mutations, defaults, localStorage adapter.                                                                                     |
| Calculations                 | [services](../src/shared/services/) and [helpers](../src/shared/helpers/); the totals hook creates a fresh encumbrance service per calculation because the service holds a running allowance counter. |
| UI state                     | [UiContext](../src/shared/context/uiContext.ts) and [provider](../src/shared/context/UiContextProvider.tsx); tab selection and travel options, serialized to URL hash.                                |
| UI events                    | [actions](../src/shared/actions/actions.ts) and [dispatcher](../src/shared/actions/helpers.ts); document-level CustomEvents for drawer/tab/toast behavior, not a backend event bus.                   |

Main flow: catalog → UI purchase handler → inventory state → localStorage;
state → totals hook/services → inventory details. JSON and URL import replace
state through the same state setter. Components may mutate Hookstate directly;
there is no enforced single application-service layer.

## Persistence and external contracts

The storage key, default state, category list, and compatibility merge are defined
in [InventoryState](../src/state/InventoryState.ts), with
[state tests](../src/state/__tests__/InventoryState.test.ts). Missing top-level
fields are filled from defaults. This is not recursive migration or runtime
schema validation, and there is no persisted schema version.

[File export](../src/shared/helpers/exportInventoryData.ts) writes the inventory
state as JSON. [Sharing helpers](../src/shared/helpers/shareableUrl.ts) encode it
in the `import` query parameter through [lz-string compression](../src/shared/helpers/compressDataForUrl.ts).
The [inventory page](../src/pages/inventory/index.tsx) imports on mount and removes
URL parameters by navigation. Compression is not encryption. A shared URL carries
the snapshot itself, not an authorized server-side resource.

UI context is a separate hash-based contract and is not included in the inventory
export. Its version field is the application version, not a storage-schema
version. [Hash parser](../src/shared/helpers/getStateFromSearchString.ts).

No application API handlers, database, account, or authorization layer are present.
[Middleware](../middleware.ts) handles locale routing; its `/api/` exclusion does
not define an API. Vercel Analytics is mounted in the app wrapper. Production PWA
registration/caching is configured by Next; generated workers are ignored by Git.

## Localization and import boundaries

The canonical enforced import restrictions are in
[ESLint configuration](../.eslintrc.json). Keep them as architectural boundaries:

- Domain files cannot import `@lingui/core` or `@lingui/macro`: domain shapes and
  values must not depend on translation activation or translated messages.
- Config files cannot import `msg` from `@lingui/macro`: equipment models expect
  strings, not message descriptors. Catalog factories/getters resolve strings at
  access time; label keys marked for extraction can be translated at consumption.
  [Catalog](../src/config/Equipment.ts), [firearms labels](../src/config/Firearms.ts).

These are the present enforceable boundaries, not a claim that every layer is
independent. The domain-to-state type dependency and config/shared dependencies
still exist. Do not weaken the translation restrictions to accommodate a change;
place translation at the appropriate boundary. Any broader import restrictions
must be added to executable lint configuration and checked against actual code.

[Lingui config](../lingui.config.js) owns available catalogs;
[translation utilities](../src/translations/utils.ts) load them for pages.
Long-form EN/RU content uses [page mapping](../src/translations/pages/contentComponents.ts)
with an English fallback. PO files combine extracted messages with human
translations. [Crowdin configuration](../crowdin.yml) is separate integration
configuration, not evidence that a remote synchronization is currently running.

## Documentation ownership

Product intent belongs to [product](product.md), rule semantics to
[domain](domain.md), RPG term conventions to [terminology](terminology.md), and
operational workflows to [development](development.md). Types, numeric tables, commands, and dependency versions remain in code/config.
Tests are executable examples, not proof of intent when a known defect is involved.
Use [TODO](../TODO.md) for unresolved work. Create an ADR only for a significant
accepted decision (for example, storage versioning or stable item identity), with
alternatives and consequences; do not fabricate historical decisions.
