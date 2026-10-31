import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const coinField = Yup.number().min(
  0,
  msg`The number should be equal to or greater than 0`,
)

export const coinsValidationSchema = Yup.object({
  copper: coinField,
  gold: coinField,
  silver: coinField,
})

export const CoinErrorMessage = ({ name }: { name: string }) => {
  const { _: trans } = useLingui()

  return (
    <span className='text-sm text-red-600'>
      <ErrorMessage name={name} render={(message) => trans(message)} />
    </span>
  )
}
