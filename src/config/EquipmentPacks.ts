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

const MagicUser = (): EquipmentPack => {
  return {
    items: [
      [t`Leather`, 1],
      [t`Book, Spell (Blank)`, 1],
      [t`Ink`, 1],
      [t`Dagger`, 2],
      [t`Staff`, 1],
    ],
    name: t`Magic user`,
  }
}

const Cleric1 = (): EquipmentPack => {
  return {
    items: [
      [t`Leather`, 1],
      [t`Shield`, 1],
      [t`Holy Symbol, Steel`, 1],
      [t`Mace`, 1],
      [t`Holy Water`, 1],
    ],
    name: t`Cleric 1`,
  }
}

const Specialist = (): EquipmentPack => {
  return {
    items: [
      [t`Leather`, 1],
      [t`Specialist’s Tools`, 1],
      [t`Short sword`, 1],
      [t`Dagger`, 2],
      [t`Rope, 50'`, 1],
    ],
    name: t`Specialist`,
  }
}

const Cleric2 = (): EquipmentPack => {
  return {
    items: [
      [t`Leather`, 1],
      [t`Holy Symbol, Steel`, 1],
      [t`Maul`, 1],
      [t`Holy Water`, 1],
      [t`Sling`, 1],
      [t`Sling bullets (10)`, 1],
    ],
    name: t`Cleric 2`,
  }
}

/* eslint-disable sort-keys-fix/sort-keys-fix */
/**
 * Provides dynamically translated equipment packs for different character classes.
 * Utilizes getters for each pack to enable real-time translation when the locale changes.
 */
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
  get MagicUser() {
    return MagicUser()
  },
  get Cleric1() {
    return Cleric1()
  },
  get Cleric2() {
    return Cleric2()
  },
  get Specialist() {
    return Specialist()
  },
}
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type EquipmentPackName = keyof typeof EquipmentPacks
