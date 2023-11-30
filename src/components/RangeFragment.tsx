import { Trans } from '@lingui/macro'
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
      <span>
        {range.short}/{range.medium}/{range.long}
      </span>
    )
  } else {
    return (
      <ul>
        <li>
          <Trans>Short</Trans>: {range.short} <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Medium</Trans>: {range.medium} <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Long</Trans>: {range.long} <Trans>ft</Trans>
        </li>
      </ul>
    )
  }
}

export default RangeFragment
