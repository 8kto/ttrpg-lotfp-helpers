import type { MessageDescriptor } from '@lingui/core'

import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPacks } from '@/config/EquipmentPacks'
import type { EquipmentItemTranslated } from '@/config/types'
import type { EquipmentItem, EquipmentPack } from '@/domain'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

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

interface CategorizedEquipmentItem
  extends EquipmentItemTranslated<EquipmentItem> {
  categoryKey: EquipmentCategoryKey
}
export type FlatEquipmentConfig = Array<CategorizedEquipmentItem>

export const convertToFlatConfig = (
  categories: Record<
    string,
    ReadonlyArray<EquipmentItemTranslated<EquipmentItem>>
  >,
): FlatEquipmentConfig => {
  return Object.entries(categories).flatMap(([categoryKey, category]) => {
    return category.map((item) => {
      return {
        ...item,
        categoryKey: categoryKey as EquipmentCategoryKey,
      }
    })
  })
}

const findEquipmentItem = (
  name: MessageDescriptor,
  flatEquipmentConfig: FlatEquipmentConfig,
): CategorizedEquipmentItem | null => {
  const item = flatEquipmentConfig.find((i) =>
    typeof i.name === 'object'
      ? i.name.id === name.id
      : i.name === name.message,
  ) as CategorizedEquipmentItem | null
  if (!item) {
    console.error(`Not found: ${name}`)

    return null
  }

  return item
}

export const getEquipmentPackDetails = (
  pack: EquipmentPack,
  flatEquipmentConfig: FlatEquipmentConfig,
): { cost: number; points: number } => {
  return pack.items.reduce(
    (acc, [name, qty]) => {
      const item = findEquipmentItem(name, flatEquipmentConfig)
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

// TODO implement custom items creation:
//    if weight is None but qty > 1, batch items as one custom inventory item
//    e.g. Nails (20), Chalk (10)
export const getEquipmentPackItems = (
  pack: EquipmentPack,
  flatEquipmentConfig: FlatEquipmentConfig,
): ReadonlyArray<CategorizedEquipmentItem> => {
  return pack.items.reduce((acc, [name, qty]) => {
    const item = findEquipmentItem(name, flatEquipmentConfig)
    if (!item || qty <= 0) {
      return acc
    }

    const isNameTranslated = (
      name: MessageDescriptor | string,
    ): name is MessageDescriptor => typeof name === 'object'

    const copy: CategorizedEquipmentItem = {
      ...item,
      name:
        (isNameTranslated(item.name) ? item.name.message : item.name) ||
        'Invalid name',
    }
    if (qty > 1) {
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
      // return acc.concat(
      //   Array.from({ length: qty }, () => {
      //     return { ...copy }
      //   }),
      // )
    }

    // Add single item
    return acc.concat(copy)
  }, [] as ReadonlyArray<CategorizedEquipmentItem>)
}
