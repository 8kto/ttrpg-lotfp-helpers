const isPlainObject = (val: unknown): boolean =>
  !!val && typeof val === 'object' && val.constructor === Object

const getOwnGetters = <T>(obj: T) =>
  Object.entries(Object.getOwnPropertyDescriptors(obj))
    .filter(([, descriptor]) => typeof descriptor.get === 'function')
    .map(([key]) => key)

const getPrototypeGetters = <T>(obj: T) => {
  const getters = Array<PropertyKey>()
  let proto = Object.getPrototypeOf(obj)

  while (proto && proto !== Object.prototype) {
    Object.entries(Object.getOwnPropertyDescriptors(proto))
      .filter(([, descriptor]) => typeof descriptor.get === 'function')
      .forEach(([key]) => {
        if (!getters.includes(key)) {
          getters.push(key)
        }
      })
    proto = Object.getPrototypeOf(proto)
  }

  return getters
}

export const getGetterNames = <
  T,
  Res = Array<keyof Omit<T, 'constructor' | 'translate'>>,
>(
  obj: T,
): Res => {
  if (isPlainObject(obj)) {
    return getOwnGetters(obj) as Res
  }

  return getPrototypeGetters(obj) as Res
}
