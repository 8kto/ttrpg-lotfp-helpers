import { t, Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridSortFunction } from '@/components/DataGrid/helpers'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderCostGridCol,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import { handleSortByDamage } from '@/components/EquipmentList/helpers'
import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'
import RangeFragment from '@/components/RangeFragment'
import Equipment from '@/config/Equipment'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import { addMissileWeapon, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<MissileWeaponItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    render: (item: MissileWeaponItem, i18n) => {
      const weightLabel =
        item.points === EncumbrancePoint.None
          ? null
          : i18n._(EncumbrancePoint[item.points])

      return (
        <>
          <ItemDetails<MissileWeaponItem>
            item={item}
            compact
            showDetailsBlock={!!item.range}
          />
          {!!weightLabel && (
            <p
              title={i18n._('Weight')}
              className='block sm:hidden text-sm text-gray-500'
            >
              {weightLabel}
            </p>
          )}
        </>
      )
    },
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item: MissileWeaponItem) => (
      <DamageFragment damage={item.damage} />
    ),
    get title() {
      return t`Damage`
    },
  },
  {
    className: 'w-1/6',
    key: 'range',
    render: (item: MissileWeaponItem) => (
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

const cityCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}
const ruralCostColumn: DataGridColumn<MissileWeaponItem> = {
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

  const columnsFilteredByCost = useMemo(() => {
    const costCol = isCostRural.get() ? ruralCostColumn : cityCostColumn
    const lastIndex = columns.length - 1

    // put the Cost before the last column
    return [...columns.slice(0, lastIndex), costCol, columns[lastIndex]]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(Equipment.MissileWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCostCp !== null) : data
  }, [isCostRural])

  const handleAddClick = (item: MissileWeaponItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCostCp : item.cityCostCp)!,
    )
    addMissileWeapon(clone)
  }

  const filterName = (item: MissileWeaponItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  return (
    <>
      <div className='py-6 text-gray-800'>
        <p className={'mb-2'}>
          <Trans id='weapons.missile.firing'>
            Each missile weapon can be fired once per round with the exception
            of the crossbows.
          </Trans>
        </p>
        <p className={'mb-2'}>
          <Trans id='weapons.missile.range'>
            Targets at Medium range are –2 to hit, –4 to hit at Long range.
          </Trans>
        </p>
      </div>
      <DataGrid<MissileWeaponItem>
        data={dataFilteredByCost}
        columns={columnsFilteredByCost}
        onAddClick={handleAddClick}
        filterFn={filterName}
        filterPlaceholder={t`Filter by name`}
        handleSort={handleSortByDamage as DataGridSortFunction}
      />
    </>
  )
}

export default MissileWeaponsGrid
