import classnames from 'classnames'
import React from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import type { DataGridColumn } from '@/components/DataGrid/types'
import MeleeWeaponTraitsFragment from '@/components/EquipmentList/MeleeWeaponTraitsFragment'
import { Details } from '@/components/Inventory/ItemDetails/Details'
import { isMeleeWeaponItem } from '@/components/Inventory/ItemDetails/helpers'
import RangeFragment from '@/components/RangeFragment'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { MissileWeaponItem } from '@/domain/weapon'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

type RenderFunction<T extends EquipmentItem = EquipmentItem> =
  DataGridColumn<T>['render']
type RenderDetailsFunction<T extends EquipmentItem = EquipmentItem> =
  DataGridColumn<T>['renderDetails']

export const renderWeightGridCol: RenderFunction = (item, i18n) =>
  item.points === EncumbranceUnit.None
    ? '-'
    : i18n._(EncumbranceUnit[item.points])

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

export const renderDetailsBody: RenderDetailsFunction = (item, i18n, state) => {
  const { isCostRural } = state
  const weightLabel =
    item.points === EncumbranceUnit.None
      ? null
      : i18n._(EncumbranceUnit[item.points])
  const cost = isCostRural.get() ? item.ruralCostCp : item.cityCostCp
  const currencyRecord = CurrencyConverter.convertCopperToDefaultCurrency(
    cost || 0,
  )

  return (
    <>
      <Details item={item} />
      <div className='mt-2'>
        {!!weightLabel && (
          <p title={i18n._(`Weight`)} className='ph-color-muted text-sm'>
            {weightLabel}
          </p>
        )}
        {!!cost && (
          <p className='ph-color-muted text-sm'>
            <CostFragment
              wallet={CurrencyConverter.createWalletFrom(currencyRecord)}
            />
          </p>
        )}
      </div>
    </>
  )
}

export const renderInventoryTitle: RenderFunction<
  InventoryItem<EquipmentItem>
> = (item, i18n, _, isExpanded, shouldRenderDetails) => {
  const weightLabel =
    item.points === EncumbranceUnit.None
      ? null
      : i18n._(EncumbranceUnit[item.points])
  const range = (item as InventoryItem<MissileWeaponItem>).range

  return (
    <>
      <span
        className={classnames({
          'ph-dashed-text cursor-pointer': shouldRenderDetails,
        })}
      >
        {item.name}
      </span>
      {!isExpanded && !!weightLabel && (
        <p title={i18n._(`Weight`)} className='ph-color-muted text-sm'>
          {weightLabel}
        </p>
      )}
      {!isExpanded && isMeleeWeaponItem(item) && (
        <MeleeWeaponTraitsFragment item={item} />
      )}
      {!isExpanded && !!range && (
        <p title={i18n._('Range, feet')} className='ph-color-muted text-sm'>
          <RangeFragment range={range} compact />
        </p>
      )}
    </>
  )
}

export const renderInventoryDetailsBody: RenderDetailsFunction<
  InventoryItem<EquipmentItem>
> = (item, i18n) => {
  const weightLabel =
    item.points === EncumbranceUnit.None
      ? null
      : i18n._(EncumbranceUnit[item.points])

  return (
    <>
      <Details item={item} />
      {!!weightLabel && (
        <p title={i18n._(`Weight`)} className='mt-2 ph-color-muted text-sm'>
          {weightLabel}
        </p>
      )}
    </>
  )
}
