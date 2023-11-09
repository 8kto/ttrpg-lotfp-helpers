import { hookstate } from '@hookstate/core'

import { Dice } from '@/shared/types'
import type { ArmorEntry } from '@/shared/types/armor'
import { ArmorType } from '@/shared/types/armor'
import { EncumbrancePoint } from '@/shared/types/encumbrance'
import type { MeleeWeaponEntry } from '@/shared/types/weapon'
import type { EquipmentStateType } from '@/state/EquipmentState'
import { combineEquipment } from '@/state/helpers'

const createStateMock = (payload: EquipmentStateType) => {
  return hookstate<EquipmentStateType>(payload)
}

describe('Tray helpers', () => {
  describe('combineEquipment', () => {
    it('should combine state props', () => {
      // Mock equipment state
      const mockEquipmentState = createStateMock({
        armor: {
          1: {
            armorClass: 14,
            cityCost: 25,
            id: 1,
            name: 'Leather',
            points: EncumbrancePoint.None,
            ruralCost: 50,
            type: ArmorType.Armor,
          },
          2: {
            armorClass: 16,
            cityCost: 100,
            id: 2,
            name: 'Chain',
            points: EncumbrancePoint.Oversized,
            ruralCost: null,
            type: ArmorType.Armor,
          },
        },
        weapons: {
          1: {
            cityCost: 10,
            damage: {
              dice: Dice.d3,
              x: 1,
            },
            id: 1,
            name: 'Cestus',
            points: EncumbrancePoint.None,
            ruralCost: null,
          },
          2: {
            cityCost: 5,
            damage: {
              dice: Dice.d6,
              x: 1,
            },
            id: 2,
            name: 'Garrote',
            points: EncumbrancePoint.None,
            ruralCost: null,
          },
        },
      })

      const combinedEquipment = combineEquipment(mockEquipmentState)

      // Expected combined array
      const expected: Array<ArmorEntry | MeleeWeaponEntry> = [
        {
          armorClass: 14,
          cityCost: 25,
          id: 1,
          name: 'Leather',
          points: EncumbrancePoint.None,
          ruralCost: 50,
          type: ArmorType.Armor,
        },
        {
          armorClass: 16,
          cityCost: 100,
          id: 2,
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
          id: 1,
          name: 'Cestus',
          points: EncumbrancePoint.None,
          ruralCost: null,
        },
        {
          cityCost: 5,
          damage: {
            dice: Dice.d6,
            x: 1,
          },
          id: 2,
          name: 'Garrote',
          points: EncumbrancePoint.None,
          ruralCost: null,
        },
      ]

      expect(combinedEquipment).toEqual(expect.arrayContaining(expected))
      expect(combinedEquipment.length).toEqual(expected.length)
    })

    it('should return an empty array if there are no items', () => {
      // Mock empty equipment state
      const mockEmptyEquipmentState = createStateMock({
        armor: {},
        weapons: {},
      })

      const combinedEquipment = combineEquipment(mockEmptyEquipmentState)

      expect(combinedEquipment).toEqual([])
    })
  })
})
