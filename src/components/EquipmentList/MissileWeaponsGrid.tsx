import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import { trivialSort } from '@/components/DataGrid/helpers'
import type { DataGridColumn, SortConfig } from '@/components/DataGrid/types'
import {
  getInventoryItem,
  renderWeightGridCol,
} from '@/components/EquipmentList/helpers'
import ItemDetails from '@/components/Inventory/ItemDetails'
import RangeFragment from '@/components/RangeFragment'
import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { Dice, EquipmentItem } from '@/domain'
import type { MissileWeaponItem } from '@/domain/weapon'
import { addMissileWeapon, useInventoryState } from '@/state/InventoryState'

// TODO always display details with Range
const columns: ReadonlyArray<DataGridColumn<MissileWeaponItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    render: (item: MissileWeaponItem) => (
      <ItemDetails<MissileWeaponItem> item={item} compact />
    ),
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
    className: 'w-1/6',
    key: 'points',
    render: renderWeightGridCol,
    get title() {
      return t`Weight`
    },
  },
]

const cityCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  get title() {
    return t`City Cost`
  },
}
const ruralCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  get title() {
    return t`Rural Cost`
  },
}

const MissileWeaponsGrid = () => {
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
    const data = Object.values(new EquipmentTranslated(trans).MissileWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [trans, isCostRural])

  const handleAddClick = (item: MissileWeaponItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCost : item.cityCost)!,
    )
    addMissileWeapon(clone)
  }

  const filterName = (item: MissileWeaponItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const handleSort = (sortConfig: SortConfig<EquipmentItem>) => {
    const isSpecialCase =
      (sortConfig as SortConfig<MissileWeaponItem>).key === 'damage'
    const parseDiceValue = (dice?: Dice) => {
      return dice ? parseInt(dice.substring(1), 10) : 0
    }

    return (a: MissileWeaponItem, b: MissileWeaponItem) => {
      const diceValueA = parseDiceValue(a.damage?.dice)
      const diceValueB = parseDiceValue(b.damage?.dice)

      if (!isSpecialCase) {
        return trivialSort(sortConfig)(a, b)
      }

      if (diceValueA !== diceValueB) {
        return sortConfig.direction === 'asc'
          ? diceValueA - diceValueB
          : diceValueB - diceValueA
      }

      // Compare 'x' values if dice values are equal or one of them is missing
      const xComparison = (a.damage?.x ?? 0) - (b.damage?.x ?? 0)
      if (xComparison !== 0) {
        return sortConfig.direction === 'asc' ? xComparison : -xComparison
      }

      return 0
    }
  }

  return (
    <>
      <div className='py-6'>
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
        handleSort={handleSort as typeof trivialSort}
      />
    </>
  )
}

export default MissileWeaponsGrid
