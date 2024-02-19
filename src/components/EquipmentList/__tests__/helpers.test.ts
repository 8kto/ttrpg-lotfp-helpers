/* eslint-disable sort-keys-fix/sort-keys-fix */
import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import {
  sortByDamage,
  sortByRange,
  sortWeapons,
} from '@/components/EquipmentList/helpers'
import { Dice } from '@/domain'
import type {
  MeleeWeaponItem,
  MissileWeaponItem,
  WeaponItem,
} from '@/domain/weapon'

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

  describe('sortByDamage', () => {
    it('should sort items in ascending order based on dice value', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = sortByDamage(sortConfig)
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
      const sortFunction = sortByDamage(sortConfig)
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

    it('should sort by x values when dice values are equal', () => {
      const sortConfig: SortConfig<WeaponItem> = {
        direction: 'asc',
        key: 'damage',
      }
      const sortFunction = sortByDamage(sortConfig)
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
      const sortFunction = sortByDamage(sortConfig)
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
      const sortFunction = sortByDamage(sortConfig)
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
      const sortFunction = sortByDamage(sortConfig)
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
      const sortFunction = sortByDamage(sortConfig)
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

  describe('sortByRange', () => {
    it('should sort items in ascending order', () => {
      const sortConfig: SortConfig<MissileWeaponItem> = {
        direction: 'asc',
        key: 'range',
      }
      const sortFunction = sortByRange(sortConfig)
      expect(
        [
          { range: { short: 20, medium: 35, long: 50 } } as MissileWeaponItem,
          {
            range: { short: 200, medium: 300, long: 500 },
          } as MissileWeaponItem,
          { range: { short: 10, medium: 20, long: 30 } } as MissileWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { range: { short: 10, medium: 20, long: 30 } } as MissileWeaponItem,
        { range: { short: 20, medium: 35, long: 50 } } as MissileWeaponItem,
        { range: { short: 200, medium: 300, long: 500 } } as MissileWeaponItem,
      ])
    })

    it('should sort items in desc order', () => {
      const sortConfig: SortConfig<MissileWeaponItem> = {
        direction: 'desc',
        key: 'range',
      }
      const sortFunction = sortByRange(sortConfig)
      expect(
        [
          { range: { short: 20, medium: 35, long: 50 } } as MissileWeaponItem,
          {
            range: { short: 200, medium: 300, long: 500 },
          } as MissileWeaponItem,
          { range: { short: 10, medium: 20, long: 30 } } as MissileWeaponItem,
        ].sort(sortFunction),
      ).toEqual([
        { range: { short: 200, medium: 300, long: 500 } } as MissileWeaponItem,
        { range: { short: 20, medium: 35, long: 50 } } as MissileWeaponItem,
        { range: { short: 10, medium: 20, long: 30 } } as MissileWeaponItem,
      ])
    })
  })

  describe('sortWeapons', () => {
    it('should use trivialSort for non-special case sorting', () => {
      const sortConfig = {
        direction: 'asc',
        key: 'name',
      } as unknown as SortConfig<WeaponItem>

      const sortFunction = sortWeapons(sortConfig)
      sortFunction(
        // @ts-ignore
        {
          categoryKey: 'meleeWeapons',
          damage: { dice: Dice.d20 },
        } as WeaponItem,
        {
          categoryKey: 'meleeWeapons',
          damage: { dice: Dice.d10 },
        } as WeaponItem,
      )
      expect(trivialSort).toHaveBeenCalled()
    })
  })
})
