import { act, renderHook } from '@testing-library/react'

import { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import {
  armorItemMock1,
  meleeWeaponItemMock1,
  miscEquipItem1,
  missileWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'
import type {
  EquipmentCategoryKey,
  InventoryStateType,
} from '@/state/InventoryState'
import {
  addArmor,
  addCopperPieces,
  addCustomEquipmentItem,
  addEquipmentItem,
  addMeleeWeapon,
  addMissileWeapon,
  getInitialInventoryState,
  importEquipmentItems,
  InventoryState,
  removeArmor,
  removeEquipmentItem,
  removeMeleeWeapon,
  removeMissileWeapon,
  setCopperPieces,
  toggleCoinsWeightActive,
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

  describe('isCoinWeightActive', () => {
    it('should toggle active coins weight', () => {
      expect(InventoryState.isCoinWeightActive.get()).toEqual(true)
      toggleCoinsWeightActive()
      expect(InventoryState.isCoinWeightActive.get()).toEqual(false)
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

  describe('copperPieces', () => {
    it('adds coins correctly', () => {
      addCopperPieces(50)
      expect(InventoryState.copperPieces.get()).toEqual(50)
      addCopperPieces(150)
      expect(InventoryState.copperPieces.get()).toEqual(200)
    })

    it('set coins correctly', () => {
      setCopperPieces(1000)
      expect(InventoryState.copperPieces.get()).toEqual(1000)
      setCopperPieces(400)
      expect(InventoryState.copperPieces.get()).toEqual(400)
    })
  })

  describe('addCustomEquipmentItem', () => {
    const customItem: InventoryItem<EquipmentItem> = {
      categoryKey: 'meleeWeapons',
      cityCost: 5,
      inventoryId: 'a15',
      lockedCost: 5,
      name: 'Jigsaw',
      points: EncumbrancePoint.Regular,
      qty: 1,
      ruralCost: 10,
    }

    it('adds item', () => {
      addCustomEquipmentItem(customItem)
      expect(InventoryState.meleeWeapons.get()).toContainEqual(customItem)
    })

    it('throws error for unknown category', () => {
      const loggerError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {
          /*do not write in console*/
        })

      const invalidItem = { ...customItem, categoryKey: 'inexisted' }
      addCustomEquipmentItem(
        // @ts-ignores
        invalidItem,
      )

      expect(loggerError).toHaveBeenCalledWith(
        'Unknown InventoryState category [inexisted]',
        expect.any(Error),
      )
    })
  })

  describe('importEquipmentItems', () => {
    const prepareMock = (
      mock: InventoryItem<EquipmentItem>,
      categoryKey: EquipmentCategoryKey,
    ) => {
      return {
        ...mock,
        categoryKey,
      } as InventoryItem<EquipmentItem>
    }

    const setQty = (
      mock: InventoryItem<EquipmentItem>,
      qty: number,
    ): InventoryItem<EquipmentItem> => {
      return {
        ...mock,
        qty,
      }
    }

    it('should import items', () => {
      const items = [
        prepareMock(armorItemMock1, 'armor'),
        prepareMock(meleeWeaponItemMock1, 'meleeWeapons'),
        prepareMock(miscEquipItem1, 'miscEquipment'),
        prepareMock(missileWeaponItemMock1, 'missileWeapons'),
      ]
      importEquipmentItems(items)

      expect(InventoryState.get()).toMatchObject({
        armor: [items[0]],
        meleeWeapons: [items[1]],
        miscEquipment: [items[2]],
        missileWeapons: [items[3]],
      })
    })

    it('should import items and increase qty1', () => {
      const items = [
        prepareMock(armorItemMock1, 'armor'),
        prepareMock(meleeWeaponItemMock1, 'meleeWeapons'),
        prepareMock(miscEquipItem1, 'miscEquipment'),
        prepareMock(missileWeaponItemMock1, 'missileWeapons'),
      ]
      importEquipmentItems(items)
      importEquipmentItems(items)

      expect(InventoryState.get()).toMatchObject({
        armor: [setQty(items[0], 2)],
        meleeWeapons: [setQty(items[1], 2)],
        miscEquipment: [setQty(items[2], 2)],
        missileWeapons: [setQty(items[3], 2)],
      })
    })

    it('throws error when no categoryKey', () => {
      const items = [{ ...armorItemMock1, categoryKey: undefined }]

      expect(() =>
        importEquipmentItems(
          // @ts-ignore
          items,
        ),
      ).toThrow('Cannot find category')
    })

    it('throws error when categoryKey is invalid', () => {
      const items = [{ ...armorItemMock1, categoryKey: 'unknownCategory' }]

      expect(() =>
        importEquipmentItems(
          // @ts-ignore
          items,
        ),
      ).toThrow('Unknown InventoryState category [unknownCategory]')
    })
  })
})
