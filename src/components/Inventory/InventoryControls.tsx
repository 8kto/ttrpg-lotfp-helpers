import {
  CircleStackIcon,
  PlusCircleIcon as PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import React, { useState } from 'react'

import Drawer from '@/components/Drawer/Drawer'
import AddCoinsFragment from '@/components/Inventory/AddCoinsFragment/AddCoinsFragment'
import AddEquipmentItemFragment from '@/components/Inventory/AddEquipmentItemFragment/AddEquipmentItemFragment'
import { useInventoryState } from '@/state/InventoryState'

const InventoryControls = () => {
  const { resetEquipment } = useInventoryState()
  const handleReset = () => resetEquipment()

  const [isCoinDrawerOpen, setIsCoinDrawerOpen] = useState(false)
  const [isEquipmentDrawerOpen, setIsEquipmentDrawerOpen] = useState(false)

  const iconBtnClassname =
    'inline-flex flex-col cursor-pointer justify-center items-center rounded p-2 lg:p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900'
  const iconClassname = 'h-7 w-7 mb-1 lg:h-5 lg:w-5 md:mb-0.5'

  return (
    <>
      <div className='flex items-center md:justify-end'>
        <div className='flex space-x-1 pl-2'>
          <button
            onClick={() => {
              setIsEquipmentDrawerOpen(true)
            }}
            title={t`Add item`}
            className={iconBtnClassname}
          >
            <PlusIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Item</Trans>
            </span>
          </button>
        </div>
        <div className='flex space-x-1 pl-2'>
          <button
            className={iconBtnClassname}
            type='button'
            onClick={() => {
              setIsCoinDrawerOpen(true)
            }}
            title={t`Add coins`}
          >
            <CircleStackIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Coins</Trans>
            </span>
          </button>
        </div>
        <div className='flex space-x-1 pl-2'>
          <button
            onClick={handleReset}
            title={t`Reset all equipment`}
            className={iconBtnClassname}
          >
            <TrashIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Reset</Trans>
            </span>
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isCoinDrawerOpen}
        onClose={() => setIsCoinDrawerOpen(false)}
        ariaLabelledBy={'drawer-label'}
      >
        <AddCoinsFragment onClose={() => setIsCoinDrawerOpen(false)} />
      </Drawer>
      <Drawer
        isOpen={isEquipmentDrawerOpen}
        onClose={() => setIsEquipmentDrawerOpen(false)}
        ariaLabelledBy={'drawer-label'}
      >
        <AddEquipmentItemFragment
          onClose={() => setIsEquipmentDrawerOpen(false)}
        />
      </Drawer>
    </>
  )
}

export default InventoryControls
