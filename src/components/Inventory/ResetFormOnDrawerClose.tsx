import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'

import Action from '@/shared/actions/actions'
import { subscribe } from '@/shared/actions/helpers'

/**
 * A component that provides a workaround to reset a Formik form when a DrawerClose event occurs,
 * without unmounting the form.
 */
export const ResetFormOnDrawerClose = ({
  onDrawerClose,
}: {
  onDrawerClose: CallableFunction
}) => {
  const formikContext = useFormikContext()

  useEffect(() => {
    return subscribe(Action.CloseDrawer, () => {
      formikContext.resetForm()
      onDrawerClose()
    })
  }, [onDrawerClose, formikContext])

  return <React.Fragment />
}
