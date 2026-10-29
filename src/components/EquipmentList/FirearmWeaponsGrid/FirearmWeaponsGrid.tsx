import { t, Trans } from '@lingui/macro'
import React, { useMemo, useState } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridSortFunction } from '@/components/DataGrid/helpers'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import {
  cityCostColumn,
  columns,
  defaultFilterValues,
  ruralCostColumn,
} from '@/components/EquipmentList/FirearmWeaponsGrid/consts'
import FirearmsFilterPanel from '@/components/EquipmentList/FirearmWeaponsGrid/FirearmsFilterPanel'
import type { GridDataProcessor } from '@/components/EquipmentList/FirearmWeaponsGrid/helpers'
import {
  applyFilterValues,
  getFilteredData,
  getFirearmsCostCoefficient,
  handleMatchlockCompatibility,
} from '@/components/EquipmentList/FirearmWeaponsGrid/helpers'
import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/types'
import {
  handleAddEquipmentItemClick,
  sortWeapons,
} from '@/components/EquipmentList/helpers'
import MiscEquipmentGrid from '@/components/EquipmentList/MiscEquipmentGrid'
import { FirearmArmorItems } from '@/config/FirearmArmorItems'
import { FirearmGearItems } from '@/config/FirearmGearItems'
import type { FirearmWeaponItem } from '@/domain/weapon'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { useInventoryState } from '@/state/InventoryState'

const gridDataProcessors: Array<GridDataProcessor> = [
  handleMatchlockCompatibility,
]

const FirearmWeaponsGrid = () => {
  const {
    state: { isCostRural, isFirearmsCampaign },
  } = useInventoryState()
  const [filterValues, setFilterValues] =
    useState<FilterValues>(defaultFilterValues)
  const breakpoint = useTailwindBreakpoint()
  const gearItems = useMemo(() => FirearmGearItems(), [])
  const armorItems = useMemo(() => FirearmArmorItems(), [])
  // The tab stays browsable outside of a firearms campaign, adding is off
  const addDisabledReason = isFirearmsCampaign.get()
    ? undefined
    : t`Turn on the firearms campaign to add these items`

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
    const data = applyFilterValues(
      getFilteredData(isCostRural.get()),
      filterValues,
    )

    return gridDataProcessors.reduce(
      (acc, fn) => fn(acc, filterValues.firingMechanism),
      data,
    )
  }, [filterValues, isCostRural])

  const isSmallViewport = 'xs' === breakpoint
  const colSpan = isSmallViewport
    ? columnsFilteredByCost.length - 2
    : columnsFilteredByCost.length

  return (
    <>
      <div className='pb-4 pt-6 text-gray-800'>
        {!isFirearmsCampaign.get() && (
          <p className='mb-4 font-semibold'>
            <Trans>
              Firearms rules are optional. Turn on the firearms campaign above
              to add firearms, gear and armor to the inventory.
            </Trans>
          </p>
        )}
        <p className='mb-4'>
          <Trans>
            Targets at Medium range are –4 to hit, –8 to hit at Long range.
            Rifled barrels halve the range penalties, but cost twice as much.
          </Trans>
        </p>
        <div className={'mb-2'}>
          <FirearmsFilterPanel
            values={filterValues}
            onChange={setFilterValues}
          />
          <span className='ph-color-muted text-sm'>
            <Trans>Cost coefficient</Trans>: {costCoeff}
          </span>
        </div>
      </div>

      <DataGrid<FirearmWeaponItem>
        data={gridData}
        columns={columnsFilteredByCost}
        onAddClick={handleAddEquipmentItemClick}
        addDisabledReason={addDisabledReason}
        handleSort={sortWeapons as DataGridSortFunction}
        spanDetails={colSpan}
        noFilter
      />

      <h3 className='ph-color-accent mb-2 mt-8 font-semibold text-heading text-xl lg:text-2xl'>
        <Trans>Ammunition and gear</Trans>
      </h3>
      <MiscEquipmentGrid
        items={gearItems}
        addDisabledReason={addDisabledReason}
        noFilter
      />

      <h3 className='ph-color-accent mb-2 mt-8 font-semibold text-heading text-xl lg:text-2xl'>
        <Trans>Armor</Trans>
      </h3>
      <ArmorGrid items={armorItems} addDisabledReason={addDisabledReason} />
    </>
  )
}

export default FirearmWeaponsGrid
