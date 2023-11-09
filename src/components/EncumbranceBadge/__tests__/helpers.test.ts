import { getEncumbrance, getTotal } from '@/components/EncumbranceBadge/helpers'
import type { EquipmentItem } from '@/shared/types'
import { Encumbrance, EncumbrancePoint } from '@/shared/types/encumbrance'

describe('helpers', () => {
  describe('getEncumbrance', () => {
    it.each([
      [0, Encumbrance.Unencumbered],
      [10, Encumbrance.Unencumbered],
      [11, Encumbrance.Lightly],
      [15, Encumbrance.Lightly],
      [16, Encumbrance.Heavily],
      [20, Encumbrance.Heavily],
      [21, Encumbrance.Severely],
      [25, Encumbrance.Severely],
      [26, Encumbrance.OverEncumbered],
      [30, Encumbrance.OverEncumbered],
    ])('should return %d -> %s', (input, expected) => {
      expect(getEncumbrance(input)).toEqual(expected)
    })
  })

  describe('getTotal', () => {
    it('returns total cost and points of all equipment items', () => {
      const items: EquipmentItem[] = [
        {
          cityCost: 100,
          id: 1,
          name: 'Sword',
          points: EncumbrancePoint.Regular,
          ruralCost: null,
        },
        {
          cityCost: 50,
          id: 2,
          name: 'Shield',
          points: EncumbrancePoint.Oversized,
          ruralCost: null,
        },
        {
          cityCost: 200,
          id: 3,
          name: 'Armor',
          points: EncumbrancePoint.Heavy,
          ruralCost: null,
        },
      ]

      expect(getTotal(items)).toEqual({
        totalCost: 350,
        totalPoints: 3.2,
      })
    })

    it('returns zero for empty arrays', () => {
      expect(getTotal([])).toEqual({
        totalCost: 0,
        totalPoints: 0,
      })
    })
  })
})
