import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'

import Toggle from '@/components/Toggle/Toggle'
import { EncumbranceThreshold } from '@/domain/encumbrance'
import isDevEnv from '@/shared/helpers/isDevEnv'
import EncumbranceService from '@/shared/services/EncumbranceService'
import {
  setEncumbranceThreshold,
  useInventoryState,
} from '@/state/InventoryState'

const EncumbranceFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const { _: trans } = useLingui()
  const encumbrance = EncumbranceService.getEncumbrance(encumbrancePoints)
  const {
    state: { encumbranceThreshold },
  } = useInventoryState()

  const toggleEncumbranceThreshold = () => {
    setEncumbranceThreshold(
      encumbranceThreshold.get() === EncumbranceThreshold.Regular
        ? EncumbranceThreshold.Dwarf
        : EncumbranceThreshold.Regular,
    )
  }

  // TODO plurals for feet
  // TODO modal with FAQ about encumbrance
  return (
    <div className='flex flex-col'>
      <div>
        {trans(encumbrance)}{' '}
        {isDevEnv() ? (
          <span className='text-gray-400'>
            ({encumbrancePoints.toPrecision(2)} e.u. /{' '}
            {EncumbranceService.getReadableEncumbrance(encumbrancePoints)} e.p.)
          </span>
        ) : (
          <span className='text-gray-400'>
            ({EncumbranceService.getReadableEncumbrance(encumbrancePoints)}{' '}
            e.p.)
          </span>
        )}
      </div>
      <Toggle
        checked={encumbranceThreshold.get() === EncumbranceThreshold.Dwarf}
        onChange={toggleEncumbranceThreshold}
        title={t`Include the extended encumbrance ability.`}
      >
        <Trans>Dwarf encumbrance</Trans>
      </Toggle>
    </div>
  )
}

export default EncumbranceFragment
