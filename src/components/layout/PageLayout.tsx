import React from 'react'

import Toast from '@/components/Toast/Toast'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='relative flex flex-grow flex-col pt-16'>
        <main className='ph-content-container mx-auto mb-4 w-full max-w-screen-md flex-grow px-2.5 sm:px-6 lg:px-8'>
          <div className='mt-6'>
            <div className='min-h-[calc(100vh-16rem)] col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
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
