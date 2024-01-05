import updateHashState from '@/shared/helpers/updateHashState'

describe('updateHashState', () => {
  const originalHash = window.location.hash

  beforeEach(() => {
    let hash: string

    Object.defineProperty(globalThis, 'window', {
      value: {
        location: {
          set hash(val: string) {
            hash = val ? `#${val}` : ''
          },
          get hash() {
            return hash
          },
        },
      },
      writable: true,
    })
  })

  afterEach(() => {
    window.location.hash = originalHash
  })

  it('updates window location hash with given state', () => {
    const testState = { param1: 'value1', param2: 'value2' }
    updateHashState(testState)

    expect(window.location.hash).toBe(`#param1=value1&param2=value2`)
  })

  it('handles empty state', () => {
    updateHashState({})
    expect(window.location.hash).toBe('')
  })

  it('encodes special characters in state', () => {
    const testState = { 'special char': 'value&value' }
    updateHashState(testState)

    expect(window.location.hash).toBe(`#special+char=value%26value`)
  })
})
