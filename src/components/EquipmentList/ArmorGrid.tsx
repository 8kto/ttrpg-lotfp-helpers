import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import { trivialSort } from '@/components/DataGrid/helpers'
import type { DataGridColumn, SortConfig } from '@/components/DataGrid/types'
import {
  getInventoryItem,
  renderWeightGridCol,
} from '@/components/EquipmentList/helpers'
import ItemDetails from '@/components/Inventory/ItemDetails'
import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { EquipmentItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { addArmor, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<ArmorItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    render: (item: ArmorItem) => <ItemDetails<ArmorItem> item={item} compact />,
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'armorClass',
    get title() {
      return t`AC`
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

const cityCostColumn: DataGridColumn<ArmorItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  get title() {
    return t`City Cost`
  },
}
const ruralCostColumn: DataGridColumn<ArmorItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  get title() {
    return t`Rural Cost`
  },
}

const ArmorGrid = () => {
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
    const data = Object.values(new EquipmentTranslated(trans).Armor)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural, trans])

  const handleAddClick = (item: ArmorItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCost : item.cityCost)!,
    )

    addArmor(clone)
  }

  const filterName = (item: ArmorItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const handleSort =
    (sortConfig: SortConfig<EquipmentItem>) =>
    (a: ArmorItem, b: ArmorItem): 1 | -1 | 0 => {
      const isSpecialSort = (value: number | string) =>
        typeof value === 'string' &&
        value.startsWith('+') &&
        (sortConfig as SortConfig<ArmorItem>).key === 'armorClass'

      // NB Extra logic just for a Shield, worth introducing an ArmorClass type?
      if (isSpecialSort(a.armorClass) || isSpecialSort(b.armorClass)) {
        if (a.armorClass === b.armorClass) {
          return 0
        }
        if (isSpecialSort(a.armorClass)) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (isSpecialSort(b.armorClass)) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
      }

      // Fallback to the trivialSort function for other cases
      return trivialSort(sortConfig)(a, b)
    }

  return (
    <>
      <div className='py-6'>
        <p className={'mb-2'}>
          <Trans id='armor.baseAc'>
            Unarmored characters have a Base AC of 12.
          </Trans>
        </p>
        <p className={'mb-2'}>
          <Trans id='armor.unadjustedAc'>
            Unadjusted AC is that of solely the armor and shield. Dexterity
            modifiers, magical modifiers, or any other adjustments are not
            counted.
          </Trans>
        </p>
      </div>
      <DataGrid<ArmorItem>
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

export default ArmorGrid
