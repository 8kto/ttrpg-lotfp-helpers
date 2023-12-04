/**
 * Return autoincrement number, to use as unique ID
 */
export function* autoincrement(): Generator<number> {
  let counter = 0

  while (true) {
    yield ++counter
  }
}

export const getAutoIncrementedId = (() => {
  const generator = autoincrement()

  return () => {
    return generator.next().value
  }
})()
