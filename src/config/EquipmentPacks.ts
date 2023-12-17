import { t } from '@lingui/macro'

import type { EquipmentPack } from '@/domain/equipment'

const Basic = (): EquipmentPack => {
  return {
    items: [
      [t`Bedroll`, 1],
      [t`Rations, Standard/Day`, 3],
      [t`Backpack`, 1],
      [t`Pouch`, 1],
      [t`Sack`, 1],
      [t`Tinderbox`, 1],
    ],
    name: t`Basic`,
  }
}

const Adventurer = (): EquipmentPack => {
  return {
    items: [
      [t`Book, Blank`, 1],
      [t`Candle`, 1],
      [t`Chalk`, 1],
      [t`Crowbar`, 1],
      [t`Flask of Lamp Oil`, 3],
      [t`Ink`, 1],
      [t`Instrument`, 1],
      [t`Lantern`, 1],
      [t`Lock`, 1],
      [t`Mallet`, 1],
      [t`Mirror, Steel`, 1],
      [t`Nails`, 20],
      [t`Pole, 10'`, 1],
      [t`Rope, 50'`, 1],
      [t`Soap`, 1],
      [t`Spike, Wooden`, 1],
      [t`Tinderbox`, 1],
      [t`Torch`, 3],
      [t`Whistle`, 1],
    ],
    name: t`Adventurer`,
  }
}

const Fighter1 = (): EquipmentPack => {
  return {
    items: [
      [t`Chain`, 1],
      [t`Shield`, 1],
      [t`Two-handed sword`, 1],
    ],
    name: t`Fighter 1`,
  }
}

const Fighter2 = (): EquipmentPack => {
  return {
    items: [
      [t`Chain`, 1],
      [t`Polearm`, 1],
    ],
    name: t`Fighter 2`,
  }
}

const Fighter3 = (): EquipmentPack => {
  return {
    items: [
      [t`Leather`, 1],
      [t`Two-handed sword`, 1],
      [t`Bow, Short`, 1],
      [t`Arrows, quiver (20)`, 1],
    ],
    name: t`Fighter 3`,
  }
}

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const EquipmentPacks = {
  get Basic() {
    return Basic()
  },
  get Adventurer() {
    return Adventurer()
  },
  get Fighter1() {
    return Fighter1()
  },
  get Fighter2() {
    return Fighter2()
  },
  get Fighter3() {
    return Fighter3()
  },
}
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type EquipmentPackName = keyof typeof EquipmentPacks

// TODO extend packs
