export enum FiringMechanism {
  Matchlock = 'Matchlock',
  Wheellock = 'Wheellock',
  Flintlock = 'Flintlock',
}

export const CoeffYear = {
  [FiringMechanism.Flintlock]: {
    '1610-1630': 2,
    '1630-1660': 1.5,
  },
  default: 1,
} as const

export const FirearmCostCoeff = {
  [FiringMechanism.Matchlock]: 1,
  [FiringMechanism.Wheellock]: 7,
  [FiringMechanism.Flintlock]: 2,
} as const

export const RiffledCostCoeff = 2 as const
