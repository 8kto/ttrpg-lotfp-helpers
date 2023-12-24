import { useLingui } from '@lingui/react'
import React from 'react'

import isDevEnv from '@/shared/helpers/isDevEnv'
import EncumbranceService from '@/shared/services/EncumbranceService'

const EncumbranceFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const { _: trans } = useLingui()
  const encumbrance = EncumbranceService.getEncumbrance(encumbrancePoints)

  // TODO plurals for feet
  // TODO modal with FAQ about encumbrance
  return (
    <>
      {trans(encumbrance)}{' '}
      {isDevEnv() ? (
        <span className='text-gray-400'>
          ({encumbrancePoints.toPrecision(2)} e.u. /{' '}
          {EncumbranceService.getReadableEncumbrance(encumbrancePoints)} e.p.)
        </span>
      ) : (
        <>
          <span className='text-gray-400'>
            ({EncumbranceService.getReadableEncumbrance(encumbrancePoints)}{' '}
            e.p.)
          </span>
        </>
      )}
    </>
  )
}

export default EncumbranceFragment
