import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import { trivialSort } from '@/components/DataGrid/helpers'
import type { DataGridColumn, SortConfig } from '@/components/DataGrid/types'
import { getInventoryItem } from '@/components/EquipmentList/helpers'
import { AllEquipment } from '@/config/AllEquipment'
import type { Dice, EquipmentItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { t } from '@/locale/helpers'
import { addMissileWeapon, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<MissileWeaponItem>> = [
  {
    className: 'w-1/3 truncate',
    key: 'name',
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item: MissileWeaponItem) => (
      <DamageFragment damage={item.damage} />
    ),
    title: 'Damage',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item: MissileWeaponItem) => (
      <span>{EncumbrancePoint[item.points]}</span>
    ),
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  title: 'Rural Cost',
}

const MissileWeaponsGrid = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()

  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(AllEquipment.MissileWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])

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
      <div className="py-6">
      <p>
        {t(
          'Each missile weapon can be fired once per round with the exception of the crossbows.',
        )}
      </p>
      <p>
        {t(
          'Targets at Medium range are –2 to hit, –4 to hit at Long range.',
        )}
      </p>
      </div>
      <DataGrid<MissileWeaponItem>
        data={dataFilteredByCost}
        columns={columnsFilteredByCost}
        onAddClick={handleAddClick}
        filterFn={filterName}
        filterPlaceholder={t('Filter by name')}
        handleSort={handleSort as typeof trivialSort}
      />
    </>
  )
}

// TODO display range
export default MissileWeaponsGrid
