import { XCircleIcon as ResetIcon } from '@heroicons/react/24/solid'
import { t } from '@lingui/macro'
import React from 'react'

import type { EquipmentCategoryKey } from '@/state/InventoryState'
import {
  getInitialInventoryState,
  useInventoryState,
} from '@/state/InventoryState'

const CategoryInventoryControls = ({
  category,
}: {
  category: EquipmentCategoryKey
}) => {
  const { state: equipmentState } = useInventoryState()
  const handleReset = () => {
    equipmentState.nested(category).set(getInitialInventoryState()[category])
  }

  return (
    <div className='flex items-center sm:justify-end'>
      <div className='flex space-x-1'>
        <button
          type='button'
          onClick={handleReset}
          title={t`Reset`}
          className='cursor-pointer flex-col items-center justify-center rounded p-1 text-xs text-gray-300 hover:bg-gray-100 hover:text-gray-900 lg:p-1'
        >
          <ResetIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default CategoryInventoryControls
