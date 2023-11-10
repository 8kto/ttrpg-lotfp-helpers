import { hookstate } from '@hookstate/core'

import type { ArmorEntry } from '@/domain/armor'
import type { WeaponEntry } from '@/domain/weapon'

export type EquipmentStateType = {
  armor: ReadonlyArray<ArmorEntry>
  weapons: ReadonlyArray<WeaponEntry>
  isCostRural: boolean
  // reset: CallableFunction
}

// TODO rename to InventoryState
export const EquipmentState = hookstate<EquipmentStateType>({
  armor: [],
  isCostRural: true,
  weapons: [],
  // reset: () => {},
})

export const EquipmentStateKeys: ReadonlyArray<keyof EquipmentStateType> =
  Object.freeze(['armor', 'weapons'])
