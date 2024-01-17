import type Action from '@/shared/actions/actions'

interface DispatchActionFunction {
  (
    actionName: Action.ShowToast,
    payload: {
      message: string
      delayMs?: number
      type?: 'error' | 'default'
    },
  ): void

  <T = unknown>(
    actionName: Exclude<Action, Action.ShowToast>,
    payload?: T,
  ): void
}

export const dispatchAction: DispatchActionFunction = <T = unknown>(
  actionName: Action,
  payload?: T,
): void => {
  const event = new CustomEvent(`ph:${actionName}`, { detail: payload })
  document.dispatchEvent(event)
}

/**
 * @param {Action} actionName
 * @param {EventListenerOrEventListenerObject} callback
 * @return {Function} A cleanup function that removes the subscription
 */
export const subscribe = (
  actionName: Action,
  callback: EventListenerOrEventListenerObject,
): (() => void) => {
  document.addEventListener(`ph:${actionName}`, callback, false)

  return () => {
    document.removeEventListener(`ph:${actionName}`, callback)
  }
}
