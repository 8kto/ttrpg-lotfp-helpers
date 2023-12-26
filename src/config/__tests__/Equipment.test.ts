import Equipment from '@/config/Equipment'
import { Dice } from '@/domain'
import { ArmorType } from '@/domain/armor'
import { EncumbranceUnit } from '@/domain/encumbrance'
import { WeaponType } from '@/domain/weapon'

describe('Equipment', () => {
  it('translates armor items correctly', () => {
    const armor = Equipment.Armor
    expect(armor.length).toBeGreaterThan(0)

    armor.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'armor',
        cityCostCp: expect.any(Number),
        name: expect.any(String),
        points: expect.any(Number),
        ruralCostCp: expect
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
    const meleeWeapons = Equipment.MeleeWeapons
    expect(meleeWeapons.length).toBeGreaterThan(0)

    meleeWeapons.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'meleeWeapons',
        cityCostCp: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbranceUnit),
        ruralCostCp: expect
          // @ts-ignore
          .toBeNullOrTypeOf('number'),
        type: expect
          // @ts-ignore
          .toBeEnumValue(WeaponType),
      })

      if (item.isAbleToReceiveCharge) {
        expect(typeof item.isAbleToReceiveCharge).toEqual('boolean')
      }
      if (item.isTwoHanded) {
        expect(typeof item.isTwoHanded).toEqual('boolean')
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
    const missileWeapons = Equipment.MissileWeapons
    expect(missileWeapons.length).toBeGreaterThan(0)

    missileWeapons.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'missileWeapons',
        cityCostCp: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbranceUnit),
        ruralCostCp: expect
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
    const miscEquipment = Equipment.MiscEquipment
    expect(miscEquipment.length).toBeGreaterThan(0)

    miscEquipment.forEach((item) => {
      expect(item).toMatchObject({
        categoryKey: 'miscEquipment',
        cityCostCp: expect.any(Number),
        name: expect.any(String),
        points: expect
          // @ts-ignore
          .toBeEnumValue(EncumbranceUnit),
        ruralCostCp: expect
          // @ts-ignore
          .toBeNullOrTypeOf('number'),
      })

      if (item.details) {
        expect(typeof item.details).toEqual('string')
      }
    })
  })
})
