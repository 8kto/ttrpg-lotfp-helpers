import { t, Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import { trivialSort } from '@/components/DataGrid/helpers'
import type { DataGridColumn, SortConfig } from '@/components/DataGrid/types'
import { getInventoryItem } from '@/components/EquipmentList/helpers'
import ItemDetails from '@/components/Inventory/ItemDetails'
import { AllEquipment } from '@/config/AllEquipment'
import type { Dice, EquipmentItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { addMeleeWeapon, useInventoryState } from '@/state/InventoryState'

const cityCostColumn: DataGridColumn<MeleeWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  title: t`City Cost`,
}
const ruralCostColumn: DataGridColumn<MeleeWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  title: t`Rural Cost`,
}

const MeleeWeaponsGrid = () => {
  const columns: ReadonlyArray<DataGridColumn<MeleeWeaponItem>> = [
    {
      className: 'w-1/3',
      key: 'name',
      render: (item: MeleeWeaponItem) => (
        <ItemDetails<MeleeWeaponItem> item={item} compact />
      ),
      title: t`Name`,
    },
    {
      className: 'w-1/6',
      key: 'damage',
      render: (item: MeleeWeaponItem) => (
        <DamageFragment damage={item.damage} />
      ),
      title: t`Damage`,
    },
    {
      className: 'w-1/6',
      key: 'points',
      render: (item: MeleeWeaponItem) => (
        <span>{EncumbrancePoint[item.points]}</span>
      ),
      title: t`Weight`,
    },
  ]

  const {
    state: { isCostRural },
  } = useInventoryState()

  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [columns, isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(AllEquipment.MeleeWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])

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

  // TODO extract sort func and test for Melee and Missiles
  const handleSort = (sortConfig: SortConfig<EquipmentItem>) => {
    const isSpecialCase =
      (sortConfig as SortConfig<MeleeWeaponItem>).key === 'damage'
    const parseDiceValue = (dice?: Dice) => {
      return dice ? parseInt(dice.substring(1), 10) : 0
    }

    return (a: MeleeWeaponItem, b: MeleeWeaponItem) => {
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
          <Trans>
            Some weapons can attack “from the second rank.” This is used when
            there is a definite battle line in combat. Usually only those on the
            front line of battle can strike, but those weapons usable from the
            second rank allow anyone immediately behind the battle line to
            strike as well.
          </Trans>
        </p>
        <p className={'mb-2'}>
          <Trans>Second rank weapons: lance, polearm, spear.</Trans>
        </p>
        <p className={'mb-2'}>
          <Trans>
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
        handleSort={handleSort as typeof trivialSort}
      />
    </>
  )
}

export default MeleeWeaponsGrid
