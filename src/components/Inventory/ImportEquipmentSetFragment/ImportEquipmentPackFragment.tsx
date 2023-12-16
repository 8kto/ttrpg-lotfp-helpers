import { XMarkIcon } from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { EquipmentPackEntriesList } from '@/components/Inventory/ImportEquipmentSetFragment/EquipmentPackEntriesList'
import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPackNames, EquipmentPacks } from '@/config/EquipmentPacks'
import type { EquipmentPack } from '@/domain/equipment'
import { getEquipmentPackItems } from '@/shared/helpers/equipmentPack'
import { importEquipmentItems } from '@/state/InventoryState'

type ImportEquipmentPackProps = {
  pack: EquipmentPackName
}

const ImportEquipmentPackFragment = ({ onClose }: { onClose: () => void }) => {
  const { _: trans } = useLingui()
  const [selectedPack, setSelectedPack] = useState<EquipmentPack>(
    EquipmentPacks.Base,
  )

  const handleImport = (formValues: ImportEquipmentPackProps) => {
    const items = getEquipmentPackItems(EquipmentPacks[formValues.pack], trans)
    importEquipmentItems(items)
    onClose()
  }

  return (
    <>
      <Formik
        initialValues={
          {
            pack: 'Base',
          } as ImportEquipmentPackProps
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
        {(formikHelpers) => (
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
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const packName = event.target.value as EquipmentPackName
                  void formikHelpers.setFieldValue('pack', packName)
                  setSelectedPack(EquipmentPacks[packName])
                }}
              >
                {Object.entries(EquipmentPacks).map(([key, pack]) => {
                  return (
                    <option key={key} value={key}>
                      {trans(pack.name)}
                    </option>
                  )
                })}
              </Field>
            </div>

            <div className='overf mb-10'>
              <EquipmentPackEntriesList pack={selectedPack} />
            </div>

            <div className='flex w-full justify-center space-x-4 pb-4'>
              <button
                type='submit'
                className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
                tabIndex={0}
                autoFocus
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
