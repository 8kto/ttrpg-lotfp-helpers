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
          <details>
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
            <h2>Feedback, bug reports, features requests</h2>
          </header>
          <p>
            My webpage:{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://ivlev.blog/'
            >
              ivlev.blog
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/8kto/ttrpg-lotfp-helpers'
            >
              Princess Helpers
            </a>
          </p>
        </section>
      </PageLayout>
    </>
  )
}
