import { hookstate } from '@hookstate/core'

import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MeleeWeaponItem } from '@/domain/weapon'
import {
  armorItemMock1,
  armorItemMock2,
  meleeWeaponItemMock1,
  meleeWeaponItemMock2,
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
        isCostRural: false,
        meleeWeapons: [meleeWeaponItemMock1, meleeWeaponItemMock2],
        missileWeapons: [missileWeaponItemMock1, missileWeaponItemMock2],
      })

      const combinedEquipment = combineEquipment(mockEquipmentState)

      // Expected combined array
      const expected: Array<InventoryItem<ArmorItem | MeleeWeaponItem>> = [
        armorItemMock1,
        armorItemMock2,
        meleeWeaponItemMock1,
        meleeWeaponItemMock2,
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
        isCostRural: false,
        meleeWeapons: [],
        missileWeapons: [],
      })

      const combinedEquipment = combineEquipment(mockEmptyEquipmentState)

      expect(combinedEquipment).toEqual([])
    })
  })
})
