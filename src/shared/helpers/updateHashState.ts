const updateHashState = (state: Record<string, unknown>) => {
  window.location.hash = JSON.stringify(state)
}

export default updateHashState
