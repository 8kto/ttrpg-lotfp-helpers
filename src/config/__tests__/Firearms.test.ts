import { FirearmGearItems } from '@/config/FirearmGearItems'
import { getMisfireChances } from '@/config/Firearms'
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
