/* eslint-disable sort-keys */
import { XMarkIcon } from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { addCopperPieces } from '@/state/InventoryState'

const AddCoinsFragment = ({ onClose }: { onClose: () => void }) => {
  const handleAddCoins = ({
    isCopper,
    coins,
  }: {
    isCopper: boolean
    coins: number | string
  }) => {
    if (coins) {
      const amount = isCopper ? +coins : +coins * 10
      addCopperPieces(amount)
      onClose()
    }
  }

  return (
    <Formik
      initialValues={{
        coins: '',
        isCopper: false,
      }}
      validationSchema={Yup.object({
        coins: Yup.number()
          .positive()
          // .max(9, t('Must be 9 characters max.')) // WTF
          .required(t`Required field`),
        isCopper: Yup.boolean(),
      })}
      onSubmit={(values, formikHelpers) => {
        handleAddCoins(values)
        formikHelpers.resetForm()
      }}
    >
      {({ handleSubmit }) => (
        <Form
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
        >
          <h5
            id='drawer-label--add-coins'
            className='ph-color-accent mb-6 inline-flex items-center text-2xl'
          >
            <Trans>Add coins</Trans>
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
            <label
              htmlFor='coins--add-coins'
              className='mb-2 block font-medium text-gray-700'
            >
              <Trans>Use copper pieces instead of float numbers.</Trans>
            </label>
            <Field
              type='number'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
              placeholder='0'
              name='coins'
              id='coins--add-coins'
            />

            {/* Checkbox */}
            <div className='flex items-center'>
              <Field
                type='checkbox'
                name='isCopper'
                id='isCopper--add-coins'
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
              />
              <label
                htmlFor='isCopper--add-coins'
                className='ms-2 cursor-pointer text-sm font-medium text-gray-900'
              >
                <Trans>Copper pieces</Trans>
              </label>
            </div>
            <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
              <button
                type='submit'
                className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
              >
                <Trans>Add</Trans>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddCoinsFragment
