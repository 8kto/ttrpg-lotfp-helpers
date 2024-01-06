import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef, useState } from 'react'

const Tooltip = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      let target = (event as MouseEvent).target
      if (!target) {
        target = (event as TouchEvent).changedTouches[0].target
      }

      if (!tooltipContainerRef?.current?.contains(target as Node)) {
        setShowTooltip(false)
      }
    }

    // Add both mousedown and touchstart event listeners
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      // Remove both event listeners
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [])

  const handleTitleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShowTooltip((v) => !v)
  }

  return (
    <div ref={tooltipContainerRef} className='relative inline-block'>
      <div className='ph-dashed-text cursor-pointer' onClick={handleTitleClick}>
        {title}
      </div>
      {showTooltip && (
        <div
          className='absolute top-full z-10 mt-2 w-80 rounded bg-gray-100 px-4 py-3 text-black shadow-lg border border-gray-400 md:min-w-[420px]'
          onClick={() => setShowTooltip(false)}
        >
          <button
            onClick={() => setShowTooltip(false)}
            type='button'
            className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
          {children}
          <div className='absolute bottom-full left-8 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-transparent border-b-8 border-b-gray-400'></div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
