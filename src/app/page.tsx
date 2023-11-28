'use client'

import React, { useContext } from 'react'

import EquipmentList from '@/components/EquipmentList/EquipmentList'
import InventoryList from '@/components/Inventory/InventoryList'
import UiContext from '@/shared/context/uiContext'

export default function Home() {
  const {
    uiState: { isInventoryVisible },
  } = useContext(UiContext)

  return (
    <div className='relative flex min-h-screen flex-col bg-gray-50 pt-16'>
      <main className='mx-auto w-full max-w-screen-2xl flex-grow px-4 sm:px-6 lg:px-8'>
        <div className='mt-6'>
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            {/* Equipment List */}
            <div className='col-span-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-1 xl:col-span-2'>
              <EquipmentList />
            </div>

            {/* Inventory List */}
            <div className='col-span-1 hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-1 lg:block xl:col-span-1'>
              <InventoryList />
            </div>
          </div>
        </div>
      </main>

      {/* Inventory Floating Container */}
      {isInventoryVisible && (
        <div className='fixed bottom-0 right-0 top-16 w-full border border-gray-200 bg-white p-4 shadow-lg lg:hidden'>
          <InventoryList />
        </div>
      )}
    </div>
  )
}
