import type { I18n, MessageDescriptor } from '@lingui/core'

import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPacks } from '@/config/EquipmentPacks'
import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { EquipmentItem, EquipmentPack } from '@/domain/equipment'

export type ImportEquipmentPackProps = {
  pack: EquipmentPackName
}

export const EquipmentPackLabelsDict: Record<
  EquipmentPackName,
  MessageDescriptor
> = Object.fromEntries(
  Object.entries(EquipmentPacks).map(([key, dict]) => {
    return [key, dict.name]
  }),
) as Record<EquipmentPackName, MessageDescriptor>

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

const findEquipmentItem = <T extends EquipmentItem>(
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
): ReadonlyArray<EquipmentItem> => {
  return pack.items.reduce((acc, [name, qty]) => {
    const item = findEquipmentItem(name, trans)
    console.log(item)
    if (!item || qty <= 0) {
      return acc
    }

    const copy: EquipmentItem = { ...item }
    if (qty > 1) {
      // TODO implement custom items creation:
      //    if weight is None but qty > 1, batch items as one custom inventory item
      //    e.g. Nails (20), Chalk (10)

      // None weight
      // if (copy.points === EncumbrancePoint.None) {
      //   if (typeof copy.name === 'object') {
      //     copy.name = t`${copy.name.message} (${qty})`
      //   } else {
      //     copy.name = t`${copy.name} (${qty})`
      //   }
      //
      //   return acc.concat(copy)
      // }

      // Has weight, add x QTY items
      return acc.concat(
        Array.from({ length: qty }, () => {
          return { ...copy }
        }),
      )
    }

    // Add single item
    return acc.concat(copy)
  }, [] as ReadonlyArray<EquipmentItem>)
}
