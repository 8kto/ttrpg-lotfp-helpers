- Моб версия: Лейбл Цена переносится, нужно в одну строку с радио
- Лейбл с передвижением на всех языках на мид скринах слипается со второй колонкой
- Next.js 16: replace `next-pwa` (webpack-only, no releases since 2022) and the
  `next lint` script (removed in 16). `@hookstate/core` peers only React up to 18,
  which matters if the upgrade also moves to React 19. `@lingui/swc-plugin` must
  match the SWC version of the Next release.
- Move `@lingui/macro` imports to `@lingui/core/macro` and `@lingui/react/macro`,
  including the ESLint import restrictions, then drop its `import/ignore` entry.
- export
  - CSV
  - char sheet
- Чешский перевод
- Названия предметов сохраняются в инвентарь уже переведёнными, и стеки сравниваются
  по этому названию. Нужен стабильный ID предмета каталога. Это общая проблема
  приложения, не только огнестрела
- Расход припасов
  - стрелы
  - пули
  - порох
  - факела...
- Storage contract: define schema versioning and supported migrations, and test
  old exports. Imports are validated by a hand-written check, which could become
  a schema; state restored from localStorage is not validated.
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
- Align existing English catalog text in
  [en.po](src/translations/locales/en.po) with [terminology](docs/terminology.md):
  it still uses `save versus Breath Weapon` and `saving throw versus ...`.
- Pages without a loaded catalog show message hashes instead of text: 500,
  `_offline`, and the `/` page before its redirect. Load the catalog as
  [the 404 page](src/pages/404.tsx) does.
- Multiple inventories.
- Mounts.

## Minor review findings

- Pack prices ignore the firearms-campaign armor increase, so packs with armor are
  undervalued in that campaign. Source: [equipmentPack](src/shared/helpers/equipmentPack.ts).
- Rules question: 26 or more regular items show Over Encumbered, but the item table
  (p. 38) stops adding points at 21 items, which gives Severely. The 26+ threshold
  exists only in the table for animals. Checked in the Markdown conversion only.
  Source: [EncumbranceService](src/shared/services/EncumbranceService.ts).
- Rules question: the rules count multiple small items of the same type (spikes,
  arrows) as one item, while the application counts quantity. Decide whether
  this is intended. Source: [EncumbranceService](src/shared/services/EncumbranceService.ts).

## TODO/FIXME из исходников и тестов

- Переименовать `cityCostCp` и `ruralCostCp` в поля вида `cost*Cp`, чтобы
  группировать свойства стоимости при сортировке полей.
  Источник: [EquipmentItem](src/domain/equipment.ts).
- Расширить список древкового оружия (polearms).
  Источник: [MeleeWeaponItems](src/config/MeleeWeaponItems.ts).
- Рассмотреть замену строкового union-типа `EquipmentCategoryKey` на enum;
  необходимость изменения пока не решена.
  Источник: [InventoryState](src/state/InventoryState.ts).
- Обработать ошибки восстановления состояния из localStorage до рендера. Сбой при
  рендере уже ловит [ErrorBoundary](src/components/ErrorBoundary.tsx) и предлагает
  сброс данных, но `try/catch` в `initState` не перехватывает асинхронное
  восстановление. Связано с контрактом import/storage выше.
  Источник: [InventoryState](src/state/InventoryState.ts).
- Поддержать пользовательские предметы с заданным весом в наборах снаряжения.
  Источник: [getEquipmentPackItems](src/shared/helpers/equipmentPack.ts).
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
