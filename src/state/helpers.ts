import type { State } from '@hookstate/core'

import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { InventoryStateType } from '@/state/InventoryState'
import { EquipmentStateKeys } from '@/state/InventoryState'

export const combineEquipment = (equipment: State<InventoryStateType>) => {
  return EquipmentStateKeys.flatMap((key) =>
    Object.values(equipment.nested(key).get()),
  )
}

export const findItemIndex = <T extends EquipmentItem>(
  items: ReadonlyArray<State<T>>,
  item: T,
): number => {
  return items.findIndex((i) => i.get().name === item.name)
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

const incrementQty = updateItemQuantity.bind(null, 1)
const decrementQty = updateItemQuantity.bind(null, -1)

export const addItem = <T extends EquipmentItem>(
  items: State<readonly InventoryItem<T>[]>,
  item: InventoryItem<T>,
) => {
  const existingItemIndex = findItemIndex(items, item)
  if (existingItemIndex !== -1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    incrementQty(items[existingItemIndex])
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
    // @ts-expect-error
    decrementQty(items[existingItemIndex])
  } else {
    items.set((a) => a.filter((i) => i.inventoryId !== item.inventoryId))
  }
}
