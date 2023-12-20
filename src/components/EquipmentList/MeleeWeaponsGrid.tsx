import { t, Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridSortFunction } from '@/components/DataGrid/helpers'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderNameGridCol,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import { handleSortByDamage } from '@/components/EquipmentList/helpers'
import Equipment from '@/config/Equipment'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import { addMeleeWeapon, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<MeleeWeaponItem>> = [
  {
    className: 'w-1/2 sm:w-1/3',
    key: 'name',
    render: renderNameGridCol,
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item: MeleeWeaponItem) => <DamageFragment damage={item.damage} />,
    get title() {
      return t`Damage`
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

const cityCostColumn: DataGridColumn<MeleeWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCostCp',
  get title() {
    return t`Cost, sp`
  },
}
const ruralCostColumn: DataGridColumn<MeleeWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCostCp',
  get title() {
    return t`Cost, sp`
  },
}

const MeleeWeaponsGrid = () => {
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
    const data = Object.values(Equipment.MeleeWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCostCp !== null) : data
  }, [isCostRural])

  const handleAddClick = (item: MeleeWeaponItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCostCp : item.cityCostCp)!,
    )
    addMeleeWeapon(clone)
  }

  const filterName = (item: MeleeWeaponItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  return (
    <>
      <div className='py-6 text-gray-800'>
        <p className={'mb-2'}>
          <Trans id='weapons.melee.secondRank'>
            Some weapons can attack “from the second rank.” This is used when
            there is a definite battle line in combat. Usually only those on the
            front line of battle can strike, but those weapons usable from the
            second rank allow anyone immediately behind the battle line to
            strike as well.
          </Trans>
        </p>
        <p className={'mb-2'}>
          <Trans id='weapons.melee.secondRankTypes'>
            Second rank weapons: lance, polearm, spear.
          </Trans>
        </p>
        <p className={'mb-2'}>
          <Trans id='weapons.melee.charge'>
            Weapons that allow to receive charge (damage x2, act first):
            polearm, spear.
          </Trans>
        </p>
      </div>
      <DataGrid<MeleeWeaponItem>
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

export default MeleeWeaponsGrid
