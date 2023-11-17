import type { EquipmentItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'

// TODO fix weight
export const MiscEquipment: ReadonlyArray<EquipmentItem> = [
  {
    cityCost: 1,
    name: 'Air Bladder',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 2,
    name: 'Bedroll',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 2,
    name: 'Block and Tackle',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
  },
  {
    cityCost: 5,
    name: 'Book, Blank',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 10,
    name: 'Book, Reading',
    points: EncumbrancePoint.Regular,
    ruralCost: 20,
  },
  {
    cityCost: 100,
    name: 'Book, Spell (Blank)',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 5,
    name: 'Caltrop',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 1,
    name: 'Candle',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 1,
    name: 'Chain, per foot',
    points: EncumbrancePoint.Regular,
    ruralCost: 2,
  },
  {
    cityCost: 1,
    name: 'Chalk',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 20,
    name: 'Clothing, Extravagant',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 5,
    name: 'Clothing, Normal',
    points: EncumbrancePoint.Regular,
    ruralCost: 2,
  },
  {
    cityCost: 1,
    name: 'Clothing, Poor',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 10,
    name: 'Clothing, Winter Travel',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 1,
    name: 'Cooking Pots',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 5,
    name: 'Crampons',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 2,
    name: 'Crowbar',
    points: EncumbrancePoint.Regular,
    ruralCost: 2,
  },
  {
    cityCost: 5,
    name: 'Drill',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 1,
    name: 'Fishing Gear',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 0.5,
    name: 'Flask of Lamp Oil',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 0.3,
    name: 'Garlic',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
  { cityCost: 5, name: 'Gem', points: EncumbrancePoint.Regular, ruralCost: 5 },
  {
    cityCost: 5,
    name: 'Grappling Hook',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 25,
    name: 'Holy Symbol, Silver',
    points: EncumbrancePoint.Regular,
    ruralCost: 50,
  },
  {
    cityCost: 10,
    name: 'Holy Symbol, Steel',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 1,
    name: 'Holy Symbol, Wood',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
  {
    cityCost: 25,
    name: 'Holy Water',
    points: EncumbrancePoint.Regular,
    ruralCost: 25,
  },
  {
    cityCost: 100,
    name: 'Hourglass',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 0.1,
    name: 'Ink',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 1,
    name: 'Instrument',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 10,
    name: 'Jewelry',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 10,
    name: "Ladder, 10'",
    points: EncumbrancePoint.Regular,
    ruralCost: 7,
  },
  {
    cityCost: 3,
    name: 'Lantern',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 0.1,
    name: 'Lard',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
  {
    cityCost: 7,
    name: 'Lock',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 0.3,
    name: 'Mallet',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.3,
  },
  {
    cityCost: 10,
    name: 'Manacles',
    points: EncumbrancePoint.Regular,
    ruralCost: 15,
  },
  {
    cityCost: 10,
    name: 'Map, Kingdom',
    points: EncumbrancePoint.Regular,
    ruralCost: 25,
  },
  {
    cityCost: 1,
    name: 'Map, Local',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 10,
    name: 'Mirror, Glass',
    points: EncumbrancePoint.Regular,
    ruralCost: 15,
  },
  {
    cityCost: 30,
    name: 'Mirror, Silver',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 1,
    name: 'Mirror, Steel',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 0.1,
    name: 'Nails',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.2,
  },
  {
    cityCost: 0.2,
    name: 'Paper',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.2,
  },
  {
    cityCost: 6,
    name: 'Pick, Miner’s',
    points: EncumbrancePoint.Regular,
    ruralCost: 12,
  },
  {
    cityCost: 1,
    name: 'Pipe',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 1,
    name: "Pole, 10'",
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 25,
    name: 'Riding Gear',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 3,
    name: "Rope, 50'",
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
  },
  {
    cityCost: 1,
    name: 'Scroll Case',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
  },
  {
    cityCost: 3,
    name: 'Shovel',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
  },
  {
    cityCost: 0.1,
    name: 'Soap',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
  {
    cityCost: 50,
    name: 'Specialist’s Tools',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 0.3,
    name: 'Spike, Iron',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 0.1,
    name: 'Spike, Wooden',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
  {
    cityCost: 250,
    name: 'Spyglass',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 25,
    name: 'Tent, Grand',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 50,
    name: 'Tent, Pavilion',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 5,
    name: 'Tent, Personal',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 10,
    name: 'Tent, Regular',
    points: EncumbrancePoint.Regular,
    ruralCost: 20,
  },
  {
    cityCost: 1,
    name: 'Tinderbox',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 1,
    name: 'Tobacco',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.5,
  },
  {
    cityCost: 0.1,
    name: 'Torch',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
  {
    cityCost: 0.5,
    name: 'Vial or Bottle, Empty',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.7,
  },
  {
    cityCost: 1,
    name: 'Waterskin',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 1,
    name: 'Whistle',
    points: EncumbrancePoint.Regular,
    ruralCost: 1,
  },
  {
    cityCost: 1,
    name: 'Wolvesbane',
    points: EncumbrancePoint.Regular,
    ruralCost: 0.1,
  },
]