export enum EncumbranceUnit {
  None = 0,
  Regular = 0.2,
  Oversized = 1,
  Heavy = 2,
  Cumbersome = 3,
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

export type MovementDict = {
  [Movement.Exploration]: number
  [Movement.Combat]: number
  [Movement.Running]: number
  [Movement.MilesPerDay]: number
}

export enum EncumbranceThreshold {
  Regular = 5,
  Dwarf = 10,
}
