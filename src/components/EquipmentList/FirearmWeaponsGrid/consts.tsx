import { t } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderCostGridCol,
  renderDetailsBody,
  renderEquipmentTitle,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import FirearmRangeFragment from '@/components/FirearmRangeFragment'
import { FiringMechanism, YearPeriod } from '@/domain/firearms'
import type { FirearmWeaponItem } from '@/domain/weapon'

export const columns: ReadonlyArray<DataGridColumn<FirearmWeaponItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details || !!item.range,
    render: renderEquipmentTitle,
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
      <FirearmRangeFragment range={item.range} compact />
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

export const cityCostColumn: DataGridColumn<FirearmWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}
export const ruralCostColumn: DataGridColumn<FirearmWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}

export const defaultFilterValues = {
  firingMechanism: FiringMechanism.Wheellock,
  rifled: false,
  year: YearPeriod['1610-1630'],
}
