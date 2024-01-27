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

export default function DisclaimerPage() {
  return (
    <>
      <HeadMetadata title={t`Disclaimer`} />
      <PageLayout>
        <section>
          <header>
            <h2>Disclaimer</h2>
          </header>
          <p>
            This project is created just for fun and is not officially
            affiliated with or endorsed by the publishers of{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.lotfp.com/RPG/'
            >
              &quot;Lamentations of the Flame Princess&quot; (LotFP)
            </a>{' '}
            or any other related entities.
          </p>

          <p>
            The content utilized in this project has been sourced from publicly
            available materials, including but not limited to the{' '}
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
      </PageLayout>
    </>
  )
}
