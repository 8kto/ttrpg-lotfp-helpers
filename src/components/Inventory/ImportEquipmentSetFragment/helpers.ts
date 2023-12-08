import type { MessageDescriptor } from '@lingui/core'

import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPacks } from '@/config/EquipmentPacks'

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
