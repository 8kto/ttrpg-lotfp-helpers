import React from 'react'

import { Details, Summary } from '@/components/Inventory/ItemDetails/Details'
import { isInventoryItem } from '@/components/Inventory/ItemDetails/helpers'
import ItemDetailsLine from '@/components/Inventory/ItemDetails/ItemDetailsLine'
import QtyFragment from '@/components/Inventory/ItemDetails/QtyFragment'
import type { EquipmentItem } from '@/domain/equipment'

const ItemDetails = <T extends EquipmentItem>({
  item,
  compact = false,
  showDetailsBlock = false,
}: {
  item: T
  compact?: boolean
  showDetailsBlock?: boolean
}) => {
  const shouldShowDetails = showDetailsBlock || !!item.details

  if (shouldShowDetails) {
    return (
      <details className='ph-details-bullet text-gray-900'>
        <Summary item={item} compact={compact} />
        <Details item={item} />
      </details>
    )
  }

  const hasQty = isInventoryItem(item) && item.qty > 1

  return (
    <>
      {item.name}
      {hasQty && <QtyFragment item={item} />}
      {!compact && <ItemDetailsLine item={item} />}
    </>
  )
}

export default ItemDetails
