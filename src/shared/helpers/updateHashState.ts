const updateHashState = (state: Record<string, unknown>) => {
  window.location.hash = new URLSearchParams(
    state as unknown as ConstructorParameters<typeof URLSearchParams>[0],
  ).toString()
}

export default updateHashState
