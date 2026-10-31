import type { State } from '@hookstate/core'

import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { FirearmWeaponItem } from '@/domain/weapon'
import { getUniqueId } from '@/shared/helpers/autoincrement'
import type { InventoryStateType } from '@/state/InventoryState'
import { EquipmentStateKeys } from '@/state/InventoryState'

export const combineEquipment = (equipment: State<InventoryStateType>) => {
  return EquipmentStateKeys.flatMap((key) =>
    Object.values(equipment.nested(key).get()),
  )
}

/**
 * State saved by an older version may hold repeated IDs, since these restarted
 * from 1 on every page load. Removing such an item would remove all of them.
 */
export const withUniqueInventoryIds = (
  state: InventoryStateType,
): InventoryStateType => {
  const seenIds = new Set<string>()
  const repaired = { ...state }

  EquipmentStateKeys.forEach((key) => {
    const items: unknown = state[key]
    if (!Array.isArray(items)) {
      return
    }

    Object.assign(repaired, {
      [key]: items.map((item: InventoryItem<EquipmentItem>) => {
        const isDuplicate = seenIds.has(item.inventoryId)
        const inventoryId = isDuplicate
          ? `${item.name}${getUniqueId()}`
          : item.inventoryId
        seenIds.add(inventoryId)

        return isDuplicate ? { ...item, inventoryId } : item
      }),
    })
  })

  return repaired
}

const isFirearm = (item: EquipmentItem): item is FirearmWeaponItem =>
  item.categoryKey === 'firearmWeapons'

/**
 * Firearms with the same name can differ in mechanism, rifling and cost
 * (the cost depends on the year), so they are stacked only if all match.
 */
const isSameItem = (a: EquipmentItem, b: EquipmentItem): boolean => {
  if (a.name !== b.name) {
    return false
  }

  if (isFirearm(a) && isFirearm(b)) {
    return (
      a.firingMechanism === b.firingMechanism &&
      a.isRifled === b.isRifled &&
      a.cityCostCp === b.cityCostCp
    )
  }

  return true
}

export const findItemIndex = <T extends EquipmentItem>(
  items: ReadonlyArray<State<T>>,
  item: T,
): number => {
  return items.findIndex((i) => isSameItem(i.get(), item))
}

export const updateItemQuantity = <T extends EquipmentItem>(
  quantityChange: number,
  item: State<InventoryItem<T>>,
) => {
  const updatedQty = (item.get() as InventoryItem<T>).qty + quantityChange
  if (updatedQty <= 0) {
    throw new Error('updateItemQuantity: invalid item qty')
  }

  item.set((currentItem) => {
    return {
      ...currentItem,
      qty: updatedQty,
    }
  })
}

const decrementQty = updateItemQuantity.bind(null, -1)

export const addItem = <T extends EquipmentItem>(
  items: State<ReadonlyArray<InventoryItem<T>>>,
  item: InventoryItem<T>,
) => {
  const existingItemIndex = findItemIndex(items, item)
  if (existingItemIndex !== -1) {
    updateItemQuantity(item.qty, items[existingItemIndex])
  } else {
    items[items.length].set(item)
  }
}

export const removeItem = <T extends EquipmentItem>(
  items: State<readonly InventoryItem<T>[]>,
  item: InventoryItem<T>,
) => {
  const existingItemIndex = findItemIndex(items, item)

  if (
    existingItemIndex !== -1 &&
    (items[existingItemIndex].get() as InventoryItem<T>).qty > 1
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    decrementQty(items[existingItemIndex])
  } else {
    items.set((a) => a.filter((i) => i.inventoryId !== item.inventoryId))
  }
}
