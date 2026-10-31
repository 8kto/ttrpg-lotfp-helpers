- use schema+validation for imports
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
- Storage contract: define schema versioning and supported migrations, and test
  old exports. Imports are validated, but state restored from localStorage is not.
- Repeated equipment-pack import: add the incoming quantity to an existing stack,
  rather than incrementing it by one; cover packs containing quantities above one.
- Test discovery/coverage: include `src/shared/helpers/__tests__/movement.ts` in
  Jest discovery and review `collectCoverageFrom` so TSX/UI coverage is not omitted.
- Managed wallet: apply affordability checks consistently to pack/custom-item
  purchase paths. An active wallet should not allow spending more than available.
  Define acquisition versus restoration semantics and campaign restrictions for
  imports/custom items before implementing them.
- Mixed-price stacks: decide how to value identical items bought at different
  prices, which currently keep the first unit cost. See the open question in
  [domain](docs/domain.md).
- Restore deployment scripts and document the Vercel integration, preview URLs,
  and production promotion. Owner confirms every GitHub push of a commit deploys
  to a temporary Vercel URL; the original scripts are lost.
- Align existing English catalog text with [terminology](docs/terminology.md):
  it still uses `save versus Breath Weapon` and `saving throw versus ...`.
- Multiple inventories.
- Mounts.

## Minor review findings

- Wallet float noise: mixed-coin subtraction can leave values such as
  `3.000000000000057` copper, visible in the Set coins form. Keep the wallet in
  integer copper arithmetic while subtracting.
  Source: [CurrencyConverter](src/shared/services/CurrencyConverter.ts).
- Same-name stacks: removing a row decrements the first stack with that name,
  not the clicked one, so a custom item can reduce another stack with a
  different weight or cost. Source: [removeItem](src/state/helpers.ts).
- Validate URL-hash UI state. An unknown `weather` or `terrain` value crashes the
  page into the error boundary; a non-numeric or out-of-range tab ID shows no tab
  content. Source: [getStateFromSearchString](src/shared/helpers/getStateFromSearchString.ts).
- File import: `FileReader` errors are not handled, and selecting the same file
  again does not fire `change`.
  Sources: [ExportInventoryFragment](src/components/Inventory/ExportInventoryFragment/ExportInventoryFragment.tsx),
  [getStateFromJson](src/shared/helpers/shareableUrl.ts).
- Error boundary: its text is untranslated, and recovery means clearing site data
  by hand. Offer a reset action in the app.
  Source: [ErrorBoundary](src/components/ErrorBoundary.tsx).
- Coin forms reject invalid values without showing a message.
  Sources: [AddCoinsFragment](src/components/Inventory/AddCoinsFragment/AddCoinsFragment.tsx),
  [SetCoinsFragment](src/components/Inventory/SetCoinsFragment/SetCoinsFragment.tsx).
- Reset coins has no confirmation, unlike the other destructive inventory actions.
  Source: [Wallet](src/components/Wallet/Wallet.tsx).
- Every UI-state change adds a browser history entry because the hash is assigned
  directly. Use `history.replaceState`.
  Source: [updateHashState](src/shared/helpers/updateHashState.ts).
- Pack prices ignore the firearms-campaign armor increase, so packs with armor are
  undervalued in that campaign. Source: [equipmentPack](src/shared/helpers/equipmentPack.ts).
- Rules question: 26 or more regular items show Over Encumbered, but the item table
  stops adding points at 21 items, which gives Severely.
  Source: [EncumbranceService](src/shared/services/EncumbranceService.ts).
- Middleware checks for a `default` locale that is not configured, so its redirect
  and `NEXT_LOCALE` handling never run. Remove it or configure the locale.
  Source: [middleware](middleware.ts).
- The custom-item Weight label points at the category field instead of the weight
  field. Source: [AddEquipmentItemFragment](src/components/Inventory/AddEquipmentItemFragment/AddEquipmentItemFragment.tsx).
- Remove the unused `@vercel/speed-insights` dependency.
  Source: [package.json](package.json).
- Main CI uses `actions/checkout@v2` and an unfrozen `yarn install`.
  Source: [main workflow](.github/workflows/main.yml).

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
