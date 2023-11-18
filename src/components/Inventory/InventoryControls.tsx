import {
  CircleStackIcon,
  PlusCircleIcon as PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import React, { useState } from 'react'

import Drawer from '@/components/Drawer/Drawer'
import AddCoinsFragment from '@/components/Inventory/AddCoinsFragment'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const InventoryControls = () => {
  const { resetEquipment } = useInventoryState()
  const handleReset = () => resetEquipment()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  const iconBtnClassname =
    'inline-flex cursor-pointer justify-center rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900'

  return (
    <>
      <div className='flex items-center sm:justify-end'>
        <div className='flex space-x-1 pl-2'>
          <button
            onClick={handleReset}
            title={t('Add item')}
            className={iconBtnClassname}
          >
            <PlusIcon className='h-5 w-5' />
          </button>
        </div>
        <div className='flex space-x-1 pl-2'>
          <button
            className={iconBtnClassname}
            type='button'
            onClick={handleOpenDrawer}
            title={t('Add coins')}
          >
            <CircleStackIcon className='h-5 w-5' />
          </button>
        </div>
        <div className='flex space-x-1 pl-2'>
          <button
            onClick={handleReset}
            title={t('Reset all equipment')}
            className={iconBtnClassname}
          >
            <TrashIcon className='h-5 w-5' />
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        ariaLabelledBy={'drawer-label'}
      >
        <AddCoinsFragment onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </>
  )
}

export default InventoryControls
