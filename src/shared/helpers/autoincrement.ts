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

const pageLoadSeed = Date.now()

/**
 * Return ID that stays unique after a page reload: the counter above restarts
 * then, while the IDs are persisted with the inventory
 */
export const getUniqueId = (): string => {
  return `${pageLoadSeed}${getAutoIncrementedId()}`
}
