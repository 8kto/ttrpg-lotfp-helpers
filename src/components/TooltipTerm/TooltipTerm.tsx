import React, { useId, useState } from 'react'

/**
 * A term with a dotted underline and a hint:
 * shown on hover with a mouse, toggled on tap on touch devices,
 * hidden when the term loses focus (e.g. a tap elsewhere).
 */
const TooltipTerm = ({
  hint,
  children,
}: {
  hint: React.ReactNode
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const tooltipId = useId()

  const handleHover = (isEntering: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      setIsOpen(isEntering)
    }
  }

  const handleTap = (e: React.PointerEvent) => {
    // Touch devices emulate hover on tap, so taps are handled separately
    if (e.pointerType !== 'mouse') {
      setIsOpen((v) => !v)
    }
  }

  return (
    <span className='relative inline-block'>
      <span
        tabIndex={0}
        aria-describedby={isOpen ? tooltipId : undefined}
        onPointerEnter={handleHover(true)}
        onPointerLeave={handleHover(false)}
        onPointerUp={handleTap}
        onBlur={() => setIsOpen(false)}
        className='cursor-help underline decoration-gray-400 decoration-dotted underline-offset-4'
      >
        {children}
      </span>
      {isOpen && (
        <span
          id={tooltipId}
          role='tooltip'
          className='absolute left-0 top-full z-20 mt-1 w-56 rounded bg-gray-800 p-2 text-xs font-normal normal-case text-white shadow-lg'
        >
          {hint}
        </span>
      )}
    </span>
  )
}

export default TooltipTerm
