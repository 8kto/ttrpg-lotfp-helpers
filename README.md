![build](https://github.com/8kto/ttrpg-lotfp-helpers/actions/workflows/main.yml/badge.svg)

# Princess Helpers

<!-- For PROGRESS update, run yarn update-readme-stats -->

Lamentations of the Flame Princess Helpers: an online inventory and equipment tool for the LotFP TTRPG
system.

The main task this tool aims to solve is to allow playing from a
phone or desktop, quickly create inventory, and easily calculate
encumbrance and movement rate (speed).

## Demo

https://lotfp.vercel.app

## Features list

<!--FEATURES_LIST-->

- [x] Equipment list from the core book
  - [x] Armor
  - [x] Weapon, melee and missile
  - [x] Common items
  - [x] Details for each item
  - [x] Filter by city/rural cost
  - [x] Add multiple copies of same item
- [x] Extended list of equipment
  - [x] Expanded list of weapons
- [x] Calculation
  - [x] Cost
  - [x] Encumbrance
  - [x] Movement
  - [x] Terrain and weather adjustments
  - [x] Dwarf modifier
- [x] Custom equipment entries
- [x] Wallet (available money)
  - [x] Manage costs when an item is added
- [x] Add coins and calculate the encumbrance
  - [x] Track different kinds of coins
- [x] Inventory is saved in locale storage and survives the page reload
  - [x] State can be exported and imported
- [x] Languages support
- [x] Responsive layout, mobile devices support
- [x] Equipment sets
  - [x] By class
  - [x] Common
  - [x] Random

<!--/FEATURES_LIST-->

### Next big things

I value your feedback and don't want to spend time on unnecessary things.
Please reach out to me with your questions or comments through my GitHub profile,
or create an Issue/Feature request.

- [ ] PWA
- [ ] Multiple Inventories
- [ ] Mounts
- [ ] Firearms list

I would also be glad to add more languages. Please reach out to me if you're interested in volunteering.

## Development

```sh
nvm use     # Use the required Node.js version
yarn        # Install project dependencies
yarn dev    # Start the development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Disclaimer

This project is created just for fun and is not officially affiliated with or endorsed by the publishers of ["Lamentations of the Flame Princess" (LotFP)](https://www.lotfp.com/RPG/) or any other related entities.

The content utilized in this project has been sourced from publicly available materials, including but not limited to the [LotFP Rules & Magic Free Version](https://preview.drivethrurpg.com/en/product/115059/LotFP-Rules--Magic-Free-Version) and resources from [Basic Fantasy RPG](https://www.basicfantasy.org/downloads.html).
