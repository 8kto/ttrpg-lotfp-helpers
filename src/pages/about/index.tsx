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
            This is an online inventory and equipment tool for the LotFP TTRPG
            system. Currently, it does not include mounts, animals, or firearms.
            I plan to revisit this after a [short] break.
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
