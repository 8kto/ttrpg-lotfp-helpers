import { XMarkIcon } from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { ResetFormOnDrawerClose } from '@/components/Inventory/ResetFormOnDrawerClose'
import CurrencyConverter from '@/shared/services/CurrencyConverter'
import { setWallet, useInventoryState } from '@/state/InventoryState'

type FormSubmitValues = {
  gold: number | string
  silver: number | string
  copper: number | string
}

const SetCoinsFragment = ({ onClose }: { onClose: () => void }) => {
  const { state } = useInventoryState()
  const wallet = state.wallet.get()

  const handleAddCoins = ({ gold, silver, copper }: FormSubmitValues) => {
    setWallet({
      Gold: Number(gold),
      Silver: Number(silver),
      Copper: Number(copper),
    })
    onClose()
  }

  const handleOptimiseClick = ({ gold, silver, copper }: FormSubmitValues) => {
    const optimised = CurrencyConverter.getNormalized({
      Gold: Number(gold),
      Silver: Number(silver),
      Copper: Number(copper),
    })
    setWallet(optimised)
  }

  /**
   * The only common logic that can be extracted in a helper func.
   * @see ResetFormOnDrawerClose
   */
  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          gold: wallet.Gold,
          silver: wallet.Silver,
          copper: wallet.Copper,
        }}
        validationSchema={Yup.object({
          gold: Yup.number().min(0),
          silver: Yup.number().min(0),
          copper: Yup.number().min(0),
        })}
        onSubmit={(values) => {
          handleAddCoins(values)
          handleClose()
        }}
      >
        {({ handleSubmit, resetForm, setFieldValue, values }) => {
          return (
            <Form
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSubmit()
                }
              }}
            >
              <ResetFormOnDrawerClose
                onDrawerClose={() => {
                  resetForm()
                  void setFieldValue('gold', wallet.Gold)
                  void setFieldValue('silver', wallet.Silver)
                  void setFieldValue('copper', wallet.Copper)
                }}
              />
              <h5 className='ph-color-accent mb-6 inline-flex items-center text-2xl'>
                <Trans>Set coins</Trans>
              </h5>
              <button
                onClick={handleClose}
                type='button'
                data-drawer-dismiss='drawer-create-product-default'
                aria-controls='drawer-create-product-default'
                className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <XMarkIcon className='h-5 w-5' />
              </button>
              <div className='space-y-4'>
                {/* Gold */}
                <label
                  htmlFor='coins--set-gold'
                  className='mb-2 block font-medium text-gray-700'
                >
                  <Trans>Gold pieces</Trans>
                </label>
                <Field
                  type='number'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
                  placeholder='0'
                  name='gold'
                  min={0}
                  id='coins--set-gold'
                />

                {/* Silver */}
                <label
                  htmlFor='coins--set-silver'
                  className='mb-2 block font-medium text-gray-700'
                >
                  <Trans>Silver pieces</Trans>
                </label>
                <Field
                  type='number'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
                  placeholder='0'
                  name='silver'
                  min={0}
                  id='coins--set-silver'
                />

                {/* Copper */}
                <label
                  htmlFor='coins--set-copper'
                  className='mb-2 block font-medium text-gray-700'
                >
                  <Trans>Copper pieces</Trans>
                </label>
                <Field
                  type='number'
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
                  placeholder='0'
                  name='copper'
                  min={0}
                  id='coins--set-copper'
                />

                <div className='flex w-full justify-center space-x-4 pt-4'>
                  <button
                    type='submit'
                    className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
                  >
                    <Trans>Set</Trans>
                  </button>
                </div>
              </div>
              <label className='my-4 block text-center font-medium text-red-800'>
                ~ <Trans>OR</Trans> ~
              </label>
              <div className='my-4 flex w-full justify-center space-x-4 pb-4'>
                <button
                  type='button'
                  className='ph-btn-secondary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
                  tabIndex={0}
                  onClick={() => {
                    handleOptimiseClick(values)
                  }}
                >
                  <Trans>Exchange coins *</Trans>
                </button>
              </div>
              <p>
                <Trans>
                  * Exchange and sort coins, e.g., turn{' '}
                  <span className='text-red-800'>{1250}&nbsp;cp</span> into{' '}
                  <span className='text-red-800'>
                    {2}&nbsp;gp&nbsp;25&nbsp;sp
                  </span>
                  .
                </Trans>
              </p>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default SetCoinsFragment
