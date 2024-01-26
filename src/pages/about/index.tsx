'use client'

import { t } from '@lingui/macro'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import Toast from '@/components/Toast/Toast'
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
      <div className='relative flex flex-grow flex-col pt-16'>
        <main className='ph-content-container mx-auto mb-4 w-full max-w-screen-md flex-grow px-2.5 sm:px-6 lg:px-8'>
          <div className='mt-6'>
            <div className='col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <section>
                <header>
                  <h2>Disclaimer</h2>
                </header>
                <p>
                  This project is created just for fun and is not officially
                  affiliated with or endorsed by the publishers of
                  &quot;Lamentations of the Flame Princess&quot; (LotFP) or any
                  other related entities.
                </p>

                <p>
                  The content utilized in this project has been sourced from
                  publicly available materials, including but not limited to the{' '}
                  <a
                    href='https://preview.drivethrurpg.com/en/product/115059/LotFP-Rules--Magic-Free-Version'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    LotFP Rules & Magic Free Version
                  </a>{' '}
                  and resources from{' '}
                  <a
                    href='https://www.basicfantasy.org/downloads.html'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Basic Fantasy RPG
                  </a>
                  .
                </p>
              </section>
              <section>
                <header>
                  <h2>About</h2>
                </header>
                <p>
                  This is an online inventory and equipment generator for the
                  LotFP system.
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
            </div>
          </div>
        </main>
      </div>
      <Toast />
    </>
  )
}
