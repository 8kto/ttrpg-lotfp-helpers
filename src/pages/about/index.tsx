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
        <main className='mx-auto w-full max-w-screen-md flex-grow px-2.5 sm:px-6 lg:px-8'>
          <div className='mt-6'>
            <div className='col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
              <section className='mb-6'>
                <header>
                  <h2 className='ph-color-primary mb-2 text-xl text-gray-900 sm:text-2xl'>
                    About
                  </h2>
                </header>
                <p>
                  Unadjusted AC is that of solely the armor and shield.
                  Dexterity modifiers, magical modifiers, or any other
                  adjustments are not counted. Unadjusted AC is that of solely
                  the armor and shield. Dexterity modifiers, magical modifiers,
                  or any other adjustments are not counted. Unadjusted AC is
                  that of solely the armor and shield. Dexterity modifiers,
                  magical modifiers, or any other adjustments are not counted.
                  Unadjusted AC is that of solely the armor and shield.
                  Dexterity modifiers, magical modifiers, or any other
                  adjustments are not counted. Unadjusted AC is that of solely
                  the armor and shield. Dexterity modifiers, magical modifiers,
                  or any other adjustments are not counted. Unadjusted AC is
                  that of solely the armor and shield. Dexterity modifiers,
                  magical modifiers, or any other adjustments are not counted.
                </p>
              </section>
              <section className='mb-6'>
                <header>
                  <h2 className='ph-color-primary mb-2 text-xl text-gray-900 sm:text-2xl'>
                    Encumbrance
                  </h2>
                </header>
                Unadjusted AC is that of solely the armor and shield. Dexterity
                modifiers, magical modifiers, or any other adjustments are not
                counted. Unadjusted AC is that of solely the armor and shield.
                Dexterity modifiers, magical modifiers, or any other adjustments
                are not counted. Unadjusted AC is that of solely the armor and
                shield. Dexterity modifiers, magical modifiers, or any other
                adjustments are not counted. Unadjusted AC is that of solely the
                armor and shield. Dexterity modifiers, magical modifiers, or any
                other adjustments are not counted. Unadjusted AC is that of
                solely the armor and shield. Dexterity modifiers, magical
                modifiers, or any other adjustments are not counted. Unadjusted
                AC is that of solely the armor and shield. Dexterity modifiers,
                magical modifiers, or any other adjustments are not counted.
              </section>
              <section className='mb-6'>
                <header>
                  <h2 className='ph-color-primary mb-2 text-xl text-gray-900 sm:text-2xl'>
                    Feedback, bug reports, features requests
                  </h2>
                </header>
                Unadjusted AC is that of solely the armor and shield. Dexterity
                modifiers, magical modifiers, or any other adjustments are not
                counted. Unadjusted AC is that of solely the armor and shield.
                Dexterity modifiers, magical modifiers, or any other adjustments
                are not counted. Unadjusted AC is that of solely the armor and
                shield. Dexterity modifiers, magical modifiers, or any other
                adjustments are not counted. Unadjusted AC is that of solely the
                armor and shield. Dexterity modifiers, magical modifiers, or any
                other adjustments are not counted. Unadjusted AC is that of
                solely the armor and shield. Dexterity modifiers, magical
                modifiers, or any other adjustments are not counted. Unadjusted
                AC is that of solely the armor and shield. Dexterity modifiers,
                magical modifiers, or any other adjustments are not counted.
              </section>
            </div>
          </div>
        </main>
      </div>
      <Toast />
    </>
  )
}
