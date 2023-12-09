import { msg } from '@lingui/macro'

import type { EquipmentPack } from '@/domain'

const Base: EquipmentPack = {
  items: [
    [msg`Bedroll`, 1],
    [msg`Rations, Standard/Day`, 3],
    [msg`Backpack`, 1],
    [msg`Pouch`, 1],
    [msg`Sack`, 1],
    [msg`Tinderbox`, 1],
  ],
  name: msg`Base items set`,
}

const AdventuringBasics: EquipmentPack = {
  items: [
    [msg`Chalk`, 1],
    [msg`Grappling Hook`, 1],
    [msg`Rope, 50'`, 1],
    [msg`Lantern`, 1],
    [msg`Flask of Lamp Oil`, 3],
    [msg`Tent, Personal`, 1],
  ],
  name: msg`Adventuring Basics`,
}
const AdventurerReadyForAnything: EquipmentPack = {
  items: [
    [msg`Vial or Bottle`, 1],
    [msg`Spike, Iron`, 10],
    [msg`Pole, 10'`, 1],
    [msg`Paper`, 10],
    [msg`Ink`, 10],
    [msg`Scroll Case`, 1],
    [msg`Mirror, Steel`, 1],
  ],
  name: msg`Ready for anything`,
}

const AdventurerSeasoned: EquipmentPack = {
  items: [
    [msg`Book, Blank`, 1],
    [msg`Caltrop`, 10],
    [msg`Candle`, 1],
    [msg`Chalk`, 1],
    [msg`Crowbar`, 1],
    [msg`Flask of Lamp Oil`, 3],
    [msg`Ink`, 1],
    [msg`Instrument`, 1],
    [msg`Lantern`, 1],
    [msg`Lock`, 1],
    [msg`Mallet`, 1],
    [msg`Mirror, Steel`, 1],
    [msg`Nails`, 20],
    [msg`Pole, 10'`, 1],
    [msg`Rope, 50'`, 1],
    [msg`Soap`, 1],
    [msg`Spike, Wooden`, 1],
    [msg`Tinderbox`, 1],
    [msg`Torch`, 3],
    [msg`Whistle`, 1],
  ],
  name: msg`Seasoned adventurer`,
}

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const EquipmentPacks = {
  Base,
  AdventuringBasics,
  AdventurerReadyForAnything,
  AdventurerSeasoned,
}
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type EquipmentPackName = keyof typeof EquipmentPacks

export const EquipmentPackNames: ReadonlyArray<EquipmentPackName> =
  Object.freeze([
    'AdventuringBasics',
    'AdventurerSeasoned',
    'Base',
    'AdventurerReadyForAnything',
  ])
