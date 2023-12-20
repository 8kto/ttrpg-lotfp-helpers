import { Trans } from '@lingui/macro'

import type { DataGridColumn } from '@/components/DataGrid/types'
import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'
import { CurrencyType } from '@/domain/currency'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import CurrencyConverter from '@/shared/services/CurrencyConverter'
import { useInventoryState } from '@/state/InventoryState'

type RenderFunction = DataGridColumn<EquipmentItem>['render']

export const renderWeightGridCol: RenderFunction = (item, i18n) =>
  item.points === EncumbrancePoint.None
    ? '-'
    : i18n._(EncumbrancePoint[item.points])

export const renderNameGridCol: RenderFunction = (item, i18n) => {
  const weightLabel =
    item.points === EncumbrancePoint.None
      ? null
      : i18n._(EncumbrancePoint[item.points])

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

export const renderCostGridCol: RenderFunction = (item) => {
  const {
    state: { isCostRural },
    // It is called within a component:
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useInventoryState()

  let valueCp: number
  if (isCostRural.get()) {
    valueCp = item.ruralCostCp === null ? 0 : item.ruralCostCp
  } else {
    valueCp = item.cityCostCp
  }

  const converted = CurrencyConverter.getDisplayCost({
    coin: CurrencyType.Copper,
    value: valueCp,
  })

  return converted.value
}
