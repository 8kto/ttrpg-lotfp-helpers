import type Action from '@/shared/actions/actions'

export const dispatchAction = <T = unknown>(
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
