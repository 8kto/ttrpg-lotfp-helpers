import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridSortFunction } from '@/components/DataGrid/helpers'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  getInventoryItem,
  handleSortByDamage,
  renderWeightGridCol,
} from '@/components/EquipmentList/helpers'
import ItemDetails from '@/components/Inventory/ItemDetails'
import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { addMeleeWeapon, useInventoryState } from '@/state/InventoryState'

const cityCostColumn: DataGridColumn<MeleeWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  get title() {
    return t`Cost, sp`
  },
}
const ruralCostColumn: DataGridColumn<MeleeWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  get title() {
    return t`Cost, sp`
  },
}

const columns: ReadonlyArray<DataGridColumn<MeleeWeaponItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    render: (item: MeleeWeaponItem) => {
      return <ItemDetails<MeleeWeaponItem> item={item} compact />
    },
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
    className: 'w-1/6',
    key: 'points',
    render: renderWeightGridCol,
    get title() {
      return t`Weight`
    },
  },
]

const MeleeWeaponsGrid = () => {
  const { _: trans } = useLingui()
  const {
    state: { isCostRural },
  } = useInventoryState()

  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(new EquipmentTranslated(trans).MeleeWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [trans, isCostRural])

  const handleAddClick = (item: MeleeWeaponItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCost : item.cityCost)!,
    )
    addMeleeWeapon(clone)
  }

  const filterName = (item: MeleeWeaponItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  return (
    <>
      <div className='py-6'>
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
