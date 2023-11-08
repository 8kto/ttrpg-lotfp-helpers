import {Dice, EncumbrancePoint, WeaponEntry} from "@/shared/types"

export const Weapons: WeaponEntry[] = [
  {
    id: 1,
    name: 'Cestus',
    cityCost: 10,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: {
      multiplier: 1,
      dice: Dice.d3,
    },
  },
  {
    id: 2,
    name: 'Garrote',
    cityCost: 5,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: {
      multiplier: 1,
      dice: Dice.d6,
    },
  },
  {
    id: 3,
    name: 'Lance',
    cityCost: 30,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: {
      multiplier: 1,
      dice: Dice.d10,
    },
  },
  {
    id: 4,
    name: 'Mancatcher',
    cityCost: 20,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: null,
  },
  {
    id: 5,
    name: 'Polearm',
    cityCost: 30,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: {
      multiplier: 1,
      dice: Dice.d8,
    },
  },
  {
    id: 6,
    name: 'Rapier',
    cityCost: 15,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: {
      multiplier: 1,
      dice: Dice.d8,
    },
  },
  {
    id: 7,
    name: 'Spear',
    cityCost: 5, 
    ruralCost: 3, 
    points: EncumbrancePoint.Regular, 
    isRecorded: true, 
    damage: {
      multiplier: 1,
      dice: Dice.d6,
    },
  },
  {
    id: 8,
    name: 'Staff', 
    cityCost: 5, 
    ruralCost: 3, 
    points: EncumbrancePoint.Regular, 
    isRecorded: true, 
    damage: {
      multiplier: 1,
      dice: Dice.d4,
    },
  },
  {
    id: 9,
    name: 'Weapon, Great',
    cityCost: 50,
    ruralCost: null,
    points: EncumbrancePoint.Regular,
    isRecorded: true,
    damage: {
      multiplier: 1,
      dice: Dice.d10,
    },
  },
  {
    id: 10,
    name: 'Medium',
    cityCost: 20,
    ruralCost: 50, 
    points: EncumbrancePoint.Regular, 
    isRecorded: true, 
    damage: {
      multiplier: 1,
      dice: Dice.d8,
    },
  },
  {
    id: 11,
    name: 'Minor',
    cityCost: 5,
    ruralCost: 5, 
    points: EncumbrancePoint.Regular, 
    isRecorded: true, 
    damage: {
      multiplier: 1,
      dice: Dice.d4,
    },
  },
  {
    id: 12,
    name: 'Small',
    cityCost: 10,
    ruralCost: 10, 
    points: EncumbrancePoint.Regular, 
    isRecorded: true, 
    damage: {
      multiplier: 1,
      dice: Dice.d6,
    },
  },
  {
    id: 13,
    name: 'Whip',
    cityCost: 10,
    ruralCost: 25, 
    points: EncumbrancePoint.Regular, 
    isRecorded: true, 
    damage: {
      multiplier: 1,
      dice: Dice.d3,
    },
  },
]

// FIXME points