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

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{t`About`}</title>
      </Head>
      <PageLayout>
        <section>
          <header>
            <h2>About</h2>
          </header>
          <p>
            This is an online inventory and equipment generator for the LotFP
            system.
          </p>
          <details className='mb-4'>
            <summary>Features list</summary>
            <ul>
              <li>
                Lists of equipment including armor, weapons, miscellaneous
                items, and some tips about these items.
              </li>
              <li>
                Calculation
                <ul>
                  <li>Encumbrance</li>
                  <li>Movement</li>
                  <li>Terrain and weather adjustments</li>
                </ul>
              </li>
              <li>Custom equipment entries</li>
              <li>
                Inventory is saved in locale storage and survives the page
                reload
                <ul>
                  <li>State can be exported and imported</li>
                </ul>
              </li>
              <li>Languages support</li>
              <li>Responsive layout, mobile devices support</li>
              <li>
                Equipment sets
                <ul>
                  <li>By class</li>
                  <li>Common</li>
                  <li>Random</li>
                </ul>
              </li>
            </ul>
          </details>
          <p>
            The full list of features is available on the{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/8kto/ttrpg-lotfp-helpers?tab=readme-ov-file#features-list'
            >
              project page
            </a>
            .
          </p>
        </section>
        <section>
          <header>
            <h2>Encumbrance</h2>
          </header>
          <p>The encumbrance points and slots are explained.</p>
        </section>
        <section>
          <header>
            <h2>Encumbrance quick reference</h2>
          </header>
          <details>
            <summary>Show</summary>
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
                <strong>Oversized Items</strong>: Great and two-handed weapons,
                or any item requiring two hands or as tall as the character,
                count as oversized items and each adds encumbrance points.
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
                <strong>Carrying Items</strong>: +1 point for every 5 items
                beyond the first 5. Dwarves can carry an additional 5 items (10
                in total) before encumbrance penalties apply.
              </li>
              <li>
                <strong>Oversized Items</strong>: +1 point per oversized item.
              </li>
            </ul>

            <h3>Effects</h3>
            <ul>
              <li>
                <strong>Movement Rate</strong>: Encumbrance points reduce your
                character&apos;s movement in exploration, combat, and running,
                potentially down to 0 if overly encumbered.
              </li>
              <li>
                <strong>Miles per Day</strong>: Encumbrance affects how far your
                character can travel per day, with significant reductions based
                on the level of encumbrance.
              </li>
            </ul>
          </details>
        </section>
        <section>
          <header>
            <h2>Contacts</h2>
          </header>
          <p>
            My website:{' '}
            <a
              href='https://ivlev.blog/'
              target='_blank'
              rel='noopener noreferrer'
            >
              ivlev.blog
            </a>
            , and Telegram channel:{' '}
            <a href='https://t.me/oktottrpg'>What Does Octopus Say</a> for
            updates.
          </p>
          <p>
            For feedback, bug reports, feature requests, translations (some are
            machine-translated), or other comments, visit{' '}
            <a
              href='https://github.com/8kto/ttrpg-lotfp-helpers'
              target='_blank'
              rel='noopener noreferrer'
            >
              Princess Helpers on GitHub
            </a>
            .
          </p>
        </section>
      </PageLayout>
    </>
  )
}
