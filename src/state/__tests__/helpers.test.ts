import { hookstate } from '@hookstate/core'

import type { InventoryItem } from '@/domain'
import { Dice } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'
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
        armor: [
          {
            armorClass: 14,
            cityCost: 25,
            inventoryId: '1',
            lockedCost: 50,
            name: 'Leather',
            points: EncumbrancePoint.None,
            ruralCost: 50,
            type: ArmorType.Armor,
          },
          {
            armorClass: 16,
            cityCost: 100,
            inventoryId: '2',
            lockedCost: 50,
            name: 'Chain',
            points: EncumbrancePoint.Oversized,
            ruralCost: null,
            type: ArmorType.Armor,
          },
        ],
        isCostRural: false,
        meleeWeapons: [
          {
            cityCost: 10,
            damage: {
              dice: Dice.d3,
              x: 1,
            },
            inventoryId: '3',
            lockedCost: 10,
            name: 'Cestus',
            points: EncumbrancePoint.None,
            ruralCost: null,
            type: WeaponType.Melee,
          },
          {
            cityCost: 5,
            damage: {
              dice: Dice.d6,
              x: 1,
            },
            inventoryId: '4',
            lockedCost: 5,
            name: 'Garrote',
            points: EncumbrancePoint.None,
            ruralCost: null,
            type: WeaponType.Melee,
          },
        ],
      })

      const combinedEquipment = combineEquipment(mockEquipmentState)

      // Expected combined array
      const expected: Array<InventoryItem<ArmorItem | MeleeWeaponItem>> = [
        {
          armorClass: 14,
          cityCost: 25,
          inventoryId: '1',
          lockedCost: 50,
          name: 'Leather',
          points: EncumbrancePoint.None,
          ruralCost: 50,
          type: ArmorType.Armor,
        },
        {
          armorClass: 16,
          cityCost: 100,
          inventoryId: '2',
          lockedCost: 50,
          name: 'Chain',
          points: EncumbrancePoint.Oversized,
          ruralCost: null,
          type: ArmorType.Armor,
        },
        {
          cityCost: 10,
          damage: {
            dice: Dice.d3,
            x: 1,
          },
          inventoryId: '3',
          lockedCost: 10,
          name: 'Cestus',
          points: EncumbrancePoint.None,
          ruralCost: null,
          type: WeaponType.Melee,
        },
        {
          cityCost: 5,
          damage: {
            dice: Dice.d6,
            x: 1,
          },
          inventoryId: '4',
          lockedCost: 5,
          name: 'Garrote',
          points: EncumbrancePoint.None,
          ruralCost: null,
          type: WeaponType.Melee,
        },
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
      })

      const combinedEquipment = combineEquipment(mockEmptyEquipmentState)

      expect(combinedEquipment).toEqual([])
    })
  })
})
