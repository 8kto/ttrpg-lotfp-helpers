import type { ChangeEventHandler } from 'react'
import React from 'react'

const Toggle = ({
  checked,
  onChange,
  children,
  title,
}: {
  checked: boolean
  onChange: ChangeEventHandler
  title?: string
  children: React.ReactNode
}) => {
  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input
        type='checkbox'
        checked={checked}
        className='peer sr-only'
        onChange={onChange}
      />
      <div className="peer h-6	w-11 scale-90 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300" />
      <span className='ms-2' title={title}>
        {children}
      </span>
    </label>
  )
}

export default Toggle
