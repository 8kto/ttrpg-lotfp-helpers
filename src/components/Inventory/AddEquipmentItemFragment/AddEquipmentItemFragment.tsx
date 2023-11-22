/* eslint-disable sort-keys */
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { t } from '@/locale/helpers'
import type { EquipmentCategoryKey } from '@/state/InventoryState'
import { EquipmentStateKeys } from '@/state/InventoryState'

const equipDict: Record<EquipmentCategoryKey, string> = {
  miscEquipment: t('Miscellaneous'),
  armor: t('Armor'),
  missileWeapons: t('Missile weapons'),
  meleeWeapons: t('Mêlée weapons'),
}

const AddEquipmentItemFragment = ({ onClose }: { onClose: () => void }) => {
  const handleAddItem = (values: {
    name: string
    cost: number
    isCopper: boolean
    category: string /*EquipmentCategoryKey*/
    // TODO weight
  }) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={{
        name: '',
        cost: 0,
        isCopper: false,
        category: 'miscEquipment',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        cost: Yup.number(),
        isCopper: Yup.boolean(),
        category: Yup.string().oneOf(EquipmentStateKeys).required(),
      })}
      onSubmit={(values, formikHelpers) => {
        handleAddItem(values)
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
            {t('Add equipment item')}{' '}
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

          {/* Name row */}
          <div className='mb-6 space-y-2'>
            <label
              htmlFor='item-name'
              className='mb-1 block font-medium text-gray-700'
            >
              {t('Name')}
            </label>
            <div className='relative'>
              <Field
                type='text'
                name='name'
                id='name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
              />
            </div>
          </div>

          {/* Cost row */}
          <div className='mb-6 space-y-4'>
            <label
              htmlFor='cost'
              className='mb-2 block font-medium text-gray-700'
            >
              {t('Cost')}{' '}
              <em className='text-sm text-gray-400'>({t('optional')})</em>
            </label>
            <Field
              type='number'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
              placeholder='0'
              name='cost'
              id='cost'
            />

            {/* Checkbox */}
            <div className='flex items-center'>
              <Field
                type='checkbox'
                name='isCopper'
                id='isCopper'
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
              />
              <label
                htmlFor='isCopper'
                className='ms-2 cursor-pointer text-sm font-medium text-gray-900'
              >
                {t('Copper pieces')}
              </label>
            </div>
          </div>

          {/* Category row */}
          <div className='mb-6 space-y-2'>
            <label
              htmlFor='category'
              className='mb-1 block font-medium text-gray-700'
            >
              {t('Category')}
            </label>
            <Field
              name='category'
              id='category'
              as='select'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
            >
              {EquipmentStateKeys.map((i) => (
                <option key={i} value={i}>
                  {equipDict[i]}
                </option>
              ))}
            </Field>
          </div>

          <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
            <button
              type='submit'
              className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
            >
              {t('Add')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddEquipmentItemFragment
