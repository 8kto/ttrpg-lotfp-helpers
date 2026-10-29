import { t, Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import { trivialSort } from '@/components/DataGrid/helpers'
import type { DataGridColumn, SortConfig } from '@/components/DataGrid/types'
import { applyFirearmsCampaignCost } from '@/components/EquipmentList/armorHelpers'
import {
  renderCostGridCol,
  renderDetailsBody,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import { handleAddEquipmentItemClick } from '@/components/EquipmentList/helpers'
import Equipment from '@/config/Equipment'
import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<ArmorItem>> = [
  {
    className: 'w-1/2 sm:w-1/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details || !!item.physicalSaveBonus,
    renderDetails: renderDetailsBody,
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
    className: 'hidden sm:table-cell sm:w-1/6',
    key: 'points',
    render: renderWeightGridCol,
    get title() {
      return t`Weight`
    },
  },
]

const cityCostColumn: DataGridColumn<ArmorItem> = {
  className: 'w-1/6',
  key: 'cityCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}
const ruralCostColumn: DataGridColumn<ArmorItem> = {
  className: 'w-1/6',
  key: 'ruralCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}

type ArmorGridProps = {
  // Defaults to the core armor list, priced for the current campaign
  items?: ReadonlyArray<ArmorItem>
  addDisabledReason?: string
}

const ArmorGrid = ({ items, addDisabledReason }: ArmorGridProps) => {
  const {
    state: { isCostRural, isFirearmsCampaign },
  } = useInventoryState()
  const breakpoint = useTailwindBreakpoint()
  const columnsFilteredByCost = useMemo(() => {
    const costCol = isCostRural.get() ? ruralCostColumn : cityCostColumn
    const lastIndex = columns.length - 1

    // put the Cost before the last column
    return [...columns.slice(0, lastIndex), costCol, columns[lastIndex]]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data =
      items ??
      applyFirearmsCampaignCost(Equipment.Armor, isFirearmsCampaign.get())

    return isCostRural.get() ? data.filter((i) => i.ruralCostCp !== null) : data
  }, [isCostRural, isFirearmsCampaign, items])

  const isSmallViewport = 'xs' === breakpoint
  const colSpan = isSmallViewport
    ? columnsFilteredByCost.length - 1
    : columnsFilteredByCost.length

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
      {!items && (
        <div className='pt-6 pb-4 text-gray-800'>
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
          {isFirearmsCampaign.get() && (
            <p className='mb-2 underline'>
              <Trans>
                Firearms campaign: the cost of armor and shields is raised by
                50%.
              </Trans>
            </p>
          )}
        </div>
      )}
      <DataGrid<ArmorItem>
        data={dataFilteredByCost}
        columns={columnsFilteredByCost}
        onAddClick={handleAddEquipmentItemClick}
        addDisabledReason={addDisabledReason}
        filterFn={filterName}
        filterPlaceholder={t`Filter by name`}
        handleSort={handleSort as typeof trivialSort}
        spanDetails={colSpan}
        noFilter
      />
    </>
  )
}

export default ArmorGrid
