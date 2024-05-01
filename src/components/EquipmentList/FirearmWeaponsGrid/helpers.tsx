import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/types'
import Equipment from '@/config/Equipment'
import { FirearmCostCoeff, RiffledCostCoeff } from '@/domain/firearms'

export const getFilteredData = (isCostRural: boolean) => {
  const data = Object.values(Equipment.FirearmWeapons)

  return isCostRural ? data.filter((i) => i.ruralCostCp !== null) : data
}

export const getFirearmsCostCoefficient = (
  filterValues: FilterValues,
): number => {
  const { firingMechanism } = filterValues
  let coefficient =
    FirearmCostCoeff[firingMechanism][filterValues.year] ||
    FirearmCostCoeff[firingMechanism].default

  if (filterValues.riffled) {
    coefficient *= RiffledCostCoeff
  }

  return coefficient
}
