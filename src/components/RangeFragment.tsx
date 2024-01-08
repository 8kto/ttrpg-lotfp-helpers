import { t, Trans } from '@lingui/macro'
import React from 'react'

import type { Range } from '@/domain/weapon'

const RangeFragment = ({
  range,
  compact = false,
}: {
  range: Range | null
  compact?: boolean
}) => {
  if (!range) {
    return '-'
  }

  if (compact) {
    return (
      <>
        {range.short}/<span title={t`Middle, -2 AB`}>{range.medium}</span>/
        <span title={t`Long, -4 AB`}>{range.long}</span>
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
          <span className='ph-color-muted text-sm'>(-2 AB)</span>
        </li>
        <li>
          <Trans>Long</Trans>: {range.long} <Trans>ft</Trans>
          <span className='ph-color-muted text-sm'> (-4 AB)</span>
        </li>
      </ul>
    )
  }
}

export default RangeFragment
