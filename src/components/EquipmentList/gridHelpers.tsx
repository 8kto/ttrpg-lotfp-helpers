import type { I18n } from '@lingui/core'
import classnames from 'classnames'
import React from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import type { DataGridColumn } from '@/components/DataGrid/types'
import FirearmTraitsFragment from '@/components/EquipmentList/FirearmTraitsFragment'
import MeleeWeaponTraitsFragment from '@/components/EquipmentList/MeleeWeaponTraitsFragment'
import FirearmMechanismFragment from '@/components/FirearmMechanismFragment'
import FirearmRangeFragment from '@/components/FirearmRangeFragment'
import { Details } from '@/components/Inventory/ItemDetails/Details'
import {
  isFirearmItem,
  isMeleeWeaponItem,
} from '@/components/Inventory/ItemDetails/helpers'
import QtyFragment from '@/components/Inventory/ItemDetails/QtyFragment'
import RangeFragment from '@/components/RangeFragment'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { MissileWeaponItem } from '@/domain/weapon'
import CurrencyConverter from '@/shared/services/CurrencyConverter'
import { WeightLabels } from '@/translations/encumbranceLabels'

type RenderFunction<T extends EquipmentItem = EquipmentItem> =
  DataGridColumn<T>['render']
type RenderDetailsFunction<T extends EquipmentItem = EquipmentItem> =
  DataGridColumn<T>['renderDetails']

const getWeightLabel = (i18n: I18n, points: EncumbranceUnit) =>
  points === EncumbranceUnit.None ? null : i18n._(WeightLabels[points])

export const renderWeightGridCol: RenderFunction = (item, i18n) =>
  getWeightLabel(i18n, item.points) ?? '-'

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

export const renderEquipmentTitle: RenderFunction = (
  item,
  _,
  __,
  isExpanded,
  shouldRenderDetails,
) => (
  <>
    <span
      className={classnames({
        'ph-dashed-text cursor-pointer hover:text-red-800 active:text-red-600 transition-all duration-200':
          shouldRenderDetails,
      })}
    >
      {item.name}
    </span>
    {!isExpanded && isMeleeWeaponItem(item) && (
      <MeleeWeaponTraitsFragment item={item} />
    )}
    {!isExpanded && isFirearmItem(item) && (
      <FirearmTraitsFragment item={item} />
    )}
  </>
)

export const renderDetailsBody: RenderDetailsFunction = (item, i18n, state) => {
  const { isCostRural } = state
  const weightLabel = getWeightLabel(i18n, item.points)
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
  const weightLabel = getWeightLabel(i18n, item.points)
  const range = (item as InventoryItem<MissileWeaponItem>).range
  const hasQty = item.qty > 1

  return (
    <>
      <span
        className={classnames({
          'ph-dashed-text cursor-pointer': shouldRenderDetails,
        })}
      >
        {item.name}
        {hasQty && <QtyFragment item={item} />}
      </span>
      {!isExpanded && !!weightLabel && (
        <p title={i18n._(`Weight`)} className='ph-color-muted text-sm'>
          {weightLabel}
        </p>
      )}
      {!isExpanded && isMeleeWeaponItem(item) && (
        <MeleeWeaponTraitsFragment item={item} />
      )}
      {!isExpanded && isFirearmItem(item) && (
        <>
          <p
            title={i18n._('Firearm mechanism')}
            className='ph-color-muted text-sm'
          >
            <FirearmMechanismFragment item={item} />
          </p>
          <FirearmTraitsFragment item={item} />
        </>
      )}
      {!isExpanded && !!range && (
        <p title={i18n._('Range, feet')} className='ph-color-muted text-sm'>
          {isFirearmItem(item) ? (
            <FirearmRangeFragment
              range={range}
              isRifled={item.isRifled}
              compact
            />
          ) : (
            <RangeFragment range={range} compact />
          )}
        </p>
      )}
    </>
  )
}

export const renderInventoryDetailsBody: RenderDetailsFunction<
  InventoryItem<EquipmentItem>
> = (item, i18n) => {
  const weightLabel = getWeightLabel(i18n, item.points)

  return (
    <>
      <Details item={item} />
      {!!weightLabel && (
        <p title={i18n._(`Weight`)} className='ph-color-muted mt-2 text-sm'>
          {weightLabel}
        </p>
      )}
    </>
  )
}
