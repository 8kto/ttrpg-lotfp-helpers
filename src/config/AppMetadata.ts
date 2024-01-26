/* istanbul ignore file */
// NB! Stop ignoring if the file contains logic
import { t } from '@lingui/macro'
import type { Metadata } from 'next'

// TODO translate
export const AppMetadata: Metadata = {
  description: 'Lamentations of the Flame Princess helpers',
  title: 'Princess Helpers',
}

export const getNavLinks = () => [
  { href: '/disclaimer', title: t`Disclaimer` },
  { href: '/about', title: t`About` },
]
