import { Trans } from '@lingui/macro'
import React from 'react'

import type { DataGridColumn } from '@/components/DataGrid/types'
import { Details } from '@/components/Inventory/ItemDetails/Details'
import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'
import RangeFragment from '@/components/RangeFragment'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { MissileWeaponItem } from '@/domain/weapon'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

/**
 * @deprecated
 */
type RenderFunction = DataGridColumn<EquipmentItem>['render']
type RenderDetailsTitleFunction =
  DataGridColumn<EquipmentItem>['renderDetailsTitle']
type RenderDetailsBodyFunction =
  DataGridColumn<EquipmentItem>['renderDetailsBody']

export const renderWeightGridCol: RenderFunction = (item, i18n) =>
  item.points === EncumbranceUnit.None
    ? '-'
    : i18n._(EncumbranceUnit[item.points])

/**
 * @deprecated To be removed
 */
export const renderNameGridCol: RenderFunction = (item, i18n) => {
  const weightLabel =
    item.points === EncumbranceUnit.None
      ? null
      : i18n._(EncumbranceUnit[item.points])

  return (
    <>
      <ItemDetails item={item} compact />
      {!!weightLabel && (
        <p
          title={i18n._('Weight')}
          className='block text-sm text-gray-500 sm:hidden'
        >
          <span className='text-gray-400'>
            <Trans>Weight</Trans>:{' '}
          </span>
          {weightLabel}
        </p>
      )}
    </>
  )
}

export const renderCostGridCol: RenderFunction = (item, _, state) => {
  const { isCostRural } = state

  let valueCp: number
  if (isCostRural.get()) {
    valueCp = item.ruralCostCp === null ? 0 : item.ruralCostCp
  } else {
    valueCp = item.cityCostCp
  }

  return CurrencyConverter.getDisplayCost({
    currency: CurrencyType.Copper,
    value: valueCp,
  }).value
}

export const renderNameInventoryGridCol: RenderFunction = (item, i18n) => {
  const weightLabel =
    item.points === EncumbranceUnit.None
      ? null
      : i18n._(EncumbranceUnit[item.points])

  const range = (item as InventoryItem<MissileWeaponItem>).range

  return (
    <>
      <ItemDetails item={item} compact />
      {!!weightLabel && (
        <p title={i18n._('Weight')} className='block text-sm text-gray-500'>
          {weightLabel}
        </p>
      )}
      {!!range && (
        <p
          title={i18n._('Range, feet')}
          className='block text-sm text-gray-500'
        >
          <RangeFragment range={range} compact />
        </p>
      )}
    </>
  )
}

export const renderDetailsTitle: RenderDetailsTitleFunction = (item) => (
  <div className='flex cursor-pointer items-center'>
    <span className='ph-dashed-text'>{item.name}</span>
  </div>
)

export const renderDetailsBody: RenderDetailsBodyFunction = (item, i18n) => {
  const weightLabel =
    item.points === EncumbranceUnit.None
      ? null
      : i18n._(EncumbranceUnit[item.points])

  return (
    <>
      <Details item={item} />
      {!!weightLabel && (
        <p className='block text-sm text-gray-500'>
          <span className='text-gray-400'>
            <Trans>Weight</Trans>:{' '}
          </span>
          {weightLabel}
        </p>
      )}
    </>
  )
}
