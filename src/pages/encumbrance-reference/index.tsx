'use client'

import { t } from '@lingui/macro'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

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
      <Head>
        <title>{t`Encumbrance quick reference`}</title>
      </Head>
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
              beyond the initial 6.
            </li>
            <li>
              <strong>Oversized Items</strong>: Great and two-handed weapons, or
              any item requiring two hands or as tall as the character, count as
              oversized items and each adds encumbrance points.
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
      </PageLayout>
    </>
  )
}
