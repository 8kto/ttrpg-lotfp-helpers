'use client'

import EquipmentTable from '@/components/EquipmentList/EquipmentTable'
import Tray from '@/components/Tray/Tray'

export default function Home() {
  return (
    <div className='flex overflow-hidden bg-gray-50 pt-16'>
      <main className='mx-auto w-full max-w-screen-2xl overflow-y-auto'>
        <div className='px-4 pt-6 2xl:px-0'>
          <div className='grid gap-4 xl:grid-cols-3'>
            <div className='col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <EquipmentTable />
            </div>
            <div className='col-span-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <Tray />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
