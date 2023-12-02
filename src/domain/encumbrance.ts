export enum EncumbrancePoint {
  None = 0,
  Regular = 0.2,
  Oversized = 1,
  Heavy = 2,
}

export enum Encumbrance {
  Unencumbered = /*i18n*/ 'Unencumbered',
  Lightly = /*i18n*/ 'Lightly',
  Heavily = /*i18n*/ 'Heavily',
  Severely = /*i18n*/ 'Severely',
  OverEncumbered = /*i18n*/ 'OverEncumbered',
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
