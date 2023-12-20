import { Trans } from '@lingui/macro'

import type { DataGridColumn } from '@/components/DataGrid/types'
import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
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
          className='block sm:hidden text-sm text-gray-500'
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

  if (isCostRural.get()) {
    return item.ruralCostCp === null ? 0 : item.ruralCostCp / 10
  }

  return item.cityCostCp / 10
}
