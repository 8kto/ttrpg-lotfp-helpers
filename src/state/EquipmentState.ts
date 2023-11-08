import { hookstate } from '@hookstate/core'

import {ArmorEntry} from "@/shared/types/armor"
import {WeaponEntry} from "@/shared/types/weapon"

type EquipmentStateType = {
  armor: Record<string, ArmorEntry>
  weapons: Record<string, WeaponEntry>
}

export const EquipmentState = hookstate<EquipmentStateType>({
  armor: {},
  weapons: {},
})
