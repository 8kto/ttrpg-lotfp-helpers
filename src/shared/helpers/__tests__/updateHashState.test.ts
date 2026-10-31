import updateHashState from '@/shared/helpers/updateHashState'

describe('updateHashState', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/inventory?a=1')
  })

  it('updates window location hash with given state', () => {
    updateHashState({ param1: 'value1', param2: 'value2' })

    expect(window.location.hash).toBe(`#param1=value1&param2=value2`)
  })

  it('handles empty state', () => {
    updateHashState({ param: 'value' })
    updateHashState({})

    expect(window.location.hash).toBe('')
    expect(window.location.search).toBe('?a=1')
  })

  it('encodes special characters in state', () => {
    updateHashState({ 'special char': 'value&value' })

    expect(window.location.hash).toBe(`#special+char=value%26value`)
  })

  it('does not add a browser history entry', () => {
    const entries = window.history.length

    updateHashState({ param: 'value' })

    expect(window.history.length).toBe(entries)
  })

  it('keeps the history state owned by the router', () => {
    window.history.replaceState({ key: 'next' }, '', '/inventory')

    updateHashState({ param: 'value' })

    expect(window.history.state).toEqual({ key: 'next' })
  })
})
