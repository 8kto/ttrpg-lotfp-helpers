import Equipment from '@/config/Equipment'
import { getGetterNames } from '@/shared/helpers/getGetterNames'

describe('getGetterNames', () => {
  it('returns names of getter methods', () => {
    const obj = {
      get bar() {
        return 'bar'
      },
      baz() {
        return 'baz'
      },
      get foo() {
        return 'foo'
      },
    }
    expect(getGetterNames(obj)).toEqual(['bar', 'foo'])
  })

  it('returns names of inherited getter methods', () => {
    class Base {
      get baseProp() {
        return 'base'
      }
    }
    class Derived extends Base {
      get derivedProp() {
        return 'derived'
      }
    }
    const derivedInstance = new Derived()
    expect(getGetterNames(derivedInstance)).toEqual(['derivedProp', 'baseProp'])
  })

  it('returns an empty array when there are no getters', () => {
    const obj = { a: 1, b: 2 }
    expect(getGetterNames(obj)).toEqual([])
  })

  describe('integration', () => {
    it('should return expected list of translated Equipment categories', () => {
      expect(getGetterNames(Equipment)).toEqual([
        'Armor',
        'MeleeWeapons',
        'MiscEquipment',
        'MissileWeapons',
      ])
    })
  })
})
