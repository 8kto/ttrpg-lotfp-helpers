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
