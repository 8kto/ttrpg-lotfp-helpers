import { t } from '@lingui/macro'

import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/types'
import Equipment from '@/config/Equipment'
import { FirearmCostCoeff, RiffledCostCoeff } from '@/config/Firearms'
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

  if (filterValues.riffled) {
    coefficient *= RiffledCostCoeff
  }

  return coefficient
}

export type GridDataProcessor = (
  data: Array<FirearmWeaponItem>,
  firingMechanism: FiringMechanism,
) => Array<FirearmWeaponItem>

export const handlePistols: GridDataProcessor = (data, firingMechanism) => {
  if (firingMechanism === FiringMechanism.Matchlock) {
    return data.filter((item) => item.name !== t`Pistol`)
  }

  return data
}
