import { t } from '@lingui/macro'

import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import {
  isArmorItem,
  isMeleeWeaponItem,
  isMiscEquipmentItem,
  isMissileItem,
} from '@/components/Inventory/ItemDetails/helpers'
import type { Dice } from '@/domain'
import type { CurrencyWallet } from '@/domain/currency'
import { CurrencyType } from '@/domain/currency'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type {
  MeleeWeaponItem,
  MissileWeaponItem,
  Range,
  WeaponItem,
} from '@/domain/weapon'
import Action from '@/shared/actions/actions'
import { dispatchAction } from '@/shared/actions/helpers'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import CurrencyConverter from '@/shared/services/CurrencyConverter'
import {
  addArmor,
  addEquipmentItem,
  addMeleeWeapon,
  addMissileWeapon,
  InventoryState,
  removeArmor,
  removeEquipmentItem,
  removeMeleeWeapon,
  removeMissileWeapon,
  subtractCurrency,
} from '@/state/InventoryState'

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

/**
 * Return true if the subtraction is valid
 */
const subtractCost = (
  costCp: number,
  wallet: CurrencyWallet,
  isWalletManaged: boolean,
): boolean => {
  if (isWalletManaged) {
    const record = {
      currency: CurrencyType.Copper,
      value: costCp,
    }

    if (CurrencyConverter.hasEnoughFundsInWallet(record, wallet)) {
      subtractCurrency(record)

      return true
    }

    return false
  }

  return true
}

export const handleAddEquipmentItemClick = <T extends EquipmentItem>(
  item: T,
) => {
  const { isCostRural, isWalletManaged, wallet } = InventoryState

  const lockedCostCp =
    (isCostRural.get() ? item.ruralCostCp : item.cityCostCp) || 0

  if (subtractCost(lockedCostCp, wallet.get(), isWalletManaged.get())) {
    const clone = getInventoryItem<T>(item, lockedCostCp)

    if (isArmorItem(clone)) {
      addArmor(clone)
    } else if (isMeleeWeaponItem(clone)) {
      addMeleeWeapon(clone)
    } else if (isMissileItem(clone)) {
      addMissileWeapon(clone)
    } else if (isMiscEquipmentItem(clone)) {
      addEquipmentItem(clone)
    } else {
      throw new Error('Unknown item')
    }

    dispatchAction(Action.ShowToast, { message: t`Added` })
  } else {
    dispatchAction(Action.ShowToast, {
      delayMs: 2000,
      message: t`Not enough funds in wallet`,
      type: 'error',
    })
  }
}

export const handleRemoveEquipmentItemClick = <
  T extends InventoryItem<EquipmentItem>,
>(
  item: T,
) => {
  if (isArmorItem(item)) {
    removeArmor(item)
  } else if (isMeleeWeaponItem(item)) {
    removeMeleeWeapon(item)
  } else if (isMissileItem(item)) {
    removeMissileWeapon(item)
  } else if (isMiscEquipmentItem(item)) {
    removeEquipmentItem(item)
  } else {
    throw new Error('Unknown item')
  }

  dispatchAction(Action.ShowToast, { message: t`Removed` })
}
