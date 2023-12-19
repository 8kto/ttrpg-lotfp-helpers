import { hookstate, useHookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'

import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'
import { addItem, removeItem } from '@/state/helpers'

export type InventoryStateType = {
  armor: ReadonlyArray<InventoryItem<ArmorItem>>
  copperPieces: number // TODO support different kinds of coins
  isCoinWeightActive: boolean
  isCostRural: boolean
  meleeWeapons: ReadonlyArray<InventoryItem<MeleeWeaponItem>>
  missileWeapons: ReadonlyArray<InventoryItem<MissileWeaponItem>>
  miscEquipment: ReadonlyArray<InventoryItem<EquipmentItem>>
}

/**
 * Default global state.
 * NB Do not export, use getter instead
 * @see getInitialInventoryState
 */
const initialInventoryState: Readonly<InventoryStateType> = {
  armor: Array<InventoryItem<ArmorItem>>(),
  copperPieces: 0,
  isCoinWeightActive: true,
  isCostRural: false,
  meleeWeapons: Array<InventoryItem<MeleeWeaponItem>>(),
  miscEquipment: Array<InventoryItem<EquipmentItem>>(),
  missileWeapons: Array<InventoryItem<MissileWeaponItem>>(),
}

export type EquipmentCategoryKey =
  | 'armor'
  | 'meleeWeapons'
  | 'missileWeapons'
  | 'miscEquipment'

export const EquipmentStateKeys: ReadonlyArray<EquipmentCategoryKey> =
  Object.freeze(['armor', 'meleeWeapons', 'missileWeapons', 'miscEquipment'])

export const getInitialInventoryState = (): InventoryStateType => {
  return deepclone(initialInventoryState)
}

export const InventoryState = hookstate<InventoryStateType>(
  getInitialInventoryState(),
  typeof window !== 'undefined'
    ? localstored({
        key: 'lotfp-helpers',
      })
    : undefined,
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

export const addArmor = (item: InventoryItem<ArmorItem>) =>
  addItem(InventoryState.armor, item)
export const removeArmor = (item: InventoryItem<ArmorItem>) =>
  removeItem(InventoryState.armor, item)
export const addMeleeWeapon = (item: InventoryItem<MeleeWeaponItem>) =>
  addItem(InventoryState.meleeWeapons, item)
export const removeMeleeWeapon = (item: InventoryItem<MeleeWeaponItem>) =>
  removeItem(InventoryState.meleeWeapons, item)
export const addMissileWeapon = (item: InventoryItem<MissileWeaponItem>) =>
  addItem(InventoryState.missileWeapons, item)
export const removeMissileWeapon = (item: InventoryItem<MissileWeaponItem>) =>
  removeItem(InventoryState.missileWeapons, item)
export const addEquipmentItem = (item: InventoryItem<EquipmentItem>) =>
  addItem(InventoryState.miscEquipment, item)
export const removeEquipmentItem = (item: InventoryItem<EquipmentItem>) =>
  removeItem(InventoryState.miscEquipment, item)

export const toggleCost = () => {
  const isCostRural = InventoryState.isCostRural
  isCostRural.set(!isCostRural.get())
}

export const addCopperPieces = (value: number) => {
  const balance = InventoryState.copperPieces
  balance.merge((v) => v + value)
}

export const setCopperPieces = (value: number) => {
  const balance = InventoryState.copperPieces
  balance.set(value)
}

export const addCustomEquipmentItem = (data: InventoryItem<EquipmentItem>) => {
  const equipmentStateCategory = InventoryState.nested(data.categoryKey)

  type B = typeof equipmentStateCategory
  type T = B[keyof B]

  try {
    equipmentStateCategory[equipmentStateCategory.length].set(data as T)
  } catch (err) {
    console.error(`Unknown InventoryState category [${data.categoryKey}]`, err)
  }
}

type EquipmentStateAction<T extends EquipmentItem> = {
  add: (item: InventoryItem<T>) => void
  remove: (item: InventoryItem<T>) => void
}

type InferEquipmentItem<T> = T extends ReadonlyArray<InventoryItem<infer U>>
  ? U
  : never

type EquipmentStateActionsType = {
  [K in keyof InventoryStateType as K extends EquipmentCategoryKey
    ? K
    : never]: EquipmentStateAction<InferEquipmentItem<InventoryStateType[K]>>
}

export const EquipmentStateActions: EquipmentStateActionsType = {
  armor: {
    add: addArmor,
    remove: removeArmor,
  },
  meleeWeapons: {
    add: addMeleeWeapon,
    remove: removeMeleeWeapon,
  },
  miscEquipment: {
    add: addEquipmentItem,
    remove: removeEquipmentItem,
  },
  missileWeapons: {
    add: addMissileWeapon,
    remove: removeMissileWeapon,
  },
}

export const importEquipmentItems = (
  items: ReadonlyArray<InventoryItem<EquipmentItem>>,
) => {
  items.forEach((item) => {
    const { categoryKey } = item
    if (!categoryKey) {
      throw new Error('Cannot find category')
    }

    const equipmentStateCategory = InventoryState.nested(
      categoryKey as EquipmentCategoryKey,
    )

    type StateCategory = typeof equipmentStateCategory
    type StateCategoryItem = StateCategory[keyof StateCategory]

    try {
      EquipmentStateActions[categoryKey].add(item as StateCategoryItem)
    } catch (err) {
      throw new Error(`Unknown InventoryState category [${categoryKey}]`)
    }
  })
}
