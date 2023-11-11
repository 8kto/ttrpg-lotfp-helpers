import { hookstate, useHookstate } from '@hookstate/core'

import type { ArmorEntry } from '@/domain/armor'
import type { WeaponEntry } from '@/domain/weapon'

export type InventoryStateType = {
  armor: ReadonlyArray<ArmorEntry>
  weapons: ReadonlyArray<WeaponEntry>
  isCostRural: boolean
  // reset: CallableFunction
}

const initialInventoryState: Readonly<InventoryStateType> = {
  armor: [],
  isCostRural: true,
  weapons: [],
}

export const InventoryState = hookstate<InventoryStateType>(
  initialInventoryState,
)

export const useInventoryState = () => {
  const state = useHookstate(InventoryState)

  const reset = () => {
    state.set(initialInventoryState)
  }

  const resetEquipment = () => {
    state.merge({
      armor: [],
      weapons: [],
    })
  }

  return { reset, resetEquipment, state }
}

export const EquipmentStateKeys: ReadonlyArray<keyof InventoryStateType> =
  Object.freeze(['armor', 'weapons'])
