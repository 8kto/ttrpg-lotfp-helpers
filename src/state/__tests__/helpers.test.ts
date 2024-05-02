import type { State } from '@hookstate/core'
import { hookstate } from '@hookstate/core'

import { EncumbranceThreshold } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import {
  armorItemMock1,
  armorItemMock2,
  firearmWeaponItemMock1,
  meleeWeaponItemMock1,
  meleeWeaponItemMock2,
  miscEquipItem1,
  miscEquipItem2,
  missileWeaponItemMock1,
  missileWeaponItemMock2,
} from '@/shared/mocks/inventoryMocks'
import { stateMock } from '@/shared/mocks/stateMock'
import {
  addItem,
  combineEquipment,
  removeItem,
  updateItemQuantity,
} from '@/state/helpers'
import type { InventoryStateType } from '@/state/InventoryState'

const createStateMock = (payload: InventoryStateType) => {
  return hookstate<InventoryStateType>(payload)
}

describe('Inventory helpers', () => {
  describe('combineEquipment', () => {
    it('should combine state props', () => {
      // Mock equipment state
      const mockEquipmentState = createStateMock(stateMock)
      const combinedEquipment = combineEquipment(mockEquipmentState)

      // Expected combined array
      const expected: Array<InventoryItem<EquipmentItem>> = [
        armorItemMock1,
        armorItemMock2,
        meleeWeaponItemMock1,
        meleeWeaponItemMock2,
        miscEquipItem1,
        miscEquipItem2,
        missileWeaponItemMock1,
        missileWeaponItemMock2,
        firearmWeaponItemMock1,
      ]

      expect(combinedEquipment).toEqual(expect.arrayContaining(expected))
      expect(combinedEquipment.length).toEqual(expected.length)
    })

    it('should return an empty array if there are no items', () => {
      // Mock empty equipment state
      const mockEmptyEquipmentState = createStateMock({
        armor: [],
        encumbranceThreshold: EncumbranceThreshold.Regular,
        firearmWeapons: [],
        isCoinWeightActive: true,
        isCostRural: false,
        isWalletManaged: false,
        meleeWeapons: [],
        miscEquipment: [],
        missileWeapons: [],
        wallet: {
          Copper: 0,
          Gold: 0,
          Silver: 0,
        },
      })

      const combinedEquipment = combineEquipment(mockEmptyEquipmentState)

      expect(combinedEquipment).toEqual([])
    })
  })

  describe('updateItemQuantity', () => {
    it('increases the item quantity correctly', () => {
      const prevState = { qty: 5 }
      let newState
      const stateItemMock = {
        get: () => prevState,
        set: jest.fn((callback) => {
          newState = callback(prevState)
        }),
      } as unknown as State<InventoryItem<EquipmentItem>>

      updateItemQuantity(1, stateItemMock)

      expect(stateItemMock.set).toHaveBeenCalledWith(expect.any(Function))
      expect(newState).toEqual({ qty: 6 })
      expect(prevState).toEqual({ qty: 5 })
    })

    it('decreases the item quantity correctly', () => {
      const prevState = { qty: 5 }
      let newState
      const stateItemMock = {
        get: () => prevState,
        set: jest.fn((callback) => {
          newState = callback(prevState)
        }),
      } as unknown as State<InventoryItem<EquipmentItem>>

      updateItemQuantity(-1, stateItemMock)

      expect(stateItemMock.set).toHaveBeenCalledWith(expect.any(Function))
      expect(newState).toEqual({ qty: 4 })
      expect(prevState).toEqual({ qty: 5 })
    })

    it('throws an error for invalid quantity', () => {
      const stateItemMock = {
        get: () => ({ qty: 1 }),
        set: jest.fn(),
      } as unknown as State<InventoryItem<EquipmentItem>>

      expect(() => updateItemQuantity(-2, stateItemMock)).toThrow(
        'updateItemQuantity: invalid item qty',
      )
      expect(stateItemMock.set).not.toHaveBeenCalled()
    })
  })

  describe('addItem', () => {
    it('adds new item if it does not exist', () => {
      const mockEmptyEquipmentState = createStateMock({
        miscEquipment: [miscEquipItem2],
      } as unknown as InventoryStateType)

      expect(mockEmptyEquipmentState.miscEquipment.get()).toEqual([
        miscEquipItem2,
      ])
      addItem(mockEmptyEquipmentState.miscEquipment, miscEquipItem1)
      expect(mockEmptyEquipmentState.miscEquipment.get()).toEqual([
        miscEquipItem2,
        miscEquipItem1,
      ])
    })

    it('increases quantity if item already exists', () => {
      const mockEmptyEquipmentState = createStateMock({
        miscEquipment: [miscEquipItem1, miscEquipItem2],
      } as unknown as InventoryStateType)

      addItem(mockEmptyEquipmentState.miscEquipment, miscEquipItem1)
      expect(mockEmptyEquipmentState.miscEquipment.get()).toEqual([
        { ...miscEquipItem1, qty: 2 },
        miscEquipItem2,
      ])
    })
  })

  describe('removeItem', () => {
    it('decreases QTY item already exists', () => {
      const mockEmptyEquipmentState = createStateMock({
        miscEquipment: [{ ...miscEquipItem1, qty: 2 }],
      } as unknown as InventoryStateType)

      removeItem(mockEmptyEquipmentState.miscEquipment, miscEquipItem1)
      expect(mockEmptyEquipmentState.miscEquipment.get()).toEqual([
        { ...miscEquipItem1, qty: 1 },
      ])
    })

    it('removes item', () => {
      const mockEmptyEquipmentState = createStateMock({
        miscEquipment: [miscEquipItem1, miscEquipItem2],
      } as unknown as InventoryStateType)

      removeItem(mockEmptyEquipmentState.miscEquipment, miscEquipItem1)
      expect(mockEmptyEquipmentState.miscEquipment.get()).toEqual([
        miscEquipItem2,
      ])
    })

    it('ignores not existing items', () => {
      const mockEmptyEquipmentState = createStateMock({
        miscEquipment: [miscEquipItem2],
      } as unknown as InventoryStateType)

      removeItem(mockEmptyEquipmentState.miscEquipment, miscEquipItem1)
      expect(mockEmptyEquipmentState.miscEquipment.get()).toEqual([
        miscEquipItem2,
      ])
    })
  })
})
