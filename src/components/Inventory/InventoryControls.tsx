import {
  ArrowUpCircleIcon as ExportIcon,
  BriefcaseIcon,
  CircleStackIcon,
  PlusCircleIcon as PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import React, { useState } from 'react'

import Drawer from '@/components/Drawer/Drawer'
import AddCoinsFragment from '@/components/Inventory/AddCoinsFragment/AddCoinsFragment'
import AddEquipmentItemFragment from '@/components/Inventory/AddEquipmentItemFragment/AddEquipmentItemFragment'
import ExportInventoryFragment from '@/components/Inventory/ExportInventoryFragment/ExportInventoryFragment'
import ImportEquipmentPackFragment from '@/components/Inventory/ImportEquipmentSetFragment/ImportEquipmentPackFragment'
import { useInventoryState } from '@/state/InventoryState'

const InventoryControls = () => {
  const { resetEquipment } = useInventoryState()
  const handleReset = () => {
    if (confirm(t`Reset all equipment?`)) {
      resetEquipment()
    }
  }

  const [isCoinDrawerOpen, setCoinDrawerOpen] = useState(false)
  const [isEquipmentDrawerOpen, setEquipmentDrawerOpen] = useState(false)
  const [isEquipmentPackDrawerOpen, setEquipmentPackDrawerOpen] =
    useState(false)
  const [isExportInventoryOpen, setExportInventoryOpen] = useState(false)

  const iconBtnClassname =
    'w-full h-full text-xs inline-flex flex-col cursor-pointer justify-center items-center rounded p-2 lg:p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900'
  const iconClassname = 'h-7 w-7 mb-1 lg:h-5 lg:w-5 md:mb-0.5'
  const buttonContainerClassname = 'flex flex-1 md:pl-2'

  return (
    <>
      {/* Buttons */}
      <div className='flex w-full md:w-auto items-start justify-between'>
        {/* Custom item */}
        <div className={buttonContainerClassname}>
          <button
            onClick={() => {
              setEquipmentDrawerOpen(true)
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
        {/* Coins */}
        <div className={buttonContainerClassname}>
          <button
            className={iconBtnClassname}
            type='button'
            onClick={() => {
              setCoinDrawerOpen(true)
            }}
            title={t`Add coins`}
          >
            <CircleStackIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Coins</Trans>
            </span>
          </button>
        </div>
        {/* Equip set */}
        <div className={buttonContainerClassname}>
          <button
            onClick={() => {
              setEquipmentPackDrawerOpen(true)
            }}
            title={t`Import Equipment set`}
            className={iconBtnClassname}
          >
            <BriefcaseIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Packs</Trans>
            </span>
          </button>
        </div>
        {/* Export */}
        <div className={buttonContainerClassname}>
          <button
            onClick={() => {
              setExportInventoryOpen(true)
            }}
            title={t`Export or Import Inventory`}
            className={iconBtnClassname}
          >
            <ExportIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Export & Import</Trans>
            </span>
          </button>
        </div>
        {/* Reset */}
        <div className={buttonContainerClassname}>
          <button
            onClick={handleReset}
            title={t`Reset all equipment`}
            className='w-full h-full text-xs inline-flex flex-col cursor-pointer justify-center items-center rounded p-2 lg:p-1 text-gray-400 hover:bg-gray-100 hover:text-red-400'
          >
            <TrashIcon className={iconClassname} />
            <span className='lg:hidden'>
              <Trans>Reset</Trans>
            </span>
          </button>
        </div>
      </div>

      {/* Drawers */}
      <Drawer
        isOpen={isCoinDrawerOpen}
        onClose={() => setCoinDrawerOpen(false)}
        ariaLabelledBy={'drawer-label'}
      >
        <AddCoinsFragment onClose={() => setCoinDrawerOpen(false)} />
      </Drawer>
      <Drawer
        isOpen={isEquipmentDrawerOpen}
        onClose={() => setEquipmentDrawerOpen(false)}
        ariaLabelledBy={'drawer-label'}
      >
        <AddEquipmentItemFragment
          onClose={() => setEquipmentDrawerOpen(false)}
        />
      </Drawer>
      <Drawer
        isOpen={isEquipmentPackDrawerOpen}
        onClose={() => setEquipmentPackDrawerOpen(false)}
        ariaLabelledBy={'drawer-label'}
      >
        <ImportEquipmentPackFragment
          onClose={() => setEquipmentPackDrawerOpen(false)}
        />
      </Drawer>
      <Drawer
        isOpen={isExportInventoryOpen}
        onClose={() => setExportInventoryOpen(false)}
        ariaLabelledBy={'drawer-label'}
      >
        <ExportInventoryFragment
          onClose={() => setExportInventoryOpen(false)}
        />
      </Drawer>
    </>
  )
}

export default InventoryControls
