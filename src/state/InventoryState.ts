import { hookstate, useHookstate } from '@hookstate/core'

import type { EquipmentItem, InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'

export type InventoryStateType = {
  armor: ReadonlyArray<InventoryItem<ArmorItem>>
  balanceCopperPieces: number
  meleeWeapons: ReadonlyArray<InventoryItem<MeleeWeaponItem>>
  missileWeapons: ReadonlyArray<InventoryItem<MissileWeaponItem>>
  miscEquipment: ReadonlyArray<InventoryItem<EquipmentItem>>
  isCostRural: boolean
}

/**
 * Default global state.
 * NB Do not export, use getter instead
 * @see getInitialInventoryState
 */
const initialInventoryState: Readonly<InventoryStateType> = {
  armor: Array<InventoryItem<ArmorItem>>(),
  balanceCopperPieces: 0,
  isCostRural: false,
  meleeWeapons: Array<InventoryItem<MeleeWeaponItem>>(),
  miscEquipment: Array<InventoryItem<EquipmentItem>>(),
  missileWeapons: Array<InventoryItem<MissileWeaponItem>>(),
}

export const getInitialInventoryState = (): InventoryStateType => {
  return deepclone(initialInventoryState)
}

export const InventoryState = hookstate<InventoryStateType>(
  getInitialInventoryState(),
)

export const useInventoryState = () => {
  const state = useHookstate(InventoryState)

  const reset = () => {
    state.set(getInitialInventoryState())
  }

  const resetEquipment = () => {
    state.merge({
      armor: Array<InventoryItem<ArmorItem>>(),
      meleeWeapons: Array<InventoryItem<MeleeWeaponItem>>(),
      miscEquipment: Array<InventoryItem<EquipmentItem>>(),
      missileWeapons: Array<InventoryItem<MissileWeaponItem>>(),
    })
  }

  return { reset, resetEquipment, state }
}

export const EquipmentStateKeys: ReadonlyArray<keyof InventoryStateType> =
  Object.freeze(['armor', 'meleeWeapons', 'missileWeapons', 'miscEquipment'])

export const addArmor = (item: InventoryItem<ArmorItem>) => {
  const armor = InventoryState.armor

  armor[armor.length].set(item)
}

export const addEquipmentItem = (item: InventoryItem<EquipmentItem>) => {
  const equipment = InventoryState.miscEquipment

  equipment[equipment.length].set(item)
}

export const removeEquipmentItem = (item: InventoryItem<EquipmentItem>) => {
  const equipment = InventoryState.miscEquipment

  equipment.set((i) => {
    return i.filter((i) => i.inventoryId !== item.inventoryId)
  })
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

export const getBalance = () => {
  return InventoryState.balanceCopperPieces.get()
}

export const addCopperPieces = (value: number) => {
  const balance = InventoryState.balanceCopperPieces
  balance.merge((v) => v + value)
}

// TODO introduce getters
// TODO introduce type for <keyof ... state>
