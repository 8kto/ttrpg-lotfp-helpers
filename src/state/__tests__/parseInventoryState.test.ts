import { stateMock } from '@/shared/mocks/stateMock'
import { parseInventoryState } from '@/state/parseInventoryState'

const item = stateMock.armor[0]

describe('parseInventoryState', () => {
  it('accepts a complete state', () => {
    expect(parseInventoryState(stateMock)).toEqual(stateMock)
  })

  it('accepts a state of an older version with missing keys', () => {
    expect(parseInventoryState({ armor: [item] })).toEqual({ armor: [item] })
  })

  it('accepts a custom item without specialized fields', () => {
    expect(
      parseInventoryState({
        missileWeapons: [{ ...item, categoryKey: 'missileWeapons' }],
      }),
    ).not.toBeNull()
  })

  it.each([
    ['null', null],
    ['a number', 5],
    ['a string', 'state'],
    ['an array', []],
    ['a null category', { armor: null }],
    ['a non-array category', { armor: {} }],
    ['a non-object item', { armor: [1] }],
    ['an item in a wrong category', { meleeWeapons: [item] }],
    ['an item without a name', { armor: [{ ...item, name: 5 }] }],
    ['an item without an ID', { armor: [{ ...item, inventoryId: null }] }],
    ['a zero quantity', { armor: [{ ...item, qty: 0 }] }],
    ['a text quantity', { armor: [{ ...item, qty: 'lots' }] }],
    ['a negative locked cost', { armor: [{ ...item, lockedCostCp: -1 }] }],
    ['a text weight', { armor: [{ ...item, points: 'heavy' }] }],
    ['a text city cost', { armor: [{ ...item, cityCostCp: 'a' }] }],
    ['a text rural cost', { armor: [{ ...item, ruralCostCp: 'a' }] }],
    ['non-text details', { armor: [{ ...item, details: {} }] }],
    ['an object armor class', { armor: [{ ...item, armorClass: {} }] }],
    ['an object save bonus', { armor: [{ ...item, physicalSaveBonus: {} }] }],
    ['a broken range', { armor: [{ ...item, range: { short: {} } }] }],
    ['a text wallet', { wallet: 'x' }],
    ['an incomplete wallet', { wallet: { Gold: 1 } }],
    ['a negative coin count', { wallet: { Copper: 0, Gold: -1, Silver: 0 } }],
    ['a text coin count', { wallet: { Copper: 0, Gold: 'a', Silver: 0 } }],
    ['a non-boolean setting', { isCostRural: 'yes' }],
    ['an unknown threshold', { encumbranceThreshold: 7 }],
  ])('rejects %s', (_, state) => {
    expect(parseInventoryState(state)).toBeNull()
  })
})
