- version for the storage, handling the incompatibilities
- export
  - CSV
  - char sheet
- Чешский перевод
- Названия предметов сохраняются в инвентарь уже переведёнными. Это общая проблема приложения, не только огнестрела
- Расход припасов
  - стрелы
  - пули
  - порох
  - факела...
- Import/storage contract: validate parsed JSON and shared-URL data at runtime
  (categories, quantities, finite numbers, nested wallet/settings), define schema
  versioning and supported migrations, and test old/malformed exports. Current
  default filling is shallow and is not validation.
- Repeated equipment-pack import: add the incoming quantity to an existing stack,
  rather than incrementing it by one; cover packs containing quantities above one.
- Test discovery/coverage: include `src/shared/helpers/__tests__/movement.ts` in
  Jest discovery and review `collectCoverageFrom` so TSX/UI coverage is not omitted.
- Managed wallet: apply affordability checks consistently to pack/custom-item
  purchase paths. An active wallet should not allow spending more than available.
  Define acquisition versus restoration semantics and campaign restrictions for
  imports/custom items before implementing them.
- Restore deployment scripts and document the Vercel integration, preview URLs,
  and production promotion. Owner confirms every GitHub push of a commit deploys
  to a temporary Vercel URL; the original scripts are lost.
- Align existing English catalog text with [terminology](docs/terminology.md):
  it still uses `save versus Breath Weapon` and `saving throw versus ...`.
- Multiple inventories.
- Mounts.

## TODO/FIXME из исходников и тестов

- Переименовать `cityCostCp` и `ruralCostCp` в поля вида `cost*Cp`, чтобы
  группировать свойства стоимости при сортировке полей.
  Источник: [EquipmentItem](src/domain/equipment.ts).
- Расширить список древкового оружия (polearms).
  Источник: [MeleeWeaponItems](src/config/MeleeWeaponItems.ts).
- Рассмотреть замену строкового union-типа `EquipmentCategoryKey` на enum;
  необходимость изменения пока не решена.
  Источник: [InventoryState](src/state/InventoryState.ts).
- Обработать ошибки восстановления состояния из localStorage. Связано с
  контрактом import/storage выше, но требует отдельной обработки ошибок загрузки.
  Источник: [InventoryState](src/state/InventoryState.ts).
- Поддержать пользовательские предметы с заданным весом в наборах снаряжения.
  Источник: [getEquipmentPackItems](src/shared/helpers/equipmentPack.ts).
- Проверить последовательные toast-сообщения и решить, нужно ли отменять
  таймеры предыдущего сообщения при показе нового.
  Источник: [Toast](src/components/Toast/Toast.tsx).
- Проверить, можно ли удалить inline-стиль `display` у `ModalMessage`,
  дублирующий управление видимостью через CSS-классы.
  Источник: [Modal](src/components/Modal/Modal.tsx).
- Добавить модальное окно с FAQ о нагрузке (encumbrance).
  Источник: [EncumbranceFragment](src/components/EncumbranceFragment/EncumbranceFragment.tsx).
- Обеспечить сортировку по значениям веса, а не по названиям, и включить
  закомментированные проверки столбца Weight в E2E-тестах таблиц Armor, Melee,
  Missiles и Miscellaneous (четыре FIXME).
  Источник: [тесты сортировки таблиц](e2e-tests/inventory/grids.spec.ts).
- Обеспечить сортировку по дальности и включить закомментированную проверку
  столбца Range в E2E-тесте таблицы Missiles.
  Источник: [тесты сортировки таблиц](e2e-tests/inventory/grids.spec.ts).
