import type { MessageDescriptor } from '@lingui/core'

import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPacks } from '@/config/EquipmentPacks'
import type { EquipmentPack } from '@/domain'

export type ImportEquipmentPackProps = {
  pack: EquipmentPackName
}
import { Armor, MeleeWeapons, MiscEquipment, MissileWeapons } from '@/config'

export const EquipmentPackLabelsDict: Record<
  EquipmentPackName,
  MessageDescriptor
> = Object.fromEntries(
  Object.entries(EquipmentPacks).map(([key, dict]) => {
    return [key, dict.name]
  }),
) as Record<EquipmentPackName, MessageDescriptor>

const flatConfig = [Armor, MeleeWeapons, MiscEquipment, MissileWeapons].flat()

export const getEquipmentPackDetails = (
  pack: EquipmentPack,
): { cost: number; points: number } => {
  return pack.items.reduce(
    (acc, [name, qty]) => {
      const item = flatConfig.find((i) => i.name.id === name.id)
      if (!item) {
        console.error(`Not found: ${name}`)

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
