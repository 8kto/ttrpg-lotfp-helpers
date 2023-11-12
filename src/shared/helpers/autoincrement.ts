/**
 * Return autoincrement number, to use as unique ID
 */
export function* autoincrement() {
  let counter = 0

  while (true) {
    yield ++counter
  }
}
