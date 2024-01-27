'use client'

import { t } from '@lingui/macro'
import type { GetStaticProps } from 'next'
import React from 'react'

import HeadMetadata from '@/components/layout/HeadMetadata'
import PageLayout from '@/components/layout/PageLayout'
import { loadCatalog } from '@/translations/utils'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!)

  return {
    props: {
      translation,
    },
  }
}

export default function EncumbranceReferencePage() {
  return (
    <>
      <HeadMetadata
        title={t`Encumbrance quick reference`}
        description={t`Quick Reference on Encumbrance from the LotFP Core Rules`}
      />
      <PageLayout>
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
              beyond the initial 6. Weapons included.
            </li>
            <li>
              <strong>Oversized Items</strong>: Great and two-handed weapons, or
              any item requiring two hands or as tall as the character, count as
              oversized items and each adds encumbrance points.
            </li>
            <li>
              <strong>Coins</strong>: 100 any coins count as 1 regular item.
            </li>
          </ul>

          <h3>What does not count</h3>
          <ul>
            <li>
              Worn items like cloaks, jewelry, and backpacks do not count
              towards encumbrance.
            </li>
            <li>
              Small items of the same type (e.g., arrows, spikes) count as one
              item.
            </li>
            <li>
              Very small items may not count towards encumbrance, at the
              Referee&apos;s discretion.
            </li>
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

          <div className='overflow-x-auto mb-4'>
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

          <h3>Effects</h3>
          <ul>
            <li>
              <strong>Movement Rate</strong>: Encumbrance points reduce your
              character&apos;s movement in exploration, combat, and running,
              potentially down to 0 if overly encumbered.
            </li>
            <li>
              <strong>Miles per Day</strong>: Encumbrance affects how far your
              character can travel per day, with significant reductions based on
              the level of encumbrance.
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
              the encumbrance level of a character. The system uses a conversion
              where 1 encumbrance point equals 5 encumbrance units. Taken from
              the core book.
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
            <li>
              <strong>Item Threshold</strong>: The first 5 items for regular
              characters (and 10 for dwarves) do not count towards encumbrance
              unless they are Armor or Oversized items.
            </li>
            <li>
              <strong>Oversized Items</strong>: Have a higher encumbrance value,
              with each oversized item equating to 1 full encumbrance point.
            </li>
          </ul>
        </section>
      </PageLayout>
    </>
  )
}
