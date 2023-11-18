import { hookstate } from '@hookstate/core'

import type { EquipmentItem, InventoryItem } from '@/domain'
import {
  armorItemMock1,
  armorItemMock2,
  meleeWeaponItemMock1,
  meleeWeaponItemMock2,
  miscEquipItem1,
  miscEquipItem2,
  missileWeaponItemMock1,
  missileWeaponItemMock2,
} from '@/shared/mocks/inventoryMocks'
import { combineEquipment } from '@/state/helpers'
import type { InventoryStateType } from '@/state/InventoryState'

const createStateMock = (payload: InventoryStateType) => {
  return hookstate<InventoryStateType>(payload)
}

describe('Inventory helpers', () => {
  describe('combineEquipment', () => {
    it('should combine state props', () => {
      // Mock equipment state
      const mockEquipmentState = createStateMock({
        armor: [armorItemMock1, armorItemMock2],
        balanceCopperPieces: 0,
        isCostRural: false,
        meleeWeapons: [meleeWeaponItemMock1, meleeWeaponItemMock2],
        miscEquipment: [miscEquipItem1, miscEquipItem2],
        missileWeapons: [missileWeaponItemMock1, missileWeaponItemMock2],
      })

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
      ]

      expect(combinedEquipment).toEqual(expect.arrayContaining(expected))
      expect(combinedEquipment.length).toEqual(expected.length)
    })

    it('should return an empty array if there are no items', () => {
      // Mock empty equipment state
      const mockEmptyEquipmentState = createStateMock({
        armor: [],
        balanceCopperPieces: 0,
        isCostRural: false,
        meleeWeapons: [],
        miscEquipment: [],
        missileWeapons: [],
      })

      const combinedEquipment = combineEquipment(mockEmptyEquipmentState)

      expect(combinedEquipment).toEqual([])
    })
  })
})
