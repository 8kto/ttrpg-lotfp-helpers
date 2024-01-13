import classnames from 'classnames'
import React from 'react'

const Toast = ({ show, message }: { show: boolean; message: string }) => {
  return (
    <div
      className={classnames(
        `text-sm fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white py-2.5 px-5 rounded transition-all duration-200 ease-out`,
        {
          'opacity-100 visible': show,
          'translate-y-full opacity-0 invisible': !show,
        },
      )}
    >
      {message}
    </div>
  )
}

export default Toast
