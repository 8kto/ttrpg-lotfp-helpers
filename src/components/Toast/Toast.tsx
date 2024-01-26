import classnames from 'classnames'
import React, { useEffect, useState } from 'react'

import type { ShowToastPayload } from '@/shared/actions/actions'
import Action from '@/shared/actions/actions'
import { subscribe } from '@/shared/actions/helpers'

const DEFAULT_TOAST_TYPE = 'info'

// TODO check multiple messages, cancel prev?
const Toast = ({ fadeOutIn = 600 }: { fadeOutIn?: number }) => {
  const [isVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState(DEFAULT_TOAST_TYPE)

  useEffect(() => {
    return subscribe(Action.ShowToast, (event) => {
      const { detail } = event as CustomEvent<ShowToastPayload>
      const { message, delayMs = fadeOutIn, type = DEFAULT_TOAST_TYPE } = detail

      setToastVisible(true)
      setToastMessage(message)
      setToastType(type)

      setTimeout(() => {
        setToastVisible(false)

        // Type change causes styles flickering during the fade out transition
        // so this delay added
        setTimeout(() => {
          setToastMessage('')
          setToastType(DEFAULT_TOAST_TYPE)
        }, 100)
      }, delayMs)
    })
  }, [fadeOutIn])

  return (
    <div
      role='alert'
      className={classnames(
        `z-50 fixed bottom-8 left-1/2 max-w-xs -translate-x-1/2 transform rounded text-sm shadow-lg transition-all duration-100 ease-out`,
        {
          'bg-gray-800 text-white': toastType !== 'error',
          'bg-red-100 text-red-800': toastType === 'error',
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
            className={classnames(
              'inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none',
              {
                'text-white hover:text-white': toastType !== 'error',
                'text-gray-800 hover:text-black': toastType === 'error',
              },
            )}
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
