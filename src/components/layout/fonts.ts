/* istanbul ignore file */
// NB! Stop ignoring if the file contains logic
import { Bitter as Regular, Philosopher as Cursive } from 'next/font/google'

export const regularFont = Regular({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-regular',
})

export const cursiveFont = Cursive({
  // Philosopher lacks ě, ř, č, ů. Disable the generated fallback, it would cover
  // these glyphs with a system font instead of Bitter set in globals.css.
  adjustFontFallback: false,
  subsets: ['latin'],
  variable: '--font-cursive',
  weight: '400',
})
