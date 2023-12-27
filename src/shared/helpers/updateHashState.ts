const updateHashState = (state: Record<string, unknown>) => {
  // FIXME merge not overwrite
  window.location.hash = JSON.stringify(state)
}

export default updateHashState
