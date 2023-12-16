export const getGetterNames = <
  T,
  Res = Array<keyof Omit<T, 'constructor' | 'translate'>>,
>(
  obj: T,
): Res => {
  return Object.entries(
    Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj)),
  )
    .filter(([, descriptor]) => typeof descriptor.get === 'function')
    .map(([key]) => key) as Res
}
