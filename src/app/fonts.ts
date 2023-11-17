import { Inter, Lora, Philosopher } from 'next/font/google'

// TODO remove?
export const regularSansSerifFont = Inter({
  subsets: ['latin'],
  variable: '--font-regular',
})

export const regularFont = Lora({
  subsets: ['latin'],
  variable: '--font-regular',
})

export const cursiveFont = Philosopher({
  subsets: ['latin'],
  variable: '--font-cursive',
  weight: '400',
})
