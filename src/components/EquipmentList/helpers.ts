import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import type { Dice } from '@/domain'
import type { CurrencyWallet } from '@/domain/currency'
import { CurrencyType } from '@/domain/currency'
import type {
  MeleeWeaponItem,
  MissileWeaponItem,
  Range,
  WeaponItem,
} from '@/domain/weapon'
import { subtractCurrency } from '@/state/InventoryState'

const normalizeDiceValue = (dice?: Dice) => {
  return dice ? parseInt(dice.substring(1), 10) : 0
}

const normalizeRange = (range: Range | null) => {
  if (!range) {
    return ''
  }

  return `${range.short}-${range.medium}-${range.long}`
}

export const sortByDamage = (sortConfig: SortConfig<WeaponItem>) => {
  return (a: MeleeWeaponItem, b: MeleeWeaponItem) => {
    const diceValueA = normalizeDiceValue(a.damage?.dice)
    const diceValueB = normalizeDiceValue(b.damage?.dice)

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

/**
 * A simple sort by range
 */
export const sortByRange = (sortConfig: SortConfig<MissileWeaponItem>) => {
  return (a: MissileWeaponItem, b: MissileWeaponItem) => {
    const rangeA = normalizeRange(a.range)
    const rangeB = normalizeRange(b.range)

    return sortConfig.direction === 'asc'
      ? rangeA.localeCompare(rangeB)
      : rangeB.localeCompare(rangeA)
  }
}

export const sortWeapons = (sortConfig: SortConfig<WeaponItem>) => {
  const shouldSortByDamage =
    (sortConfig as SortConfig<MeleeWeaponItem>).key === 'damage'

  const shouldSortByRange =
    (sortConfig as SortConfig<MissileWeaponItem>).key === 'range'

  if (shouldSortByDamage) {
    return sortByDamage(sortConfig)
  }
  if (shouldSortByRange) {
    return sortByRange(sortConfig)
  }

  return trivialSort(sortConfig)
}

export const subtractCost = (
  costCp: number,
  wallet: CurrencyWallet,
  isWalletManaged: boolean,
) => {
  if (isWalletManaged) {
    subtractCurrency({
      currency: CurrencyType.Copper,
      value: costCp,
    })
  }
}
