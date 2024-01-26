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
        <main className='mx-auto mb-4 w-full max-w-screen-md flex-grow px-2.5 sm:px-6 lg:px-8'>
          <div className='mt-6'>
            <div className='col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <section className='mb-6'>
                <header>
                  <h2 className='ph-color-primary mb-2 text-xl text-gray-900 sm:text-2xl'>
                    About
                  </h2>
                </header>
                <p>
                  This project is created just for fun and is not officially
                  affiliated with or endorsed by the publishers of
                  &quot;Lamentations of the Flame Princess&quot; (LotFP) or any
                  other related entities. The content utilized in this project
                  has been sourced from publicly available materials, including
                  but not limited to the &quot;LotFP Rules & Magic Free
                  Version&quot; available at{' '}
                  <a
                    href='https://preview.drivethrurpg.com/en/product/115059/LotFP-Rules--Magic-Free-Version'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ph-color-accent hover:underline underline-offset-2 '
                  >
                    DriveThruRPG
                  </a>{' '}
                  and resources from &quot;Basic Fantasy RPG&quot; found at{' '}
                  <a
                    href='https://www.basicfantasy.org/downloads.html'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ph-color-accent hover:underline underline-offset-2 '
                  >
                    Basic Fantasy
                  </a>
                  . This project is intended for personal entertainment and
                  educational purposes only, and no commercial benefit is
                  derived from its use.
                </p>
              </section>
              <section className='mb-6'>
                <header>
                  <h2 className='ph-color-primary mb-2 text-xl text-gray-900 sm:text-2xl'>
                    Encumbrance
                  </h2>
                </header>
                <p>The encumbrance points and slots are explained.</p>
              </section>
              <section className='mb-6'>
                <header>
                  <h2 className='ph-color-primary mb-2 text-xl text-gray-900 sm:text-2xl'>
                    Feedback, bug reports, features requests
                  </h2>
                </header>
                <p>
                  My webpage: <a href='https://ivlev.blog/'>ivlev.blog</a>
                </p>
                <p>
                  GitHub:{' '}
                  <a href='https://github.com/8kto/ttrpg-lotfp-helpers'>
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
