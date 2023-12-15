import type { I18n } from '@lingui/core'

import { getInventoryItem } from '@/components/EquipmentList/helpers'
import type { EquipmentPackName } from '@/config/EquipmentPacks'
import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { EquipmentItemTranslated } from '@/config/types'
import type { EquipmentItem, EquipmentPack } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

export type ImportEquipmentPackProps = {
  pack: EquipmentPackName
}

const getGetterNames = <
  T,
  Res = Array<keyof Omit<T, 'constructor' | 'translate'>>,
>(
  obj: T,
): Res => {
  return Object.entries(
    Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj)),
  )
    .filter(([, descriptor]) => typeof descriptor.get === 'function')
    .map(([key]) => key) as Res
}

const findEquipmentItem = <T extends EquipmentItemTranslated<EquipmentItem>>(
  name: string,
  trans: I18n['_'],
): T | null => {
  const equipmentConfigTranslated = new EquipmentTranslated(trans)
  const categoryKeys = getGetterNames(equipmentConfigTranslated)

  // Iterate over getters to find the item
  for (const categoryKey of categoryKeys) {
    const items = equipmentConfigTranslated[categoryKey]
    const foundItem = items.find((item) => item.name === name)
    if (foundItem) {
      return foundItem as T
    }
  }

  return null
}

export const getEquipmentPackDetails = (
  pack: EquipmentPack,
  trans: I18n['_'],
): { cost: number; points: number } => {
  return pack.items.reduce(
    (acc, [itemName, qty]) => {
      const item = findEquipmentItem(itemName, trans)
      if (!item) {
        return acc
      }

      return {
        cost: acc.cost + item.cityCost * qty,
        points: acc.points + item.points * qty,
      }
    },
    { cost: 0, points: 0 },
  )
}

export const getEquipmentPackItems = (
  pack: EquipmentPack,
  trans: I18n['_'],
): ReadonlyArray<InventoryItem<EquipmentItemTranslated<EquipmentItem>>> => {
  return pack.items.reduce(
    (acc, [name, qty]) => {
      const item = findEquipmentItem(name, trans)
      if (!item || qty <= 0) {
        console.error(
          `getEquipmentPackItems: could not find item by name: ${name}`,
        )

        return acc
      }

      const copy = getInventoryItem(item, item.cityCost)
      copy.qty = qty

      return acc.concat(copy)
    },
    [] as ReadonlyArray<InventoryItem<EquipmentItemTranslated<EquipmentItem>>>,
  )
}
