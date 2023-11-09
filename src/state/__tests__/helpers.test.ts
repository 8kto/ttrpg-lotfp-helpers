import {hookstate} from "@hookstate/core"

import {EquipmentStateType} from "@/state/EquipmentState"
import {combineEquipment} from "@/state/helpers"
import {ArmorType} from "@/shared/types/armor"
import {EncumbrancePoint} from "@/shared/types/encumbrance"
import {Dice} from "@/shared/types"

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
            id: 1,
            name: "Leather",
            type: ArmorType.Armor,
            cityCost: 25,
            ruralCost: 50,
            armorClass: 14,
            points: EncumbrancePoint.None,
            isRecorded: false,
          },
          2: {
            id: 2,
            name: "Chain",
            type: ArmorType.Armor,
            cityCost: 100,
            ruralCost: null,
            armorClass: 16,
            points: EncumbrancePoint.Oversized,
            isRecorded: false,
          },
        },
        weapons: {
          1: {
            id: 1,
            name: 'Cestus',
            cityCost: 10,
            ruralCost: null,
            points: EncumbrancePoint.None,
            isRecorded: false,
            damage: {
              x: 1,
              dice: Dice.d3,
            },
            range: 0,
          },
          2: {
            id: 2,
            name: 'Garrote',
            cityCost: 5,
            ruralCost: null,
            points: EncumbrancePoint.None,
            isRecorded: false,
            damage: {
              x: 1,
              dice: Dice.d6,
            },
            range: 0,
          },
        },
      })

      const combinedEquipment = combineEquipment(mockEquipmentState)

      // Expected combined array
      const expected = [
        {
          id: 1,
          name: "Leather",
          type: ArmorType.Armor,
          cityCost: 25,
          ruralCost: 50,
          armorClass: 14,
          points: EncumbrancePoint.None,
          isRecorded: false,
        },
        {
          id: 2,
          name: "Chain",
          type: ArmorType.Armor,
          cityCost: 100,
          ruralCost: null,
          armorClass: 16,
          points: EncumbrancePoint.Oversized,
          isRecorded: false,
        },
        {
          id: 1,
          name: 'Cestus',
          cityCost: 10,
          ruralCost: null,
          points: EncumbrancePoint.None,
          isRecorded: false,
          damage: {
            x: 1,
            dice: Dice.d3,
          },
          range: 0,
        },
        {
          id: 2,
          name: 'Garrote',
          cityCost: 5,
          ruralCost: null,
          points: EncumbrancePoint.None,
          isRecorded: false,
          damage: {
            x: 1,
            dice: Dice.d6,
          },
          range: 0,
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