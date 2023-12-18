import Equipment from '@/config/Equipment'
import type { EquipmentItem, EquipmentPack } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { getGetterNames } from '@/shared/helpers/getGetterNames'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'

const findEquipmentItem = <T extends EquipmentItem>(name: string): T | null => {
  const equipmentConfigTranslated = Equipment
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

const getMinimalCost = (item: EquipmentItem) => {
  const costs = [item.cityCost, item.ruralCost].map(Number).filter(Boolean)
  if (!costs.length) {
    return 0
  }

  return Math.min(...costs)
}

export const getEquipmentPackCost = (pack: EquipmentPack): number => {
  return pack.items.reduce((acc, [itemName, qty]) => {
    const item = findEquipmentItem(itemName)

    if (!item) {
      return acc
    }

    const minimalCost = getMinimalCost(item)

    return acc + minimalCost * qty
  }, 0)
}

export const getEquipmentPackItems = (
  pack: EquipmentPack,
): ReadonlyArray<InventoryItem<EquipmentItem>> => {
  return pack.items.reduce(
    (acc, [name, qty]) => {
      const item = findEquipmentItem(name)
      if (!item || qty <= 0) {
        console.error(
          `getEquipmentPackItems: could not find item by name: ${name}`,
        )

        return acc
      }

      const minimalCost = getMinimalCost(item)
      const copy = getInventoryItem(item, minimalCost)
      copy.qty = qty

      return acc.concat(copy)
    },
    [] as ReadonlyArray<InventoryItem<EquipmentItem>>,
  )
}
