// Custom matcher for number or null
expect.extend({
  toBeNullOrTypeOf(received, argument) {
    if (received === null || typeof received === argument) {
      return {
        message: () => `expected ${received} to be null or of type ${argument}`,
        pass: true,
      }
    }

    return {
      message: () => `expected ${received} to be null or of type ${argument}`,
      pass: false,
    }
  },
})

expect.extend({
  toBeEnumValue(received, enumObj) {
    const values = Object.values(enumObj)
    const pass = values.includes(received)
    if (pass) {
      return {
        message: () => `expected ${received} not to be one of the enum values`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be one of the enum values ${values.join(
            ', ',
          )}`,
        pass: false,
      }
    }
  },
})
