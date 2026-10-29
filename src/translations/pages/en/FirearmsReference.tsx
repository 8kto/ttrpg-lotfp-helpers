import React from 'react'

const FirearmsReference = () => {
  return (
    <>
      <section>
        <header>
          <h2>Firearms quick reference</h2>
        </header>
        <p>
          Firearms rules are optional: the Referee decides whether they are used
          in the campaign. The matchlock is the default gun; wheellocks,
          flintlocks and rifling are modifications of it.
        </p>

        <h3>Weapons</h3>
        <div className='mb-4 overflow-x-auto'>
          <table>
            <thead>
              <tr>
                <th>Firearm</th>
                <th>Damage</th>
                <th>Range</th>
                <th>Mêlée</th>
                <th>Two-handed</th>
                <th>Encumbrance</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pistol</td>
                <td>1d8</td>
                <td>25&apos; / 50&apos; / 100&apos;</td>
                <td>1d4</td>
                <td>No</td>
                <td>1 item; a brace of two is also 1 item</td>
                <td>Never uses the matchlock</td>
              </tr>
              <tr>
                <td>Arquebus</td>
                <td>1d8</td>
                <td>50&apos; / 100&apos; / 600&apos;</td>
                <td>1d6</td>
                <td>Yes</td>
                <td>1 item</td>
                <td>Does not need a fork rest</td>
              </tr>
              <tr>
                <td>Musket</td>
                <td>1d8</td>
                <td>50&apos; / 100&apos; / 600&apos;</td>
                <td>1d6</td>
                <td>Yes</td>
                <td>Oversized</td>
                <td>Needs a fork rest, –2 to hit without it</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>General rules</h3>
        <ul>
          <li>
            <strong>Reload</strong>: 10 rounds (8 for Fighters) + the
            character&apos;s Encumbrance value – Dexterity modifier. Rounds
            spent moving or defending (using the regular Armor Class when
            attacked) do not count. Simpler option: one shot per combat.
          </li>
          <li>
            <strong>Range penalties</strong> are doubled: –4 at Medium, –8 at
            Long. Dexterity to-hit modifiers do not apply at Medium or Long
            range.
          </li>
          <li>
            <strong>Misfire</strong>: the powder flashes, but the bullet does
            not fire; clearing it takes 3 rounds. Wet cord or powder can&apos;t
            be used until it dries. Tip: the target&apos;s player rolls the
            misfire die along with the attack roll.
          </li>
          <li>
            <strong>Armor piercing</strong>: ignores 5 points of armor at Short
            range (at all ranges for muskets). Only external protection counts
            as armor; Dexterity bonuses to AC are not affected.
          </li>
          <li>
            <strong>Morale</strong>: a shot forces an immediate Morale check for
            all enemies with Morale 7 or less.
          </li>
        </ul>

        <h3>Firing mechanisms and rifling</h3>
        <div className='mb-4 overflow-x-auto'>
          <table>
            <thead>
              <tr>
                <th>Modification</th>
                <th>Cost</th>
                <th>Reload</th>
                <th>Range penalties</th>
                <th>Special</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Matchlock</td>
                <td>×1</td>
                <td>Base</td>
                <td>–4 / –8</td>
                <td>
                  Lit match burns 10 cm per turn from each end; its light and
                  smell make stealth impossible
                </td>
              </tr>
              <tr>
                <td>Wheellock</td>
                <td>×7</td>
                <td>Base</td>
                <td>–4 / –8</td>
                <td>1 in 4 to break the mechanism if used as a club</td>
              </tr>
              <tr>
                <td>Flintlock</td>
                <td>×2; ×1.5 after 1630; ×1 after 1660</td>
                <td>×½ (Fighters round down, others round up)</td>
                <td>–4 / –8</td>
                <td>–</td>
              </tr>
              <tr>
                <td>Rifled barrel</td>
                <td>×2</td>
                <td>×1.5</td>
                <td>–2 / –4</td>
                <td>Combines with any mechanism</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Misfire by conditions</h3>
        <p>
          Damp conditions (most dungeons) double the chance, wet conditions
          (rain) quadruple it; the wheellock is not affected.
        </p>
        <div className='mb-4 overflow-x-auto'>
          <table>
            <thead>
              <tr>
                <th>Mechanism</th>
                <th>Dry</th>
                <th>Damp</th>
                <th>Rain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Matchlock</td>
                <td>2 in 10</td>
                <td>4 in 10</td>
                <td>8 in 10</td>
              </tr>
              <tr>
                <td>Wheellock</td>
                <td>2 in 10</td>
                <td>2 in 10</td>
                <td>2 in 10</td>
              </tr>
              <tr>
                <td>Flintlock</td>
                <td>1 in 10</td>
                <td>2 in 10</td>
                <td>4 in 10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Armor</h3>
        <p>
          Campaigns using firearms raise the cost of all basic armor and shields
          by 50%.
        </p>
      </section>
      <section>
        <header>
          <h2>In app</h2>
        </header>
        <p>Artillery is intentionally not included in the app.</p>
        <ul>
          <li>
            Turn on the Firearms campaign switch in the equipment list to add
            firearms, gear and armor to the inventory; the basic armor and
            shields then cost 50% more. With the switch off, the Firearms tab
            stays available for reference.
          </li>
          <li>
            Choose the firing mechanism, year and rifling on the Firearms tab of
            the equipment list; the cost coefficient is applied to the listed
            prices.
          </li>
          <li>Pistols are hidden when the matchlock is selected.</li>
          <li>
            The same gun with a different mechanism, rifling or cost is a
            separate inventory entry.
          </li>
        </ul>
      </section>
      <section>
        <header>
          <h2>Calculation examples</h2>
        </header>
        <ul>
          <li>
            <strong>Cost</strong>: multipliers are cumulative. A rifled
            wheellock musket costs 40 sp × 7 × 2 = 560 sp (example from the
            rulebook). A flintlock pistol in 1640: 25 sp × 1.5 = 37.5 sp.
          </li>
          <li>
            <strong>Reload</strong>: a Fighter with 2 Encumbrance points and Dex
            +1 reloads a matchlock in 8 + 2 – 1 = 9 rounds, a flintlock in 9 ÷ 2
            = 4.5 → 4 rounds (Fighters round down). A Specialist with 1 point
            and Dex 0: matchlock 10 + 1 = 11 rounds, flintlock 5.5 → 6 rounds.
          </li>
        </ul>
        <p>
          Apply all cost multipliers without intermediate rounding. Round the
          final price to the nearest whole copper piece, with half a copper
          piece rounded up; there are no smaller coin denominations.
        </p>
        <p>
          For rifling, this app uses ordinary rounding after the ×1.5 reload
          modifier: round to the nearest whole round, with halves rounded up.
          This is an app convention; the firearms rules do not specify rounding
          for rifling. The explicit flintlock rule still applies when halving
          reload time: Fighters round down, everyone else rounds up. The Referee
          decides the order of reload modifiers.
        </p>
      </section>
    </>
  )
}

export default FirearmsReference
