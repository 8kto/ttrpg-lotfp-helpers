import { hookstate } from '@hookstate/core'

import type { ArmorEntry } from '@/shared/types/armor'
import type { WeaponEntry } from '@/shared/types/weapon'

export type EquipmentStateType = {
  armor: Record<string, ArmorEntry>
  weapons: Record<string, WeaponEntry>
  isCostRural: boolean
  // reset: CallableFunction
}

export const EquipmentState = hookstate<EquipmentStateType>({
  armor: {},
  isCostRural: true,
  weapons: {},
  // reset: () => {},
})

export const EquipmentStateKeys: ReadonlyArray<keyof EquipmentStateType> =
  Object.freeze(['armor', 'weapons'])
