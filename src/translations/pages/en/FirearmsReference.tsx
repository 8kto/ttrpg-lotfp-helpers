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
                <th>Cost</th>
                <th>Damage</th>
                <th>Range</th>
                <th>Mêlée</th>
                <th>Hands</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pistol</td>
                <td>25 sp / 50 sp</td>
                <td>1d8</td>
                <td>25&apos; / 50&apos; / 100&apos;</td>
                <td>1d4</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Arquebus</td>
                <td>30 sp / 50 sp</td>
                <td>1d8</td>
                <td>50&apos; / 100&apos; / 600&apos;</td>
                <td>1d6</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Musket</td>
                <td>40 sp / 80 sp</td>
                <td>1d8</td>
                <td>50&apos; / 100&apos; / 600&apos;</td>
                <td>1d6</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            <strong>Pistol</strong>: one item for encumbrance; a brace (two
            pistols) is also one item. Pistols never use the matchlock.
          </li>
          <li>
            <strong>Arquebus</strong>: a long gun that does not need a fork
            rest.
          </li>
          <li>
            <strong>Musket</strong>: needs a fork rest, –2 to hit without it.
            Oversized item.
          </li>
        </ul>

        <h3>Matchlock (base rules for all guns)</h3>
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
            <strong>Misfire</strong>: 2 in 10. The powder flashes, but the
            bullet does not fire; clearing it takes 3 rounds. Damp conditions
            (most dungeons) double the chance, wet conditions (rain) quadruple
            it. Wet cord or powder can&apos;t be used until it dries. Tip: the
            target&apos;s player rolls the misfire die along with the attack
            roll.
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
          <li>
            <strong>Lit match</strong>: burns 10 cm per turn from each end; its
            light and smell make stealth impossible.
          </li>
        </ul>

        <h3>Wheellock</h3>
        <ul>
          <li>No additional misfire chances due to damp or wet conditions.</li>
          <li>Base cost ×7.</li>
          <li>1 in 4 chance to break the mechanism if used as a club.</li>
        </ul>

        <h3>Flintlock</h3>
        <ul>
          <li>Misfire: only 1 in 10.</li>
          <li>Base cost ×2 (×1.5 after 1630, normal cost after 1660).</li>
          <li>Halve the reload time: Fighters round down, others round up.</li>
        </ul>

        <h3>Rifled barrel</h3>
        <ul>
          <li>
            Eliminates the increased range penalties: –2 at Medium, –4 at Long.
          </li>
          <li>Base cost ×2.</li>
          <li>Reload time ×1.5.</li>
        </ul>

        <h3>Calculation examples</h3>
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
          <li>
            <strong>Misfire</strong>: a matchlock in a dungeon misfires on 1–4
            on d10 (2 in 10 × 2), in the rain on 1–8. A flintlock: 1, in a
            dungeon 1–2, in the rain 1–4. A wheellock: 1–2 anywhere.
          </li>
        </ul>
        <p>
          The rules don&apos;t specify how to round the rifling ×1.5 or in what
          order to apply reload modifiers; the Referee decides.
        </p>

        <h3>Ammunition and gear</h3>
        <ul>
          <li>
            <strong>Gunpowder</strong>: 3 cp / 5 cp per shot. A powder horn (1
            sp) holds 50 shots; a barrel (150 sp) holds 2500 shots and counts as
            four oversized items.
          </li>
          <li>
            <strong>Shot bag</strong>: 100 round shots for 2 sp.
          </li>
          <li>
            <strong>12 Apostles</strong> (5 sp / 8 sp): a bandolier of 12
            pre-measured charges, each reduces the loading time by one round.
          </li>
          <li>
            <strong>Match cord</strong>: 1 sp per meter.
          </li>
          <li>
            <strong>Scattershot</strong> (1 sp): ranges halved, no armor
            piercing, 45° area for 1d6 damage, save versus Breath Weapon for
            half.
          </li>
          <li>
            <strong>Fire bomb</strong> (5 sp / 7 sp): fired instead of shot, 1d4
            damage and ignites flammables; a misfire blows it up.
          </li>
          <li>
            <strong>Fire danger</strong>: a character hit by fire saves versus
            Breath Weapon for each unused apostle (1 damage per failure), for a
            powder horn (1d3 per 10 shots left, round up), and each round for
            carried fire bombs. An exploding powder barrel deals 5d8 to all
            within 30&apos; (save for half).
          </li>
        </ul>

        <h3>Armor</h3>
        <p>
          Campaigns using firearms raise the cost of all basic armor and shields
          by 50%.
        </p>
        <div className='mb-4 overflow-x-auto'>
          <table>
            <thead>
              <tr>
                <th>Armor</th>
                <th>Cost</th>
                <th>AC</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Buff Coat</td>
                <td>15 sp / 30 sp</td>
                <td>+1</td>
                <td>One item</td>
              </tr>
              <tr>
                <td>Pikeman&apos;s Armor</td>
                <td>50 sp / 100 sp</td>
                <td>14</td>
                <td>Oversized; +1 AC with tassets</td>
              </tr>
              <tr>
                <td>Tassets</td>
                <td>25 sp / 50 sp</td>
                <td>+1</td>
                <td>Additional normal item</td>
              </tr>
              <tr>
                <td>Full Armor</td>
                <td>1500 sp</td>
                <td>18</td>
                <td>Two oversized items; no other armor from this list</td>
              </tr>
              <tr>
                <td>Helm, Lobster Tail Pot</td>
                <td>25 sp / 50 sp</td>
                <td>+1</td>
                <td>+2 to physical damage saves; one item</td>
              </tr>
              <tr>
                <td>Helm, Morion</td>
                <td>15 sp / 30 sp</td>
                <td>+1</td>
                <td>+1 to physical damage saves; one item</td>
              </tr>
              <tr>
                <td>Helm, Secrete</td>
                <td>5 sp / 10 sp</td>
                <td>–</td>
                <td>+1 to physical damage saves; non-encumbering</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <header>
          <h2>In app</h2>
        </header>
        <ul>
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
    </>
  )
}

export default FirearmsReference
