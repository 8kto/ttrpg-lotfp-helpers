import {
  applyFilterValues,
  handleMatchlockCompatibility,
} from '@/components/EquipmentList/FirearmWeaponsGrid/helpers'
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
    [false, 2, 5],
    [true, 3, 9],
  ])(
    'rounds only the final copper price (rifled: %s)',
    (rifled, cityCostCp, ruralCostCp) => {
      const [item] = applyFilterValues(
        [{ ...getArquebus(), cityCostCp: 1, ruralCostCp: 3 }],
        {
          firingMechanism: FiringMechanism.Flintlock,
          rifled,
          year: YearPeriod['1631-1660'],
        },
      )
      expect(item.cityCostCp).toBe(cityCostCp)
      expect(item.ruralCostCp).toBe(ruralCostCp)
      const [unavailable] = applyFilterValues(
        [{ ...getArquebus(), ruralCostCp: null }],
        {
          firingMechanism: FiringMechanism.Flintlock,
          rifled,
          year: YearPeriod['1631-1660'],
        },
      )
      expect(unavailable.ruralCostCp).toBeNull()
    },
  )

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

describe('handleMatchlockCompatibility', () => {
  // Names are translated, so the filter must not rely on them
  const items = Equipment.FirearmWeapons.map((item) => ({
    ...item,
    name: `translated ${item.name}`,
  }))

  it('removes pistols and pistol braces for matchlock', () => {
    const data = handleMatchlockCompatibility(items, FiringMechanism.Matchlock)

    expect(data.map((i) => i.name)).toEqual([
      'translated Arquebus',
      'translated Musket',
    ])
  })

  it.each([FiringMechanism.Wheellock, FiringMechanism.Flintlock])(
    'keeps all firearms for %s',
    (firingMechanism) => {
      expect(handleMatchlockCompatibility(items, firingMechanism)).toHaveLength(
        items.length,
      )
    },
  )
})
