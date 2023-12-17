export const getRandom = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('Minimum value should not be greater than maximum value.')
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}
