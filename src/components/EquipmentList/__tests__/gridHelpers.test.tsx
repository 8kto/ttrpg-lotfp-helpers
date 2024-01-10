import type { State } from '@hookstate/core'
import type { I18n } from '@lingui/core'

import { renderWeightGridCol } from '@/components/EquipmentList/gridHelpers'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryStateType } from '@/state/InventoryState'

describe('gridHelpers', () => {
  describe('renderWeightGridCol', () => {
    const mockI18n = {
      _: jest.fn((key) => `translated_${key}`),
    } as unknown as I18n
    const stateMock = {} as State<InventoryStateType, unknown>

    it('should return "-" when points are None', () => {
      const item = { points: EncumbranceUnit.None } as EquipmentItem
      const result = renderWeightGridCol!(
        item,
        mockI18n,
        stateMock,
        false,
        true,
      )
      expect(result).toBe('-')
    })

    it('should return translated value for non-None points', () => {
      const item = { points: EncumbranceUnit.Regular } as EquipmentItem
      const result = renderWeightGridCol!(
        item,
        mockI18n,
        stateMock,
        false,
        true,
      )
      expect(result).toBe(`translated_${EncumbranceUnit[item.points]}`)
      expect(mockI18n._).toHaveBeenCalledWith(EncumbranceUnit[item.points])
    })
  })
})
