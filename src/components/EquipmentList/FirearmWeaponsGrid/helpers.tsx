import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/types'
import Equipment from '@/config/Equipment'
import { FirearmCostCoeff, RifledCostCoeff } from '@/config/Firearms'
import { FiringMechanism } from '@/domain/firearms'
import type { FirearmWeaponItem } from '@/domain/weapon'

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

  if (filterValues.rifled) {
    coefficient *= RifledCostCoeff
  }

  return coefficient
}

export const applyFilterValues = (
  data: Array<FirearmWeaponItem>,
  filterValues: FilterValues,
): Array<FirearmWeaponItem> => {
  const { firingMechanism, rifled } = filterValues
  const costCoeff = getFirearmsCostCoefficient(filterValues)

  return data.map((item) => ({
    ...item,
    cityCostCp: item.cityCostCp * costCoeff,
    firingMechanism,
    isRifled: rifled,
    ruralCostCp:
      item.ruralCostCp === null ? null : item.ruralCostCp * costCoeff,
  }))
}

export type GridDataProcessor = (
  data: Array<FirearmWeaponItem>,
  firingMechanism: FiringMechanism,
) => Array<FirearmWeaponItem>

export const handleMatchlockCompatibility: GridDataProcessor = (
  data,
  firingMechanism,
) => {
  if (firingMechanism === FiringMechanism.Matchlock) {
    return data.filter((item) => !item.isMatchlockIncompatible)
  }

  return data
}
