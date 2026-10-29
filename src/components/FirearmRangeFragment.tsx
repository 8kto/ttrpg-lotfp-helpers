import { t, Trans } from '@lingui/macro'
import React from 'react'

import { getFirearmRangePenalties } from '@/config/Firearms'
import type { Range } from '@/domain/weapon'

const FirearmRangeFragment = ({
  range,
  isRifled,
  compact = false,
}: {
  range: Range | null
  isRifled: boolean
  compact?: boolean
}) => {
  if (!range) {
    return '-'
  }

  const { medium, long } = getFirearmRangePenalties(isRifled)

  if (compact) {
    return (
      <>
        <span title={t`Short`}>{range.short}</span>/
        <span title={t`Medium, ${medium} AB`}>{range.medium}</span>/
        <span title={t`Long, ${long} AB`}>{range.long}</span>
      </>
    )
  } else {
    return (
      <ul>
        <li>
          <Trans>Short</Trans>: {range.short} <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Medium</Trans>: {range.medium} <Trans>ft</Trans>{' '}
          <span className='ph-color-muted text-sm'>({medium} AB)</span>
        </li>
        <li>
          <Trans>Long</Trans>: {range.long} <Trans>ft</Trans>
          <span className='ph-color-muted text-sm'> ({long} AB)</span>
        </li>
      </ul>
    )
  }
}

export default FirearmRangeFragment

// TODO Dexterity to-hit modifiers do not apply for Medium or Long range targets.
