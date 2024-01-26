import React from 'react'

import Toast from '@/components/Toast/Toast'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex flex-col pt-16 lg:justify-center lg:min-h-[calc(100vh-5rem)] min-h-[calc(100vh-6rem)]'>
        <main className='ph-content-container mx-auto mb-4 w-full max-w-screen-md px-2.5 sm:px-6 lg:px-8'>
          <div className='mt-6'>
            <div className='min-h-[calc(100vh-16rem)] lg:min-h-0 col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              {children}
            </div>
          </div>
        </main>
      </div>

      <Toast />
    </>
  )
}

export default PageLayout
