import { hookstate, useHookstate } from '@hookstate/core'

import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { WeaponItem } from '@/domain/weapon'

export type InventoryStateType = {
  armor: ReadonlyArray<InventoryItem<ArmorItem>>
  weapons: ReadonlyArray<InventoryItem<WeaponItem>>
  isCostRural: boolean
}

const initialInventoryState: Readonly<InventoryStateType> = {
  armor: Array<InventoryItem<ArmorItem>>(),
  isCostRural: false,
  weapons: Array<InventoryItem<WeaponItem>>(),
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
      armor: Array<InventoryItem<ArmorItem>>(),
      weapons: Array<InventoryItem<WeaponItem>>(),
    })
  }

  return { reset, resetEquipment, state }
}

export const EquipmentStateKeys: ReadonlyArray<keyof InventoryStateType> =
  Object.freeze(['armor', 'weapons'])
