import { applyFilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/helpers'
import Equipment from '@/config/Equipment'
import { FiringMechanism, YearPeriod } from '@/domain/firearms'

const getArquebus = () => {
  const arquebus = Equipment.FirearmWeapons.find((i) => i.name === 'Arquebus')
  if (!arquebus) {
    throw new Error('Arquebus is missing in config')
  }

  return arquebus
}

describe('applyFilterValues', () => {
  it.each([
    // coefficient = 1
    [FiringMechanism.Matchlock, YearPeriod['1610-1630'], false],
    [FiringMechanism.Flintlock, YearPeriod['> 1661'], false],
    // coefficient != 1
    [FiringMechanism.Flintlock, YearPeriod['> 1661'], true],
    [FiringMechanism.Wheellock, YearPeriod['1610-1630'], false],
  ])(
    'sets mechanism %s (%s, rifled: %s) on every item',
    (firingMechanism, year, rifled) => {
      const data = applyFilterValues([getArquebus()], {
        firingMechanism,
        rifled,
        year,
      })

      expect(data[0].firingMechanism).toEqual(firingMechanism)
      expect(data[0].isRifled).toEqual(rifled)
    },
  )

  it('multiplies the costs by the coefficient', () => {
    const [arquebus] = applyFilterValues([getArquebus()], {
      firingMechanism: FiringMechanism.Wheellock,
      rifled: true,
      year: YearPeriod['1610-1630'],
    })

    expect(arquebus.cityCostCp).toEqual(300 * 7 * 2)
    expect(arquebus.ruralCostCp).toEqual(500 * 7 * 2)
  })

  it('keeps the costs with coefficient 1', () => {
    const [arquebus] = applyFilterValues([getArquebus()], {
      firingMechanism: FiringMechanism.Matchlock,
      rifled: false,
      year: YearPeriod['1610-1630'],
    })

    expect(arquebus.cityCostCp).toEqual(300)
    expect(arquebus.ruralCostCp).toEqual(500)
  })
})
