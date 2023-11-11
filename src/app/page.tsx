'use client'

import EquipmentList from '@/components/EquipmentList/EquipmentList'
import Inventory from '@/components/Inventory/Inventory'

export default function Home() {
  return (
    <div className='flex overflow-hidden bg-gray-50 pt-16'>
      <main className='mx-auto w-full max-w-screen-2xl overflow-y-auto'>
        <div className='px-4 pt-6 2xl:px-0'>
          <div className='grid gap-4 xl:grid-cols-3'>
            <div className='col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <EquipmentList />
            </div>
            <div className='md:col-span-1 sm:col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <Inventory />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
