export enum EncumbranceUnit {
  /*i18n*/ None = 0,
  /*i18n*/ Regular = 0.2,
  /*i18n*/ Oversized = 1,
  /*i18n*/ Heavy = 2,
  /*i18n*/ Cumbersome = 3,
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

export enum EncumbranceThreshold {
  Regular = 5,
  Dwarf = 10,
}
