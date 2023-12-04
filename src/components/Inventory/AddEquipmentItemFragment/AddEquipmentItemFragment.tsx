/* eslint-disable sort-keys */
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import {
  EncumbrancePointsLabelsDict,
  EquipLabelsDict,
  getCustomEquipmentItem,
} from '@/components/Inventory/AddEquipmentItemFragment/helpers'
import type { EquipmentItemDto } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import {
  addCustomEquipmentItem,
  EquipmentStateKeys,
} from '@/state/InventoryState'

const AddEquipmentItemFragment = ({ onClose }: { onClose: () => void }) => {
  const { i18n } = useLingui()
  const handleAddItem = (formValues: EquipmentItemDto) => {
    addCustomEquipmentItem(
      formValues.category,
      getCustomEquipmentItem(formValues),
    )
  }

  return (
    <Formik
      initialValues={
        {
          points: EncumbrancePoint.Regular,
          name: '',
          cost: 0,
          isCopper: false,
          category: 'miscEquipment',
          details: '',
        } as EquipmentItemDto
      }
      validationSchema={Yup.object({
        points: Yup.number().required(),
        name: Yup.string().required(),
        cost: Yup.number(),
        isCopper: Yup.boolean(),
        category: Yup.string().oneOf(EquipmentStateKeys).required(),
        details: Yup.string(),
      })}
      onSubmit={(values, formikHelpers) => {
        handleAddItem(values as EquipmentItemDto)
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
            <Trans>Add equipment item</Trans>
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
              htmlFor='add-equip-item--name'
              className='mb-1 block font-medium text-gray-700'
            >
              <Trans>Name</Trans>
            </label>
            <div className='relative'>
              <Field
                type='text'
                name='name'
                id='add-equip-item--name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
              />
              <span className='text-sm text-red-600'>
                <ErrorMessage name='name' />
              </span>
            </div>
          </div>

          {/* Cost row */}
          <div className='mb-6 space-y-4'>
            <label
              htmlFor='add-equip-item--cost'
              className='mb-2 block font-medium text-gray-700'
            >
              <Trans>Cost</Trans>{' '}
              <em className='text-sm text-gray-400'>
                (<Trans>optional</Trans>)
              </em>
            </label>
            <Field
              type='number'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
              placeholder='0'
              name='cost'
              id='add-equip-item--cost'
            />

            {/* Checkbox */}
            <div className='flex items-center'>
              <Field
                type='checkbox'
                name='isCopper'
                id='add-equip-item--isCopper'
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
              />
              <label
                htmlFor='add-equip-item--isCopper'
                className='ms-2 cursor-pointer text-sm font-medium text-gray-900'
              >
                <Trans>Copper pieces</Trans>
              </label>
            </div>
          </div>

          {/* Weight row */}
          <div className='mb-6 space-y-4'>
            <label
              htmlFor='add-equip-item--category'
              className='mb-1 block font-medium text-gray-700'
            >
              <Trans>Weight</Trans>
            </label>
            <Field
              name='points'
              id='add-equip-item--points'
              as='select'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
            >
              {Object.entries(EncumbrancePointsLabelsDict).map(
                ([key, title]) => (
                  <option key={key} value={key}>
                    {i18n._(title)}
                  </option>
                ),
              )}
            </Field>
          </div>

          {/* Category row */}
          <div className='mb-6 space-y-2'>
            <label
              htmlFor='add-equip-item--category'
              className='mb-1 block font-medium text-gray-700'
            >
              <Trans>Category</Trans>
            </label>
            <Field
              name='category'
              id='add-equip-item--category'
              as='select'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
            >
              {Object.entries(EquipLabelsDict).map(([key, title]) => (
                <option key={key} value={key}>
                  {i18n._(title)}
                </option>
              ))}
            </Field>
          </div>

          {/* Details row */}
          <div className='mb-6 space-y-2'>
            <label
              htmlFor='add-equip-item--details'
              className='mb-1 block font-medium text-gray-700'
            >
              <Trans>Details</Trans>
            </label>
            <Field
              name='details'
              id='add-equip-item--details'
              as='textarea'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500'
            />
          </div>

          <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
            <button
              type='submit'
              className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
            >
              <Trans>Add</Trans>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddEquipmentItemFragment
