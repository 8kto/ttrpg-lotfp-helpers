import classnames from 'classnames'
import React from 'react'

const Drawer = ({
  isOpen,
  onClose,
  children,
  ariaLabelledBy,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  ariaLabelledBy?: string
}) => {
  const drawerClasses = classnames(
    'border fixed right-0 top-0 h-screen w-96 overflow-y-auto bg-white p-4',
    {
      'transform translate-x-full transition-transform dark:bg-gray-800':
        !isOpen,
      'transition-transform dark:bg-gray-800 z-40': isOpen,
    },
  )

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-600"
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
