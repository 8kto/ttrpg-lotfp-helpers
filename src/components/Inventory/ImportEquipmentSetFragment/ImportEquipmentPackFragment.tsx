import { XMarkIcon } from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import type { ImportEquipmentPackProps } from '@/components/Inventory/ImportEquipmentSetFragment/helpers'
import { EquipmentPackLabelsDict } from '@/components/Inventory/ImportEquipmentSetFragment/helpers'
import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPackNames, EquipmentPacks } from '@/config/EquipmentPacks'
import type { EquipmentPack } from '@/domain'

const EquipmentPackEntriesList = ({ pack }: { pack: EquipmentPack }) => {
  const { i18n } = useLingui()
  const detailsRowClassname =
    'px-0 py-1 grid grid-cols-3 sm:gap-2 align-baseline'
  const paragraphClassname = 'mb-2 text-red-900 font-semibold'

  return (
    <>
      <div className='mb-4'>
        <p className={paragraphClassname}>
          <Trans>Weight</Trans>:
        </p>
        <p className={paragraphClassname}>
          <Trans>Cost</Trans>:
        </p>
      </div>
      <dl className='divide-y divide-gray-100'>
        {pack.items.map(([name, qty]) => {
          return (
            <div key={name.id} className={detailsRowClassname}>
              <dt className={`ph-font-cursive col-span-2 text-lg`}>
                {i18n._(name)}
              </dt>
              <dd className='col-span-1 mt-1 flex items-center leading-6 text-gray-700 sm:mt-0'>
                {qty}
              </dd>
            </div>
          )
        })}
      </dl>
    </>
  )
}

const ImportEquipmentPackFragment = ({ onClose }: { onClose: () => void }) => {
  const { _: trans } = useLingui()
  const [selectedPack, setSelectedPack] = useState<EquipmentPack>(
    EquipmentPacks.Base,
  )

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedPack(EquipmentPacks[event.target.value as EquipmentPackName])
  }

  const handleImport = (formValues: ImportEquipmentPackProps) => {
    console.log(formValues.pack)
    onClose()
  }

  return (
    <>
      <Formik
        initialValues={
          {
            pack: 'Base',
          } as { pack: EquipmentPackName }
        }
        validationSchema={Yup.object({
          pack: Yup.string()
            .oneOf(EquipmentPackNames)
            .required(t`Required field`),
        })}
        onSubmit={(values, formikHelpers) => {
          handleImport(values as { pack: EquipmentPackName })
          formikHelpers.resetForm()
        }}
      >
        {() => (
          <Form>
            <h5
              id='drawer-label--add-coins'
              className='ph-color-accent mb-6 inline-flex items-center text-2xl'
            >
              <Trans>Import</Trans>
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

            {/* Category row */}
            <div className='mb-6 space-y-2'>
              <label
                htmlFor='add-equip-item--pack'
                className='mb-1 block font-medium text-gray-700'
              >
                <Trans>Equipment pack</Trans>
              </label>
              <Field
                name='pack'
                id='add-equip-item--pack'
                as='select'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                onChange={handleChange}
              >
                {Object.entries(EquipmentPackLabelsDict).map(([key, title]) => (
                  <option key={key} value={key}>
                    {trans(title)}
                  </option>
                ))}
              </Field>
            </div>

            <div className='overf mb-10'>
              <EquipmentPackEntriesList pack={selectedPack} />
            </div>

            <div className='flex w-full justify-center space-x-4 pb-4'>
              <button
                type='submit'
                className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
              >
                <Trans>Import</Trans>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ImportEquipmentPackFragment
