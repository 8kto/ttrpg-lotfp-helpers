import { Trans } from '@lingui/macro'
import React, { useMemo, useState } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridSortFunction } from '@/components/DataGrid/helpers'
import {
  cityCostColumn,
  columns,
  defaultFilterValues,
  ruralCostColumn,
} from '@/components/EquipmentList/FirearmWeaponsGrid/consts'
import FirearmsFilterPanel from '@/components/EquipmentList/FirearmWeaponsGrid/FirearmsFilterPanel'
import {
  getFilteredData,
  getFirearmsCostCoefficient,
} from '@/components/EquipmentList/FirearmWeaponsGrid/helpers'
import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/types'
import {
  handleAddEquipmentItemClick,
  sortWeapons,
} from '@/components/EquipmentList/helpers'
import type { FirearmWeaponItem } from '@/domain/weapon'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { useInventoryState } from '@/state/InventoryState'

const MissileWeaponsGrid = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()
  const [filterValues, setFilterValues] =
    useState<FilterValues>(defaultFilterValues)
  const breakpoint = useTailwindBreakpoint()

  const columnsFilteredByCost = useMemo(() => {
    const costCol = isCostRural.get() ? ruralCostColumn : cityCostColumn
    const lastIndex = columns.length - 1

    // put Cost before the last column
    return [...columns.slice(0, lastIndex), costCol, columns[lastIndex]]
  }, [isCostRural])

  const costCoeff = useMemo(
    () => getFirearmsCostCoefficient(filterValues),
    [filterValues],
  )

  const gridData = useMemo(() => {
    const data = getFilteredData(isCostRural.get())
    const { firingMechanism, riffled } = filterValues

    if (costCoeff !== 1) {
      for (const firearmWeaponItem of data) {
        firearmWeaponItem.isRiffled = riffled
        firearmWeaponItem.firingMechanism = firingMechanism

        firearmWeaponItem.cityCostCp *= costCoeff
        if (firearmWeaponItem.ruralCostCp) {
          firearmWeaponItem.ruralCostCp *= costCoeff
        }
      }
    }

    return data
  }, [filterValues, isCostRural, costCoeff])

  const onFilterChange = (values: FilterValues) => {
    setFilterValues(values)
  }

  const isSmallViewport = 'xs' === breakpoint
  const colSpan = isSmallViewport
    ? columnsFilteredByCost.length - 2
    : columnsFilteredByCost.length

  return (
    <>
      <div className='pb-4 pt-6 text-gray-800'>
        <p className='mb-4'>
          <Trans>
            Targets at Medium range are –4 to hit, –8 to hit at Long range.
            Rifled barrels halve the range penalties, but cost twice as much.
          </Trans>
        </p>
        <div className={'mb-2'}>
          <FirearmsFilterPanel onChange={onFilterChange} />
          <span className='text-sm ph-color-muted'>
            <Trans>Cost coefficient</Trans>: {costCoeff}
          </span>
        </div>
      </div>

      <DataGrid<FirearmWeaponItem>
        data={gridData}
        columns={columnsFilteredByCost}
        onAddClick={handleAddEquipmentItemClick}
        handleSort={sortWeapons as DataGridSortFunction}
        spanDetails={colSpan}
        noFilter
      />
    </>
  )
}

export default MissileWeaponsGrid
