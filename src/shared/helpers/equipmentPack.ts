import type { I18n } from '@lingui/core'

import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { EquipmentItemTranslated } from '@/config/types'
import type { EquipmentItem, EquipmentPack } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { getGetterNames } from '@/shared/helpers/getGetterNames'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'

const findEquipmentItem = <T extends EquipmentItemTranslated<EquipmentItem>>(
  name: string,
  trans: I18n['_'],
): T | null => {
  const equipmentConfigTranslated = new EquipmentTranslated(trans)
  const categoryKeys = getGetterNames(equipmentConfigTranslated)

  for (const categoryKey of categoryKeys) {
    const items = equipmentConfigTranslated[categoryKey]
    const foundItem = items.find((item) => item.name === name)
    if (foundItem) {
      return foundItem as T
    }
  }

  return null
}

export const getEquipmentPackCost = (
  pack: EquipmentPack,
  trans: I18n['_'],
): number => {
  return pack.items.reduce((acc, [itemName, qty]) => {
    const item = findEquipmentItem(itemName, trans)
    if (!item) {
      return acc
    }

    return acc + item.cityCost * qty
  }, 0)
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
