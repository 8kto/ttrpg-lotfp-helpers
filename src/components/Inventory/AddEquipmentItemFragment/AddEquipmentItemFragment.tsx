import { XMarkIcon } from '@heroicons/react/24/solid'
import { msg, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import {
  EncumbrancePointsLabelsDict,
  EquipLabelsDict,
  getCustomEquipmentItem,
} from '@/components/Inventory/AddEquipmentItemFragment/helpers'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItemDto } from '@/domain/equipment'
import {
  addCustomEquipmentItem,
  EquipmentStateKeys,
} from '@/state/InventoryState'

const formInitialValues: EquipmentItemDto = {
  points: EncumbranceUnit.Regular,
  name: '',
  cost: 0,
  currencyType: CurrencyType.Copper,
  category: 'miscEquipment',
  details: '',
}

const validationSchema = Yup.object({
  points: Yup.number().required(msg`Required field`),
  name: Yup.string().required(msg`Required field`),
  cost: Yup.number().min(
    0,
    msg`The number should be equal to or greater than 0`,
  ),
  currencyType: Yup.string()
    .oneOf(Object.keys(CurrencyType))
    .required(msg`Required field`),
  category: Yup.string()
    .oneOf(EquipmentStateKeys)
    .required(msg`Required field`),
  details: Yup.string(),
})

const AddEquipmentItemFragment = ({ onClose }: { onClose: () => void }) => {
  const { _: trans } = useLingui()
  const handleAddItem = (data: EquipmentItemDto) => {
    addCustomEquipmentItem(getCustomEquipmentItem(data))
    onClose()
  }

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => {
        handleAddItem(values as EquipmentItemDto)
        formikHelpers.resetForm()
      }}
    >
      {() => (
        <Form>
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
                <ErrorMessage
                  name='name'
                  render={(message) => trans(message)}
                />
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
              min={0}
              id='add-equip-item--cost'
            />
            <span className='text-sm text-red-600'>
              <ErrorMessage name='cost' render={(message) => trans(message)} />
            </span>

            {/* Radios */}
            <div className='flex flex-wrap items-center'>
              <div className='mb-2 mr-4'>
                <Field
                  type='radio'
                  name='currencyType'
                  id='add-equip-item--isCopper'
                  value='Copper'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
                />
                <label
                  htmlFor='add-equip-item--isCopper'
                  className='ml-2 cursor-pointer text-sm font-medium text-gray-900'
                >
                  <Trans>Copper</Trans>
                </label>
              </div>

              <div className='mb-2 mr-4'>
                <Field
                  type='radio'
                  name='currencyType'
                  id='add-equip-item--isSilver'
                  value='Silver'
                  checked
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
                />
                <label
                  htmlFor='add-equip-item--isSilver'
                  className='ml-2 cursor-pointer text-sm font-medium text-gray-900'
                >
                  <Trans>Silver</Trans>
                </label>
              </div>

              <div className='mb-2 mr-4'>
                <Field
                  type='radio'
                  name='currencyType'
                  id='add-equip-item--isGold'
                  value='Gold'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
                />
                <label
                  htmlFor='add-equip-item--isGold'
                  className='ml-2 cursor-pointer text-sm font-medium text-gray-900'
                >
                  <Trans>Gold</Trans>
                </label>
              </div>
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
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
            >
              {EncumbrancePointsLabelsDict.map(([key, title]) => (
                <option key={key} value={key}>
                  {trans(title)}
                </option>
              ))}
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
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
            >
              {Object.entries(EquipLabelsDict).map(([key, title]) => (
                <option key={key} value={key}>
                  {trans(title)}
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
