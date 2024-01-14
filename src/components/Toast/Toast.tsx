import classnames from 'classnames'
import React, { useEffect, useState } from 'react'

import Action from '@/shared/actions/actions'
import { subscribe } from '@/shared/actions/helpers'

const Toast = ({ fadeOutIn = 900 }: { fadeOutIn?: number }) => {
  const [isVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    return subscribe(Action.ShowToast, (event) => {
      const { detail } = event as CustomEvent
      const { message } = detail

      setToastVisible(true)
      setToastMessage(message)

      setTimeout(() => {
        setToastVisible(false)
      }, fadeOutIn)
    })
  }, [fadeOutIn])

  return (
    <div
      className={classnames(
        `fixed bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-black px-5 py-2.5 text-sm text-white transition-all duration-200 ease-out`,
        {
          'visible opacity-100': isVisible,
          'invisible translate-y-full opacity-0': !isVisible,
        },
      )}
    >
      {toastMessage}
    </div>
  )
}

export default Toast
