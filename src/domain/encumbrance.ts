export enum EncumbranceUnit {
  None = 0,
  Regular = 0.2, // 1 e.u.  == 1/5 of e.p.
  Oversized = 1, // 5 e.u.  == 1 e.p.
  Heavy = 2, // 10 e.u. == 2 e.p.
  Cumbersome = 3, // 15 e.u. == 3 e.p., not used atm
  OversizedX4 = 4, // 20 e.u. == 4 e.p., four oversized items, e.g. a gunpowder barrel
}

export enum Encumbrance {
  Unencumbered = 'Unencumbered',
  Lightly = 'Lightly',
  Heavily = 'Heavily',
  Severely = 'Severely',
  OverEncumbered = 'OverEncumbered',
}

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
