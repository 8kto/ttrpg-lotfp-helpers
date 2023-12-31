import {
  CheckIcon,
  ClipboardDocumentIcon as CopyIcon,
} from '@heroicons/react/24/solid'
import React, { useRef, useState } from 'react'

const ShareableUrlControl = ({ value }: { value: string }) => {
  const textInputRef = useRef<HTMLInputElement>(null)
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    if (textInputRef.current?.value) {
      void navigator.clipboard.writeText(textInputRef.current.value)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleFocus = () => {
    textInputRef.current?.select()
    copyToClipboard()
  }

  const handleCopy = () => {
    copyToClipboard()
  }

  return (
    <div className='flex items-stretch'>
      <input
        ref={textInputRef}
        type='text'
        value={value}
        onFocus={handleFocus}
        readOnly
        className='flex-grow rounded-l-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
      />
      <button
        onClick={handleCopy}
        className='ph-btn-secondary flex items-center justify-center rounded-r-md px-4 font-bold'
      >
        {isCopied ? (
          <CheckIcon className='h-5 w-5' />
        ) : (
          <CopyIcon className='h-5 w-5' />
        )}
      </button>
    </div>
  )
}

export default ShareableUrlControl
