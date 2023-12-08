import classnames from 'classnames'
import React from 'react'

const Drawer = ({
  isOpen,
  onClose,
  children,
  ariaLabelledBy,
  fromLeft = false,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  ariaLabelledBy?: string
  fromLeft?: boolean
}) => {
  const drawerClasses = classnames(
    'w-full lg:w-96 border fixed top-0 h-screen overflow-y-auto bg-white p-4 transition-transform',
    {
      'left-0 transform -translate-x-full': !isOpen && fromLeft,
      'left-0 z-50': isOpen && fromLeft,
      'right-0 transform translate-x-full': !isOpen && !fromLeft,
      'right-0 z-50': isOpen && !fromLeft,
    },
  )

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300'
          onClick={onClose}
          style={{ opacity: isOpen ? 1 : 0 }}
        ></div>
      )}
      <div className={drawerClasses} aria-labelledby={ariaLabelledBy}>
        <button
          type='button'
          onClick={onClose}
          className='absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
        >
          <span className='sr-only'>Close menu</span>
        </button>
        {children}
      </div>
    </>
  )
}

export default Drawer
