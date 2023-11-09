export enum EncumbrancePoint {
  None = 0,
  Regular = 0.2,
  Oversized = 1,
  Heavy = 2,
}

export enum Encumbrance {
  Unencumbered = 'Unencumbered',
  Lightly = 'Lightly',
  Heavily = 'Heavily',
  Severely = 'Severely',
  OverEncumbered = 'OverEncumbered',
}

// NB Oversized is as tall as Character
export enum Movement {
  Exploration = 'Exploration',
  Combat = 'Combat',
  Running = 'Running',
  MilesPerDay = 'MilesPerDay',
}

export type MovementTuple = {
  [Movement.Exploration]: number
  [Movement.Combat]: number
  [Movement.Running]: number
  [Movement.MilesPerDay]: number
}

// FIXME better name + move values out of types
export const MovementMap: Record<Encumbrance, MovementTuple> = {
  [Encumbrance.Unencumbered]: {
    [Movement.Exploration]: 12,
    [Movement.Combat]: 40,
    [Movement.Running]: 120,
    [Movement.MilesPerDay]: 24,
  },
  // TODO
  [Encumbrance.Lightly]: {
    [Movement.Exploration]: 12,
    [Movement.Combat]: 40,
    [Movement.Running]: 120,
    [Movement.MilesPerDay]: 24,
  },
}
