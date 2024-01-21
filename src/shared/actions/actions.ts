enum Action {
  CloseDrawer = 'CloseDrawer',
  SelectTab = 'SelectTab',
  ShowToast = 'ShowToast',
}

export type ShowToastPayload = {
  message: string
  delayMs?: number
  type?: 'error' | 'default'
}

export interface DispatchActionFunction {
  (actionName: Action.ShowToast, payload: ShowToastPayload): void

  <T = unknown>(
    actionName: Exclude<Action, Action.ShowToast>,
    payload?: T,
  ): void
}

export default Action
