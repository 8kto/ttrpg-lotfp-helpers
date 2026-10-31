const updateHashState = (state: Record<string, unknown>) => {
  const { pathname, search } = window.location
  const hash = new URLSearchParams(
    state as unknown as ConstructorParameters<typeof URLSearchParams>[0],
  ).toString()

  // Assigning location.hash would add a history entry per UI change.
  // Next.js keeps its routing data in history.state, so it has to be preserved.
  window.history.replaceState(
    window.history.state,
    '',
    `${pathname}${search}${hash ? `#${hash}` : ''}`,
  )
}

export default updateHashState
