# Product

Princess Helpers helps LotFP players prepare and manage equipment on a phone or
computer, and see inventory cost, encumbrance, and movement without manual
bookkeeping. It is an independent tool, not a complete character sheet or combat
simulator. Attribution and public links belong in the [README](../README.md).

## User scenarios

| Scenario                                                                      | Implementation entry point                                                                                                                   |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Browse equipment, inspect details, choose city/rural prices, add items        | [EquipmentList](../src/components/EquipmentList/EquipmentList.tsx)                                                                           |
| Review quantities and remove equipment, clear a category or all equipment     | [InventoryList](../src/components/Inventory/InventoryList.tsx), [controls](../src/components/Inventory/InventoryControls.tsx)                |
| Add a custom item, including a non-encumbering item                           | [custom-item form](../src/components/Inventory/AddEquipmentItemFragment/AddEquipmentItemFragment.tsx)                                        |
| Start from a named or randomly selected equipment pack                        | [pack import](../src/components/Inventory/ImportEquipmentSetFragment/ImportEquipmentPackFragment.tsx)                                        |
| Manage coins and optionally deduct purchases from the wallet                  | [Wallet](../src/components/Wallet/Wallet.tsx), [purchase handler](../src/components/EquipmentList/helpers.ts)                                |
| Inspect cost, encumbrance, dwarf allowance, and travel adjustments            | [InventoryDetails](../src/components/InventoryDetails/InventoryDetails.tsx), [CommandBar](../src/components/CommandBar/CommandBar.tsx)       |
| Browse optional firearms and configure mechanism, period, and rifling         | [firearms grid](../src/components/EquipmentList/FirearmWeaponsGrid/FirearmWeaponsGrid.tsx)                                                   |
| Continue after reload, export/import JSON, or share an inventory snapshot URL | [state](../src/state/InventoryState.ts), [export/import UI](../src/components/Inventory/ExportInventoryFragment/ExportInventoryFragment.tsx) |
| Switch language or consult rules                                              | [locale switcher](../src/components/layout/LocaleSwitcher.tsx), [reference pages](../src/translations/pages/contentComponents.ts)            |

## Scope and expectations

- There is one local inventory, with no account or server-side inventory service.
  Sharing transfers a snapshot; it is not collaborative synchronization.
- The responsive page uses tabs or columns depending on viewport size:
  [inventory page](../src/pages/inventory/index.tsx).
- Supported browser/device targets are the projects in
  [Playwright configuration](../playwright.config.ts), as confirmed by the owner.
  That configuration is the source of truth, not a second list in documentation.
- PWA support exists. The configured browser targets also define the intended
  offline support scope, but current E2E tests run a development server and do
  not establish production service-worker behavior. See
  [development checks](development.md).
- Locale availability is defined in [Lingui configuration](../lingui.config.js).
  Long-form reference content falls back to English where a translation is
  missing; listing a locale does not imply complete translation.
- Firearm reload, combat modifiers, and character-ability effects include
  reference text. The application does not store a complete character or resolve
  combat. Artillery is deliberately excluded, as described in the
  [firearms reference](../src/translations/pages/en/FirearmsReference.tsx).

Pending work and known gaps have one home: [TODO](../TODO.md). Domain semantics
and the distinction between rules and implementation are in [domain](domain.md).
