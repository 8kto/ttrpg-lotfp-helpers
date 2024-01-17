import { EncumbranceThreshold } from '@/domain/encumbrance'
import {
  armorItemMock1,
  armorItemMock2,
  meleeWeaponItemMock1,
  meleeWeaponItemMock2,
  miscEquipItem1,
  miscEquipItem2,
  missileWeaponItemMock1,
  missileWeaponItemMock2,
} from '@/shared/mocks/inventoryMocks'
import type { InventoryStateType } from '@/state/InventoryState'

export const stateMock: InventoryStateType = Object.freeze({
  armor: [armorItemMock1, armorItemMock2],
  encumbranceThreshold: EncumbranceThreshold.Regular,
  isCoinWeightActive: true,
  isCostRural: false,
  isWalletManaged: false,
  meleeWeapons: [meleeWeaponItemMock1, meleeWeaponItemMock2],
  miscEquipment: [miscEquipItem1, miscEquipItem2],
  missileWeapons: [missileWeaponItemMock1, missileWeaponItemMock2],
  wallet: {
    Copper: 10,
    Gold: 25,
    Silver: 31,
  },
} as InventoryStateType)
