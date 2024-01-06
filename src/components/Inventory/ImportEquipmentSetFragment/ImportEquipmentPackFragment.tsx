import { XMarkIcon } from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import React, { useMemo, useState } from 'react'
import * as Yup from 'yup'

import { EquipmentPackEntriesList } from '@/components/Inventory/ImportEquipmentSetFragment/EquipmentPackEntriesList'
import { ResetFormOnDrawerClose } from '@/components/Inventory/ResetFormOnDrawerClose'
import type { EquipmentPackName } from '@/config/EquipmentPacks'
import { EquipmentPacks } from '@/config/EquipmentPacks'
import type { EquipmentPack } from '@/domain/equipment'
import { getEquipmentPackItems } from '@/shared/helpers/equipmentPack'
import { getGetterNames } from '@/shared/helpers/getGetterNames'
import { getRandom } from '@/shared/helpers/getRandom'
import { importEquipmentItems } from '@/state/InventoryState'

type ImportEquipmentPackProps = {
  pack: EquipmentPackName
}

const formInitialValues: ImportEquipmentPackProps = {
  pack: 'Basic',
}

/**
 * A fragment component for importing equipment packs.
 * The component also integrates with a drawer
 * mechanism, resetting the form state when the drawer is closed without unmounting it, ensuring that the form state is
 * fresh and relevant each time the drawer is reopened.
 */
const ImportEquipmentPackFragment = ({ onClose }: { onClose: () => void }) => {
  const { _: trans } = useLingui()
  const [selectedPack, setSelectedPack] = useState<EquipmentPack>(
    EquipmentPacks.Basic,
  )
  const packNames = useMemo(() => getGetterNames(EquipmentPacks), [])

  /**
   * Func has to receive formikHelpers as an argument to be able to cleanup the form,
   * since it is defined outside the Formik context.
   */
  const handleImport = (
    formValues: ImportEquipmentPackProps,
    formikHelpers: FormikHelpers<ImportEquipmentPackProps>,
  ) => {
    const items = getEquipmentPackItems(EquipmentPacks[formValues.pack])
    importEquipmentItems(items)

    void formikHelpers.resetForm()
    handleClose()
  }

  /**
   * Func has to receive formikHelpers as an argument to be able to cleanup the form,
   * since it is defined outside the Formik context.
   */
  const handleRandomImport = (
    formikHelpers: FormikProps<ImportEquipmentPackProps>,
  ) => {
    const keys = Object.keys(EquipmentPacks)
    const randomIndex = getRandom(0, keys.length - 1)
    void formikHelpers.setFieldValue('pack', keys[randomIndex])
    void formikHelpers.submitForm()

    void formikHelpers.resetForm()
    handleClose()
  }

  /**
   * The only common logic that can be extracted in a helper func.
   * @see ResetFormOnDrawerClose
   */
  const handleClose = () => {
    setSelectedPack(EquipmentPacks.Basic)
    onClose()
  }

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        validationSchema={Yup.object({
          pack: Yup.string()
            .oneOf(packNames)
            .required(t`Required field`),
        })}
        onSubmit={(values, formikHelpers) => {
          handleImport(values, formikHelpers)
        }}
      >
        {(formikHelpers) => {
          return (
            <Form
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleImport(formikHelpers.values, formikHelpers)
                }
              }}
            >
              <ResetFormOnDrawerClose onDrawerClose={handleClose} />
              <h5
                id='drawer-label--add-coins'
                className='ph-color-accent mb-6 inline-flex items-center text-2xl'
              >
                <Trans>Import</Trans>
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
                  className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
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
              <div className='flex w-full justify-center space-x-4 pb-4'>
                <button
                  type='button'
                  className='ph-btn-secondary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
                  onClick={() => handleRandomImport(formikHelpers)}
                >
                  <Trans>Select random</Trans>
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default ImportEquipmentPackFragment
