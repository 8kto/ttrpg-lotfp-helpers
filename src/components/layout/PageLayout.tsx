import React from 'react'

import Toast from '@/components/Toast/Toast'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex flex-grow lg:items-center pt-[5.125rem] md:pt-16'>
        <main className='ph-content-container mx-auto w-full max-w-screen-md px-2.5 sm:px-6 lg:px-8'>
          <div className='rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
            {children}
          </div>
        </main>
      </div>
      <Toast />
    </>
  )
}

export default PageLayout
