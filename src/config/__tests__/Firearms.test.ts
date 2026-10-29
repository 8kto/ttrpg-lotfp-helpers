import Equipment from '@/config/Equipment'
import { FirearmArmorItems } from '@/config/FirearmArmorItems'
import { FirearmGearItems } from '@/config/FirearmGearItems'
import { getMisfireChances } from '@/config/Firearms'
import { ArmorType } from '@/domain/armor'
import { EncumbranceUnit } from '@/domain/encumbrance'
import { FiringMechanism } from '@/domain/firearms'

describe('Firearms config', () => {
  describe('getMisfireChances', () => {
    it.each([
      // Damp doubles, wet quadruples the chance
      [FiringMechanism.Matchlock, { damp: 4, dry: 2, wet: 8 }],
      // Wheellocks ignore environmental conditions
      [FiringMechanism.Wheellock, { damp: 2, dry: 2, wet: 2 }],
      [FiringMechanism.Flintlock, { damp: 2, dry: 1, wet: 4 }],
    ])('returns chances in 10 for %s', (mechanism, expected) => {
      expect(getMisfireChances(mechanism)).toEqual(expected)
    })
  })

  describe('FirearmGearItems', () => {
    const getPoints = (name: string) =>
      FirearmGearItems().find((item) => item.name === name)?.points

    it('puts gear into the miscellaneous equipment category', () => {
      FirearmGearItems().forEach((item) => {
        expect(item.categoryKey).toEqual('miscEquipment')
      })
    })

    it.each([
      ['12 Apostles', EncumbranceUnit.Regular],
      ['Fire Bomb', EncumbranceUnit.Regular],
      ['Gunpowder', EncumbranceUnit.Regular],
      // "Counts as four oversized items"
      ['Gunpowder, Barrel', EncumbranceUnit.OversizedX4],
      // Italicized in the rulebook: non-encumbering
      ['Match Cord, 1 m', EncumbranceUnit.None],
      ['Powder Horn', EncumbranceUnit.Regular],
      ['Scattershot', EncumbranceUnit.Regular],
      ['Shot Bag', EncumbranceUnit.Regular],
    ])('%s weighs as in the rulebook', (name, points) => {
      expect(getPoints(name)).toEqual(points)
    })

    it('has no rural price for the powder barrel', () => {
      const barrel = FirearmGearItems().find(
        (item) => item.name === 'Gunpowder, Barrel',
      )
      expect(barrel?.ruralCostCp).toBeNull()
    })
  })
})

describe('FirearmArmorItems', () => {
  const find = (name: string) =>
    FirearmArmorItems().find((item) => item.name === name)

  it('puts the armor into the armor category', () => {
    FirearmArmorItems().forEach((item) => {
      expect(item.categoryKey).toEqual('armor')
    })
  })

  it.each([
    ['Buff Coat', EncumbranceUnit.Regular],
    // Bold italic in the rulebook
    ["Pikeman's Armor", EncumbranceUnit.Oversized],
    // "an additional normal item"
    ['Tassets', EncumbranceUnit.Regular],
    // "counts as two oversized items"
    ['Full Armor', EncumbranceUnit.Heavy],
    ['Helm, Lobster Tail Pot', EncumbranceUnit.Regular],
    ['Helm, Morion', EncumbranceUnit.Regular],
    // "Secrete helms are non-encumbering"
    ['Helm, Secrete', EncumbranceUnit.None],
  ])('%s weighs as in the rulebook', (name, points) => {
    expect(find(name)?.points).toEqual(points)
  })

  it.each([
    ["Pikeman's Armor", 14],
    ['Full Armor', 18],
  ])('%s sets the base AC %s', (name, armorClass) => {
    expect(find(name)).toMatchObject({ armorClass, type: ArmorType.Armor })
    expect(find(name)?.armorClassBonus).toBeUndefined()
  })

  it.each([
    ['Buff Coat', { melee: 1, missile: 1 }, undefined],
    ['Tassets', { melee: 1, missile: 1 }, undefined],
    ['Helm, Lobster Tail Pot', { melee: 1, missile: 1 }, 2],
    ['Helm, Morion', { melee: 1, missile: 1 }, 1],
    ['Helm, Secrete', undefined, 1],
  ])('%s adds AC bonus %j and save bonus %s', (name, bonus, saveBonus) => {
    expect(find(name)?.type).toEqual(ArmorType.Accessory)
    expect(find(name)?.armorClassBonus).toEqual(bonus)
    expect(find(name)?.physicalSaveBonus).toEqual(saveBonus)
  })

  it('has no rural price for the full armor', () => {
    expect(find('Full Armor')?.ruralCostCp).toBeNull()
  })
})

describe('Shield', () => {
  it('has a numeric AC bonus for calculations', () => {
    const shield = Equipment.Armor.find((item) => item.name === 'Shield')
    expect(shield?.armorClassBonus).toEqual({ melee: 1, missile: 2 })
  })
})
