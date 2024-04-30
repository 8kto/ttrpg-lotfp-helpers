import { t, Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridSortFunction } from '@/components/DataGrid/helpers'
import type { DataGridColumn } from '@/components/DataGrid/types'
import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/FirearmsFilterPanel'
import FirearmsFilterPanel from '@/components/EquipmentList/FirearmWeaponsGrid/FirearmsFilterPanel'
import {
  renderCostGridCol,
  renderDetailsBody,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import {
  handleAddEquipmentItemClick,
  sortWeapons,
} from '@/components/EquipmentList/helpers'
import RangeFragment from '@/components/RangeFragment'
import Equipment from '@/config/Equipment'
import { CoeffYear } from '@/domain/firearms'
import type { FirearmWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<FirearmWeaponItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details || !!item.range,
    renderDetails: renderDetailsBody,
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item: FirearmWeaponItem) => (
      <DamageFragment damage={item.damage} />
    ),
    get title() {
      return t`Damage`
    },
  },
  {
    className: 'w-1/6 hidden sm:table-cell',
    key: 'range',
    render: (item: FirearmWeaponItem) => (
      <RangeFragment range={item.range} compact />
    ),
    get title() {
      return t`Range`
    },
  },
  {
    className: 'hidden sm:table-cell sm:w-1/6',
    key: 'points',
    render: renderWeightGridCol,
    get title() {
      return t`Weight`
    },
  },
]

const cityCostColumn: DataGridColumn<FirearmWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}
const ruralCostColumn: DataGridColumn<FirearmWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}

const MissileWeaponsGrid = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()
  const breakpoint = useTailwindBreakpoint()

  const columnsFilteredByCost = useMemo(() => {
    const costCol = isCostRural.get() ? ruralCostColumn : cityCostColumn
    const lastIndex = columns.length - 1

    // put the Cost before the last column
    return [...columns.slice(0, lastIndex), costCol, columns[lastIndex]]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(deepclone(Equipment.FirearmWeapons))

    return isCostRural.get() ? data.filter((i) => i.ruralCostCp !== null) : data
  }, [isCostRural])

  const onFilterChange = (filterValues: FilterValues) => {
    // console.log(filterValues)

    for (const firearmWeaponItem of dataFilteredByCost) {
      firearmWeaponItem.isRiffled = filterValues.riffled
      firearmWeaponItem.firingMechanism = filterValues.firingMechanism

      let coeff =
        CoeffYear[firearmWeaponItem.firingMechanism][filterValues.year] ||
        CoeffYear[firearmWeaponItem.firingMechanism].default

      if (firearmWeaponItem.isRiffled) {
        coeff *= 2
      }

      // eslint-disable-next-line no-console
      console.log('cost', (firearmWeaponItem.cityCostCp * coeff))
    }
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
        </div>
      </div>

      <DataGrid<FirearmWeaponItem>
        data={dataFilteredByCost}
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
