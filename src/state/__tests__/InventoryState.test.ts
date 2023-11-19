import { act, renderHook } from '@testing-library/react'

import {
  armorItemMock1,
  meleeWeaponItemMock1,
  miscEquipItem1,
  missileWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'
import type { InventoryStateType } from '@/state/InventoryState'
import {
  addArmor,
  addEquipmentItem,
  addMeleeWeapon,
  addMissileWeapon,
  getInitialInventoryState,
  InventoryState,
  removeArmor,
  removeEquipmentItem,
  removeMeleeWeapon,
  removeMissileWeapon,
  toggleCost,
  useInventoryState,
} from '@/state/InventoryState'

describe('InventoryState Tests', () => {
  beforeEach(() => {
    InventoryState.set(getInitialInventoryState())
  })

  describe('useInventoryState Hook', () => {
    it('should provide initial state', () => {
      const { result } = renderHook(() => useInventoryState())
      expect(result.current.state.get()).toEqual(getInitialInventoryState())
    })

    it('should reset state', () => {
      const { result } = renderHook(() => useInventoryState())

      act(() => {
        const armor = result.current.state.armor
        const meleeWeapons = result.current.state.meleeWeapons
        const missileWeapons = result.current.state.missileWeapons
        const miscEquipment = result.current.state.miscEquipment
        const isCostRural = result.current.state.isCostRural

        armor[armor.length].set(armorItemMock1)
        meleeWeapons[meleeWeapons.length].set(meleeWeaponItemMock1)
        missileWeapons[missileWeapons.length].set(missileWeaponItemMock1)
        miscEquipment[miscEquipment.length].set(miscEquipItem1)
        isCostRural.set(!isCostRural.get())
      })

      expect(result.current.state.get()).toEqual({
        armor: [armorItemMock1],
        copperPieces: 0,
        isCoinWeightActive: true,
        isCostRural: true,
        meleeWeapons: [meleeWeaponItemMock1],
        miscEquipment: [miscEquipItem1],
        missileWeapons: [missileWeaponItemMock1],
      } as InventoryStateType)

      act(() => {
        result.current.reset()
      })

      expect(result.current.state.get()).toEqual(getInitialInventoryState())
    })

    it('should reset equipment', () => {
      const { result } = renderHook(() => useInventoryState())

      expect(result.current.state.isCostRural.get()).toEqual(false)

      act(() => {
        const armor = result.current.state.armor
        const meleeWeapons = result.current.state.meleeWeapons
        const missileWeapons = result.current.state.missileWeapons
        const miscEquipment = result.current.state.miscEquipment
        const isCostRural = result.current.state.isCostRural

        armor[armor.length].set(armorItemMock1)
        meleeWeapons[meleeWeapons.length].set(meleeWeaponItemMock1)
        missileWeapons[missileWeapons.length].set(missileWeaponItemMock1)
        miscEquipment[miscEquipment.length].set(miscEquipItem1)
        isCostRural.set(!isCostRural.get())
      })

      expect(result.current.state.isCostRural.get()).toEqual(true)

      act(() => {
        result.current.resetEquipment()
      })

      expect(result.current.state.get()).toEqual({
        armor: [],
        copperPieces: 0,
        isCoinWeightActive: true,
        isCostRural: true,
        meleeWeapons: [],
        miscEquipment: [],
        missileWeapons: [],
      })
    })
  })

  describe('armor', () => {
    it('adds armor item correctly', () => {
      addArmor(armorItemMock1)
      expect(InventoryState.armor.get()).toContainEqual(armorItemMock1)
    })

    it('removes armor item correctly', () => {
      addArmor(armorItemMock1)
      removeArmor(armorItemMock1)
      expect(InventoryState.armor.get()).not.toContainEqual(armorItemMock1)
    })
  })

  describe('meleeWeapons', () => {
    it('adds weapon item correctly', () => {
      addMeleeWeapon(meleeWeaponItemMock1)
      expect(InventoryState.meleeWeapons.get()).toContainEqual(
        meleeWeaponItemMock1,
      )
    })

    it('removes weapon item correctly', () => {
      addMeleeWeapon(meleeWeaponItemMock1)
      removeMeleeWeapon(meleeWeaponItemMock1)
      expect(InventoryState.meleeWeapons.get()).not.toContainEqual(
        meleeWeaponItemMock1,
      )
    })
  })

  describe('isCostRural', () => {
    it('should toggle cost', () => {
      expect(InventoryState.isCostRural.get()).toEqual(false)
      toggleCost()
      expect(InventoryState.isCostRural.get()).toEqual(true)
    })
  })

  describe('missileWeapons', () => {
    it('adds weapon item correctly', () => {
      addMissileWeapon(missileWeaponItemMock1)
      expect(InventoryState.missileWeapons.get()).toContainEqual(
        missileWeaponItemMock1,
      )
    })

    it('removes weapon item correctly', () => {
      addMissileWeapon(missileWeaponItemMock1)
      removeMissileWeapon(missileWeaponItemMock1)
      expect(InventoryState.missileWeapons.get()).not.toContainEqual(
        missileWeaponItemMock1,
      )
    })
  })

  describe('miscEquipment', () => {
    it('adds item correctly', () => {
      addEquipmentItem(miscEquipItem1)
      expect(InventoryState.miscEquipment.get()).toContainEqual(miscEquipItem1)
    })

    it('removes item correctly', () => {
      addEquipmentItem(miscEquipItem1)
      removeEquipmentItem(miscEquipItem1)
      expect(InventoryState.miscEquipment.get()).not.toContainEqual(
        miscEquipItem1,
      )
    })
  })
})
