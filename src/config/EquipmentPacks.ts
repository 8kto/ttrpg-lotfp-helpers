import { msg } from '@lingui/macro'

import type { EquipmentPack } from '@/domain'

const Base: EquipmentPack = {
  items: [
    ['Bedroll', 1],
    ['Clothing, Normal', 1],
    ['Rations, Standard/Day', 3],
    ['Backpack', 1],
    ['Pouch', 1],
    ['Sack', 1],
    ['Tinderbox', 1],
  ],
  name: msg`Base items set`,
}

const AdventuringBasics: EquipmentPack = {
  items: [
    ['Chalk', 1],
    ['Grappling Hook', 1],
    [`Rope, 50'`, 1],
    ['Lantern', 1],
    ['Flask of Lamp Oil', 3],
    ['Tent, Personal', 1],
  ],
  name: msg`Adventuring Basics`,
}
const AdventurerReadyForAnything: EquipmentPack = {
  items: [
    [`Vial or Bottle`, 1],
    [`Spike, Iron `, 10],
    [`Pole, 10'`, 1],
    [`Paper'`, 10],
    [`Ink'`, 10],
    [`Scroll Case`, 1],
    [`Mirror, Steel`, 1],
  ],
  name: msg`Ready for anything`,
}

const AdventurerSeasoned: EquipmentPack = {
  items: [
    ['Book, Blank', 1],
    ['Caltrop', 10],
    ['Candle', 1],
    ['Chalk', 1],
    ['Crowbar', 1],
    ['Flask of Lamp Oil', 3],
    ['Ink', 1],
    ['Instrument', 1],
    ['Lantern', 1],
    ['Lock', 1],
    ['Mallet', 1],
    ['Mirror, Steel', 1],
    ['Nails', 20],
    ["Pole, 10'", 1],
    ["Rope, 50'", 1],
    ['Soap', 1],
    ['Spike, Wooden', 1],
    ['Tinderbox', 1],
    ['Torch', 3],
    ['Whistle', 1],
  ],
  name: msg`Seasoned adventurer`,
}

export const EquipmentPacks: Array<EquipmentPack> = [
  Base,
  AdventuringBasics,
  AdventurerReadyForAnything,
  AdventurerSeasoned,
]
