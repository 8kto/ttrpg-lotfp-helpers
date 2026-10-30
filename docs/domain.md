# Domain

## Rules authority

The owner identifies the supplied LotFP Rules & Magic as the project's current
rules reference. The local Markdown conversion is at
`/mnt/terra/docs/TTRPG/LotFP/Rules/LOTFP_RULES.md`; its title material identifies
Rules & Magic and copyright 2013. Relevant printed sections include Movement and
Encumbrance (p. 38), travel adjustments (p. 39), and the Firearms appendix
(pp. 157 onward). Extracted references in the same directory are
`LotFP_Firearms.pdf` and `Правила по огнестрелу.pdf`.

These are owner-supplied external resources, not repository dependencies and not
available in every checkout. The Markdown conversion interleaves some columns;
consult the original page when wording is ambiguous. Do not copy the rulebook
into agent context or claim that a PDF was checked when only the conversion was
read. If a needed source is unavailable, state that limitation.

The rules establish intended tabletop behavior; code and tests establish current
application behavior. Differences need an explicit decision or backlog entry.
Existing user-facing explanations live in the translated reference pages; this
file describes application semantics, not another copy of their tables.

## Concepts and implemented behavior

| Concept         | Meaning and canonical implementation                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Catalog item    | Equipment definition with category, prices, weight, and optional details. Category-specific fields describe weapons/armor. [Types](../src/domain/equipment.ts), [weapons](../src/domain/weapon.ts), [armor](../src/domain/armor.ts).                                                                                                                                     |
| Inventory entry | A copied item with quantity, generated inventory ID, and locked unit cost. [InventoryItem](../src/domain/inventory.ts), [creation](../src/shared/helpers/getInventoryItem.ts).                                                                                                                                                                                           |
| Wallet          | Counts of currency denominations; value and physical coin count are different quantities. Rates, conversions, deductions, and normalization belong to [CurrencyConverter](../src/shared/services/CurrencyConverter.ts) and its [tests](../src/shared/services/__tests__/CurrencyConverter.test.ts).                                                                      |
| Encumbrance     | Internal fractional points represent ordinary-item units and oversized/heavy weights. Only regular units consume the free allowance, including coin units when enabled. Quantity matters. [Enums](../src/domain/encumbrance.ts), [service](../src/shared/services/EncumbranceService.ts), [boundary tests](../src/shared/services/__tests__/EncumbranceService.test.ts). |
| Movement        | Encumbrance selects a rate; terrain and weather multiply daily travel, not dungeon rates. CON is a reminder, not an input. [Rate table](../src/config/MovementRates.ts), [UI/calculation](../src/components/MovementFragment/MovementFragment.tsx).                                                                                                                      |
| Equipment pack  | Named item/quantity pairs, resolved against the catalog. Valuation uses the minimum nonzero available price. Unknown entries are skipped. [Pack helper](../src/shared/helpers/equipmentPack.ts), [tests](../src/shared/helpers/__tests__/equipmentPack.test.ts).                                                                                                         |

## Operations and invariants

- Catalog purchase locks the selected city/rural cost; a managed wallet blocks
  an unaffordable catalog purchase. Removing an entry does not refund money.
  [Purchase/removal handlers](../src/components/EquipmentList/helpers.ts).
- Current stack matching and quantity updates are defined by
  [state helpers](../src/state/helpers.ts) and their
  [tests](../src/state/__tests__/helpers.test.ts). Do not assume a stable catalog
  identifier or reprice existing entries when changing filters.
- Zero weight is a valid custom-item value. Missing weight is rejected by
  [custom-item conversion](../src/components/Inventory/AddEquipmentItemFragment/helpers.ts);
  [regression tests](../src/components/Inventory/AddEquipmentItemFragment/__tests__/helpers.test.ts)
  distinguish zero from missing input. Custom items may lack specialized weapon
  fields; [CustomFirearms tests](../src/components/Inventory/__tests__/CustomFirearms.test.tsx)
  require that the UI not invent mechanism rules.
- Clearing equipment preserves the wallet and settings; full reset replaces
  everything with defaults. [State operations](../src/state/InventoryState.ts).
- JSON/URL import replaces inventory state. Compatibility and validation limits
  belong to [architecture](architecture.md); they are not guaranteed invariants.

## Optional firearms

The referee chooses whether firearms are used. The campaign switch gates adding
catalog firearms, gear, and armor while keeping the tab browsable. It also
changes basic armor prices. Existing inventory remains visible when switched off.
[Firearms grid](../src/components/EquipmentList/FirearmWeaponsGrid/FirearmWeaponsGrid.tsx),
[armor pricing](../src/components/EquipmentList/armorHelpers.ts).

Mechanism, period, and rifling determine cumulative price multipliers; rounding
occurs at the final copper price. Matchlock-incompatible weapons are filtered.
Use [configuration](../src/config/Firearms.ts),
[transformations](../src/components/EquipmentList/FirearmWeaponsGrid/helpers.tsx),
and their [tests](../src/components/EquipmentList/FirearmWeaponsGrid/__tests__/helpers.test.ts)
instead of maintaining another coefficient table.

Reload is displayed as a formula, using current encumbrance but no stored class
or Dexterity. Rifling reload rounding is an application convention; modifier
order is left to the referee, as stated in the
[reference](../src/translations/pages/en/FirearmsReference.tsx).
[FirearmRulesFragment](../src/components/FirearmRulesFragment.tsx) also displays
misfire and armor-piercing rules. Numeric armor/save bonuses are item metadata,
not a complete equipped-character AC calculation.

## Intended behavior and unresolved semantics

The owner wants an active wallet to prevent spending more than available across
purchase paths. Pack/custom-item paths do not yet consistently implement that
intent. Import validation, repeated pack quantities, and this wallet gap are
tracked in [TODO](../TODO.md); do not describe them as fixed.

Open question: two identical items bought for different prices currently share a
stack and retain the first locked unit cost. For example, purchases at 10 sp and
20 sp report 20 sp total rather than 30 sp. Whether to preserve acquisition cost,
use another valuation, or separate stacks needs an owner decision; no behavior
change is implied by this document.
