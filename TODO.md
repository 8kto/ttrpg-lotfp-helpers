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
- Multiple inventories.
- Mounts.
