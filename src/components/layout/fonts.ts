/* istanbul ignore file */
import { Bitter as Regular, Philosopher as Cursive } from 'next/font/google'

export const regularFont = Regular({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-regular',
})

export const cursiveFont = Cursive({
  subsets: ['latin'],
  variable: '--font-cursive',
  weight: '400',
})
// FIXME fonts dont seem to be used when deployed
