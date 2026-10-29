export { ArmorItems } from './ArmorItems'
export { MeleeWeaponItems } from './MeleeWeaponItems'
export { MiscEquipmentItems } from './MiscEquipmentItems'
export { MissileWeaponItems } from './MissileWeaponItems'

/**
 * Not imported anywhere on purpose: the \/*i18n*\/ markers only register
 * messages translated dynamically (encumbrance levels via trans(Encumbrance),
 * weights via i18n._(EncumbranceUnit[points])) for `lingui extract`.
 * Removing it drops these translations from the catalogs.
 */
// noinspection JSUnusedGlobalSymbols
export const Labels = {
  Cumbersome: /*i18n*/ 'Cumbersome',
  Heavily: /*i18n*/ 'Heavily',
  Lightly: /*i18n*/ 'Lightly',
  OverEncumbered: /*i18n*/ 'OverEncumbered',
  OversizedX4: /*i18n*/ 'OversizedX4',
  Severely: /*i18n*/ 'Severely',
  Unencumbered: /*i18n*/ 'Unencumbered',
}
