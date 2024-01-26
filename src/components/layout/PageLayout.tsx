import React from 'react'

import Toast from '@/components/Toast/Toast'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex flex-grow pt-[5.5rem]'>
        <main className='ph-content-container mx-auto w-full max-w-screen-md px-2.5 sm:px-6 lg:px-8'>
          <div className='rounded border border-gray-200 bg-white p-6 shadow-sm sm:p-8'>
            {children}
          </div>
        </main>
      </div>
      <Toast />
    </>
  )
}

export default PageLayout
