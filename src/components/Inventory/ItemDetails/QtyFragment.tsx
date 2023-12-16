import React from 'react'

import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

const QtyFragment = ({ item }: { item: InventoryItem<EquipmentItem> }) => {
  return (
    <span
        data-testid="item-qty"
        className='ms-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300  bg-gray-100 text-xs font-semibold text-gray-500'>
      {item.qty}
    </span>
  )
}

export default QtyFragment
