import type { State } from '@hookstate/core'
import type { I18n } from '@lingui/core'

import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import { renderWeightGridCol } from '@/components/EquipmentList/gridHelpers'
import { handleSortByDamage } from '@/components/EquipmentList/helpers'
import { Dice } from '@/domain'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { MeleeWeaponItem, WeaponItem } from '@/domain/weapon'
import type { InventoryStateType } from '@/state/InventoryState'

jest.mock('@/components/DataGrid/helpers', () => ({
  trivialSort: jest.fn(() => {
    return () => {
      /* noop */
    }
  }),
}))

describe('Equipment list helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('handleSortByDamage', () => {
    it('should sort items in ascending order based on dice value', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        [
          { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d8 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d100 } } as MeleeWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { damage: { dice: Dice.d8 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d100 } } as MeleeWeaponItem,
      ])
    })

    it('should sort items in descending order based on dice value', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'desc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        [
          { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d8 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d100 } } as MeleeWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { damage: { dice: Dice.d100 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d8 } } as MeleeWeaponItem,
      ])
    })

    it('should use trivialSort for non-special case sorting', () => {
      const sortConfig = {
        direction: 'asc',
        key: 'name',
      } as unknown as SortConfig<WeaponItem>

      const sortFunction = handleSortByDamage(sortConfig)
      sortFunction(
        { damage: { dice: Dice.d20 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
      )
      expect(trivialSort).toHaveBeenCalled()
    })

    it('should sort by x values when dice values are equal', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        [
          { damage: { dice: Dice.d20, x: 1 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d20, x: 2 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d8, x: 5 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10, x: 2 } } as MeleeWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { damage: { dice: Dice.d8, x: 5 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10, x: 2 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20, x: 1 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20, x: 2 } } as MeleeWeaponItem,
      ])
    })

    it('should sort by x values when dice values are equal [desc]', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'desc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        [
          { damage: { dice: Dice.d20, x: 1 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d20, x: 2 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d8, x: 5 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10, x: 2 } } as MeleeWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { damage: { dice: Dice.d20, x: 2 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20, x: 1 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10, x: 2 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d8, x: 5 } } as MeleeWeaponItem,
      ])
    })

    it('should handle cases where one or both items are missing damage', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        [
          { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
          { damage: { dice: undefined } } as unknown as MeleeWeaponItem,
          { name: 'Plastic sword' } as MeleeWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { damage: { dice: undefined } } as unknown as MeleeWeaponItem,
        { name: 'Plastic sword' } as MeleeWeaponItem,
        { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
      ])
    })

    it('should handle cases where one or both items have the same damage.dice and damage.x', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        sortFunction(
          { damage: { dice: Dice.d10, x: 2 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10, x: 2 } } as MeleeWeaponItem,
        ),
      ).toBe(0)
    })

    it('should handle cases with missing x value', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = handleSortByDamage(sortConfig)
      expect(
        [
          { damage: { dice: Dice.d20, x: 1 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
          { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { damage: { dice: Dice.d10 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d10, x: 3 } } as MeleeWeaponItem,
        { damage: { dice: Dice.d20, x: 1 } } as MeleeWeaponItem,
      ])
    })
  })

  describe('renderWeightGridCol', () => {
    const mockI18n = {
      _: jest.fn((key) => `translated_${key}`),
    } as unknown as I18n
    const stateMock = {} as State<InventoryStateType, unknown>

    it('should return "-" when points are None', () => {
      const item = { points: EncumbranceUnit.None } as EquipmentItem
      const result = renderWeightGridCol!(item, mockI18n, stateMock)
      expect(result).toBe('-')
    })

    it('should return translated value for non-None points', () => {
      const item = { points: EncumbranceUnit.Regular } as EquipmentItem
      const result = renderWeightGridCol!(item, mockI18n, stateMock)
      expect(result).toBe(`translated_${EncumbranceUnit[item.points]}`)
      expect(mockI18n._).toHaveBeenCalledWith(EncumbranceUnit[item.points])
    })
  })
})
