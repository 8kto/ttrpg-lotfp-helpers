import type { I18n } from '@lingui/core'

import EquipmentTranslated from '@/config/EquipmentTranslated'
import { Dice } from '@/domain'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { WeaponType } from '@/domain/weapon'

describe('EquipmentTranslated', () => {
  const mockTrans = jest.fn((key) => key)
  const i18n = { _: mockTrans } as unknown as I18n
  let equipmentTranslated: EquipmentTranslated

  beforeEach(() => {
    equipmentTranslated = new EquipmentTranslated(i18n._)
  })

  it('translates armor items correctly', () => {
    const armor = equipmentTranslated.Armor
    expect(armor.length).toBeGreaterThan(0)
    expect(mockTrans).toHaveBeenCalled()

    armor.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'armor',
        cityCost: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbrancePoint),
        ruralCost: expect
          // @ts-ignore
          .toBeNullOrTypeOf('number'),
        type: expect
          // @ts-ignore
          .toBeEnumValue(ArmorType),
      })

      expect(
        item.armorClass === '+1,+2' || typeof item.armorClass === 'number',
      ).toBeTruthy()

      if (item.details) {
        expect(typeof item.details).toEqual('string')
      }
    })
  })

  it('translates melee weapons items correctly', () => {
    const meleeWeapons = equipmentTranslated.MeleeWeapons
    expect(meleeWeapons.length).toBeGreaterThan(0)
    expect(mockTrans).toHaveBeenCalled()

    meleeWeapons.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'meleeWeapons',
        cityCost: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbrancePoint),
        ruralCost: expect
          // @ts-ignore
          .toBeNullOrTypeOf('number'),
        type: expect
          // @ts-ignore
          .toBeEnumValue(WeaponType),
      })

      if (item.isAbleToReceiveCharge) {
        expect(typeof item.isAbleToReceiveCharge).toEqual('boolean')
      }
      if (item.twoHanded) {
        expect(typeof item.twoHanded).toEqual('boolean')
      }
      if (item.isSecondRank) {
        expect(typeof item.isSecondRank).toEqual('boolean')
      }

      if (item.damage) {
        expect(item.damage).toMatchObject({
          dice: expect
            // @ts-ignore
            .toBeEnumValue(Dice),
          x: expect.any(Number),
        })
      }
      if (item.details) {
        expect(typeof item.details).toEqual('string')
      }
    })
  })

  it('translates missile weapons items correctly', () => {
    const missileWeapons = equipmentTranslated.MissileWeapons
    expect(missileWeapons.length).toBeGreaterThan(0)
    expect(mockTrans).toHaveBeenCalled()

    missileWeapons.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'missileWeapons',
        cityCost: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbrancePoint),
        ruralCost: expect
          // @ts-ignore
          .toBeNullOrTypeOf('number'),
        type: expect
          // @ts-ignore
          .toBeEnumValue(WeaponType),
      })

      if (item.damage) {
        expect(item.damage).toMatchObject({
          dice: expect
            // @ts-ignore
            .toBeEnumValue(Dice),
          x: expect.any(Number),
        })
      }
      if (item.range) {
        expect(item.range).toMatchObject({
          long: expect.any(Number),
          medium: expect.any(Number),
          short: expect.any(Number),
        })
      }
      if (item.details) {
        expect(typeof item.details).toEqual('string')
      }
    })
  })

  it('translates miscellaneous equipment items correctly', () => {
    const miscEquipment = equipmentTranslated.MiscEquipment
    expect(miscEquipment.length).toBeGreaterThan(0)
    expect(mockTrans).toHaveBeenCalled()

    miscEquipment.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'miscEquipment',
        cityCost: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbrancePoint),
        ruralCost: expect
          // @ts-ignore
          .toBeNullOrTypeOf('number'),
      })

      if (item.details) {
        expect(typeof item.details).toEqual('string')
      }
    })
  })
})
