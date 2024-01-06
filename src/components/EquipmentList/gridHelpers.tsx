import { Trans } from '@lingui/macro'

import type { DataGridColumn } from '@/components/DataGrid/types'
import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

type RenderFunction = DataGridColumn<EquipmentItem>['render']

export const renderWeightGridCol: RenderFunction = (item, i18n) =>
  item.points === EncumbranceUnit.None
    ? '-'
    : i18n._(EncumbranceUnit[item.points])

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

  return (
    <>
      <ItemDetails item={item} compact />
      {!!weightLabel && (
        <p title={i18n._('Weight')} className='block text-sm text-gray-500'>
          {weightLabel}
        </p>
      )}
    </>
  )
}
