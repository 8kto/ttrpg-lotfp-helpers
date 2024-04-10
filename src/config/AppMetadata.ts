/* istanbul ignore file */
// NB! Stop ignoring if the file contains logic
import { t } from '@lingui/macro'
import type { Metadata } from 'next'

export const APP_URL = 'https://princess-helpers.vercel.app'
export const PROJECT_URL = 'https://github.com/8kto/ttrpg-lotfp-helpers'

export const AppMetadata: Metadata = {
  get description() {
    return t`Lamentations of the Flame Princess helpers, LotFP generator, LotFP equipment, LotFP inventory`
  },

  get title() {
    return t`Princess Helpers`
  },
}

export const getNavLinks = () => [
  { href: '/disclaimer', title: t`Disclaimer` },
  { href: '/about', title: t`About` },
  { href: '/encumbrance-reference', title: t`Encumbrance` },
]
