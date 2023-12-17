import Action from '@/shared/actions/actions'
import { dispatchAction, subscribe } from '@/shared/actions/helpers'

describe('actions', () => {
  const actionName: Action = Action.DrawerClose
  const otherAction: Action = Action.TabSelected

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call event listener', () => {
    const callback = jest.fn()

    subscribe(actionName, callback)
    dispatchAction(actionName)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0].detail).toBeNull()
  })

  it('should pass payload to event listener', () => {
    const callback = jest.fn()

    subscribe(actionName, callback)
    dispatchAction(actionName, { id: 'a1' })

    expect(callback).toHaveBeenCalledTimes(1)
    // The first argument of the first call to the function was a CustomEvent
    // We expect its 'detail' property to be the payload
    expect(callback.mock.calls[0][0].detail).toEqual({ id: 'a1' })
  })

  it('should unsubscribe event listener', () => {
    const callback = jest.fn()
    const unsubscribe = subscribe(actionName, callback)

    unsubscribe()
    dispatchAction(actionName)

    expect(callback).not.toHaveBeenCalled()
  })

  it('should handle multiple subscriptions', () => {
    const firstCallback = jest.fn()
    const secondCallback = jest.fn()

    subscribe(actionName, firstCallback)
    subscribe(actionName, secondCallback)
    dispatchAction(actionName)

    expect(firstCallback).toHaveBeenCalledTimes(1)
    expect(secondCallback).toHaveBeenCalledTimes(1)
  })

  it('should differentiate between different actions', () => {
    const callbackForActionOne = jest.fn()
    const callbackForActionTwo = jest.fn()

    subscribe(actionName, callbackForActionOne)
    subscribe(otherAction, callbackForActionTwo)
    dispatchAction(actionName)

    expect(callbackForActionOne).toHaveBeenCalledTimes(1)
    expect(callbackForActionTwo).not.toHaveBeenCalled()
  })
})
