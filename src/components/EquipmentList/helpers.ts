import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import type { Dice, EquipmentItem, InventoryItem } from '@/domain'
import type { MeleeWeaponItem, WeaponItem } from '@/domain/weapon'
import { getAutoIncrementedId } from '@/shared/helpers/autoincrement'
import deepclone from '@/shared/helpers/deepclone'

export const getInventoryItem = <T extends EquipmentItem>(
  item: T,
  cost: number,
): InventoryItem<T> => {
  return deepclone<InventoryItem<T>>({
    ...item,
    inventoryId: item.name + getAutoIncrementedId(),
    lockedCost: cost,
  })
}

const parseDiceValue = (dice?: Dice) => {
  return dice ? parseInt(dice.substring(1), 10) : 0
}

export const handleSortByDamage = (sortConfig: SortConfig<WeaponItem>) => {
  const isSpecialCase =
    (sortConfig as SortConfig<MeleeWeaponItem>).key === 'damage'

  return (a: MeleeWeaponItem, b: MeleeWeaponItem) => {
    const diceValueA = parseDiceValue(a.damage?.dice)
    const diceValueB = parseDiceValue(b.damage?.dice)

    if (!isSpecialCase) {
      return trivialSort(sortConfig)(a, b)
    }

    if (diceValueA !== diceValueB) {
      return sortConfig.direction === 'asc'
        ? diceValueA - diceValueB
        : diceValueB - diceValueA
    }

    // Compare 'x' values if dice values are equal or one of them is missing
    const xComparison = (a.damage?.x ?? 0) - (b.damage?.x ?? 0)
    if (xComparison !== 0) {
      return sortConfig.direction === 'asc' ? xComparison : -xComparison
    }

    return 0
  }
}
