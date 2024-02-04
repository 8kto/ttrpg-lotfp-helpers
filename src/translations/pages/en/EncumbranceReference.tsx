import React from 'react'

const EncumbranceReference = () => {
  return (
    <>
      <section>
        <header>
          <h2>Encumbrance quick reference</h2>
        </header>
        <h3>What counts towards encumbrance</h3>
        <ul>
          <li>
            <strong>Armor</strong>: Chain and plate armors add encumbrance
            points but are not included in the regular equipment count.
          </li>
          <li>
            <strong>Items</strong>: Carrying 6 or more different items adds
            encumbrance points, with additional points for every 5 items
            beyond the initial 6. <strong>Weapons</strong> included.
          </li>
          <li>
            <strong>Oversized Items</strong>: Great and two-handed weapons, or
            any item requiring two hands or as tall as the character, count as
            oversized items and each adds encumbrance points.
          </li>
          <li>
            <strong>Coins</strong>: 100 any coins count as 1 regular item.
          </li>
          <li>
            Small items of the same type (e.g., arrows, spikes) count as one
            item.
          </li>
        </ul>

        <h3>What does not count</h3>
        <ul>
          <li>Worn items like cloaks, jewelry, and backpacks.</li>
          <li>Very small items, at the Referee&apos;s discretion.</li>
        </ul>

        <h3>How to count</h3>
        <ul>
          <li>
            <strong>Chain or Plate Armor</strong>: +1 or +2 points
            respectively.
          </li>
          <li>
            <strong>Carrying Items</strong>: +1 point for every 5 items beyond
            the first 5. Dwarves can carry an additional 5 items (10 in total)
            before encumbrance penalties apply.
          </li>
          <li>
            <strong>Oversized Items</strong>: +1 point per oversized item.
          </li>
        </ul>

        <details className='mb-4'>
          <summary>Show encumbrance and movement tables</summary>
          <div className='mb-4 overflow-x-auto'>
            <table>
              <thead>
              <tr>
                <th>Points</th>
                <th>Encumbrance</th>
                <th>Exploration</th>
                <th>Combat</th>
                <th>Run</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>0–1</td>
                <td>Unencumbered</td>
                <td>120&apos;</td>
                <td>40&apos;</td>
                <td>120&apos;</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Lightly Encumbered</td>
                <td>90&apos;</td>
                <td>30&apos;</td>
                <td>90&apos;</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Heavily Encumbered</td>
                <td>60&apos;</td>
                <td>20&apos;</td>
                <td>60&apos;</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Severely Encumbered</td>
                <td>30&apos;</td>
                <td>10&apos;</td>
                <td>30&apos;</td>
              </tr>
              <tr>
                <td>5+</td>
                <td>Over Encumbered</td>
                <td>0&apos;</td>
                <td>0&apos;</td>
                <td>0&apos;</td>
              </tr>
              </tbody>
            </table>
          </div>

          <p>The terrain type alters the rate:</p>
          <div className='mb-4 overflow-x-auto'>
            <table>
              <thead>
              <tr>
                <th>Terrain</th>
                <th>Adjustment</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Jungle, Mountains, Swamp</td>
                <td>×⅓</td>
              </tr>
              <tr>
                <td>Desert, Forest, Hills</td>
                <td>×½</td>
              </tr>
              <tr>
                <td>Clear, Plains, Trail</td>
                <td>×⅔</td>
              </tr>
              <tr>
                <td>Road</td>
                <td>×1</td>
              </tr>
              </tbody>
            </table>
          </div>

          <p>Bad weather also affects travel:</p>
          <div className='mb-4 overflow-x-auto'>
            <table>
              <thead>
              <tr>
                <th>Conditions</th>
                <th>Adjustment</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>High Winds or Precipitation</td>
                <td>×½</td>
              </tr>
              <tr>
                <td>Storm Conditions</td>
                <td>×⅓</td>
              </tr>
              </tbody>
            </table>
          </div>
        </details>

        <h3>Effects</h3>
        <ul>
          <li>
            <strong>Specialist</strong> must be unencumbered to use any class
            abilities involving movement without penalty, or suffer a one
            point skill penalty for level of encumbrance.
          </li>
          <li>
            <strong>Magic-Users</strong> cannot cast spells if they are more
            than Lightly encumbered. <strong>Elves</strong> cannot cast spells
            if they are more than Heavily encumbered.
          </li>
        </ul>
      </section>
      <section>
        <header>
          <h2>In app</h2>
        </header>
        <p>Encumbrance Units and Points:</p>
        <ul>
          <li>
            <strong>Encumbrance Points</strong>: These are used to determine
            the encumbrance level of a character. Taken from the core book.
          </li>
          <li>
            <strong>Encumbrance Units</strong>: Smaller divisions of
            encumbrance points, with 1 encumbrance unit being 1/5 of a point.
            All elements in the system have a weight expressed in e.u.
          </li>
        </ul>

        <p>Special Rules:</p>
        <ul>
          <li>
            <strong>Coins Encumbrance</strong>: 100 coins count as 1 regular
            item or 1 e.u. This option can be disabled in the Wallet settings.
          </li>
        </ul>
      </section>
    </>
  )
}

export default EncumbranceReference