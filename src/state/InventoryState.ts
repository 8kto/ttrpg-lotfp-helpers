import { hookstate, useHookstate } from '@hookstate/core'

import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { WeaponItem } from '@/domain/weapon'

export type InventoryStateType = {
  armor: ReadonlyArray<InventoryItem<ArmorItem>>
  weapons: ReadonlyArray<InventoryItem<WeaponItem>>
  isCostRural: boolean
}

export const initialInventoryState: Readonly<InventoryStateType> = {
  armor: Array<InventoryItem<ArmorItem>>(),
  isCostRural: false,
  weapons: Array<InventoryItem<WeaponItem>>(),
}

export const InventoryState = hookstate<InventoryStateType>(
  initialInventoryState,
)

// TODO add tests
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

export const addArmor = (item: InventoryItem<ArmorItem>) => {
  const armor = InventoryState.armor

  armor[armor.length].set(item)
}

export const removeArmor = (item: InventoryItem<ArmorItem>) => {
  const armor = InventoryState.armor
  armor.set((a) => a.filter((i) => i.inventoryId !== item.inventoryId))
}

export const addWeapon = (item: InventoryItem<WeaponItem>) => {
  const weapons = InventoryState.weapons

  weapons[weapons.length].set(item)
}

export const removeWeapon = (item: InventoryItem<WeaponItem>) => {
  const weapons = InventoryState.weapons

  weapons.set((w) => {
    return w.filter((i) => i.inventoryId !== item.inventoryId)
  })
}

export const toggleCost = () => {
  const isCostRural = InventoryState.isCostRural
  isCostRural.set(!isCostRural.get())
}
