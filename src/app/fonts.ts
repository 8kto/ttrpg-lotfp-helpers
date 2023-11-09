import { Inter, Philosopher } from 'next/font/google'

export const regularFont = Inter({
  subsets: ['latin'],
  variable: '--font-regular',
})

export const cursiveFont = Philosopher({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cursive',
})
