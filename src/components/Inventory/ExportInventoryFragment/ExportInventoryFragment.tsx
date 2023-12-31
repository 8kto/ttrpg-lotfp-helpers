import { XMarkIcon } from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import React, { useRef } from 'react'

import ShareableUrlControl from '@/components/Inventory/ExportInventoryFragment/ShareableUrlControl'
import exportInventoryData from '@/shared/helpers/exportInventoryData'
import { setState, useInventoryState } from '@/state/InventoryState'

const ExportInventoryFragment = ({ onClose }: { onClose: () => void }) => {
  const { state } = useInventoryState()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = () => {
    // Trigger the file input dialog
    fileInputRef.current?.click()
  }

  const handleExport = () => {
    try {
      exportInventoryData(state.get())
    } catch (err) {
      console.error('Cannot export state', err)
    }
    onClose()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        if (!text) {
          console.error('Cannot get file content')

          return
        }

        const json = JSON.parse(text.toString())
        setState(json)
        onClose()
      }
      reader.readAsText(file)
    }
  }

  const paragraphClassname = 'text-sm text-gray-700 my-2'

  return (
    <>
      <h5
        id='drawer-label--add-coins'
        className='ph-color-accent mb-6 inline-flex items-center text-2xl'
      >
        <Trans>Export & Import</Trans>
      </h5>
      <button
        onClick={onClose}
        type='button'
        data-drawer-dismiss='drawer-create-product-default'
        aria-controls='drawer-create-product-default'
        className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <XMarkIcon className='h-5 w-5' />
      </button>
      <div className='space-y-4'>
        <h6 className='text-xl text-gray-800'>Shareable URL</h6>
        <section>
          <ShareableUrlControl value='my-url' />
          <p className={paragraphClassname}>
            This link provides access to your current inventory. Please note
            that due to URL length restrictions in some browsers, it may not
            function properly, despite the URL itself being compressed.
          </p>
          <p className={`${paragraphClassname} mb-6`}>
            The URL, which may exceed 2000 characters, is compatible with most
            major browsers, but it is not supported by Edge, for example.
          </p>
        </section>

        <section>
          <h6 className='text-xl text-gray-800'>Files</h6>
          <p className={paragraphClassname}>
            Exported data is a plain JSON file, that can be used for restoring.
          </p>
          <div className='flex w-full justify-center'>
            <button
              type='button'
              onClick={handleExport}
              className='ph-btn-secondary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
            >
              <Trans>Export as a file</Trans>
            </button>
          </div>

          <label className='my-4 block text-center font-medium text-red-800'>
            ~ <Trans>OR</Trans> ~
          </label>

          <div className='flex w-full justify-center pb-4'>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept='application/json'
            />
            <button
              type='button'
              onClick={handleImport}
              className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
            >
              <Trans>Import</Trans>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

export default ExportInventoryFragment
