/**
 * Return autoincrement number, to use as unique ID
 */
export function* autoincrement(): Generator<number> {
  let counter = 0

  while (true) {
    yield ++counter
  }
}
// TODO add simple getter
