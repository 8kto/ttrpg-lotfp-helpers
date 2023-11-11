import React from 'react'

import InventoryDetails from '@/components/EncumbranceFragment/InventoryDetails'
import ArmorInventory from '@/components/Inventory/ArmorInventory'
import InventoryControls from '@/components/Inventory/InventoryControls'
import WeaponsInventory from '@/components/Inventory/WeaponsInventory'

const Inventory = () => {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <h1 className='mb-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl'>
          Inventory
        </h1>
        <InventoryControls />
      </div>
      <InventoryDetails />

      <h2 className='my-4'>Armor</h2>
      <ArmorInventory />

      <h2 className='my-8 mb-4'>Weapons</h2>
      <WeaponsInventory />
    </>
  )
}

export default Inventory
