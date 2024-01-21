import classnames from 'classnames'
import React, { useEffect, useState } from 'react'

import type { ShowToastPayload } from '@/shared/actions/actions'
import Action from '@/shared/actions/actions'
import { subscribe } from '@/shared/actions/helpers'

const Toast = ({ fadeOutIn = 600 }: { fadeOutIn?: number }) => {
  const [isVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    return subscribe(Action.ShowToast, (event) => {
      const { detail } = event as CustomEvent<ShowToastPayload>
      const { message, delayMs = fadeOutIn } = detail

      setToastVisible(true)
      setToastMessage(message)

      setTimeout(() => {
        setToastVisible(false)
        setToastMessage('')
      }, delayMs)
    })
  }, [fadeOutIn])

  return (
    <div
      role='alert'
      className={classnames(
        `fixed bottom-8 left-1/2 max-w-xs -translate-x-1/2 transform rounded bg-gray-800 text-sm text-white shadow-lg transition-all duration-200 ease-out`,
        {
          'visible opacity-100': isVisible,
          'invisible translate-y-full opacity-0': !isVisible,
        },
      )}
    >
      <div className='flex p-4'>
        <p className='mr-2'>{toastMessage}</p>

        <div className='ms-auto'>
          <button
            type='button'
            className='inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-lg text-white opacity-50 hover:text-white hover:opacity-100 focus:opacity-100 focus:outline-none'
            onClick={() => {
              setToastVisible(false)
            }}
          >
            <span className='sr-only'>Close</span>
            <svg
              className='h-4 w-4 flex-shrink-0'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast
