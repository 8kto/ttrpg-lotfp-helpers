import { Lora, Philosopher } from 'next/font/google'

export const regularFont = Lora({
  subsets: ['latin'],
  variable: '--font-regular',
})

export const cursiveFont = Philosopher({
  subsets: ['latin'],
  variable: '--font-cursive',
  weight: '400',
})
