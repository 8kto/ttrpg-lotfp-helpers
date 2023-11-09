import { hookstate } from '@hookstate/core'

import {ArmorEntry} from "@/shared/types/armor"
import {WeaponEntry} from "@/shared/types/weapon"

export type EquipmentStateType = {
  armor: Record<string, ArmorEntry>
  weapons: Record<string, WeaponEntry>
  // reset: CallableFunction
}

export const EquipmentState = hookstate<EquipmentStateType>({
  armor: {},
  weapons: {},
  // reset: () => {},
})

export const EquipmentStateKeys: ReadonlyArray<keyof EquipmentStateType> = Object.freeze([
  'armor',
  'weapons',
])