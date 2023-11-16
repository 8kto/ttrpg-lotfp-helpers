import { hookstate, useHookstate } from '@hookstate/core'

import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'

export type InventoryStateType = {
  armor: ReadonlyArray<InventoryItem<ArmorItem>>
  meleeWeapons: ReadonlyArray<InventoryItem<MeleeWeaponItem>>
  missileWeapons: ReadonlyArray<InventoryItem<MissileWeaponItem>>
  isCostRural: boolean
}

export const initialInventoryState: Readonly<InventoryStateType> = {
  armor: Array<InventoryItem<ArmorItem>>(),
  isCostRural: false,
  meleeWeapons: Array<InventoryItem<MeleeWeaponItem>>(),
  missileWeapons: Array<InventoryItem<MissileWeaponItem>>(),
}

export const InventoryState = hookstate<InventoryStateType>(
  deepclone(initialInventoryState),
)

// TODO add tests
export const useInventoryState = () => {
  const state = useHookstate(InventoryState)

  const reset = () => {
    state.set(deepclone(initialInventoryState))
  }

  const resetEquipment = () => {
    state.merge({
      armor: Array<InventoryItem<ArmorItem>>(),
      meleeWeapons: Array<InventoryItem<MeleeWeaponItem>>(),
    })
  }

  return { reset, resetEquipment, state }
}

export const EquipmentStateKeys: ReadonlyArray<keyof InventoryStateType> =
  Object.freeze(['armor', 'meleeWeapons', 'missileWeapons'])

export const addArmor = (item: InventoryItem<ArmorItem>) => {
  const armor = InventoryState.armor

  armor[armor.length].set(item)
}

export const removeArmor = (item: InventoryItem<ArmorItem>) => {
  const armor = InventoryState.armor
  armor.set((a) => a.filter((i) => i.inventoryId !== item.inventoryId))
}

export const addMeleeWeapon = (item: InventoryItem<MeleeWeaponItem>) => {
  const weapons = InventoryState.meleeWeapons

  weapons[weapons.length].set(item)
}

export const removeMeleeWeapon = (item: InventoryItem<MeleeWeaponItem>) => {
  const weapons = InventoryState.meleeWeapons

  weapons.set((w) => {
    return w.filter((i) => i.inventoryId !== item.inventoryId)
  })
}

export const addMissileWeapon = (item: InventoryItem<MissileWeaponItem>) => {
  const weapons = InventoryState.missileWeapons

  weapons[weapons.length].set(item)
}

export const removeMissileWeapon = (item: InventoryItem<MissileWeaponItem>) => {
  const weapons = InventoryState.missileWeapons

  weapons.set((w) => {
    return w.filter((i) => i.inventoryId !== item.inventoryId)
  })
}

export const toggleCost = () => {
  const isCostRural = InventoryState.isCostRural
  isCostRural.set(!isCostRural.get())
}
